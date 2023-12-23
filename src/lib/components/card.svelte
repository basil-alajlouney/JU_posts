<script lang="ts">
import DEFAULT_PFP from "$lib/assets/defaultPFP.png";
import {slide} from "svelte/transition";
import {cardId} from "$lib/index";

export let pfp:string = DEFAULT_PFP;
export let username:string = "lorem ispum";
export let email:string = "biteeunkillable@gmail.com";
export let date:string = "DD/MM/YYYY";
export let postsCount:number = 0;
export let friendsCount:number = 0;
export let frineds:string[] = ["lorem ipsum","smothing dolor"];
let isDropped:boolean = false;
</script>

<div class="w-full max-w-md h-64 bg-white rounded-2xl m-2 my-6 p-4
        flex flex-col justify-around">
    <div class="flex items-center">
        <img src={pfp} width="96" class="rounded-full" alt="DEFAULT_PFP"/>
        <p class="text-2xl font-semibold mx-4">{username}</p>
    </div>
    <p class="text-xl">{email}</p>
    <p class="text-xl">{date}</p>
    <div class="flex justify-between">
        <p class="text-xl">posts made: {postsCount}</p>
        <div>
            <input class="hidden" bind:checked={isDropped} type="checkbox" name="friendList" id={"card"+$cardId}>
            <label for={"card"+$cardId++} class="friendList text-xl flex items-center
                    border-solid border-2 border-black p-1 rounded-sm">
                    friends: {friendsCount} 
                <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1 1 0 0 1 1.41.15a1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16"/>
                </svg>
            </label>

            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            {#if isDropped}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div 
                    transition:slide={{axis:"y"}} 
                    class="drop-down absolute translate-y-2 
                        bg-white border-solid border-2 
                        border-black">
                    
                    {#each frineds as frined}
                        <p class="text-center p-2 font-semibold border-solid
                        border-b-2 border-black last:border-0 whitespace-nowrap hover:bg-gray-300
                        ">{frined}</p>
                        {/each}
                </div>
            {/if}

        </div>
    </div>
</div>

<style>
    .friendList svg{
        transform: rotate(0deg);
        transition: transform 0.3s linear;
    }
    input[type="checkbox"]:checked + .friendList svg{
        transform: rotate(180deg);
        transition: transform 0.3s linear;
    }
</style>