<script lang="ts">
  import { onMount } from "svelte";
  import type { Style } from "svelte/types/compiler/interfaces";

    export let rotation:string | null = null;
    export let offset:string | null = null;
    let thisElement:any;
    onMount(()=>{
        document.getElementById("");
        thisElement.style.rotate = rotation;
        thisElement.style.translate = offset;
        console.log()
    })
</script>

    <div bind:this={thisElement} class="bg-black bg-opacity-30
        -translate-x- aspect-square w-2/3 rounded-3xl
        absolute top-0 left-0 z-0"/>