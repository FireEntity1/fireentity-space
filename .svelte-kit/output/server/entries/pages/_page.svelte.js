import { a2 as attr_class, a3 as attr_style, e as escape_html, a4 as stringify, a as attr, a1 as derived, h as head, a5 as ensure_array_like, a6 as element, a7 as clsx } from "../../chunks/index.js";
import { Client, Databases } from "appwrite";
function Block($$renderer, $$props) {
  let {
    children = void 0,
    title = void 0,
    colspan = 1,
    rowspan = 1,
    active = false,
    class: className = ""
  } = $$props;
  $$renderer.push(`<section${attr_class(`panel ${stringify(className)}`, "svelte-1tz1ob4", { "active": active })}${attr_style(`--colspan: ${stringify(colspan)}; --rowspan: ${stringify(rowspan)};`)}>`);
  if (title) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<div class="panel-title svelte-1tz1ob4" aria-hidden="true">${escape_html(active ? "> " : "")}${escape_html(title)}</div>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--> <div class="panel-body svelte-1tz1ob4">`);
  if (children) {
    $$renderer.push("<!--[0-->");
    children($$renderer);
    $$renderer.push(`<!---->`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></div></section>`);
}
function Song($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      title,
      info,
      album = void 0,
      duration = void 0,
      href = void 0,
      index = 1,
      active = false
    } = $$props;
    let num = derived(() => String(index).padStart(2, "0"));
    function row($$renderer3) {
      $$renderer3.push(`<span class="cur svelte-1s9vn66" aria-hidden="true">></span> <span class="num svelte-1s9vn66">${escape_html(num())}</span> <span class="title svelte-1s9vn66">${escape_html(title)}</span> <span class="info svelte-1s9vn66">${escape_html(info)}`);
      if (album) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<span class="album svelte-1s9vn66">· ${escape_html(album)}</span>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--></span> `);
      if (duration) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<span class="dur svelte-1s9vn66">${escape_html(duration)}</span>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]-->`);
    }
    if (href) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<a${attr_class("song-row svelte-1s9vn66", void 0, { "active": active })}${attr("href", href)} target="_blank" rel="noopener noreferrer">`);
      row($$renderer2);
      $$renderer2.push(`<!----></a>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div${attr_class("song-row svelte-1s9vn66", void 0, { "active": active })}>`);
      row($$renderer2);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const client = new Client().setEndpoint("https://sfo.cloud.appwrite.io/v1").setProject("69caeb7f0000bfb3a5c5");
    const databases = new Databases(client);
    const DATABASE_ID = "69cafd7c0030de77f390";
    let songs = [];
    let projects = [];
    let online = true;
    const links = [
      {
        label: "github",
        href: "https://github.com/fireentity1",
        display: "fireentity1"
      },
      {
        label: "email",
        href: "mailto:hi@fireentity.space",
        display: "hi@fireentity.space"
      },
      {
        label: "itch",
        href: "https://fire-entity.itch.io/",
        display: "fire-entity"
      },
      {
        label: "beatleader",
        href: "https://beatleader.com/u/fireentity",
        display: "fireentity"
      }
    ];
    Promise.all([
      databases.listDocuments(DATABASE_ID, "songs"),
      databases.listDocuments(DATABASE_ID, "projects")
    ]).then(([songsRes, projectsRes]) => {
      songs = songsRes.documents.map((d) => ({
        title: d.title,
        info: d.info,
        album: d.album,
        duration: d.duration,
        href: d.link
      }));
      projects = projectsRes.documents.map((d) => ({
        name: d.name,
        stack: d.stack,
        progress: d.progress,
        status: d.status,
        github: d.repository || void 0,
        url: d.play || void 0
      }));
    }).catch(() => {
      online = false;
    });
    var status = {
      "currently": "LIGHT//BOUND",
      "focus": "school",
      "status": "locked in"
    };
    const BILLBOARD_HUES = [320, 185, 270, 45, 160, 210, 0, 30];
    const billboards = [
      {
        text: "shuflduf.xyz",
        link: "https://shuflduf.xyz",
        image: "/88x31/shuflduf.gif"
      },
      {
        text: "LIGHT//BOUND — IN DEV",
        link: "https://github.com/fireentity1/beat-jumper"
      },
      {
        text: "fireentity.space",
        link: "https://fireentity.space",
        image: "/88x31/fireentity.gif"
      },
      {
        text: "addy10s.xyz",
        link: "https://addy10s.xyz",
        image: "https://www.addy10s.xyz/addy88x31.gif"
      },
      { text: "nibblz.xyz", link: "https://nibblz.xyz" }
    ];
    let focusedPanel = -1;
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>fireentity.space</title>`);
      });
    });
    $$renderer2.push(`<canvas style="position:absolute;top:0;left:0;pointer-events:none;z-index:0;will-change:transform;"></canvas> <div class="terminal" style="position:relative;z-index:1;"><header class="topbar"><h1 class="brand">fireentity.space</h1> <div class="topbar-right"><span class="indicator" aria-label="online"${attr_style(online ? "" : "color: red;")}>●</span> <span class="tagline"${attr_style(online ? "" : "color: red;")}><a href="/admin">${escape_html(online ? "// online" : "// offline")}</a></span></div></header> <div class="panel-grid">`);
    Block($$renderer2, {
      title: "about",
      colspan: 2,
      active: focusedPanel === 0,
      children: ($$renderer3) => {
        $$renderer3.push(`<p>Hi! I'm fireentity! A novice music artist, web/game developer, and aviation photographer!</p>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Block($$renderer2, {
      title: "status",
      active: focusedPanel === 1,
      children: ($$renderer3) => {
        $$renderer3.push(`<dl class="kv"><div class="kv-row"><dt>currently</dt> <span class="arr">→</span> <dd>${escape_html(status.currently)}</dd></div> <div class="kv-row"><dt>focus</dt> <span class="arr">→</span> <dd>${escape_html(status.focus)}</dd></div> <div class="kv-row"><dt>status</dt> <span class="arr">→</span> <dd${attr_class(clsx("dd-inactive"))}>${escape_html(status.status)}</dd></div></dl>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Block($$renderer2, {
      title: "projects",
      colspan: 2,
      active: focusedPanel === 2,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="proj-head row-cols"><span>name</span> <span>stack</span> <span>progress</span> <span>status</span> <span></span></div> <!--[-->`);
        const each_array = ensure_array_like(projects);
        for (let i = 0, $$length = each_array.length; i < $$length; i++) {
          let proj = each_array[i];
          $$renderer3.push(`<div${attr_class("proj-row row-cols", void 0, { "item-active": focusedPanel === 2 })}><span class="proj-name">${escape_html(proj.name)}</span> <span class="proj-stack">${escape_html(proj.stack)}</span> <span class="proj-bar">${escape_html("█".repeat(proj.progress))}${escape_html("░".repeat(10 - proj.progress))}</span> <span class="proj-status">${escape_html(proj.status)}</span> <span class="proj-links">`);
          if (proj.github) {
            $$renderer3.push("<!--[0-->");
            $$renderer3.push(`<a class="proj-link"${attr("href", proj.github)} target="_blank" rel="noopener noreferrer" title="GitHub"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"></path></svg></a>`);
          } else {
            $$renderer3.push("<!--[-1-->");
            $$renderer3.push(`<span class="proj-link proj-link-empty"></span>`);
          }
          $$renderer3.push(`<!--]--> `);
          if (proj.url) {
            $$renderer3.push("<!--[0-->");
            $$renderer3.push(`<a class="proj-link"${attr("href", proj.url)} target="_blank" rel="noopener noreferrer" title="Live site"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>`);
          } else {
            $$renderer3.push("<!--[-1-->");
            $$renderer3.push(`<span class="proj-link proj-link-empty"></span>`);
          }
          $$renderer3.push(`<!--]--></span></div>`);
        }
        $$renderer3.push(`<!--]-->`);
      }
    });
    $$renderer2.push(`<!----> `);
    Block($$renderer2, {
      title: "links",
      active: focusedPanel === 3,
      children: ($$renderer3) => {
        $$renderer3.push(`<ul class="links"><!--[-->`);
        const each_array_1 = ensure_array_like(links);
        for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
          let link = each_array_1[i];
          $$renderer3.push(`<li${attr_class("", void 0, { "item-active": focusedPanel === 3 })}><span class="lk-label">${escape_html(link.label)}</span> <span class="lk-arr">→</span> <a${attr_class("lk-val", void 0, { "lk-link": link.href.startsWith("mailto:") })}${attr("href", link.href)}>${escape_html(link.display)}</a></li>`);
        }
        $$renderer3.push(`<!--]--></ul>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Block($$renderer2, {
      title: "my songs",
      colspan: 3,
      active: focusedPanel === 4,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="songs-wrap"><div class="songs-head"><span></span> <span>#</span> <span>title</span> <span>info</span> <span>time</span></div> <!--[-->`);
        const each_array_2 = ensure_array_like(songs);
        for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
          let song = each_array_2[i];
          Song($$renderer3, {
            index: i + 1,
            title: song.title,
            info: song.info,
            album: song.album,
            duration: song.duration,
            href: song.href,
            active: focusedPanel === 4
          });
        }
        $$renderer3.push(`<!--]--></div>`);
      }
    });
    $$renderer2.push(`<!----></div> <div class="billboards"><!--[-->`);
    const each_array_3 = ensure_array_like(billboards);
    for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
      let board = each_array_3[i];
      const hue = BILLBOARD_HUES[i % BILLBOARD_HUES.length];
      const signOffset = [
        "0rem",
        "0.9rem",
        "-0.4rem",
        "1.5rem",
        "0.2rem",
        "-0.7rem",
        "1.1rem",
        "-0.2rem",
        "0.6rem",
        "1.8rem",
        "-0.5rem",
        "0.4rem"
      ][i % 12];
      const pf = [
        0.06,
        0.11,
        0.04,
        0.13,
        0.08,
        0.1,
        0.03,
        0.12,
        0.05,
        0.09,
        0.14,
        0.07
      ][i % 12];
      $$renderer2.push(`<div class="billboard"${attr_style(`--hue:${stringify(hue)};--sign-offset:${stringify(signOffset)};--pf:${stringify(pf)}`)}>`);
      element(
        $$renderer2,
        board.link ? "a" : "div",
        () => {
          $$renderer2.push(` class="billboard-face"${attr("href", board.link ?? void 0)}${attr("target", board.link && !board.link.startsWith("/") ? "_blank" : void 0)}${attr("rel", board.link ? "noopener noreferrer" : void 0)}`);
        },
        () => {
          if (board.image) {
            $$renderer2.push("<!--[0-->");
            $$renderer2.push(`<img${attr("src", board.image)}${attr("alt", board.text ?? "")} class="billboard-img"/>`);
          } else {
            $$renderer2.push("<!--[-1-->");
            $$renderer2.push(`<span class="billboard-text">${escape_html(board.text)}</span>`);
          }
          $$renderer2.push(`<!--]-->`);
        }
      );
      $$renderer2.push(` <div class="billboard-legs"><span class="billboard-leg"></span> <span class="billboard-leg"></span></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  _page as default
};
