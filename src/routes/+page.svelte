<script lang="ts">
	import { onMount } from 'svelte';
	import './page.css';

	let composition: HTMLElement;
	let hazeLayer: HTMLElement;
	let streakLayer: HTMLElement;
	let starLayer: HTMLElement;
	let cursorGlow: HTMLElement;

	const songs = [
		['01', 'FARAWAY', '03:58'],
		['02', 'STAR//BREAKER', '04:21'],
		['03', 'UNBOUND', '03:47']
	];

	const projects = [
		{
			index: '01',
			title: 'LIGHT//BOUND',
			meta: 'RHYTHM GAME / IN DEVELOPMENT',
			description: 'A project built around music, movement, and light.',
			theme: 'light'
		},
		{
			index: '02',
			title: 'VOIDBORNE',
			meta: '2D METROIDVANIA',
			description: 'Explore a kingdom ruled by light.',
			theme: 'void'
		}
	];

	const hazeClasses = ['haze-blue', 'haze-violet', 'haze-magenta', 'haze-red'];
	const streakClasses = ['streak-blue-long', 'streak-blue-soft', 'streak-pink-long', 'streak-violet'];
	const stars = [
		['starburst blue', '6%', '24%', '16px', '.42', '✦'],
		['plus', '19%', '9%', '8px', '.3', '+'],
		['pixel', '31%', '19%', '2px', '.7', ''],
		['cross pink', '48%', '8%', '8px', '.46', ''],
		['pixel', '62%', '27%', '3px', '.38', ''],
		['starburst pink', '88%', '16%', '11px', '.5', '✦'],
		['plus blue', '95%', '38%', '7px', '.36', '+'],
		['pixel pink', '12%', '55%', '2px', '.52', ''],
		['cross', '39%', '48%', '6px', '.28', ''],
		['starburst', '71%', '47%', '7px', '.3', '✦'],
		['pixel blue', '84%', '59%', '3px', '.7', ''],
		['plus pink', '24%', '72%', '9px', '.32', '+'],
		['pixel', '53%', '76%', '2px', '.45', ''],
		['cross blue', '93%', '81%', '7px', '.35', ''],
		['starburst pink', '8%', '88%', '13px', '.38', '✦'],
		['pixel', '37%', '94%', '2px', '.58', ''],
		['plus blue', '67%', '90%', '6px', '.31', '+'],
		['pixel pink', '79%', '96%', '2px', '.55', '']
	];

	onMount(() => {
		const moduleObserver = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					entry.target.classList.toggle('is-offscreen', !entry.isIntersecting);
				}
			},
			{ rootMargin: '160px 0px' }
		);

		document.querySelectorAll<HTMLElement>('.module').forEach((module) => {
			moduleObserver.observe(module);
		});

		const supportsParallax =
			matchMedia('(hover: hover) and (pointer: fine)').matches &&
			!matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (!supportsParallax) return () => moduleObserver.disconnect();

		let targetX = 0;
		let targetY = 0;
		let currentX = 0;
		let currentY = 0;
		let targetGlowX = innerWidth / 2;
		let targetGlowY = innerHeight / 2;
		let glowX = targetGlowX;
		let glowY = targetGlowY;
		let frame = 0;

		const render = () => {
			currentX += (targetX - currentX) * 0.055;
			currentY += (targetY - currentY) * 0.055;
			glowX += (targetGlowX - glowX) * 0.075;
			glowY += (targetGlowY - glowY) * 0.075;

			hazeLayer.style.translate = `${currentX * 22}px ${currentY * 16}px`;
			streakLayer.style.translate = `${currentX * 13}px ${currentY * 9}px`;
			starLayer.style.translate = `${currentX * 8}px ${currentY * 6}px`;
			composition.style.setProperty('--fg-x', `${currentX * 3.5}px`);
			composition.style.setProperty('--fg-y', `${currentY * 2.5}px`);
			composition.style.setProperty('--fg-reverse-x', `${currentX * -2.2}px`);
			composition.style.setProperty('--fg-reverse-y', `${currentY * -1.6}px`);
			cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;

			const isMoving =
				Math.abs(targetX - currentX) > 0.001 ||
				Math.abs(targetY - currentY) > 0.001 ||
				Math.abs(targetGlowX - glowX) > 0.2 ||
				Math.abs(targetGlowY - glowY) > 0.2;

			frame = isMoving ? requestAnimationFrame(render) : 0;
		};

		const requestRender = () => {
			if (!frame) frame = requestAnimationFrame(render);
		};

		const handlePointer = (event: PointerEvent) => {
			targetX = (event.clientX / innerWidth) * 2 - 1;
			targetY = (event.clientY / innerHeight) * 2 - 1;
			targetGlowX = event.clientX;
			targetGlowY = event.clientY;
			cursorGlow.style.opacity = '1';
			requestRender();
		};

		const handleLeave = () => {
			targetX = 0;
			targetY = 0;
			cursorGlow.style.opacity = '0';
			requestRender();
		};

		addEventListener('pointermove', handlePointer, { passive: true });
		document.documentElement.addEventListener('mouseleave', handleLeave);

		return () => {
			removeEventListener('pointermove', handlePointer);
			document.documentElement.removeEventListener('mouseleave', handleLeave);
			if (frame) cancelAnimationFrame(frame);
			moduleObserver.disconnect();
		};
	});
</script>

<svelte:head>
	<title>Fireentity — Music, Games & Software</title>
	<meta name="description" content="Fireentity makes music, builds games, and writes software." />
</svelte:head>

{#snippet imagePlaceholder(label: string)}
	<svg class="placeholder-icon" viewBox="0 0 24 24" aria-hidden="true">
		<rect x="3.5" y="4.5" width="17" height="15" rx="0.5"></rect>
		<circle cx="8.5" cy="9" r="1.5"></circle>
		<path d="m5.5 17 4.2-4.2 2.7 2.6 2.2-2.1 3.9 3.7"></path>
	</svg>
	<span class="placeholder-label">{label}</span>
{/snippet}

<div class="page-shell">
	<div class="atmosphere" aria-hidden="true">
		<div class="haze-layer" bind:this={hazeLayer}>
			{#each hazeClasses as name}<i class={`haze ${name}`}></i>{/each}
		</div>

		<div class="streak-layer" bind:this={streakLayer}>
			{#each streakClasses as name}<i class={`streak ${name}`}></i>{/each}
		</div>

		<div class="cursor-glow" bind:this={cursorGlow}></div>

		<div class="star-layer" bind:this={starLayer}>
			{#each stars as star}
				<span
					class={`star ${star[0]}`}
					style={`--x: ${star[1]}; --y: ${star[2]}; --s: ${star[3]}; --o: ${star[4]}`}
				>{star[5]}</span>
			{/each}
		</div>

		<div class="grain"></div>
	</div>

	<nav class="topbar" aria-label="Primary navigation">
		<a class="wordmark" href="#top">FIREENTITY</a>
		<div class="nav-links">
			<a href="#music">MUSIC</a>
			<a href="#projects">PROJECTS</a>
			<a href="#about">ABOUT</a>
		</div>
		<div class="nav-decor" aria-hidden="true">
			<span class="nav-star">✦</span>
			<span class="menu"><i></i><i></i></span>
		</div>
	</nav>

	<main id="top" class="composition" bind:this={composition}>
		<section class="hero" aria-labelledby="hero-title">
			<h1 id="hero-title">FIREENTITY</h1>
			<div class="hero-copy">
				<p class="disciplines"> music artist <b>/</b> gamedev <b>/</b> programmer </p>
				<p class="intro">
				</p>
			</div>
			<a class="scroll" href="#music">SCROLL <i></i></a>
		</section>

		<section class="release module" aria-labelledby="release-title">
			<div class="release-copy">
				<p class="kicker">LATEST RELEASE <span>✦</span></p>
				<div>
					<h2 id="release-title"><a href="#music">FARAWAY</a></h2>
					<p>A JOURNEY THROUGH LIGHT<br />AND DISTANCE.</p>
				</div>
				<a class="dark-button" href="#music">LISTEN NOW <span>▶</span></a>
			</div>

			<div class="album" role="img" aria-label="Placeholder album artwork for Faraway">
				{@render imagePlaceholder('ALBUM ART')}
			</div>

			<div class="player">
				<button aria-label="Play Faraway">▶</button>
				<div><i></i></div>
				<span>01:26 / 03:58</span>
			</div>
		</section>

		<section id="music" class="songs module" aria-labelledby="songs-title">
			<header class="module-header">
				<h2 id="songs-title">SONGS <span>✦</span></h2>
				<a href="#music">VIEW ALL ↗</a>
			</header>

			<div class="song-list">
				{#each songs as song, index}
					<button class:active={index === 0} class="song-row">
						<small>{song[0]}</small>
						<strong>{song[1]}</strong>
						{#if index === 0}<span class="wave" aria-hidden="true">▂▅▇▃▆█▄▂▆▃▅▂</span>{/if}
						<small>{song[2]}</small>
						<span>↗</span>
					</button>
				{/each}
			</div>

			<footer class="streaming">
				<span>STREAMING EVERYWHERE</span>
				<div aria-label="Streaming platforms">
					<a href="#spotify" aria-label="Spotify">SP</a>
					<a href="#apple" aria-label="Apple Music">♪</a>
					<a href="#youtube" aria-label="YouTube">YT</a>
					<a href="#soundcloud" aria-label="SoundCloud">SC</a>
				</div>
			</footer>
		</section>

		<section id="projects" class="projects module" aria-labelledby="projects-title">
			<header class="module-header">
				<h2 id="projects-title">PROJECTS <span>✦</span></h2>
				<a href="#projects">EXPLORE ALL ↗</a>
			</header>

			<div class="project-list">
				{#each projects as project}
					<article class="project-card">
						<div
							class={`project-art ${project.theme}`}
							role="img"
							aria-label={`${project.title} image placeholder`}
						>
							{@render imagePlaceholder(`IMAGE / ${project.index}`)}
						</div>

						<div class="project-copy">
							<div>
								<small>{project.meta}</small>
								<h3><a href={`#${project.theme}`}>{project.title}</a></h3>
								<p>{project.description}</p>
							</div>
							<a href={`#${project.theme}`}>VIEW PROJECT <span>→</span></a>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="about" class="about module" aria-labelledby="about-title">
			<div class="about-copy">
				<header class="module-header"><h2 id="about-title">ABOUT <span>✦</span></h2></header>
				<p class="about-lede">Music producer, developer,<br />and creator.</p>
				<p class="about-note">Currently making new worlds and sounds.</p>
				<div class="about-actions">
					<span class="status"><i></i> ONLINE</span>
					<a href="#about">MORE ABOUT ME →</a>
				</div>
			</div>
			<div class="about-mark" aria-hidden="true"><i></i><span>✦</span></div>
		</section>

		<footer class="connect module">
			<div>
				<span>LET'S CONNECT</span>
				<nav aria-label="Social links">
					<a href="mailto:hello@fireentity.space" aria-label="Email">@</a>
					<a href="#youtube" aria-label="YouTube">YT</a>
					<a href="#github" aria-label="GitHub">GH</a>
					<a href="#discord" aria-label="Discord">DC</a>
				</nav>
			</div>
			<p>✦ THANKS FOR VISITING.</p>
		</footer>
	</main>
</div>
