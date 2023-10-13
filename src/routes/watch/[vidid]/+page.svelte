<script lang="ts">
    import VideoPlayer from "../../../components/VideoPlayer.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main class="flex flex-col items-center text-center p-8">
	<h1 class="text-3xl font-bold mb-4">{data.vidData.title}</h1>
	<p class="mb-4">{data.vidData.description}</p>
	<VideoPlayer vidid={data.vidData.vidid} subtitleData={data.subtitleData} />
</main>
