<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    import Button_3D from "./Button_3D.svelte";

    const dispatch = createEventDispatcher();
    export let title:string = "";
    export let showButtons = true;

</script>

<div transition:fade={{duration:100}} class="fixed w-full h-full bg-black 
        z-20 top-0 left-0 bg-opacity-90">

    <div class="absolute w-4/5 max-w-md min-h-2/3 bg-[#242526] text-white
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl
        border-solid border-4 border-white min-w-fit">

    <p class="text-center text-2xl font-semibold p-4">{title}</p>

    <slot/>

    </div>

    {#if showButtons}
        <div class="flex gap-12 fixed -z-50 left-1/2 -translate-x-1/2 bottom-4 text-white">
            <Button_3D on:click={()=>dispatch("submit")} color="#242526">submit</Button_3D>
            <Button_3D on:click={()=>dispatch("cancel")} color="red">cancel</Button_3D>
        </div>
    {/if}

</div>