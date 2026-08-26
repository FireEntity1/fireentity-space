<script>
	const songs = [
		['01', 'FARAWAY', '03:58'],
		['02', 'STAR//BREAKER', '04:21'],
		['03', 'UNBOUND', '03:47']
	];

	const projects = [
		{
			index: '01', title: 'LIGHT//BOUND', meta: 'RHYTHM GAME / IN DEVELOPMENT',
			description: 'A project built around music, movement, and light.', theme: 'light'
		},
		{
			index: '02', title: 'VOIDBORNE', meta: '2D METROIDVANIA',
			description: 'Explore a kingdom ruled by light.', theme: 'void'
		}
	];
</script>

<svelte:head>
	<title>Fireentity — Music, Games & Software</title>
	<meta name="description" content="Fireentity makes music, builds games, and writes software." />
</svelte:head>

<div class="page-shell">
	<div class="atmosphere" aria-hidden="true">
		<div class="haze-layer">
			<i class="haze haze-blue"></i>
			<i class="haze haze-violet"></i>
			<i class="haze haze-magenta"></i>
			<i class="haze haze-red"></i>
		</div>
		<div class="streak-layer">
			<i class="streak streak-blue-long"></i>
			<i class="streak streak-blue-soft"></i>
			<i class="streak streak-pink-long"></i>
			<i class="streak streak-violet"></i>
		</div>
		<div class="star-layer">
			<span class="star starburst blue" style="--x: 6%; --y: 24%; --s: 16px; --o: .42">✦</span>
			<span class="star plus" style="--x: 19%; --y: 9%; --s: 8px; --o: .3">+</span>
			<span class="star pixel" style="--x: 31%; --y: 19%; --s: 2px; --o: .7"></span>
			<span class="star cross pink" style="--x: 48%; --y: 8%; --s: 8px; --o: .46"></span>
			<span class="star pixel" style="--x: 62%; --y: 27%; --s: 3px; --o: .38"></span>
			<span class="star starburst pink" style="--x: 88%; --y: 16%; --s: 11px; --o: .5">✦</span>
			<span class="star plus blue" style="--x: 95%; --y: 38%; --s: 7px; --o: .36">+</span>
			<span class="star pixel pink" style="--x: 12%; --y: 55%; --s: 2px; --o: .52"></span>
			<span class="star cross" style="--x: 39%; --y: 48%; --s: 6px; --o: .28"></span>
			<span class="star starburst" style="--x: 71%; --y: 47%; --s: 7px; --o: .3">✦</span>
			<span class="star pixel blue" style="--x: 84%; --y: 59%; --s: 3px; --o: .7"></span>
			<span class="star plus pink" style="--x: 24%; --y: 72%; --s: 9px; --o: .32">+</span>
			<span class="star pixel" style="--x: 53%; --y: 76%; --s: 2px; --o: .45"></span>
			<span class="star cross blue" style="--x: 93%; --y: 81%; --s: 7px; --o: .35"></span>
			<span class="star starburst pink" style="--x: 8%; --y: 88%; --s: 13px; --o: .38">✦</span>
			<span class="star pixel" style="--x: 37%; --y: 94%; --s: 2px; --o: .58"></span>
			<span class="star plus blue" style="--x: 67%; --y: 90%; --s: 6px; --o: .31">+</span>
			<span class="star pixel pink" style="--x: 79%; --y: 96%; --s: 2px; --o: .55"></span>
		</div>
		<svg class="grain" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<filter id="grain-filter">
				<feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch" />
				<feColorMatrix type="saturate" values="0" />
			</filter>
			<rect width="100%" height="100%" filter="url(#grain-filter)" />
		</svg>
	</div>

	<nav class="topbar" aria-label="Primary navigation">
		<a class="wordmark" href="#top">FIREENTITY</a>
		<div class="nav-links">
			<a href="#music">MUSIC</a><a href="#projects">PROJECTS</a><a href="#about">ABOUT</a>
		</div>
		<div class="nav-decor" aria-hidden="true">
			<span class="nav-star">✦</span><span class="menu"><i></i><i></i></span>
		</div>
	</nav>

	<main id="top" class="composition">
		<section class="hero" aria-labelledby="hero-title">
			<p class="eyebrow">INDEPENDENT CREATIVE STUDIO / EST. 2024</p>
			<h1 id="hero-title">FIREENTITY</h1>
			<div class="hero-copy">
				<p class="disciplines">music <b>/</b> games <b>/</b> software</p>
				<p class="intro">welcome to my space on the internet.<br />i make music, build games, and write code.<br />this is where all of it lives.</p>
			</div>
			<a class="scroll" href="#music">SCROLL <i></i></a>
		</section>

		<section class="release module" aria-labelledby="release-title">
			<div class="release-copy">
				<p class="kicker">LATEST RELEASE <span>✦</span></p>
				<div><h2 id="release-title">FARAWAY</h2><p>A JOURNEY THROUGH LIGHT<br />AND DISTANCE.</p></div>
				<a class="dark-button" href="#music">LISTEN NOW <span>▶</span></a>
			</div>
			<div class="album" role="img" aria-label="Placeholder album artwork for Faraway">
				<small>FE—001</small><i class="orbit outer"></i><i class="orbit inner"></i><b>✦</b><strong>FAR<br />AWAY</strong>
			</div>
			<div class="player"><button aria-label="Play Faraway">▶</button><div><i></i></div><span>01:26 / 03:58</span></div>
		</section>

		<aside class="statement" aria-label="Creative statement">
			<span>CREATING</span><em>WORLDS</em><span>BETWEEN</span><span>REALITY</span><em>AND LIGHT.</em>
		</aside>

		<section id="music" class="songs module" aria-labelledby="songs-title">
			<header class="module-header"><h2 id="songs-title">SONGS <span>✦</span></h2><a href="#music">VIEW ALL ↗</a></header>
			<div class="song-list">
				{#each songs as song, index}
					<button class:active={index === 0} class="song-row">
						<small>{song[0]}</small><strong>{song[1]}</strong>
						{#if index === 0}<span class="wave" aria-hidden="true">▂▅▇▃▆█▄▂▆▃▅▂</span>{/if}
						<small>{song[2]}</small><span>↗</span>
					</button>
				{/each}
			</div>
			<footer class="streaming">
				<span>STREAMING EVERYWHERE</span>
				<div aria-label="Streaming platforms"><a href="#spotify" aria-label="Spotify">SP</a><a href="#apple" aria-label="Apple Music">♪</a><a href="#youtube" aria-label="YouTube">YT</a><a href="#soundcloud" aria-label="SoundCloud">SC</a></div>
			</footer>
		</section>

		<section id="projects" class="projects module" aria-labelledby="projects-title">
			<header class="module-header"><h2 id="projects-title">PROJECTS <span>✦</span></h2><a href="#projects">EXPLORE ALL ↗</a></header>
			<div class="project-list">
				{#each projects as project}
					<article class="project-card">
						<div class={`project-art ${project.theme}`} role="img" aria-label={`${project.title} image placeholder`}>
							<small>{project.index}</small><i></i><span>{project.title}</span>
						</div>
						<div class="project-copy">
							<div><small>{project.meta}</small><h3>{project.title}</h3><p>{project.description}</p></div>
							<a href={`#${project.theme}`}>VIEW PROJECT <span>→</span></a>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="about" class="about module" aria-labelledby="about-title">
			<div class="about-copy">
				<header class="module-header"><h2 id="about-title">ABOUT <span>✦</span></h2></header>
				<p class="about-lede">Music producer, developer,<br />and creator.</p>
				<p class="about-note">Currently making new worlds and sounds.</p>
				<div class="about-actions"><span class="status"><i></i> ONLINE</span><a href="#about">MORE ABOUT ME →</a></div>
			</div>
			<div class="about-mark" aria-hidden="true"><i></i><span>✦</span></div>
		</section>

		<footer class="connect module">
			<div><span>LET'S CONNECT</span><nav aria-label="Social links"><a href="mailto:hello@fireentity.space" aria-label="Email">@</a><a href="#youtube" aria-label="YouTube">YT</a><a href="#github" aria-label="GitHub">GH</a><a href="#discord" aria-label="Discord">DC</a></nav></div>
			<p>✦ THANKS FOR VISITING.</p>
		</footer>

		<p class="edge left">SOUND / CODE / WORLDS</p><p class="edge right">51.0447° N / 114.0719° W</p>
	</main>
</div>

<style>
	:global(*){box-sizing:border-box}
	:global(html){scroll-behavior:smooth}
	:global(body){margin:0;background:#f1efe9;color:#151515;font-family:Arial,Helvetica,sans-serif;font-size:14px;-webkit-font-smoothing:antialiased}
	:global(a){color:inherit;text-decoration:none}
	:global(button){color:inherit;font:inherit}
	.page-shell{min-width:320px;overflow:hidden}

	.topbar{position:absolute;top:0;left:0;z-index:20;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));align-items:center;width:100%;height:78px;padding:0 clamp(24px,3.1vw,52px);font-size:11px;font-weight:700;letter-spacing:.12em}
	.wordmark{grid-column:1/span 2}.nav-links{grid-column:7/span 4;display:flex;justify-content:space-between;max-width:310px}.nav-decor{grid-column:12;display:flex;align-items:center;justify-content:flex-end;gap:25px}.nav-star{font-size:18px}.menu{display:grid;gap:5px;width:22px}.menu i{display:block;height:1px;background:currentColor}.menu i:last-child{width:13px;margin-left:auto}

	.composition{--gap:clamp(14px,1.55vw,26px);position:relative;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));grid-template-rows:550px 130px 560px 320px 180px;gap:26px var(--gap);width:100%;padding:100px clamp(24px,3.1vw,52px) 46px}
	.composition:before{position:absolute;inset:0 clamp(24px,3.1vw,52px);z-index:-1;background:repeating-linear-gradient(to right,transparent 0,transparent calc((100% - 11 * var(--gap))/12),rgba(21,21,21,.035) calc((100% - 11 * var(--gap))/12),rgba(21,21,21,.035) calc((100% - 11 * var(--gap))/12 + 1px),transparent calc((100% - 11 * var(--gap))/12 + 1px),transparent calc((100% - 11 * var(--gap))/12 + var(--gap)));content:'';pointer-events:none}
	.module{background:#f1efe9;border:1px solid #151515}

	.hero{position:relative;grid-column:1/9;grid-row:1;padding-top:35px}.eyebrow,.kicker{margin:0;font-size:9px;font-weight:700;letter-spacing:.15em}.hero h1{position:relative;z-index:2;margin:27px 0 0 -.055em;font-size:clamp(72px,9.7vw,164px);font-weight:900;letter-spacing:-.085em;line-height:.78;white-space:nowrap}.hero-copy{display:grid;grid-template-columns:1.15fr 1fr;gap:32px;width:min(720px,85%);margin-top:70px}.disciplines{margin:0;font-family:Georgia,serif;font-size:clamp(21px,2.2vw,35px);font-style:italic;letter-spacing:-.03em;line-height:1.1;white-space:nowrap}.disciplines b{color:#f04b23;font-weight:400}.intro{margin:2px 0 0;font-size:clamp(12px,.9vw,14px);line-height:1.65}.scroll{position:absolute;bottom:12px;left:0;display:flex;align-items:center;gap:14px;font-size:9px;font-weight:700;letter-spacing:.18em}.scroll i{position:relative;display:block;width:50px;height:1px;background:currentColor}.scroll i:after{position:absolute;right:0;bottom:0;width:7px;height:1px;background:currentColor;content:'';transform:rotate(-35deg);transform-origin:right}

	.release{position:relative;z-index:4;grid-column:8/13;grid-row:1/span 2;align-self:start;display:grid;grid-template-columns:minmax(175px,.95fr) minmax(210px,1.15fr);grid-template-rows:1fr 49px;min-height:490px;margin-top:76px;box-shadow:10px 10px 0 #d8d5cc}.release-copy{display:flex;flex-direction:column;justify-content:space-between;padding:24px 20px 22px}.kicker{display:flex;justify-content:space-between}.kicker span,.module-header h2 span{color:#f04b23}.release h2{margin:0;font-size:clamp(31px,3.2vw,54px);font-weight:900;letter-spacing:-.06em;line-height:.9}.release h2+p{margin:13px 0 0;font-size:9px;font-weight:700;letter-spacing:.12em;line-height:1.5}.dark-button{display:flex;align-items:center;justify-content:space-between;width:150px;padding:12px 13px;background:#151515;color:#f1efe9;font-size:9px;font-weight:700;letter-spacing:.14em}.dark-button span{font-size:8px}
	.album{position:relative;min-height:400px;overflow:hidden;background:#f04b23;border-left:1px solid #151515}.album small{position:absolute;top:17px;left:17px;font-size:8px;font-weight:700;letter-spacing:.12em}.orbit{position:absolute;top:73px;left:50%;width:210px;height:210px;border:1px solid #151515;border-radius:50%;transform:translateX(-50%)}.orbit.inner{top:109px;width:138px;height:138px}.album b{position:absolute;top:123px;left:50%;font-size:80px;transform:translateX(-50%)}.album strong{position:absolute;right:14px;bottom:12px;font-size:clamp(35px,3.25vw,55px);font-weight:900;letter-spacing:-.07em;line-height:.7;text-align:right}.player{grid-column:1/-1;display:flex;align-items:center;gap:13px;padding:0 16px;border-top:1px solid #151515}.player button{padding:0;background:none;border:0;font-size:8px;cursor:pointer}.player>div{flex:1;height:1px;background:#b9b6af}.player>div i{display:block;width:36%;height:2px;margin-top:-1px;background:#151515}.player>span{font-family:'Courier New',monospace;font-size:8px;letter-spacing:.06em}

	.statement{grid-column:7/8;grid-row:2/4;align-self:center;display:flex;flex-direction:column;gap:6px;margin:120px auto 0;font-size:clamp(11px,.85vw,14px);font-weight:800;letter-spacing:-.03em;line-height:.95;writing-mode:vertical-rl;transform:rotate(180deg)}.statement em{font-family:Georgia,serif;font-weight:400}
	.module-header{display:flex;align-items:center;justify-content:space-between;min-height:61px;padding:0 20px;border-bottom:1px solid #151515}.module-header h2{margin:0;font-size:13px;font-weight:800;letter-spacing:.04em}.module-header>a{font-size:8px;font-weight:700;letter-spacing:.13em}

	.songs{grid-column:1/7;grid-row:2/4;align-self:end;min-height:495px;margin-right:20px}.song-list{padding:0 20px}.song-row{display:grid;grid-template-columns:42px minmax(100px,1fr) minmax(80px,150px) 52px 18px;align-items:center;width:100%;height:92px;padding:0;background:none;border:0;border-bottom:1px solid #aaa79f;text-align:left;cursor:pointer}.song-row:last-child{border-bottom:0}.song-row small{font-family:'Courier New',monospace;font-size:9px}.song-row strong{font-size:clamp(19px,1.65vw,27px);font-weight:800;letter-spacing:-.04em}.song-row.active strong{font-family:Georgia,serif;font-style:italic;font-weight:400}.wave{color:#f04b23;font-family:monospace;font-size:12px;letter-spacing:-2px}.song-row>span:last-child{text-align:right}.streaming{display:flex;align-items:center;justify-content:space-between;height:74px;padding:0 20px;background:#151515;color:#f1efe9;font-size:8px;font-weight:700;letter-spacing:.13em}.streaming>div{display:flex;gap:17px}.streaming a{display:grid;width:24px;height:24px;place-items:center;border:1px solid #777;border-radius:50%;font-size:7px;letter-spacing:0}

	.projects{grid-column:8/13;grid-row:3/5;align-self:start;min-height:735px;margin-top:64px}.project-list{padding:0 20px 20px}.project-card{display:grid;grid-template-columns:1.1fr .9fr;gap:18px;padding:20px 0;border-bottom:1px solid #aaa79f}.project-card:last-child{border-bottom:0}.project-art{position:relative;height:245px;overflow:hidden;border:1px solid #151515;background:#d6d2c8}.project-art.void{background:#151515;color:#f1efe9}.project-art small{position:absolute;top:12px;left:12px;font-family:'Courier New',monospace;font-size:8px}.project-art i{position:absolute;top:50%;left:50%;width:105px;height:105px;border:1px solid currentColor;transform:translate(-50%,-50%) rotate(45deg)}.project-art.light i:before,.project-art.light i:after{position:absolute;background:#f04b23;content:''}.project-art.light i:before{top:50%;left:-46px;width:195px;height:1px}.project-art.light i:after{top:-46px;left:50%;width:1px;height:195px}.project-art.void i{width:78px;height:78px;border-color:#f04b23;border-radius:50% 50% 3px 50%}.project-art>span{position:absolute;right:10px;bottom:9px;font-size:8px;font-weight:700;letter-spacing:.12em}.project-copy{display:flex;flex-direction:column;justify-content:space-between;padding:6px 0 4px}.project-copy small{font-size:7px;font-weight:700;letter-spacing:.12em;line-height:1.4}.project-copy h3{margin:30px 0 11px;font-size:clamp(21px,1.8vw,30px);font-weight:900;letter-spacing:-.055em;line-height:.95}.project-copy p{margin:0;font-family:Georgia,serif;font-size:12px;font-style:italic;line-height:1.35}.project-copy>a{display:flex;justify-content:space-between;padding-bottom:7px;border-bottom:1px solid #151515;font-size:8px;font-weight:700;letter-spacing:.11em}

	.about{grid-column:2/7;grid-row:4;align-self:start;display:grid;grid-template-columns:1.6fr .8fr;min-height:278px;margin-top:20px}.about .module-header{padding:0}.about-copy{padding:0 23px 22px}.about-lede{margin:28px 0 10px;font-family:Georgia,serif;font-size:clamp(19px,1.65vw,27px);font-style:italic;line-height:1.08}.about-note{margin:0;font-size:10px}.about-actions{display:flex;align-items:flex-end;justify-content:space-between;margin-top:37px}.about-actions a,.status{font-size:8px;font-weight:700;letter-spacing:.1em}.status{display:flex;align-items:center;gap:7px;font-family:'Courier New',monospace}.status i{width:6px;height:6px;background:#2f9d61;border-radius:50%;box-shadow:0 0 0 3px rgba(47,157,97,.13)}.about-mark{position:relative;display:grid;place-items:center;min-width:140px;border-left:1px solid #151515}.about-mark span{position:relative;z-index:2;font-size:63px}.about-mark>i{position:absolute;width:126px;height:126px;border:1px solid #151515;border-radius:50%}.about-mark>i:after{position:absolute;top:-11px;left:50%;width:20px;height:20px;background:#f04b23;border-radius:50%;content:'';transform:translateX(-50%)}

	.connect{grid-column:5/13;grid-row:5;align-self:end;display:flex;align-items:center;justify-content:space-between;height:106px;padding:0 27px;background:#f04b23}.connect>div{display:flex;align-items:center;gap:45px}.connect>div>span,.connect>p{margin:0;font-size:9px;font-weight:800;letter-spacing:.13em}.connect nav{display:flex;gap:9px}.connect nav a{display:grid;width:31px;height:31px;place-items:center;border:1px solid #151515;border-radius:50%;font-size:8px;font-weight:700}.edge{position:absolute;bottom:49px;margin:0;font-family:'Courier New',monospace;font-size:7px;letter-spacing:.12em;writing-mode:vertical-rl}.edge.left{left:16px;transform:rotate(180deg)}.edge.right{right:16px}

	@media(max-width:1180px){.composition{grid-template-rows:500px 130px 540px 320px 180px}.release{grid-template-columns:.9fr 1.1fr;min-height:435px}.album{min-height:345px}.release-copy{padding:18px 15px}.dark-button{width:132px}.song-row{grid-template-columns:35px minmax(100px,1fr) 95px 42px 16px}.projects{min-height:700px}.project-art{height:220px}.project-card{grid-template-columns:1fr .85fr}.project-copy h3{margin-top:20px}}

	@media(max-width:900px){.topbar{grid-template-columns:repeat(8,minmax(0,1fr))}.wordmark{grid-column:1/3}.nav-links{grid-column:4/8}.nav-decor{grid-column:8}.nav-star{display:none}.composition{grid-template-columns:repeat(8,minmax(0,1fr));grid-template-rows:auto;gap:45px 18px;padding-top:112px}.composition:before{display:none}.hero{grid-column:1/9;grid-row:auto;min-height:440px;padding-top:25px}.hero h1{font-size:clamp(69px,13.4vw,121px)}.hero-copy{width:76%}.release{grid-column:3/9;grid-row:auto;margin-top:-85px}.statement{grid-column:7/8;grid-row:3;margin:20px auto 0}.songs{grid-column:1/7;grid-row:3;margin:70px 0 0}.projects{grid-column:2/9;grid-row:4;margin-top:0}.project-art{height:260px}.about{grid-column:1/7;grid-row:5;margin-top:-5px}.connect{grid-column:2/9;grid-row:6;margin-top:20px}.edge{display:none}}

	@media(max-width:640px){.topbar{display:flex;justify-content:space-between;height:68px;padding:0 18px}.nav-links{display:none}.nav-star{display:block}.composition{display:flex;flex-direction:column;gap:28px;padding:82px 14px 24px}.hero{min-height:500px;padding:18px 4px 0}.eyebrow{font-size:7px}.hero h1{margin-top:29px;font-size:clamp(54px,18.4vw,94px);line-height:.82}.hero-copy{display:block;width:100%;margin-top:57px}.disciplines{font-size:26px}.intro{margin-top:33px;font-size:12px}.scroll{bottom:15px}.release{order:2;grid-template-columns:.95fr 1.05fr;min-height:390px;margin:0 0 0 20px;box-shadow:7px 7px 0 #d8d5cc}.release-copy{min-width:0;padding:16px 12px}.kicker{font-size:7px}.release h2{font-size:29px}.release h2+p{font-size:7px}.dark-button{width:100%;padding:11px 9px;font-size:7px}.album{min-height:340px}.orbit.outer{width:150px;height:150px}.orbit.inner{top:97px;width:102px;height:102px}.album b{top:110px;font-size:58px}.album strong{font-size:36px}.player{padding:0 10px}.player>span{font-size:7px}.statement{order:3;align-self:flex-end;display:flex;flex-direction:row;flex-wrap:wrap;gap:5px;width:52%;margin:28px 8px 6px 0;font-size:13px;line-height:.9;writing-mode:initial;transform:none}.songs{order:4;min-height:auto;margin:0 16px 0 0}.module-header{min-height:55px;padding:0 14px}.song-list{padding:0 14px}.song-row{grid-template-columns:28px minmax(100px,1fr) 40px 12px;height:76px}.song-row strong{font-size:18px}.wave{display:none}.song-row small{font-size:7px}.streaming{height:68px;padding:0 14px}.streaming>span{max-width:85px;line-height:1.4}.streaming>div{gap:7px}.streaming a{width:22px;height:22px}.projects{order:5;min-height:auto;margin:40px 0 0 15px}.project-list{padding:0 14px 6px}.project-card{display:block;padding:14px 0 22px}.project-art{height:230px}.project-copy{padding-top:18px}.project-copy h3{margin:13px 0 11px;font-size:28px}.project-copy p{max-width:240px}.project-copy>a{margin-top:28px}.about{order:6;grid-template-columns:minmax(0,1fr) 105px;min-height:280px;margin:12px 20px 0 0}.about-copy{padding:0 14px 18px}.about-lede{font-size:19px}.about-note{max-width:160px;line-height:1.4}.about-actions{align-items:flex-start;flex-direction:column;gap:19px;margin-top:25px}.about-mark{min-width:0}.about-mark span{font-size:42px}.about-mark>i{width:77px;height:77px}.about-mark>i:after{top:-8px;width:14px;height:14px}.connect{order:7;align-items:flex-start;flex-direction:column;height:152px;margin:38px 0 0 17px;padding:24px 18px}.connect>div{width:100%;justify-content:space-between;gap:15px}.connect>p{align-self:flex-end}}

	/* Dark editorial visual system */
	:global(:root){
		--ink:#f8f5fa;
		--secondary:#b8adbf;
		--lavender:#a99bbe;
		--violet:#24133d;
		--deep:#100b24;
		--base:#080716;
		--blue:#6b83ff;
		--pink:#f064c8;
		--magenta:#c83ea4;
		--red:#e35470;
		--hairline:rgba(169,155,190,.27);
		--display:'Bodoni 72','Bodoni 72 Smallcaps','Bodoni MT',Didot,'Times New Roman',serif;
	}
	:global(body){background:var(--base);color:var(--ink);font-family:Inter,'Helvetica Neue',Arial,sans-serif}
	:global(::selection){background:var(--pink);color:var(--base)}
	:global(a),:global(button){outline-color:var(--pink);outline-offset:4px}
	.page-shell{background:radial-gradient(circle at 80% 9%,rgba(107,131,255,.14),transparent 27%),radial-gradient(circle at 6% 48%,rgba(200,62,164,.08),transparent 23%),radial-gradient(circle at 82% 74%,rgba(90,71,116,.1),transparent 25%),var(--base)}
	.topbar{color:rgba(248,245,250,.78);font-weight:500}.wordmark{color:var(--ink);letter-spacing:.16em}.nav-links a{transition:color 180ms ease}.nav-links a:hover{color:var(--pink)}.nav-star{color:var(--pink);text-shadow:0 0 18px rgba(240,100,200,.5)}.menu i{background:var(--lavender)}
	.composition{isolation:isolate}.composition:before{background:repeating-linear-gradient(to right,transparent 0,transparent calc((100% - 11 * var(--gap))/12),rgba(169,155,190,.035) calc((100% - 11 * var(--gap))/12),rgba(169,155,190,.035) calc((100% - 11 * var(--gap))/12 + 1px),transparent calc((100% - 11 * var(--gap))/12 + 1px),transparent calc((100% - 11 * var(--gap))/12 + var(--gap)))}
	.module{background:linear-gradient(145deg,rgba(18,13,39,.84),rgba(9,7,23,.72));border-color:var(--hairline);border-radius:2px;box-shadow:inset 0 1px 0 rgba(248,245,250,.035),inset 0 0 45px rgba(107,131,255,.025);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}

	.eyebrow,.kicker,.module-header h2,.module-header>a,.release h2+p,.project-copy small,.about-note,.edge,.streaming,.connect,.status{color:var(--secondary)}
	.eyebrow,.kicker,.module-header h2,.module-header>a,.release h2+p,.project-copy small,.about-note,.edge,.streaming,.connect,.status,.player>span,.song-row small{font-family:Inter,'Helvetica Neue',Arial,sans-serif;font-weight:500;text-transform:uppercase}
	.eyebrow,.kicker,.module-header h2,.module-header>a,.release h2+p,.project-copy small,.edge{letter-spacing:.19em}
	.hero h1,.release h2,.song-row strong,.project-copy h3,.album strong,.statement,.disciplines,.about-lede{font-family:var(--display)}
	.hero h1{color:var(--ink);font-weight:400;letter-spacing:-.058em;line-height:.72;text-shadow:0 0 42px rgba(169,155,190,.09)}
	.disciplines{color:var(--secondary);font-weight:400}.disciplines b{color:var(--pink)}.intro{color:var(--secondary);font-weight:300}.scroll{color:rgba(184,173,191,.7);font-weight:500}.scroll i,.scroll i:after{background:var(--lavender)}

	.release{box-shadow:12px 14px 44px rgba(0,0,0,.38),0 0 58px rgba(107,131,255,.07),inset 0 1px rgba(248,245,250,.04)}
	.release h2{font-weight:400;letter-spacing:-.035em;line-height:.82}.release h2+p{font-weight:400}.dark-button{background:rgba(8,7,22,.2);color:var(--ink);border:1px solid rgba(169,155,190,.48);border-radius:0;font-weight:500;transition:border-color 180ms ease,box-shadow 180ms ease,color 180ms ease}.dark-button:hover,.dark-button:focus-visible{color:#fff;border-color:var(--blue);box-shadow:0 0 22px rgba(107,131,255,.2),inset 0 0 16px rgba(107,131,255,.06)}
	.album{background:radial-gradient(circle at 47% 38%,rgba(240,100,200,.7),transparent 6%),radial-gradient(circle at 52% 42%,rgba(107,131,255,.44),transparent 38%),linear-gradient(145deg,#2b1746 0%,#140c2e 56%,#090716 100%);border-color:var(--hairline);color:var(--ink);box-shadow:inset 0 0 60px rgba(107,131,255,.12)}.album:after{position:absolute;inset:0;background:linear-gradient(115deg,transparent 22%,rgba(248,245,250,.045) 50%,transparent 76%);content:''}.album small,.album strong,.album b{z-index:1}.album small{color:var(--secondary)}.album strong{font-weight:400;letter-spacing:-.025em;line-height:.7}.album b{color:var(--ink);text-shadow:0 0 26px rgba(240,100,200,.7)}.orbit{z-index:1;border-color:rgba(248,245,250,.27);box-shadow:0 0 24px rgba(107,131,255,.12)}
	.player{border-color:var(--hairline)}.player button{color:var(--secondary)}.player>div{background:rgba(169,155,190,.2)}.player>div i{background:linear-gradient(90deg,var(--blue),var(--pink));box-shadow:0 0 8px rgba(107,131,255,.55)}

	.statement{color:rgba(248,245,250,.72);font-weight:400;letter-spacing:.03em}.statement em{color:var(--pink);font-family:inherit;font-style:italic}
	.module-header{border-color:var(--hairline)}.module-header h2{font-size:10px}.kicker span,.module-header h2 span{color:var(--pink);text-shadow:0 0 12px rgba(240,100,200,.4)}
	.song-row{border-color:rgba(169,155,190,.18);transition:background 180ms ease}.song-row:hover{background:rgba(107,131,255,.035)}.song-row small{color:rgba(184,173,191,.68);font-weight:400;letter-spacing:.12em}.song-row strong{font-weight:400;letter-spacing:-.015em}.song-row.active strong{color:#fff;font-family:var(--display);font-style:normal;font-weight:400}.wave{color:var(--pink);text-shadow:0 0 10px rgba(240,100,200,.45)}.streaming{background:rgba(5,4,14,.62);color:rgba(184,173,191,.7);border-top:1px solid var(--hairline)}.streaming a{border-color:rgba(169,155,190,.3);color:var(--secondary);transition:border-color 180ms ease,color 180ms ease}.streaming a:hover{border-color:var(--pink);color:var(--ink)}

	.project-card{border-color:rgba(169,155,190,.18)}.project-art{background:radial-gradient(circle at 52% 48%,rgba(107,131,255,.28),transparent 27%),linear-gradient(135deg,#201238,#0b091b);border-color:var(--hairline);color:var(--ink);box-shadow:inset 0 0 48px rgba(107,131,255,.08)}.project-art.void{background:radial-gradient(circle at 50% 52%,rgba(227,84,112,.17),transparent 21%),linear-gradient(150deg,#130b24,#070612);color:var(--ink)}.project-art i{border-color:rgba(248,245,250,.38)}.project-art.light i:before,.project-art.light i:after{background:var(--blue);box-shadow:0 0 10px rgba(107,131,255,.65)}.project-art.void i{border-color:var(--red);box-shadow:0 0 22px rgba(227,84,112,.28)}.project-art small,.project-art>span{color:rgba(248,245,250,.6)}.project-copy h3{font-weight:400;letter-spacing:-.025em}.project-copy p,.about-lede{color:var(--secondary);font-family:var(--display);font-weight:400}.project-copy>a{color:rgba(248,245,250,.78);border-color:rgba(169,155,190,.3);font-weight:500;transition:color 180ms ease,border-color 180ms ease}.project-copy>a:hover{color:var(--pink);border-color:var(--pink)}

	.about-mark{border-color:var(--hairline)}.about-mark>i{border-color:rgba(169,155,190,.3);box-shadow:0 0 35px rgba(107,131,255,.09)}.about-mark>i:after{background:var(--pink);box-shadow:0 0 16px rgba(240,100,200,.65)}.about-mark span{color:var(--ink);text-shadow:0 0 24px rgba(107,131,255,.34)}.status i{background:var(--blue);box-shadow:0 0 0 3px rgba(107,131,255,.12),0 0 12px rgba(107,131,255,.75)}.about-actions a{color:var(--ink);font-weight:500;transition:color 180ms ease}.about-actions a:hover{color:var(--pink)}
	.connect{background:linear-gradient(100deg,rgba(36,19,61,.88),rgba(16,11,36,.82));border-color:rgba(169,155,190,.34);box-shadow:inset 0 1px rgba(248,245,250,.04),0 0 42px rgba(200,62,164,.07)}.connect>div>span,.connect>p{color:var(--secondary);font-weight:500}.connect nav a{color:var(--secondary);border-color:rgba(169,155,190,.34);transition:color 180ms ease,border-color 180ms ease,box-shadow 180ms ease}.connect nav a:hover{color:var(--ink);border-color:var(--pink);box-shadow:0 0 15px rgba(240,100,200,.2)}

	/* Multi-depth atmospheric background */
	.page-shell{position:relative;isolation:isolate;min-height:100vh;background:var(--base)}
	.topbar,.composition{position:relative;z-index:2}
	.topbar{position:absolute}
	.atmosphere{position:fixed;inset:0;z-index:0;overflow:hidden;background:#080716;pointer-events:none;contain:strict}
	.haze-layer,.streak-layer,.star-layer{position:absolute;inset:-8%;will-change:transform}
	.haze-layer{animation:haze-parallax 38s ease-in-out infinite alternate}
	.haze{position:absolute;display:block;filter:blur(clamp(90px,11vw,190px));border-radius:43% 57% 61% 39% / 56% 38% 62% 44%;will-change:transform}
	.haze-blue{top:7%;left:-31%;width:74vw;height:31vw;min-height:320px;background:#4668ff;opacity:.13;transform:rotate(-17deg);animation:blue-haze 34s ease-in-out infinite alternate}
	.haze-violet{top:-25%;right:-19%;width:60vw;height:53vw;background:#6d3aa1;opacity:.14;transform:rotate(22deg);animation:violet-haze 29s ease-in-out infinite alternate}
	.haze-magenta{right:-32%;bottom:-14%;width:71vw;height:44vw;min-height:360px;background:#c83ea4;opacity:.105;transform:rotate(-12deg);animation:magenta-haze 40s ease-in-out infinite alternate}
	.haze-red{bottom:3%;left:-29%;width:52vw;height:26vw;min-height:250px;background:#e35470;opacity:.055;transform:rotate(9deg);animation:red-haze 25s ease-in-out infinite alternate}

	.streak-layer{animation:streak-parallax 27s ease-in-out infinite alternate}
	.streak{position:absolute;display:block;height:clamp(7px,1vw,16px);background:linear-gradient(90deg,transparent,rgba(248,245,250,.025) 18%,currentColor 48%,rgba(248,245,250,.025) 76%,transparent);filter:blur(15px);opacity:.13;transform-origin:center;will-change:transform}
	.streak:after{position:absolute;top:50%;left:18%;width:62%;height:1px;background:currentColor;box-shadow:0 0 14px currentColor,0 0 34px currentColor;content:'';opacity:.45}
	.streak-blue-long{top:24%;left:-18%;width:79vw;color:#6b83ff;transform:rotate(-12deg);animation:blue-streak 23s ease-in-out infinite alternate}
	.streak-blue-soft{top:51%;left:8%;width:51vw;color:#8698ff;opacity:.07;transform:rotate(7deg);animation:soft-streak 31s ease-in-out infinite alternate}
	.streak-pink-long{right:-24%;bottom:21%;width:73vw;color:#f064c8;opacity:.1;transform:rotate(-15deg);animation:pink-streak 36s ease-in-out infinite alternate}
	.streak-violet{right:-4%;top:13%;width:42vw;color:#9d6cca;opacity:.07;transform:rotate(24deg);animation:soft-streak 28s ease-in-out infinite alternate-reverse}

	.star-layer{inset:0;animation:star-parallax 24s ease-in-out infinite alternate}
	.star{--glow:rgba(248,245,250,.48);position:absolute;top:var(--y);left:var(--x);display:block;color:#f8f5fa;font-family:Georgia,serif;font-size:var(--s);line-height:1;opacity:var(--o);text-shadow:0 0 8px var(--glow),0 0 18px var(--glow);will-change:transform,opacity;animation:star-breathe 11s ease-in-out infinite alternate}
	.star:nth-child(3n){animation-duration:17s;animation-delay:-4s}.star:nth-child(4n){animation-duration:23s;animation-delay:-9s}.star.blue{--glow:rgba(107,131,255,.72);color:#aab6ff}.star.pink{--glow:rgba(240,100,200,.66);color:#f2acd9}
	.star.pixel{width:var(--s);height:var(--s);background:currentColor;border-radius:1px}
	.star.cross{width:var(--s);height:var(--s)}.star.cross:before,.star.cross:after{position:absolute;top:50%;left:50%;background:currentColor;content:'';transform:translate(-50%,-50%)}.star.cross:before{width:100%;height:1px}.star.cross:after{width:1px;height:100%}
	.star.starburst:nth-child(1){filter:blur(.1px)}
	.grain{position:absolute;top:-12%;left:-12%;width:124%;height:124%;opacity:.026;mix-blend-mode:soft-light;will-change:transform;animation:grain-shift 1.6s steps(4,end) infinite}
	.grain rect{fill:#fff}

	@keyframes haze-parallax{from{transform:translate3d(-1.2%,-.8%,0) scale(1.01)}to{transform:translate3d(1.4%,1%,0) scale(1.035)}}
	@keyframes blue-haze{from{transform:translate3d(-2%,0,0) rotate(-17deg) scale(.96)}to{transform:translate3d(7%,5%,0) rotate(-11deg) scale(1.08)}}
	@keyframes violet-haze{from{transform:translate3d(2%,-2%,0) rotate(22deg) scale(1)}to{transform:translate3d(-7%,7%,0) rotate(16deg) scale(1.09)}}
	@keyframes magenta-haze{from{transform:translate3d(3%,3%,0) rotate(-12deg) scale(1.02)}to{transform:translate3d(-7%,-4%,0) rotate(-7deg) scale(.94)}}
	@keyframes red-haze{from{transform:translate3d(-2%,4%,0) rotate(9deg) scale(.97)}to{transform:translate3d(6%,-4%,0) rotate(15deg) scale(1.06)}}
	@keyframes streak-parallax{from{transform:translate3d(-.6%,.5%,0)}to{transform:translate3d(1.1%,-.8%,0)}}
	@keyframes blue-streak{from{transform:translate3d(-6%,2%,0) rotate(-12deg) scaleX(.94)}to{transform:translate3d(8%,-3%,0) rotate(-9deg) scaleX(1.06)}}
	@keyframes pink-streak{from{transform:translate3d(5%,3%,0) rotate(-15deg) scaleX(1.04)}to{transform:translate3d(-8%,-3%,0) rotate(-12deg) scaleX(.94)}}
	@keyframes soft-streak{from{transform:translate3d(-3%,1%,0) rotate(7deg)}to{transform:translate3d(6%,-2%,0) rotate(10deg)}}
	@keyframes star-parallax{from{transform:translate3d(-2px,-1px,0)}to{transform:translate3d(7px,5px,0)}}
	@keyframes star-breathe{from{transform:translate3d(0,0,0) scale(.84);opacity:calc(var(--o) * .7)}to{transform:translate3d(3px,-4px,0) scale(1.08);opacity:var(--o)}}
	@keyframes grain-shift{0%{transform:translate3d(-1%,1%,0)}25%{transform:translate3d(2%,-1%,0)}50%{transform:translate3d(-2%,-2%,0)}75%{transform:translate3d(1%,2%,0)}100%{transform:translate3d(-1%,1%,0)}}

	@media(prefers-reduced-motion:reduce){:global(html){scroll-behavior:auto}.haze-layer,.haze,.streak-layer,.streak,.star-layer,.star,.grain{animation:none}}
</style>
