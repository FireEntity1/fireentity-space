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

	@media(prefers-reduced-motion:reduce){:global(html){scroll-behavior:auto}}
</style>
