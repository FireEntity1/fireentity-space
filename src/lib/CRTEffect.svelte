<script lang="ts">
	let { children } = $props();
</script>

<div class="crt-screen">
	<div class="crt-content">
		{@render children()}
	</div>
	<div class="crt-scanlines" aria-hidden="true"></div>
	<div class="crt-vignette" aria-hidden="true"></div>
</div>

<style>
	.crt-screen {
		position: relative;
		width: 100%;
		min-height: 100dvh;
		animation: crt-aberration 20s infinite;
	}

	/* Scanlines — visible CRT phosphor lines */
	.crt-scanlines {
		position: fixed;
		inset: 0;
		background: repeating-linear-gradient(
			to bottom,
			transparent 0px,
			transparent 2px,
			rgba(0, 0, 0, 0.09) 2px,
			rgba(0, 0, 0, 0.09) 4px
		);
		pointer-events: none;
		z-index: 9998;
	}

	/* Vignette overlay */
	.crt-vignette {
		position: fixed;
		inset: 0;
		background: radial-gradient(ellipse at center, transparent 58%, rgba(0, 0, 0, 0.55) 100%);
		pointer-events: none;
		z-index: 9999;
	}

	/* Rare, gentle chromatic drift — not a glitch, more like a lens breath */
	@keyframes crt-aberration {
		0%,
		90%,
		100% {
			filter: none;
		}
		93% {
			filter: drop-shadow(1px 0 0 rgba(240, 100, 140, 0.35))
				drop-shadow(-1px 0 0 rgba(80, 200, 230, 0.35));
		}
		96% {
			filter: none;
		}
	}
</style>
