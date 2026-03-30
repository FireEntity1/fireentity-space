<script lang="ts">
	import Block from '$lib/Block.svelte';
	import Song from '$lib/Song.svelte';
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
	}

	var songs: SongEntry[] = [
		{ title: 'Unbound', info: 'Ft. Kumi Hitsune | First lyrical song! ', album: 'Single', duration: '3:45', href: 'https://example.com' },
		{ title: 'Lumenreach', info: 'Fast paced EDM!',album:'Single', duration: '4:12' },
		{ title: 'Starfall', info: 'First published song! ', album: 'Single', duration: '2:58' }
	];

	var projects: Project[] = [
		{ name: 'LIGHT//BOUND', stack: 'Godot · Garageband', status: 'working', progress: 7 },
		{ name: 'fireentity.space', stack: 'Svelte · Tailwind', status: 'working', progress: 4 }
	];

	var status = {
		'currently': 'fireentity.space',
		'focus': 'school',
		'status': 'locked in',
		'status_active': false
	}

	const PANEL_COUNT = 5;
	let focusedPanel = $state(-1);

	function handleKeydown(e: KeyboardEvent) {
		const el = e.target as HTMLElement;
		if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable) return;

		let next = focusedPanel;
		if (e.key === 'j' || e.key === 'ArrowDown') {
			e.preventDefault();
			next = (focusedPanel + 1) % PANEL_COUNT;
		} else if (e.key === 'k' || e.key === 'ArrowUp') {
			e.preventDefault();
			next = (focusedPanel - 1 + PANEL_COUNT) % PANEL_COUNT;
		} else if (e.key === 'Escape') {
			next = -1;
		} else {
			return;
		}

		focusedPanel = next;

		if (next >= 0) {
			requestAnimationFrame(() => {
				document.querySelectorAll<HTMLElement>('.panel')[next]?.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest'
				});
			});
		}
	}
</script>

<svelte:head>
	<title>fireentity.space</title>
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<div class="terminal">
	<header class="topbar">
		<h1 class="brand">fireentity.space</h1>
		<div class="topbar-right">
			<span class="indicator" aria-label="online">●</span>
			<span class="tagline">// online</span>
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
			<div class="proj-head row-cols">
				<span>name</span>
				<span>stack</span>
				<span>progress</span>
				<span>status</span>
			</div>
			{#each projects as proj (proj.name)}
				<div class="proj-row row-cols">
					<span class="proj-name">{proj.name}</span>
					<span class="proj-stack">{proj.stack}</span>
					<span class="proj-bar">{'█'.repeat(proj.progress)}{'░'.repeat(10 - proj.progress)}</span>
					<span class="proj-status">{proj.status}</span>
				</div>
			{/each}
		</Block>

		<Block title="links" active={focusedPanel === 3}>
			<ul class="links">
				<li>
					<span class="lk-label">gh</span>
					<span class="lk-arr">→</span>
					<a class="lk-val" href="https://github.com/fireentity1">github.com/fireentity1</a>
				</li>
				<li>
					<span class="lk-label">em</span>
					<span class="lk-arr">→</span>
					<a href="mailto:hi@fireentity.space" class="lk-val lk-link">hi@fireentity.space</a>
				</li>
			</ul>
		</Block>

		<Block title="my songs" colspan={3} active={focusedPanel === 4}>
			<div class="songs-wrap">
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
					/>
				{/each}
			</div>
		</Block>
	</div>


	<footer class="statusbar">
		<div class="hints">
			<span class="hint"><kbd>j</kbd><kbd>k</kbd> navigate</span>
			<span class="sep">/</span>
			<span class="hint"><kbd>esc</kbd> reset</span>
		</div>
		<span class="mode">{focusedPanel >= 0 ? 'FOCUSED' : 'MOUSE'}</span>
	</footer>
</div>
