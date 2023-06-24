<script>
	import './styles.css';
	import Dial from "$lib/components/dial.svelte";
</script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<div class="overflow-hidden tw app">
	<div class="bg-noise"></div>
	<div class="bg-gradient"></div>
	<main>
		<slot />
		<Dial />
	</main>
</div>

<style>
	.tw {
		color: #cfc4c4;
	}
	.bg-noise {
		position: fixed;
		z-index: -1;
		width: 100vw;
		height: 100vh;
		background-image: url("https://uploads-ssl.webflow.com/62c435401c8f7261df7dac30/62c5acd6c07e3c25ed49ea71_624d5860b71355f93453ff75_grain.gif"),url("https://uploads-ssl.webflow.com/62c435401c8f7261df7dac30/62c44e50efe5bfb56fdc13a4_Andy-hooke-bg%20(1).jpg");
		background-position: 0 0,0 0;
		background-size: auto,cover;
		background-repeat: repeat,no-repeat;
		opacity: .05;
	}
	.bg-gradient {
		position: fixed;
		z-index: -2;
		width: 100vw;
		height: 100vh;
		/* background-image: url("https://uploads-ssl.webflow.com/62c435401c8f7261df7dac30/62c44e50efe5bfb56fdc13a4_Andy-hooke-bg%20(1).jpg"); */
		background-color: #0D131C;
		background-position: 0 0;
		background-size: cover;
		background-repeat: no-repeat;
		opacity: 1;
	}
  </style>