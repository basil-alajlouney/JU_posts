<script lang="ts">

    import { slide,fade } from "svelte/transition";
    import NotificationElement from "./NotificationElement.svelte";
    import FriendListElement from "./friendListElement.svelte";

    let show=false;
    let ShowFriends = false;
    export let id = "";
    export let data:any[] = [];
    export let friends:any[] = [];

</script>
{#if show}
<div transition:slide={{axis:"x"}}
class="h-full min-[340px]:w-80 w-52 bg-[#191919] border-l-4 border-white first-letter:
    flex flex-col overflow-y-auto scrollbar-thin scrollbar-track-transparent
    scrollbar-thumb-[rgba(255,255,255,0.05)]">
        <div class="w-full h-16 flex">
            <input bind:checked={ShowFriends} class="hidden" type="checkbox" id="slider"/>

            <label for="slider" class="switch bg-white 
                bg-opacity-20 h-full w-1/2 transition
                ease-in-out duration-300">
                <p class="text-xl text-center cursor-pointer
                        text-white font-semibold">
                    {@html ShowFriends? "FRIEND<br>LIST":"FRIEND<br>REQUEST"}
                    
                </p>
            </label>
        </div>
    <hr/>

    {#if ShowFriends}

    {#each friends as entry}
        <FriendListElement
        id={entry._id}
        username={entry.username}
        sender_PFP={entry.pfp}
        />
        <hr>
    {/each}

    {:else}
        {#each data as entry}
            <NotificationElement
            isFriendRequest={true}
            sender_PFP={entry.pfp}
            username={entry.username}
            userId={id}
            id={entry._id}
            />
        {/each}
    {/if}

</div>

{/if}

<button on:click={()=>show = !show} class="w-10 h-10 bg-white -translate-x-1/2 rounded-full
    absolute top-1/2 flex items-center">

    {#if show}
    <svg transition:fade class="rotate-180" width="48" height="48" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" fill-rule="evenodd" d="M7.222 9.897c2.3-2.307 4.548-4.559 6.744-6.754a.65.65 0 0 0 0-.896c-.311-.346-.803-.316-1.027-.08c-2.276 2.282-4.657 4.667-7.143 7.156c-.197.162-.296.354-.296.574c0 .221.099.418.296.592l7.483 7.306a.749.749 0 0 0 1.044-.029c.358-.359.22-.713.058-.881a3407.721 3407.721 0 0 1-7.16-6.988"/>
    </svg>
    {:else}
    <svg transition:fade width="48" height="48" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" fill-rule="evenodd" d="M7.222 9.897c2.3-2.307 4.548-4.559 6.744-6.754a.65.65 0 0 0 0-.896c-.311-.346-.803-.316-1.027-.08c-2.276 2.282-4.657 4.667-7.143 7.156c-.197.162-.296.354-.296.574c0 .221.099.418.296.592l7.483 7.306a.749.749 0 0 0 1.044-.029c.358-.359.22-.713.058-.881a3407.721 3407.721 0 0 1-7.16-6.988"/>
    </svg>
    {/if}

</button>

<style>
    input[type="checkbox"]:checked ~ .switch{
        transform: translate(100%);
    }
</style>