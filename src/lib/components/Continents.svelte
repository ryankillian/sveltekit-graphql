<script lang="ts">
	import { goto } from '$app/navigation';

	import { KQL_GetCountries, KQL_GetContinents } from '$lib/graphql/_kitql/graphqlStores';

	// import { onMount } from 'svelte';

	// onMount(async () => {
	// 	await KQL_GetContinents.query();
	// });

	async function grab() {
		await KQL_GetContinents.query();
	}
	async function grabFresh() {
		await KQL_GetContinents.query({ settings: { cacheMs: 0 } });
	}

	async function getCountries(code: string) {
		goto(`/?focus=${code}`);
		// await KQL_GetCountries.query({
		// 	variables: {
		// 		code
		// 	}
		// });
	}
</script>

<div class="container">
	{$KQL_GetContinents.from}
	{$KQL_GetContinents.status}
	{new Date($KQL_GetContinents.date).toISOString()}

	<button on:click={grab}>Fetch</button>
	<button on:click={grabFresh}>Fetch Fresh</button>
	<ul>
		{#each $KQL_GetContinents.data.continents as continent}
			<li>
				{continent.name}
				<button on:click={() => getCountries(continent.code)}>Countries</button>
			</li>
		{/each}
	</ul>
	<h3>{$KQL_GetCountries?.data?.continent?.name}</h3>
	<ul>
		{#each $KQL_GetCountries?.data?.continent?.countries || [] as country}
			<li>
				{country.name}
			</li>
		{/each}
	</ul>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}
</style>
