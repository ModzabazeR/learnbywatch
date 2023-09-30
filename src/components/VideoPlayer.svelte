<script lang="ts">
	// Imports
	import type { Node } from 'subtitle';
	import YoutubePlayer from 'youtube-player';
	import { onMount } from 'svelte';
	import type { YouTubePlayer, Options } from 'youtube-player/dist/types';

	// Props
	export let vidid: string;
	export let title: string;
	export let description: string;
	export let subtitleData: Node[];

	// Variables
	let subtitleElement: HTMLParagraphElement;
	let subtitle: any;

	const secondsToMilliseconds = (seconds: number) => seconds * 1000;

	const updateSubtitle = (time: number) => {
		for (let i = 0; i < subtitleData.length; i++) {
			if (
				(subtitleData[i] as any).data.start <= secondsToMilliseconds(time) &&
				secondsToMilliseconds(time) <= (subtitleData[i] as any).data.end
			) {
				subtitle = subtitleData[i];
				subtitleElement.innerHTML = subtitle.data.text;
				break;
			}
		}
	};

	const updateTime = (lTime: number, cTime: number) => {
		if (lTime !== cTime) {
			lTime = cTime;
			updateSubtitle(cTime);
		}
		return lTime;
	};

	onMount(() => {
		let player: YouTubePlayer;
		player = YoutubePlayer('video-player', {
			videoId: vidid
		});

		const iframeWindow = player.getIframe().then((iframe) => iframe.contentWindow);
		let lastTimeUpdate = 0;

		window.addEventListener('message', async (event) => {
			if (event.source === (await iframeWindow)) {
				const data = JSON.parse(event.data);
				if (data.event === 'infoDelivery' && data.info && data.info.currentTime) {
					let currentTime = data.info.currentTime;
					lastTimeUpdate = updateTime(lastTimeUpdate, currentTime);
				}
			}
		});
	});
</script>

<head>
	<title>{title} | LearnByWatch</title>
</head>

<div class="flex flex-col items-center text-center p-8">
	<h1 class="text-3xl font-bold mb-4">{title}</h1>
	<p class="mb-4">{description}</p>
	<div class="relative w-3/4 aspect-video">
		<div id="video-player" class="absolute w-full h-full" />
		<div class="absolute bottom-5 w-full items-center text-center p-5">
			<p class="text-2xl md:text-base sm:text-xs font-bold text-white" bind:this={subtitleElement} />
		</div>
	</div>
</div>
