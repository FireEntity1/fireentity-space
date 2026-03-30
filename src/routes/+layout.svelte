<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import CRTEffect from '$lib/CRTEffect.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<CRTEffect>
	{@render children()}
</CRTEffect>
