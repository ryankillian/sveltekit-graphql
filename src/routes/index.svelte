<script context="module" lang="ts">
	import { KQL_GetContinents, KQL_GetCountries } from '$lib/graphql/_kitql/graphqlStores';
	import Continents from '$lib/components/Continents.svelte';

	export async function load({ params, url, fetch, session, context }) {
		await KQL_GetContinents.query({ fetch });

		const code = url.searchParams.get('focus');
		if (code) {
			await KQL_GetCountries.query({
				fetch,
				variables: {
					code
				}
			});
		}

		console.log('focus: ', url.searchParams.get('focus'));
		return {};
	}
</script>

<Continents />
