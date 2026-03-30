<script lang="ts">
	import Block from '$lib/Block.svelte';
	import Song from '$lib/Song.svelte';
	import { Client, Databases } from 'appwrite';
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

	const links = [
		{ label: 'gh', href: 'https://github.com/fireentity1', display: 'fireentity1' },
		{ label: 'em', href: 'mailto:hi@fireentity.space', display: 'hi@fireentity.space' }
	];

	databases.listDocuments(DATABASE_ID, 'songs').then((res) => {
		songs = res.documents.map((d) => ({
			title: d.title,
			info: d.info,
			album: d.album,
			duration: d.duration,
			href: d.link,
		}));
	});

	databases.listDocuments(DATABASE_ID, 'projects').then((res) => {
		projects = res.documents.map((d) => ({
			name: d.name,
			stack: d.stack,
			progress: d.progress,
			status: d.status,
			github: d.repository || undefined,
			url: d.play || undefined,
		}));
	});

	var status = {
		'currently': 'fireentity.space',
		'focus': 'school',
		'status': 'locked in',
		'status_active': false
	}

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
		</Block>

		<Block title="links" active={focusedPanel === 3}>
			<ul class="links">
				{#each links as link, i}
					<li class:item-active={focusedPanel === 3 && focusedItem === i}>
						<span class="lk-label">{link.label}</span>
						<span class="lk-arr">→</span>
						<a class="lk-val" class:lk-link={link.href.startsWith('mailto:')} href={link.href}>{link.display}</a>
					</li>
				{/each}
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
						active={focusedPanel === 4 && focusedItem === i}
					/>
				{/each}
			</div>
		</Block>
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
