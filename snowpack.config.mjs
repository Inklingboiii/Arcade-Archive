/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    // where files get built to
    public: '/',
    src: '/dist',
  },
  plugins: [],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
     "minify": true,
     "treeshake": true
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    port: 42069
  },
  buildOptions: {
    /* ... */
  },
};
