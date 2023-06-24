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
	<section class="flex flex-col items-center justify-center w-full h-screen">
			<div class="w-9/12 mx-auto">
			<p class="mb-4 text-5xl capitalize sm:text-7xl font-grifter">Nothingness</p>
		
			<p class="mb-4 text-lg sm:text-2xl">
				/ˈnʌθɪŋnəs/
				<span class="w-auto px-2 py-1 ml-2 text-sm font-semibold text-orange-600 bg-orange-400 rounded-md bg-opacity-20 sm:text-md">noun</span>
			</p>
		
			<p class="my-4 text-xl font-semibold">State of nonexistence; the condition of being nothing.</p>
		
			<!-- <div class="absolute text-xs font-semibold bottom-28">Try searching for a <button on:click={() => { changeWord('word'); setTimeout(getDefinitions, 0);}} class="text-emerald-500 font-grifter">wurd</button></div>
			</div> -->
		</section>
	{:else}
		<section class="flex flex-col items-center justify-center w-full h-screen px-10 pt-20 pb-32 mx-auto">
			<div class="flex flex-col gap-y-4">
				{#each definitions as word, index}
					<div>
						{#if index === 0}
						<p>
							<span class={
							  `capitalize font-grifter ${word.word.length <= 7 ? 'text-7xl' : 'text-4xl'}`
							}>
							  {word.word}
							</span>
						  </p>
						  
						{/if}

						<div class="mt-2 rounded-lg sm:w-96">					  
							<p class="text-lg sm:text-2xl"> 
								<span class="text-2xl">{word.phonetic !== undefined ? word.phonetic : ""}</span>
							<span class="
									w-auto px-2 py-1 text-sm font-semibold rounded-md bg-opacity-20
									${word.meanings[0].partOfSpeech === 'noun' ? ' text-orange-600 bg-orange-400' :
									word.meanings[0].partOfSpeech === 'adjective' ? ' text-blue-600 bg-blue-400' :
									word.meanings[0].partOfSpeech === 'verb' ? ' text-green-600 bg-green-400' :
									word.meanings[0].partOfSpeech === 'adverb' ? ' text-purple-600 bg-purple-400' :
									word.meanings[0].partOfSpeech === 'pronoun' ? ' text-pink-600 bg-pink-400' :
									word.meanings[0].partOfSpeech === 'preposition' ? ' text-yellow-600 bg-yellow-400' :
									word.meanings[0].partOfSpeech === 'conjunction' ? ' text-teal-600 bg-teal-400' :
									word.meanings[0].partOfSpeech === 'interjection' ? ' text-red-600 bg-red-400' : ''
									}"
								  >
									{word.meanings[0].partOfSpeech}
								</span>	
							</p>
							
							<p class="my-4 text-xl font-semibold break-words w-inherit overflow-wrap">
								{word.meanings[0].definitions[0].definition}
							</p>
	
							<div class="flex flex-col items-start justify-start">
									{#if word.meanings[0].synonyms.length !== 0}
									<div class="flex items-center justify-center">
										<p class="font-semibold text-purple-300">Synonyms:</p>
										<div class="flex flex-wrap ml-2 gap-x-2">
										{#each word.meanings[0].synonyms.slice(0, 3) as syn}
											<button on:click={() => { changeWord(syn); setTimeout(getDefinitions, 0);}} class="text-sm underline">
											{syn}
											</button>
										{/each}
										</div>
									</div>
									{/if}
									{#if word.meanings[0].antonyms.length !== 0}
									<div class="flex items-center justify-center">
										<p class="font-semibold text-purple-300">Antonyms:</p>
										<div class="flex flex-wrap ml-2 gap-x-2">
										{#each word.meanings[0].antonyms.slice(0, 3) as ant}
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
		
	<div class="fixed bottom-0 flex flex-col items-center justify-center w-full">
		<div class="flex px-4 mb-4 sm:px-20 inset-x-1/4 gap-x-2 sm:gap-x-4">
		  <div class="input-wrapper">
			<input bind:value={word} on:keydown={handleKeyDown} type="text" name="text" class="input sm:w-96">
		  </div>
		  <button on:click={getDefinitions} class="btn font-grifter">Search</button>
		</div>
		<p class="text-xs text-gray-500">To the love of my life, Abril</p>
	</div>
</div>

<style>
	.input-wrapper input {
	  background-color: #eee;
	  border: none;
	  padding: 1rem;
	  font-size: 1rem;
	  border: 2px solid #A07085;
	  border-radius: 1rem;
	  box-shadow: 0 0.4rem #dfd9d9;
	  color: #beb8b8;
	  cursor: pointer;
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
	  color: #0D131C;
	}
  
	input.input.error:focus {
	  outline-color: red !important;
	}
</style>
  