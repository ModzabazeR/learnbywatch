<script lang="ts">
    import VideoPlayer from "../../../components/VideoPlayer.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<VideoPlayer vidid={data.vidData.vidid} title={data.vidData.title} description={data.vidData.description} subtitleData={data.subtitleData} />
