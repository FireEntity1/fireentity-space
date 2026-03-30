<script lang="ts">
	import { Client, Account, Databases, ID, type Models } from 'appwrite';

	type Song = Models.Document & {
		title: string;
		link: string;
		album: string;
		duration: string;
		info: string;
	};

	type Project = Models.Document & {
		name: string;
		repository: string;
		stack: string;
		progress: number;
		play: string;
		status: string;
	};

	const DATABASE_ID = '69cafd7c0030de77f390';
	const SONGS_COLLECTION = 'songs';
	const PROJECTS_COLLECTION = 'projects';

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

	let songs = $state<Song[]>([]);
	let projects = $state<Project[]>([]);
	let dbError = $state('');
	let updating = $state<Record<string, boolean>>({});
	let updateError = $state<Record<string, string>>({});
	let tab = $state<'songs' | 'projects'>('songs');

	async function fetchData() {
		dbError = '';
		try {
			const [songsRes, projectsRes] = await Promise.all([
				databases.listDocuments(DATABASE_ID, SONGS_COLLECTION),
				databases.listDocuments(DATABASE_ID, PROJECTS_COLLECTION),
			]);
			songs = songsRes.documents as unknown as Song[];
			projects = projectsRes.documents as unknown as Project[];
		} catch (e: unknown) {
			dbError = e instanceof Error ? e.message : 'Failed to fetch data';
		}
	}

	async function updateDoc(collectionId: string, doc: Models.Document, data: Record<string, unknown>) {
		updating[doc.$id] = true;
		updateError[doc.$id] = '';
		try {
			await databases.updateDocument(DATABASE_ID, collectionId, doc.$id, data);
		} catch (e: unknown) {
			updateError[doc.$id] = e instanceof Error ? e.message : 'Update failed';
		} finally {
			updating[doc.$id] = false;
		}
	}

	async function deleteDoc(collectionId: string, id: string) {
		try {
			await databases.deleteDocument(DATABASE_ID, collectionId, id);
			if (collectionId === SONGS_COLLECTION) {
				songs = songs.filter((s) => s.$id !== id);
			} else {
				projects = projects.filter((p) => p.$id !== id);
			}
		} catch (e: unknown) {
			updateError[id] = e instanceof Error ? e.message : 'Delete failed';
		}
	}

	async function newSong() {
		const doc = await databases.createDocument(DATABASE_ID, SONGS_COLLECTION, ID.unique(), {
			title: '', link: '', album: '', duration: '', info: '',
		});
		songs = [...songs, doc as unknown as Song];
	}

	async function newProject() {
		const doc = await databases.createDocument(DATABASE_ID, PROJECTS_COLLECTION, ID.unique(), {
			name: '', repository: '', stack: '', progress: 0, play: '', status: '',
		});
		projects = [...projects, doc as unknown as Project];
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
		songs = [];
		projects = [];
	}

	account.get()
		.then(async (u) => { user = u; await fetchData(); })
		.catch(() => {});
</script>

<div class="flex h-screen items-center justify-center">
	{#if user}
	<a href="/"><kbd style="font-size: 4em;">←</kbd></a>
		<div class="text-white w-full max-w-xl px-4">
			<div class="flex justify-between items-center">
				<p>{user.email}</p>
				<button class="underline text-sm" onclick={logout}>Logout</button>
			</div>

			<div class="mt-4 flex gap-4 border-b border-white/20 pb-2">
				<button class={tab === 'songs' ? 'underline' : 'text-white/50'} onclick={() => tab = 'songs'}>Songs</button>
				<button class={tab === 'projects' ? 'underline' : 'text-white/50'} onclick={() => tab = 'projects'}>Projects</button>
			</div>

			<div class="mt-4">
				{#if dbError}
					<p class="text-red-400">{dbError}</p>
				{:else if tab === 'songs'}
					<button class="mb-3 border border-white/50 px-3 py-1 text-sm hover:bg-white hover:text-black" onclick={newSong}>+ New Song</button>
					{#if songs.length === 0}
						<p class="text-white/50">No songs found.</p>
					{:else}
						{#each songs as doc}
							<div class="mt-2 border border-white/20 p-3 flex flex-col gap-2">
								<input class="bg-transparent border-b border-white/30 outline-none" bind:value={doc.title} placeholder="Title" />
								<input class="bg-transparent border-b border-white/30 outline-none" bind:value={doc.album} placeholder="Album" />
								<input class="bg-transparent border-b border-white/30 outline-none" bind:value={doc.duration} placeholder="Duration" />
								<input class="bg-transparent border-b border-white/30 outline-none" bind:value={doc.info} placeholder="Info" />
								<input class="bg-transparent border-b border-white/30 outline-none" bind:value={doc.link} placeholder="Link" />
								<div class="flex gap-2">
									<button
										class="flex-1 border border-white/50 px-3 py-1 text-sm hover:bg-white hover:text-black disabled:opacity-40"
										onclick={() => updateDoc(SONGS_COLLECTION, doc, { title: doc.title, link: doc.link, album: doc.album, duration: doc.duration, info: doc.info })}
										disabled={updating[doc.$id]}
									>{updating[doc.$id] ? 'Saving...' : 'Update'}</button>
									<button
										class="border border-red-500/50 px-3 py-1 text-sm text-red-400 hover:bg-red-500 hover:text-white"
										onclick={() => deleteDoc(SONGS_COLLECTION, doc.$id)}
									>Delete</button>
								</div>
								{#if updateError[doc.$id]}<p class="text-red-400 text-sm">{updateError[doc.$id]}</p>{/if}
							</div>
						{/each}
					{/if}
				{:else}
					<button class="mb-3 border border-white/50 px-3 py-1 text-sm hover:bg-white hover:text-black" onclick={newProject}>+ New Project</button>
					{#if projects.length === 0}
						<p class="text-white/50">No projects found.</p>
					{:else}
						{#each projects as doc}
							<div class="mt-2 border border-white/20 p-3 flex flex-col gap-2">
								<input class="bg-transparent border-b border-white/30 outline-none" bind:value={doc.name} placeholder="Name" />
								<input class="bg-transparent border-b border-white/30 outline-none" bind:value={doc.repository} placeholder="Repository" />
								<input class="bg-transparent border-b border-white/30 outline-none" bind:value={doc.stack} placeholder="Stack" />
								<input class="bg-transparent border-b border-white/30 outline-none" type="number" min="0" max="9" bind:value={doc.progress} placeholder="Progress (0-9)" />
								<input class="bg-transparent border-b border-white/30 outline-none" bind:value={doc.play} placeholder="Play" />
								<input class="bg-transparent border-b border-white/30 outline-none" bind:value={doc.status} placeholder="Status" />
								<div class="flex gap-2">
									<button
										class="flex-1 border border-white/50 px-3 py-1 text-sm hover:bg-white hover:text-black disabled:opacity-40"
										onclick={() => updateDoc(PROJECTS_COLLECTION, doc, { name: doc.name, repository: doc.repository, stack: doc.stack, progress: doc.progress, play: doc.play, status: doc.status })}
										disabled={updating[doc.$id]}
									>{updating[doc.$id] ? 'Saving...' : 'Update'}</button>
									<button
										class="border border-red-500/50 px-3 py-1 text-sm text-red-400 hover:bg-red-500 hover:text-white"
										onclick={() => deleteDoc(PROJECTS_COLLECTION, doc.$id)}
									>Delete</button>
								</div>
								{#if updateError[doc.$id]}<p class="text-red-400 text-sm">{updateError[doc.$id]}</p>{/if}
							</div>
						{/each}
					{/if}
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
