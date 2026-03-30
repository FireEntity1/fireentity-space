<script lang="ts">
	let {
		title,
		info,
		album = undefined,
		duration = undefined,
		href = undefined,
		index = 1
	}: {
		title: string;
		info: string;
		album?: string;
		duration?: string;
		href?: string;
		index?: number;
	} = $props();

	let num = $derived(String(index).padStart(2, '0'));
</script>

{#snippet row()}
	<span class="cur" aria-hidden="true">&gt;</span>
	<span class="num">{num}</span>
	<span class="title">{title}</span>
	<span class="info"
		>{info}{#if album}<span class="album"> · {album}</span>{/if}</span
	>
	{#if duration}<span class="dur">{duration}</span>{/if}
{/snippet}

{#if href}
	<a class="song-row" {href} target="_blank" rel="noopener noreferrer">
		{@render row()}
	</a>
{:else}
	<div class="song-row">
		{@render row()}
	</div>
{/if}

<style>
	.song-row {
		display: grid;
		grid-template-columns: 0.8rem 2rem 1fr 1fr 3.5rem;
		align-items: center;
		gap: 0.65rem;
		padding: 0.38rem 0.5rem;
		text-decoration: none;
		border-bottom: 1px solid rgba(255, 200, 50, 0.055);
		transition: background 0.1s;
		cursor: default;
	}

	a.song-row {
		cursor: pointer;
	}

	.song-row:hover {
		background: rgba(232, 33, 42, 0.065);
	}

	.song-row:hover .cur {
		opacity: 1;
	}

	.song-row:hover .title {
		color: #d8d0c4;
		text-shadow: 0 0 10px rgba(232, 33, 42, 0.35);
	}

	.cur {
		font-size: 0.7rem;
		opacity: 0;
		color: rgba(232, 33, 42, 0.85);
		transition: opacity 0.1s;
		line-height: 1;
	}

	.num {
		color: rgba(251, 188, 5, 0.28);
		font-size: 0.68rem;
		text-align: right;
		font-variant-numeric: tabular-nums;
	}

	.title {
		color: rgba(216, 208, 196, 0.88);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 0.86rem;
		transition: color 0.1s, text-shadow 0.1s;
	}

	.info {
		color: rgba(216, 208, 196, 0.38);
		font-size: 0.78rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.album {
		color: rgba(251, 188, 5, 0.36);
	}

	.dur {
		font-variant-numeric: tabular-nums;
		color: rgba(251, 188, 5, 0.38);
		font-size: 0.75rem;
		text-align: right;
		white-space: nowrap;
	}
</style>
