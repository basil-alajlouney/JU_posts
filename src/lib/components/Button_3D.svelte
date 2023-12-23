<script lang="ts">
  import { onMount } from "svelte";

    let btnElement:HTMLButtonElement;
    export let color:string = "transparent";
    onMount(()=>
    btnElement.style.background = color
    );
</script>

<button bind:this={btnElement} class="border-solid border-2 border-black 
            min[350px]:py-2 md:py-3 min-[350px]:px-2 md:px-6
            rounded-md shadow-[5px_5px_0px_0px_black] my-2
            active:shadow-none transition flex items-center justify-center
            active:translate-x-[5px] active:translate-y-[5px]"
    on:click
    >
    <slot/>
</button>