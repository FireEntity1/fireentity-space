<script lang="ts">
	let {
		title,
		info,
		album = undefined,
		duration = undefined,
		href = undefined,
		index = 1,
		active = false
	}: {
		title: string;
		info: string;
		album?: string;
		duration?: string;
		href?: string;
		index?: number;
		active?: boolean;
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
	<a class="song-row" class:active {href} target="_blank" rel="noopener noreferrer">
		{@render row()}
	</a>
{:else}
	<div class="song-row" class:active>
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
		border-left: 2px solid transparent;
		transition: background 0.12s, border-left-color 0.12s;
		cursor: default;
	}

	a.song-row {
		cursor: pointer;
	}

	.song-row:hover,
	.song-row.active {
		background: rgba(232, 33, 42, 0.065);
		border-left-color: rgba(232, 33, 42, 0.55);
	}

	.song-row:hover .cur,
	.song-row.active .cur {
		opacity: 1;
	}

	.song-row:hover .title,
	.song-row.active .title {
		color: #d8d0c4;
		text-shadow: 0 0 10px rgba(232, 33, 42, 0.35);
	}

	.song-row.active {
		outline: 1px solid rgba(232, 33, 42, 0.25);
		outline-offset: -1px;
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
		color: rgba(216, 208, 196, 0.95);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 0.86rem;
		text-shadow: 0 0 8px rgba(216, 208, 196, 0.18);
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
