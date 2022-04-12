import { KitQLClient } from '@kitql/client';

export const kitQLClient = new KitQLClient({
	url: 'https://countries.trevorblades.com/graphql',
	cacheMs: 1000 * 60 * 3,
	headersContentType: 'application/json',
	logType: ['client', 'server', 'operationAndvariables']
});
