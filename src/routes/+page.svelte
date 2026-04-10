<script lang="ts">
	import Block from '$lib/Block.svelte';
	import Song from '$lib/Song.svelte';
	import { Client, Databases } from 'appwrite';
	import { onMount } from 'svelte';
	import './style.css'

	interface SongEntry {
		title: string;
		info: string;
		album?: string;
		duration?: string;
		href?: string;
	}

	interface Project {
		name: string;
		stack: string;
		status: string;
		progress: number;
		github?: string;
		url?: string;
	}

	const client = new Client()
		.setEndpoint('https://sfo.cloud.appwrite.io/v1')
		.setProject('69caeb7f0000bfb3a5c5');

	const databases = new Databases(client);
	const DATABASE_ID = '69cafd7c0030de77f390';

	let songs = $state<SongEntry[]>([]);
	let projects = $state<Project[]>([]);
	let online = $state(true);
	let loading = $state(true);

	const links = [
		{ label: 'github', href: 'https://github.com/fireentity1', display: 'fireentity1' },
		{ label: 'email', href: 'mailto:hi@fireentity.space', display: 'hi@fireentity.space' },
		{ label: 'itch', href: 'https://fire-entity.itch.io/', display: 'fire-entity' },
		{ label: 'beatleader', href: 'https://beatleader.com/u/fireentity', display: 'fireentity' },
	];

	Promise.all([
		databases.listDocuments(DATABASE_ID, 'songs'),
		databases.listDocuments(DATABASE_ID, 'projects'),
	]).then(([songsRes, projectsRes]) => {
		songs = songsRes.documents.map((d) => ({
			title: d.title,
			info: d.info,
			album: d.album,
			duration: d.duration,
			href: d.link,
		}));
		projects = projectsRes.documents.map((d) => ({
			name: d.name,
			stack: d.stack,
			progress: d.progress,
			status: d.status,
			github: d.repository || undefined,
			url: d.play || undefined,
		}));
	}).catch(() => {
		online = false;
	}).finally(() => {
		loading = false;
	});

	var status = {
		'currently': 'LIGHT//BOUND',
		'focus': 'school',
		'status': 'locked in',
		'status_active': true
	}

	interface Billboard {
		text?: string;
		image?: string;
		link?: string;
	}

	const BILLBOARD_HUES = [320, 185, 270, 45, 160, 210, 0, 30];

	const billboards: Billboard[] = [
		{ text: 'shuflduf.xyz', link: 'https://shuflduf.xyz', image: '/88x31/shuflduf.gif' },
		{ text: 'LIGHT//BOUND — IN DEV', link: 'https://github.com/fireentity1/beat-jumper' },
		{ text: 'fireentity.space', link: 'https://fireentity.space', image: '/88x31/fireentity.gif' },
		{ text: 'addy10s.xyz', link: 'https://addy10s.xyz', image: 'https://www.addy10s.xyz/addy88x31.gif'},
		{ text: 'nibblz.xyz', link: 'https://nibblz.xyz' },
		{ text: 'errorcodezero.dev', link: 'https://errorcodezero.dev', image: 'https://www.errorcodezero.dev/button.gif' },
	];

	const PANEL_COUNT = 5;
	let focusedPanel = $state(-1);
	let focusedItem = $state(-1);

	function panelItems(panel: number): Array<{ href?: string }> {
		if (panel === 2) return projects.map(p => ({ href: p.url ?? p.github }));
		if (panel === 3) return links;
		if (panel === 4) return songs;
		return [];
	}

	let hasItems = $derived(panelItems(focusedPanel).length > 0);

	function openHref(href: string) {
		if (href.startsWith('mailto:')) {
			window.location.href = href;
		} else {
			window.open(href, '_blank', 'noopener,noreferrer');
		}
	}

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas.getContext('2d')!;
		let W = window.innerWidth;
		let VH = window.innerHeight; // viewport height — for sizing sun, buildings, fog
		let H = Math.max(VH, document.documentElement.scrollHeight); // full page height
		canvas.width = W;
		canvas.height = H;

		const isMobile = W <= 768;
		const MOBILE_FRAME_MS = isMobile ? 1000 / 30 : 0;

		// ── Streaks ─────────────────────────────────────────────────────────────
		// Fewer streaks on mobile; no glowing streaks on mobile (they require expensive
		// shadowBlur + multiple gradient draws per head).
		const COUNT = isMobile ? 45 : 100;
		const BASE_ANGLE = Math.PI / 5;

		interface Streak {
			x: number; y: number;
			hue: number; hueSpeed: number;
			speed: number; length: number; width: number;
			opacity: number; angle: number; glowing: boolean;
			shimmer: number; shimmerSpeed: number;
		}

		function spawnStreak(scatter = false): Streak {
			const length = 40 + Math.random() * 180;
			const angle = BASE_ANGLE + (Math.random() - 0.5) * 0.45;
			const dx = Math.sin(angle), dy = Math.cos(angle);
			const x = scatter ? Math.random() * (W + length) - length
				: Math.random() < 0.75 ? Math.random() * W : -length * dx;
			const y = scatter ? Math.random() * H : -length * dy;
			return {
				x, y,
				hue: Math.random() * 360,
				hueSpeed: (Math.random() - 0.5) * 0.4,
				speed: 0.3 + Math.random() * 1.4,
				length, angle,
				width: 0.4 + Math.random() * 1.2,
				opacity: 0.2 + Math.random() * 0.65,
				glowing: isMobile ? false : Math.random() < 0.18,
				shimmer: Math.random() * Math.PI * 2,
				shimmerSpeed: 0.08 + Math.random() * 0.18,
			};
		}

		const streaks: Streak[] = Array.from({ length: COUNT }, () => spawnStreak(true));

		// ── City ─────────────────────────────────────────────────────────────────
		const PALETTE = [320, 185, 270, 45, 160, 210, 0, 30]; // neon hues

		interface Win {
			x: number; y: number; size: number;
			alpha: number; target: number; timer: number; hue: number;
		}
		interface Bldg {
			x: number; top: number; w: number; h: number;
			hue: number; layer: number;
			wins: Win[];
			antenna: boolean; antennaH: number;
		}

		let buildings: Bldg[] = [];
		let layer0Bldgs: Bldg[] = [];
		let layer1Bldgs: Bldg[] = [];
		let layer2Bldgs: Bldg[] = [];
		let layer3Bldgs: Bldg[] = [];

		// Offscreen canvases — one per depth layer — hold pre-rendered silhouettes,
		// neon outlines, and antennas. shadowBlur is only paid at buildCity time, not
		// every frame.
		const cityL0 = document.createElement('canvas');
		cityL0.width = W; cityL0.height = H;
		const cctx0 = cityL0.getContext('2d')!;

		const cityL1 = document.createElement('canvas');
		cityL1.width = W; cityL1.height = H;
		const cctx1 = cityL1.getContext('2d')!;

		// Scroll-depth layers — two more skylines visible as you scroll.
		// Layer 2: small background buildings at VH*1.15.
		// Layer 3: larger foreground buildings at the same baseline, drawn on top.
		const cityL2 = document.createElement('canvas');
		cityL2.width = W; cityL2.height = H;
		const cctx2 = cityL2.getContext('2d')!;

		const cityL3 = document.createElement('canvas');
		cityL3.width = W; cityL3.height = H;
		const cctx3 = cityL3.getContext('2d')!;

		// Fog gradients — cached between resizes.
		let fogGrad!: CanvasGradient;
		let fogGrad2!: CanvasGradient;
		let bottomFade!: CanvasGradient;

		// Cached scroll position — updated by scroll handler, read in draw loop
		// to avoid forcing a layout flush inside rAF via window.scrollY.
		let cachedScrollY = 0;
		let lastFrameTime = -1000;

		// Cached atmospheric gradient — recreated only when sun cy changes.
		let lastSunCy = -1;
		let cachedAtm!: CanvasGradient;
		function makeFogGrad() {
			fogGrad = ctx.createLinearGradient(0, VH * 0.65, 0, VH * 0.72);
			fogGrad.addColorStop(0, 'rgba(6,4,10,0)');
			fogGrad.addColorStop(1, 'rgba(6,4,10,0.20)');
			const scrollFogY = VH * 1.08;
			fogGrad2 = ctx.createLinearGradient(0, scrollFogY, 0, scrollFogY + VH * 0.06);
			fogGrad2.addColorStop(0, 'rgba(6,4,10,0)');
			fogGrad2.addColorStop(1, 'rgba(6,4,10,0.18)');
			// Cache bottom fade — same geometry across frames, only changes on resize.
			bottomFade = ctx.createLinearGradient(0, H - VH * 0.4, 0, H);
			bottomFade.addColorStop(0, 'rgba(6,4,10,0)');
			bottomFade.addColorStop(1, 'rgba(6,4,10,1)');
			// Force atm gradient rebuild after resize.
			lastSunCy = -1;
		}

		// Render static city elements (silhouettes + outlines + antennas) to the two
		// offscreen canvases. Called once per buildCity() — all expensive shadowBlur
		// operations happen here, never inside the 60 fps draw loop.
		function renderCityStatic() {
			cctx0.clearRect(0, 0, W, H);
			cctx1.clearRect(0, 0, W, H);
			cctx2.clearRect(0, 0, W, H);
			cctx3.clearRect(0, 0, W, H);

			for (const b of buildings) {
				const sc    = b.layer === 0 ? cctx0 : b.layer === 1 ? cctx1 : b.layer === 2 ? cctx2 : cctx3;
				const alpha = b.layer === 0 ? 0.32 : b.layer === 1 ? 0.65 : b.layer === 2 ? 0.22 : 0.52;
				const blur  = b.layer === 0 ? 5 : b.layer === 1 ? 10 : b.layer === 2 ? 4 : 9;
				const lw    = b.layer === 0 ? 0.7 : b.layer === 1 ? 1.1 : b.layer === 2 ? 0.6 : 1.0;
				const col   = `hsl(${b.hue},100%,58%)`;

				// Silhouette — extends to canvas bottom so scrolling reveals nothing behind
				sc.fillStyle = '#06040a';
				sc.fillRect(b.x, b.top, b.w, H - b.top);

				// Neon outline — outer glow (sides only, no bottom, extends to canvas bottom)
				sc.save();
				sc.globalAlpha = alpha * 0.5;
				sc.strokeStyle = col;
				sc.lineWidth = lw * 3;
				sc.shadowColor = col;
				sc.shadowBlur = blur * 2;
				sc.beginPath();
				sc.moveTo(b.x + 0.5, H);
				sc.lineTo(b.x + 0.5, b.top + 0.5);
				sc.lineTo(b.x + b.w - 0.5, b.top + 0.5);
				sc.lineTo(b.x + b.w - 0.5, H);
				sc.stroke();
				sc.restore();

				// Neon outline — crisp inner (sides only, no bottom, extends to canvas bottom)
				sc.save();
				sc.globalAlpha = alpha;
				sc.strokeStyle = col;
				sc.lineWidth = lw;
				sc.shadowColor = col;
				sc.shadowBlur = blur;
				sc.beginPath();
				sc.moveTo(b.x + 0.5, H);
				sc.lineTo(b.x + 0.5, b.top + 0.5);
				sc.lineTo(b.x + b.w - 0.5, b.top + 0.5);
				sc.lineTo(b.x + b.w - 0.5, H);
				sc.stroke();
				sc.restore();

				// Antenna
				if (b.antenna) {
					const ax = b.x + b.w / 2;
					sc.save();
					sc.globalAlpha = alpha;
					sc.strokeStyle = col;
					sc.lineWidth = 0.8;
					sc.shadowColor = col;
					sc.shadowBlur = blur;
					sc.beginPath();
					sc.moveTo(ax, b.top);
					sc.lineTo(ax, b.top - b.antennaH);
					sc.stroke();
					sc.beginPath();
					sc.arc(ax, b.top - b.antennaH, 1.5, 0, Math.PI * 2);
					sc.fillStyle = `hsl(${b.hue},100%,90%)`;
					sc.shadowBlur = 8;
					sc.fill();
					sc.restore();
				}
			}
		}

		function buildCity() {
			buildings = [];

			// layer config: [maxH%, minH%, wMin, wMax, wSize, wGap, baseline]
			const configs = [
				[0.13, 0.05, 22, 55,  3, 7,  VH],
				[0.20, 0.07, 28, 95,  4, 10, VH],
				[0.10, 0.03, 18, 45,  2, 6,  VH * 1.15],  // scroll bg
				[0.18, 0.06, 26, 85,  4, 10, VH * 1.15],  // scroll fg
			] as const;

			for (let layer = 0; layer < 4; layer++) {
				const [maxHr, minHr, wMin, wMax, wSize, wGap, baseline] = configs[layer];
				const maxH = VH * maxHr, minH = VH * minHr;
				const pad = 7;
				let x = -15;

				while (x < W + 20) {
					const w = wMin + Math.random() * (wMax - wMin);
					const h = minH + Math.random() * (maxH - minH);
					const top = baseline - h;
					const hue = PALETTE[Math.floor(Math.random() * PALETTE.length)];
					const wins: Win[] = [];

					for (let wy = top + pad + 6; wy < H - pad; wy += wGap) {
						for (let wx = x + pad; wx < x + w - pad - wSize; wx += wGap) {
							const initAlpha = Math.random() > 0.4 ? 0.6 + Math.random() * 0.4 : 0;
							wins.push({
								x: wx, y: wy, size: wSize,
								alpha: initAlpha, target: initAlpha,
								timer: Math.floor(Math.random() * 500),
								hue: PALETTE[Math.floor(Math.random() * PALETTE.length)],
							});
						}
					}

					buildings.push({
						x, top, w, h, hue, layer, wins,
						antenna: layer === 1 && Math.random() < 0.4,
						antennaH: 10 + Math.random() * 22,
					});
					x += w - (layer === 0 ? 4 : layer === 1 ? 6 : layer === 2 ? 3 : 5);
				}
			}

			buildings.sort((a, b) => a.layer - b.layer);
			layer0Bldgs = buildings.filter(b => b.layer === 0);
			layer1Bldgs = buildings.filter(b => b.layer === 1);
			layer2Bldgs = buildings.filter(b => b.layer === 2);
			layer3Bldgs = buildings.filter(b => b.layer === 3);
			renderCityStatic();
			makeFogGrad();
		}

		// Update window alpha state — called every 3rd frame to reduce iteration cost.
		function updateWindows(bldgs: Bldg[]) {
			for (const b of bldgs) {
				for (const win of b.wins) {
					win.timer--;
					if (win.timer <= 0) {
						const goOn = win.target === 0;
						win.target = goOn ? 0.6 + Math.random() * 0.4 : 0;
						win.timer = goOn
							? 300 + Math.floor(Math.random() * 600)
							: 180 + Math.floor(Math.random() * 480);
					}
					win.alpha += (win.target - win.alpha) * 0.04;
				}
			}
		}

		// Draw animated windows for one depth layer. No shadowBlur — windows are tiny
		// bright pixels on a dark background; the contrast alone reads as glowing.
		function drawWindowsForLayer(bldgs: Bldg[], alpha: number) {
			for (const b of bldgs) {
				for (const win of b.wins) {
					if (win.alpha < 0.01) continue;
					ctx.globalAlpha = alpha * win.alpha;
					ctx.fillStyle = `hsl(${win.hue},100%,75%)`;
					ctx.fillRect(win.x, win.y, win.size, win.size);
				}
			}
		}

		function drawCity() {
			// Scroll-depth background (drawn first, furthest back)
			ctx.globalAlpha = 1;
			ctx.drawImage(cityL2, 0, 0);
			drawWindowsForLayer(layer2Bldgs, 0.22);
			ctx.globalAlpha = 1;

			// Scroll-layer horizon fog
			ctx.fillStyle = fogGrad2;
			ctx.fillRect(0, VH * 1.08, W, VH * 0.1);

			// Scroll-depth foreground (drawn on top of bg layer)
			ctx.globalAlpha = 1;
			ctx.drawImage(cityL3, 0, 0);
			drawWindowsForLayer(layer3Bldgs, 0.52);
			ctx.globalAlpha = 1;

			// Layer 0 (background): blit pre-rendered static, then windows
			ctx.globalAlpha = 1;
			ctx.drawImage(cityL0, 0, 0);
			drawWindowsForLayer(layer0Bldgs, 0.32);
			// Layer 1 (foreground): must reset globalAlpha before blit — drawWindowsForLayer
			// leaves it at the last window's alpha value, which would make the blit semi-transparent
			// and let layer-0 windows bleed through the foreground building silhouettes.
			ctx.globalAlpha = 1;
			ctx.drawImage(cityL1, 0, 0);
			drawWindowsForLayer(layer1Bldgs, 0.65);
			ctx.globalAlpha = 1;

			// Horizon fog (main city)
			ctx.fillStyle = fogGrad;
			ctx.fillRect(0, VH * 0.65, W, VH * 0.35);

			// Fade to black at the very bottom of the canvas (gradient cached in makeFogGrad)
			ctx.fillStyle = bottomFade;
			ctx.fillRect(0, H - VH * 0.4, W, VH * 0.4);
		}

		// ── Sun ──────────────────────────────────────────────────────────────────
		let frame = 0;

		const sunCanvas = document.createElement('canvas');
		sunCanvas.width = W; sunCanvas.height = H;
		const sctx = sunCanvas.getContext('2d')!;

		function drawSun() {
			const pulse  = 0.5 + 0.5 * Math.sin(frame * 0.009);
			const cx = W / 2;
			// Parallax: sun moves at 30% of scroll speed relative to viewport.
			// canvas_y = VH*0.82 + scrollY*0.7 achieves this.
			// Use cachedScrollY (set by scroll handler) to avoid a layout flush inside rAF.
			const cy = VH * 0.82 + cachedScrollY * 0.7;
			const R  = Math.min(W * 0.72, VH * 0.56);

			// Atmospheric haze — rebuild gradient only when sun position changes (scroll-driven).
			// Pulse alpha variation is imperceptible; fixed midpoint values used instead.
			if (cy !== lastSunCy) {
				lastSunCy = cy;
				cachedAtm = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 2.8);
				cachedAtm.addColorStop(0,    'hsla(336, 100%, 55%, 0.155)');
				cachedAtm.addColorStop(0.28, 'hsla(285, 100%, 48%, 0.110)');
				cachedAtm.addColorStop(0.65, 'hsla(270, 100%, 38%, 0.030)');
				cachedAtm.addColorStop(1,    'rgba(0,0,0,0)');
			}
			ctx.fillStyle = cachedAtm;
			ctx.fillRect(0, cy - R * 2.8, W, R * 3.4);

			// Draw sun disc + stripes on offscreen canvas
			sctx.clearRect(0, 0, W, H);

			const body = sctx.createLinearGradient(cx, cy - R, cx, cy + R * 0.18);
			body.addColorStop(0,    `rgba(255, 245, 160, ${0.75 + 0.08 * pulse})`);
			body.addColorStop(0.15, `rgba(255, 100, 180, 0.82)`);
			body.addColorStop(0.45, `rgba(180,   0, 255, 0.84)`);
			body.addColorStop(0.78, `rgba(80,    0, 200, 0.78)`);
			body.addColorStop(0.90, `rgba(30,    0, 120, 0.65)`);
			body.addColorStop(1,    `rgba(20,    0,  80, 0)`);
			sctx.fillStyle = body;
			sctx.fillRect(cx - R - 1, cy - R - 1, R * 2 + 2, R + 2 + R * 0.18);

			sctx.fillStyle = 'rgba(6,4,10,0.96)';
			const discDrift = (frame * 0.006) % 1;
			const N = 10;
			for (let i = 0; i < N; i++) {
				const ti = (i + discDrift) / N;
				const t  = 1 - Math.pow(1 - ti, 2.6);
				const y  = cy - R * (1 - t);
				const thickness = Math.max(1.5, (1 - t) * 12 + 1.5);
				sctx.fillRect(cx - R - 1, y - thickness * 0.5, R * 2 + 2, thickness);
			}

			sctx.globalCompositeOperation = 'destination-in';
			const mask = sctx.createRadialGradient(cx, cy, R * 0.68, cx, cy, R * 1.01);
			mask.addColorStop(0,   'rgba(0,0,0,1)');
			mask.addColorStop(0.7, 'rgba(0,0,0,1)');
			mask.addColorStop(1,   'rgba(0,0,0,0)');
			sctx.fillStyle = mask;
			sctx.fillRect(cx - R * 1.05, cy - R * 1.05, R * 2.1, R * 1.25);
			sctx.globalCompositeOperation = 'source-over';

			ctx.drawImage(sunCanvas, 0, 0);

			// Continuation lines — smooth every frame (these are the most visible stripes)
			ctx.save();
			const drift = (frame * 0.006) % 1;
			const lineCount = 22;
			for (let j = 0; j < lineCount; j++) {
				const tj = (j + drift) / lineCount;
				const t  = Math.pow(tj, 2.2);
				const y  = cy + (H - cy) * t;
				const alpha = (1 - tj) * 0.52;
				const thickness = 0.6 + t * 4;
				ctx.globalAlpha = alpha;
				ctx.fillStyle = '#06040a';
				ctx.fillRect(0, y, W, thickness);
			}
			ctx.globalAlpha = 1;
			ctx.restore();
		}

		// ── Render loop ──────────────────────────────────────────────────────────
		let raf: number;

		function draw(ts: number = 0) {
			// On mobile, cap to 30fps to cut CPU/GPU work in half.
			if (isMobile && ts > 0 && ts - lastFrameTime < MOBILE_FRAME_MS) {
				raf = requestAnimationFrame(draw);
				return;
			}
			lastFrameTime = ts;

			ctx.clearRect(0, 0, W, H);
			frame++;

			// Window state updates are throttled — alpha lerp is slow enough that
			// every 3rd frame is visually identical to every frame.
			if (frame % 3 === 0) {
				updateWindows(layer0Bldgs);
				updateWindows(layer1Bldgs);
				updateWindows(layer2Bldgs);
				updateWindows(layer3Bldgs);
			}

			// Sun (furthest back)
			drawSun();

			// Streaks — lineCap set once for the whole batch
			ctx.lineCap = 'round';
			for (const s of streaks) {
				const sdx = Math.sin(s.angle), sdy = Math.cos(s.angle);
				const tx = s.x - sdx * s.length, ty = s.y - sdy * s.length;

				s.shimmer += s.shimmerSpeed;
				const twinkle = 0.75 + 0.25 * Math.sin(s.shimmer);

				if (s.glowing) {
					// Wide soft halo
					const glow = ctx.createLinearGradient(tx, ty, s.x, s.y);
					glow.addColorStop(0, `hsla(${s.hue},100%,70%,0)`);
					glow.addColorStop(0.6, `hsla(${s.hue},100%,65%,${s.opacity * 0.10 * twinkle})`);
					glow.addColorStop(1, `hsla(${s.hue},100%,70%,${s.opacity * 0.28 * twinkle})`);
					ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(s.x, s.y);
					ctx.strokeStyle = glow; ctx.lineWidth = s.width * 7;
					ctx.stroke();
				}

				// Core streak
				const grad = ctx.createLinearGradient(tx, ty, s.x, s.y);
				grad.addColorStop(0, `hsla(${s.hue},100%,75%,0)`);
				grad.addColorStop(0.55, `hsla(${s.hue + 20},100%,72%,${s.opacity * 0.4})`);
				grad.addColorStop(1, `hsla(${s.hue + 40},100%,82%,${s.opacity * twinkle})`);
				ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(s.x, s.y);
				ctx.strokeStyle = grad; ctx.lineWidth = s.width;
				ctx.stroke();

				if (s.glowing) {
					const r = s.width * 1.6 * twinkle;
					const flair = s.opacity * twinkle;

					// Bright core dot with glow
					ctx.beginPath();
					ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
					ctx.fillStyle = `hsla(${s.hue},80%,98%,${flair})`;
					ctx.shadowColor = `hsl(${s.hue},100%,75%)`;
					ctx.shadowBlur = 10 * twinkle;
					ctx.fill();
					ctx.shadowBlur = 0;
				}

				s.x += sdx * s.speed; s.y += sdy * s.speed; s.hue += s.hueSpeed;
				if (s.y - sdy * s.length > H || s.x - sdx * s.length > W) {
					Object.assign(s, spawnStreak());
				}
			}

			// City on top of streaks
			drawCity();

			raf = requestAnimationFrame(draw);
		}

		let resizeTimer: ReturnType<typeof setTimeout>;
		const resize = () => {
			W = window.innerWidth;
			VH = window.innerHeight;
			H = Math.max(VH, document.documentElement.scrollHeight);
			canvas.width = W; canvas.height = H;
			sunCanvas.width = W; sunCanvas.height = H;
			cityL0.width = W; cityL0.height = H;
			cityL1.width = W; cityL1.height = H;
			cityL2.width = W; cityL2.height = H;
			cityL3.width = W; cityL3.height = H;
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(buildCity, 200);
		};
		window.addEventListener('resize', resize);

		// Rebuild when async content (songs, projects) loads and changes the page height.
		const ro = new ResizeObserver(() => {
			const newH = Math.max(window.innerHeight, document.documentElement.scrollHeight);
			if (Math.abs(newH - H) > 10) {
				H = newH;
				canvas.height = H;
				sunCanvas.height = H;
				cityL0.height = H;
				cityL1.height = H;
				cityL2.height = H;
				cityL3.height = H;
				buildCity();
			}
		});
		ro.observe(document.body);

		// Pause animation when the tab is not visible to save CPU/GPU.
		const onVisibilityChange = () => {
			if (document.hidden) {
				cancelAnimationFrame(raf);
			} else {
				raf = requestAnimationFrame(draw);
			}
		};
		document.addEventListener('visibilitychange', onVisibilityChange);

		const onScroll = () => {
			cachedScrollY = window.scrollY;
			document.documentElement.style.setProperty('--page-scroll', String(cachedScrollY));
		};
		window.addEventListener('scroll', onScroll, { passive: true });

		buildCity();
		draw();

		return () => {
			cancelAnimationFrame(raf);
			clearTimeout(resizeTimer);
			window.removeEventListener('resize', resize);
			window.removeEventListener('scroll', onScroll);
			document.removeEventListener('visibilitychange', onVisibilityChange);
			ro.disconnect();
		};
	});

	function handleKeydown(e: KeyboardEvent) {
		const el = e.target as HTMLElement;
		if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable) return;

		const items = panelItems(focusedPanel);

		if (e.key === 'k' || e.key === 'ArrowRight') {
			e.preventDefault();
			focusedPanel = (focusedPanel + 1) % PANEL_COUNT;
			focusedItem = -1;
			requestAnimationFrame(() => {
				document.querySelectorAll<HTMLElement>('.panel')[focusedPanel]?.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest'
				});
			});
		} else if (e.key === 'j' || e.key === 'ArrowLeft') {
			e.preventDefault();
			focusedPanel = (focusedPanel - 1 + PANEL_COUNT) % PANEL_COUNT;
			focusedItem = -1;
			requestAnimationFrame(() => {
				document.querySelectorAll<HTMLElement>('.panel')[focusedPanel]?.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest'
				});
			});
		} else if (e.key === 'ArrowDown' && items.length > 0) {
			e.preventDefault();
			focusedItem = focusedItem < 0 ? 0 : (focusedItem + 1) % items.length;
		} else if (e.key === 'ArrowUp' && items.length > 0) {
			e.preventDefault();
			focusedItem = focusedItem < 0 ? items.length - 1 : (focusedItem - 1 + items.length) % items.length;
		} else if (e.key === 'Enter' && focusedItem >= 0) {
			const href = items[focusedItem]?.href;
			if (href) {
				e.preventDefault();
				openHref(href);
			}
		} else if (e.key === 'Escape') {
			e.preventDefault();
			if (focusedItem >= 0) {
				focusedItem = -1;
			} else {
				focusedPanel = -1;
			}
		}
	}
</script>

<svelte:head>
	<title>fireentity.space</title>
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<canvas bind:this={canvas} style="position:absolute;top:0;left:0;pointer-events:none;z-index:0;will-change:transform;"></canvas>

<div class="terminal" style="position:relative;z-index:1;">
	<header class="topbar">
		<h1 class="brand">fireentity.space</h1>
		<div class="topbar-right">
			<span class="indicator" aria-label="online" style={online ? '' : 'color: red;'}>●</span>
			<span class="tagline" style={online ? '' : 'color: red;'}><a href="/admin">{online ? '// online' : '// offline'}</a></span>
		</div>
	</header>


	<div class="panel-grid">
		<Block title="about" colspan={2} active={focusedPanel === 0}>
			<p>Hi! I'm fireentity! A novice music artist, web/game developer, and aviation photographer!</p>
		</Block>

		<Block title="status" active={focusedPanel === 1}>
			<dl class="kv">
				<div class="kv-row">
					<dt>currently</dt>
					<span class="arr">→</span>
					<dd>{status.currently}</dd>
				</div>
				<div class="kv-row">
					<dt>focus</dt>
					<span class="arr">→</span>
					<dd>{status.focus}</dd>
				</div>
				<div class="kv-row">
					<dt>status</dt>
					<span class="arr">→</span>
					<dd class={status.status_active ? 'dd-active' : 'dd-inactive'}>
						 {status.status}</dd>
				</div>
			</dl>
		</Block>

		<Block title="projects" colspan={2} active={focusedPanel === 2}>
			{#if loading}
				<span class="loading">loading...</span>
			{:else}
				<div class="proj-head row-cols">
					<span>name</span>
					<span>stack</span>
					<span>progress</span>
					<span>status</span>
					<span></span>
				</div>
				{#each projects as proj, i (proj.name)}
					<div class="proj-row row-cols" class:item-active={focusedPanel === 2 && focusedItem === i}>
						<span class="proj-name">{proj.name}</span>
						<span class="proj-stack">{proj.stack}</span>
						<span class="proj-bar">{'█'.repeat(proj.progress)}{'░'.repeat(10 - proj.progress)}</span>
						<span class="proj-status">{proj.status}</span>
						<span class="proj-links">
							{#if proj.github}
								<a class="proj-link" href={proj.github} target="_blank" rel="noopener noreferrer" title="GitHub">
									<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
								</a>
							{:else}
								<span class="proj-link proj-link-empty"></span>
							{/if}
							{#if proj.url}
								<a class="proj-link" href={proj.url} target="_blank" rel="noopener noreferrer" title="Live site">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
								</a>
							{:else}
								<span class="proj-link proj-link-empty"></span>
							{/if}
						</span>
					</div>
				{/each}
			{/if}
		</Block>

		<Block title="links" active={focusedPanel === 3}>
			<ul class="links">
				{#each links as link, i}
					<li class:item-active={focusedPanel === 3 && focusedItem === i}>
						<span class="lk-label">{link.label}</span>
						<span class="lk-arr">→</span>
						<a class="lk-val lk-link" href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}>{link.display}</a>
					</li>
				{/each}
			</ul>
		</Block>

		<Block title="my songs" colspan={3} active={focusedPanel === 4}>
			<div class="songs-wrap">
				{#if loading}
					<span class="loading">loading tracks...</span>
				{:else}
					<div class="songs-head">
						<span></span>
						<span>#</span>
						<span>title</span>
						<span>info</span>
						<span>time</span>
					</div>
					{#each songs as song, i (i)}
						<Song
							index={i + 1}
							title={song.title}
							info={song.info}
							album={song.album}
							duration={song.duration}
							href={song.href}
							active={focusedPanel === 4 && focusedItem === i}
						/>
					{/each}
				{/if}
			</div>
		</Block>
	</div>

	<div class="billboards">
		{#each billboards as board, i}
			{@const hue = BILLBOARD_HUES[i % BILLBOARD_HUES.length]}
			{@const signOffset = ['0rem','0.9rem','-0.4rem','1.5rem','0.2rem','-0.7rem','1.1rem','-0.2rem','0.6rem','1.8rem','-0.5rem','0.4rem'][i % 12]}
			{@const pf = [0.06, 0.11, 0.04, 0.13, 0.08, 0.10, 0.03, 0.12, 0.05, 0.09, 0.14, 0.07][i % 12]}
			<div class="billboard" style="--hue:{hue};--sign-offset:{signOffset};--pf:{pf}">
				<svelte:element
					this={board.link ? 'a' : 'div'}
					class="billboard-face"
					href={board.link ?? undefined}
					target={board.link && !board.link.startsWith('/') ? '_blank' : undefined}
					rel={board.link ? 'noopener noreferrer' : undefined}
				>
					{#if board.image}
						<img src={board.image} alt={board.text ?? ''} class="billboard-img" />
					{:else}
						<span class="billboard-text">{board.text}</span>
					{/if}
				</svelte:element>
				<div class="billboard-legs">
					<span class="billboard-leg"></span>
					<span class="billboard-leg"></span>
				</div>
			</div>
		{/each}
	</div>


	<footer class="statusbar">
		<div class="hints">
			<span class="hint"><kbd>j</kbd><kbd>k</kbd>/<kbd>←</kbd><kbd>→</kbd> navigate</span>
			{#if hasItems}
				<span class="sep">/</span>
				<span class="hint"><kbd>↑</kbd><kbd>↓</kbd> select</span>
				<span class="sep">/</span>
				<span class="hint"><kbd>↵</kbd> open</span>
			{/if}
			<span class="sep">/</span>
			<span class="hint"><kbd>esc</kbd> reset</span>
		</div>
		<span class="mode">{focusedItem >= 0 ? 'SELECT' : focusedPanel >= 0 ? 'FOCUSED' : 'MOUSE'}</span>
	</footer>
</div>
