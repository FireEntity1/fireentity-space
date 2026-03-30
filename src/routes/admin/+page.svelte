<script lang="ts">
	import { Client, Account, Databases, type Models } from 'appwrite';

	type Song = Models.Document & {
		title: string;
		link: string;
		album: string;
		duration: string;
		info: string;
	};

	const DATABASE_ID = '69cafd7c0030de77f390';
	const COLLECTION_ID = 'songs';

	const client = new Client()
		.setEndpoint('https://sfo.cloud.appwrite.io/v1')
		.setProject('69caeb7f0000bfb3a5c5');

	const account = new Account(client);
	const databases = new Databases(client);

	let email = $state('');
	let password = $state('');
	let error = $state('');
	let user = $state<Record<string, unknown> | null>(null);
	let loading = $state(false);
	let documents = $state<Song[]>([]);
	let dbError = $state('');
	let updating = $state<Record<string, boolean>>({});
	let updateError = $state<Record<string, string>>({});

	async function fetchData() {
		dbError = '';
		try {
			const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
			documents = res.documents as unknown as Song[];
		} catch (e: unknown) {
			dbError = e instanceof Error ? e.message : 'Failed to fetch data';
		}
	}

	async function updateSong(doc: Song) {
		updating[doc.$id] = true;
		updateError[doc.$id] = '';
		try {
			await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
				title: doc.title,
				link: doc.link,
				album: doc.album,
				duration: doc.duration,
				info: doc.info,
			});
		} catch (e: unknown) {
			updateError[doc.$id] = e instanceof Error ? e.message : 'Update failed';
		} finally {
			updating[doc.$id] = false;
		}
	}

	async function login() {
		error = '';
		loading = true;
		try {
			await account.createEmailPasswordSession(email, password);
			user = await account.get();
			await fetchData();
		} catch (e: unknown) {
			error = e instanceof Error ? e.message : 'Login failed';
		} finally {
			loading = false;
		}
	}

	async function logout() {
		await account.deleteSession('current');
		user = null;
		documents = [];
	}

	account.get()
		.then(async (u) => { user = u; await fetchData(); })
		.catch(() => {});
</script>

<div class="flex h-screen items-center justify-center">
	{#if user}
		<div class="text-white">
			<p>Logged in as {user.email}</p>
			<button class="mt-2 underline" onclick={logout}>Logout</button>

			<div class="mt-6">
				{#if dbError}
					<p class="text-red-400">{dbError}</p>
				{:else if documents.length === 0}
					<p class="text-white/50">No documents found.</p>
				{:else}
					{#each documents as doc}
						<div class="mt-2 border border-white/20 p-3 flex flex-col gap-2">
							<input class="bg-transparent border-b border-white/30 outline-none" bind:value={doc.title} placeholder="Title" />
							<input class="bg-transparent border-b border-white/30 outline-none" bind:value={doc.album} placeholder="Album" />
							<input class="bg-transparent border-b border-white/30 outline-none" bind:value={doc.duration} placeholder="Duration" />
							<input class="bg-transparent border-b border-white/30 outline-none" bind:value={doc.info} placeholder="Info" />
							<input class="bg-transparent border-b border-white/30 outline-none" bind:value={doc.link} placeholder="Link" />
							<button
								class="border border-white/50 px-3 py-1 text-sm hover:bg-white hover:text-black disabled:opacity-40"
								onclick={() => updateSong(doc)}
								disabled={updating[doc.$id]}
							>
								{updating[doc.$id] ? 'Saving...' : 'Update'}
							</button>
							{#if updateError[doc.$id]}<p class="text-red-400 text-sm">{updateError[doc.$id]}</p>{/if}
						</div>
					{/each}
				{/if}
			</div>
		</div>
	{:else}
		<form
			class="flex flex-col gap-3 text-white"
			onsubmit={(e) => { e.preventDefault(); login(); }}
		>
			<input
				class="border border-white bg-transparent px-3 py-2 placeholder-white/50 outline-none"
				type="email"
				bind:value={email}
				placeholder="Email"
				required
			/>
			<input
				class="border border-white bg-transparent px-3 py-2 placeholder-white/50 outline-none"
				type="password"
				bind:value={password}
				placeholder="Password"
				required
			/>
			<button class="border border-white py-2 hover:bg-white hover:text-black" type="submit" disabled={loading}>
				{loading ? 'Logging in...' : 'Login'}
			</button>
			{#if error}<p class="text-red-400">{error}</p>{/if}
		</form>
	{/if}
</div>
