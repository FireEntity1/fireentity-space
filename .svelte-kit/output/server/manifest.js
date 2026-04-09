export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["88x31/fireentity.gif","88x31/shuflduf.gif","robots.txt"]),
	mimeTypes: {".gif":"image/gif",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.DqD03lBL.js",app:"_app/immutable/entry/app.DFZotX-l.js",imports:["_app/immutable/entry/start.DqD03lBL.js","_app/immutable/chunks/Bq-C_tXz.js","_app/immutable/chunks/cQ1e3Hc6.js","_app/immutable/chunks/ac9fIs_w.js","_app/immutable/entry/app.DFZotX-l.js","_app/immutable/chunks/cQ1e3Hc6.js","_app/immutable/chunks/Dyoa1Yn6.js","_app/immutable/chunks/Cghdxi9N.js","_app/immutable/chunks/ac9fIs_w.js","_app/immutable/chunks/CJ2lJCtz.js","_app/immutable/chunks/Bhi2NAog.js","_app/immutable/chunks/BonqSsoB.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
