<script lang="ts">
    import Button_3D from "./Button_3D.svelte";
    import { createEventDispatcher, onMount } from "svelte";
    import { page } from "$app/stores";
    import { getUserData } from "$lib/helpers/facade";
    import DEFAULT_PFP from "$lib/assets/defaultPFP.png";

    export let PFP = DEFAULT_PFP;
    export let username:string = "";
    export let dateJoined:string = "";
    export let friendsCount:number = -99;

    let editName:boolean = true;
    let usernameElement:HTMLElement & {value:string};
    let dispatch = createEventDispatcher();
    let loaded = false;

    let self = false;
    let isFriend = false;

    let saveChanges = ()=>{
        if(usernameElement.value == ""
        && !usernameElement.value.match(/^[a-zA-Z][a-zA-Z0-9_ ]{4,21}$/g))
            throw new Error(":/");
        editName = false;
        changed = false;
        dispatch("saveChanges");
    };

    $: changed = !editName;

    onMount(async ()=>{
        let userData = await getUserData();
        self = userData._id == $page.params.id;
        let friends = userData.friends.map((a:any)=>a._id);
        isFriend = friends.includes($page.params.id);
        loaded = true;
    })

</script>
<div class=" mx-auto min-w-[245px] w-1/4
        p-4">

        <div class="w-full min-h-fit bg-white rounded-xl p-4
                flex flex-col justify-between">

            <img src={PFP ?? DEFAULT_PFP} alt="PFP"
            class="rounded-full mx-auto"
            width="256"
            >

            <span class="text-center text-xl font-semibold my-3
                    flex justify-between">
                <input
                class="w-2/3"
                type="text" 
                bind:this={usernameElement}
                bind:value={username}
                disabled={editName}
                />

                {#if self}
                <button on:click={()=>{
                    editName = false
                    setTimeout(() =>usernameElement.focus(), 10);
                    }} class="rounded-lg hover:bg-gray-200 duration-200
                        cursor-pointer">
                    <svg width="32" height="32" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M17 4a2.121 2.121 0 0 1 0 3l-9.5 9.5l-4 1l1-3.944l9.504-9.552a2.116 2.116 0 0 1 2.864-.125zM9.5 17.5h8m-2-11l1 1"/>
                    </svg>
                </button>
                {/if}

            </span>

            <span class="text-center text-xl font-semibold my-3
                    flex justify-between">
                <p>Joined</p>
                <p>{dateJoined}</p>
            </span>

            <span class="text-center text-xl font-semibold my-3
                    flex justify-between">
                <p>Friends</p>
                <p>{friendsCount}</p>
            </span>

            
        </div>
        
        <div class="w-full flex flex-col p-5 flex-grow text-2xl font-semibold">
            {#if changed}

            <Button_3D 
            on:click={saveChanges} 
            color="green">Save Changes</Button_3D>

            {:else if loaded && !self && !isFriend}

            <Button_3D on:click={e=>dispatch("addfriend",e)} color="green"><p class="whitespace-nowrap">Add Friend +</p></Button_3D>

            {/if}

        </div>

        </div>