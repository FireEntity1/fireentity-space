import { e as escape_html, a2 as attr_class, a7 as clsx, a5 as ensure_array_like, a as attr } from "../../../chunks/index.js";
import { Client, Account, Databases } from "appwrite";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const DATABASE_ID = "69cafd7c0030de77f390";
    const SONGS_COLLECTION = "songs";
    const PROJECTS_COLLECTION = "projects";
    const client = new Client().setEndpoint("https://sfo.cloud.appwrite.io/v1").setProject("69caeb7f0000bfb3a5c5");
    const account = new Account(client);
    const databases = new Databases(client);
    let email = "";
    let password = "";
    let user = null;
    let loading = false;
    let songs = [];
    let projects = [];
    let dbError = "";
    let updating = {};
    let updateError = {};
    async function fetchData() {
      dbError = "";
      try {
        const [songsRes, projectsRes] = await Promise.all([
          databases.listDocuments(DATABASE_ID, SONGS_COLLECTION),
          databases.listDocuments(DATABASE_ID, PROJECTS_COLLECTION)
        ]);
        songs = songsRes.documents;
        projects = projectsRes.documents;
      } catch (e) {
        dbError = e instanceof Error ? e.message : "Failed to fetch data";
      }
    }
    account.get().then(async (u) => {
      user = u;
      await fetchData();
    }).catch(() => {
    });
    $$renderer2.push(`<div class="flex h-screen items-center justify-center">`);
    if (user) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<a href="/"><kbd style="font-size: 4em;">←</kbd></a> <div class="text-white w-full max-w-xl px-4"><div class="flex justify-between items-center"><p>${escape_html(user.email)}</p> <button class="underline text-sm">Logout</button></div> <div class="mt-4 flex gap-4 border-b border-white/20 pb-2"><button${attr_class(clsx("underline"))}>Songs</button> <button${attr_class(clsx("text-white/50"))}>Projects</button></div> <div class="mt-4">`);
      if (dbError) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<p class="text-red-400">${escape_html(dbError)}</p>`);
      } else {
        $$renderer2.push("<!--[1-->");
        $$renderer2.push(`<button class="mb-3 border border-white/50 px-3 py-1 text-sm hover:bg-white hover:text-black">+ New Song</button> `);
        if (songs.length === 0) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<p class="text-white/50">No songs found.</p>`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<!--[-->`);
          const each_array = ensure_array_like(songs);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let doc = each_array[$$index];
            $$renderer2.push(`<div class="mt-2 border border-white/20 p-3 flex flex-col gap-2"><input class="bg-transparent border-b border-white/30 outline-none"${attr("value", doc.title)} placeholder="Title"/> <input class="bg-transparent border-b border-white/30 outline-none"${attr("value", doc.album)} placeholder="Album"/> <input class="bg-transparent border-b border-white/30 outline-none"${attr("value", doc.duration)} placeholder="Duration"/> <input class="bg-transparent border-b border-white/30 outline-none"${attr("value", doc.info)} placeholder="Info"/> <input class="bg-transparent border-b border-white/30 outline-none"${attr("value", doc.link)} placeholder="Link"/> <div class="flex gap-2"><button class="flex-1 border border-white/50 px-3 py-1 text-sm hover:bg-white hover:text-black disabled:opacity-40"${attr("disabled", updating[doc.$id], true)}>${escape_html(updating[doc.$id] ? "Saving..." : "Update")}</button> <button class="border border-red-500/50 px-3 py-1 text-sm text-red-400 hover:bg-red-500 hover:text-white">Delete</button></div> `);
            if (updateError[doc.$id]) {
              $$renderer2.push("<!--[0-->");
              $$renderer2.push(`<p class="text-red-400 text-sm">${escape_html(updateError[doc.$id])}</p>`);
            } else {
              $$renderer2.push("<!--[-1-->");
            }
            $$renderer2.push(`<!--]--></div>`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<form class="flex flex-col gap-3 text-white"><input class="border border-white bg-transparent px-3 py-2 placeholder-white/50 outline-none" type="email"${attr("value", email)} placeholder="Email" required=""/> <input class="border border-white bg-transparent px-3 py-2 placeholder-white/50 outline-none" type="password"${attr("value", password)} placeholder="Password" required=""/> <button class="border border-white py-2 hover:bg-white hover:text-black" type="submit"${attr("disabled", loading, true)}>${escape_html("Login")}</button> `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></form>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
