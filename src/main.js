
await import("./assets/bootstrap/css/bootstrap.min.css");
// common css for Byte
await import ("./assets/css/error-page.css");
await import ("./assets/css/swiper.min.css");

import App from './App.svelte';

const app = new App({
	target: document.getElementById("error-page"),
	props: {
		name: 'world',
		names : ['Name 1', 'Name 2', 'Name 3']

	}
});

export default app;
