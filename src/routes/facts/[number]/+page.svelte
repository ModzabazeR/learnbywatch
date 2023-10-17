<script lang="ts">
	import type { PageData } from "../../$types";


    export let data: any;
    console.log(data)
</script>

<main>
    <h1>{data.body.data}</h1>
</main>

<style>
    main {
        display: flex;
        height: 100vh;
        justify-content: center;
        align-items: center;
        /* gradient colorful background */
        background: linear-gradient(
            45deg,
            #ff0000,
            #ff8000,
            #ffff00,
            #00ff00,
            #00ffff,
            #0000ff,
            #ff00ff,
            #ff0000
        );
    }

    h1 {
        font-size: 2rem;
        font-weight: 700;
        color: #fff;
        text-shadow: 0 0 10px #000;
    }
</style>