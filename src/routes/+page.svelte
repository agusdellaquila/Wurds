<script>
	import axios from 'axios';
	import { onMount, afterUpdate } from 'svelte';
  
	let word = '';
	let definitions = [];
	let hasAudio = false;
	let showError = false;
  
	const getDefinitions = () => {
		// Reset the definitions array
		if (word.trim() === '') {
			definitions = [];
			return;
		}
		// Reset the hasAudio variable
		hasAudio = false;
		showError = false;
	
	  axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
		.then(response => {
		  // Update the definitions array with the response data
		  console.log(response.data);
		  definitions = response.data;
		})
		.catch(error => {
			// Handle any errors here
			console.error(error);
			hasAudio = false;
			word = '';
			showError = true;
		});
	};

	const handleKeyDown = event => {
		if (event.key === 'Enter') {
			getDefinitions();
		}
	};

	const setHasAudio = () => {
		hasAudio = true;
	};

	const changeWord = newWord => {
		word = newWord;
	};

	onMount(() => {
		getDefinitions();
	});

	afterUpdate(() => {
		if (showError) {
			const input = document.querySelector('.input');
			input.classList.add('error');
			setTimeout(() => {
				input.classList.remove('error');
			}, 1000);
		}
	});
</script>
  
<div>
	{#if definitions.length === 0}
		<section class="mt-60 w-9/12 mx-auto">
			<p class="text-7xl font-grifter mb-4 capitalize">Nothingness</p>

			<p class="text-2xl mb-4">/ˈnʌθɪŋnəs/ <span class="font-semibold ml-2 bg-gray-600 text-gray-500 w-28 sm:w-max bg-opacity-20 rounded-md px-2 py-1 lg:p-4 text-md">noun</span></p>
			
			<p class="text-lg">State of nonexistence; the condition of being nothing.</p>
		</section>
	{:else}
		<section class="mt-48 w-9/12 mx-auto">
			<div class="flex flex-col gap-y-4">
				{#each definitions as word, index}
					<div>
						{#if index === 0}
							<p> <span class="text-7xl font-grifter capitalize">{word.word}</span> <span class="ml-4 text-2xl">{word.phonetic !== undefined ? word.phonetic : ""}</span> </p>
						{/if}

						<div class="mt-8">
							<p class="font-semibold bg-gray-600 text-gray-500 w-28 sm:w-max bg-opacity-20 rounded-md px-2 py-1 lg:p-4 text-md">{word.meanings[0].partOfSpeech}</p>
							
							<p class="text-lg my-4">{word.meanings[0].definitions[0].definition}</p>
	
							<div class="flex flex-col justify-start items-start">
								{#if word.meanings[0].synonyms.length !== 0}
									<div class="flex justify-center items-center">
										<p class="text-gray-600">Synonyms:</p>
										<div class="flex flex-wrap gap-x-2 ml-2">
											{#each word.meanings[0].synonyms as syn}					
												<button on:click={() => { changeWord(syn); setTimeout(getDefinitions, 0);}} class="text-sm underline">
													{syn}
												</button>
											{/each}
										</div>
									</div>
								{/if}
								{#if word.meanings[0].antonyms.length !== 0}
									<div class="flex justify-center items-center">
										<p class="text-gray-600">Antonyms:</p>
										<div class="flex flex-wrap gap-x-2 ml-2">
											{#each word.meanings[0].antonyms as ant}					
												<button on:click={() => { changeWord(ant); setTimeout(getDefinitions, 0);}} class="text-sm underline">
													{ant}
												</button>
											{/each}
										</div>
									</div>
								{/if}
							</div>
							
							{#each word.phonetics as phoneticAudio}
								{#if phoneticAudio.audio !== '' && !hasAudio}
									{#if phoneticAudio.audio.includes('us.mp3')}
											<audio controls>
												<source src={phoneticAudio.audio} type="audio/mpeg">
											</audio>
										{:else}
											<audio controls>
												<source src={phoneticAudio.audio} type="audio/mpeg">
											</audio>
									{/if}
									{setHasAudio()}
									{console.log(hasAudio)}
								{/if}
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}
		
	<div class="fixed w-full bottom-0 flex justify-center">
		<div class="inset-x-1/4 flex gap-x-4 px-20">
		  <div class="input-wrapper">
			<input bind:value={word} on:keydown={handleKeyDown} type="text" placeholder="Search for a wurd" name="text" class="input">
		  </div>
		  <button on:click={getDefinitions} class="btn font-grifter">Search</button>
		</div>
		<div class="absolute bottom-0 right-2">
			<p class="text-xs text-gray-500">For the &lt;3 of my life, Abril</p>
		</div>
	</div>	  
</div>

<style>
	.input-wrapper input {
		background-color: #eee;
		border: none;
		padding: 1rem;
		font-size: 1rem;
		border-radius: 1rem;
		box-shadow: 0 0.4rem #dfd9d9;
		cursor: pointer;
		width: 24rem;
	}

	button.btn {
		color: #382b22;
		padding: 1em;
		background: #fff0f0;
		border: 2px solid #b18597;
		margin-bottom: 0.5rem;
		border-radius: 0.75em;
		-webkit-transform-style: preserve-3d;
		transform-style: preserve-3d;
		-webkit-transition: background 150ms cubic-bezier(0, 0, 0.58, 1), -webkit-transform 150ms cubic-bezier(0, 0, 0.58, 1);
		transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1), -webkit-transform 150ms cubic-bezier(0, 0, 0.58, 1);
	}

	button.btn::before {
		position: absolute;
		content: '';
		width: 100%;
		height: 75%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 40;
		background: #f9c4d2;
		border-radius: inherit;
		-webkit-box-shadow: 0 0 0 2px #b18597, 0 0.625em 0 0 #ffe3e2;
		box-shadow: 0 0 0 2px #b18597, 0 0.625em 0 0 #ffe3e2;
		-webkit-transform: translate3d(0, 0.75em, -1em);
		transform: translate3d(0, 0.75em, -1em);
		transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1), -webkit-transform 150ms cubic-bezier(0, 0, 0.58, 1), -webkit-box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
	}

	button.btn:hover {
		background: #ffe9e9;
		-webkit-transform: translate(0, 0.25em);
		transform: translate(0, 0.25em);
	}

	button.btn:hover::before {
		-webkit-box-shadow: 0 0 0 2px #b18597, 0 0.5em 0 0 #ffe3e2;
		box-shadow: 0 0 0 2px #b18597, 0 0.5em 0 0 #ffe3e2;
		-webkit-transform: translate3d(0, 0.5em, -1em);
		transform: translate3d(0, 0.5em, -1em);
	}

	button.btn:active {
		background: #ffe9e9;
		-webkit-transform: translate(0em, 0.75em);
		transform: translate(0em, 0.75em);
	}

	button.btn:active::before {
		-webkit-box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
		box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
		-webkit-transform: translate3d(0, 0, -1em);
		transform: translate3d(0, 0, -1em);
	}


	input.input:focus {
		outline-color: #A07085;
	}

	input.input.error:focus {
		outline-color: red !important;
	}
  </style>
  