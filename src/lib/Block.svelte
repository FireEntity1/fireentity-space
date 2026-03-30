<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children = undefined,
		title = undefined,
		colspan = 1,
		rowspan = 1,
		active = false,
		class: className = ''
	}: {
		children?: Snippet;
		title?: string;
		colspan?: number;
		rowspan?: number;
		active?: boolean;
		class?: string;
	} = $props();
</script>

<section
	class="panel {className}"
	class:active
	style="--colspan: {colspan}; --rowspan: {rowspan};"
>
	{#if title}
		<div class="panel-title" aria-hidden="true">{active ? '> ' : ''}{title}</div>
	{/if}
	<div class="panel-body">
		{#if children}{@render children()}{/if}
	</div>
</section>

<style>
	/* Retro broadcast palette — cycling per position */
	.panel { --c: 232, 33, 42; }
	.panel:nth-of-type(4n + 2) { --c: 66, 133, 244; }
	.panel:nth-of-type(4n + 3) { --c: 251, 188, 5; }
	.panel:nth-of-type(4n + 4) { --c: 52, 168, 83; }

	.panel {
		position: relative;
		grid-column: span var(--colspan, 1);
		grid-row: span var(--rowspan, 1);
		border: 1px solid rgba(var(--c), 0.28);
		padding: 1.25rem 1rem 1rem;
		background: rgba(var(--c), 0.012);
		transition:
			border-color 0.2s,
			background 0.2s,
			box-shadow 0.2s;
	}

	.panel:hover,
	.panel.active {
		border-color: rgba(var(--c), 0.6);
		background: rgba(var(--c), 0.035);
		box-shadow:
			0 0 20px rgba(var(--c), 0.1),
			inset 0 0 30px rgba(var(--c), 0.02);
	}

	/* Title sits on the top border — background masks the border behind it */
	.panel-title {
		position: absolute;
		top: -0.62em;
		left: 0.75rem;
		padding: 0 0.35rem;
		background: #070608;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: rgba(var(--c), 0.9);
		text-shadow: 0 0 8px rgba(var(--c), 0.3);
		user-select: none;
	}

	.panel-title::before {
		content: '[ ';
		color: rgba(var(--c), 0.38);
	}

	.panel-title::after {
		content: ' ]';
		color: rgba(var(--c), 0.38);
	}

	.panel-body {
		font-family: var(--font-mono);
		font-size: 0.86rem;
		line-height: 1.8;
		color: rgba(216, 208, 196, 0.78);
		min-height: 3.5rem;
	}

	@media (max-width: 768px) {
		.panel {
			grid-column: 1 / -1;
			grid-row: span 1;
		}
	}
</style>
