<script lang="ts">
  import { fade } from "svelte/transition";
  import GreenSwitch from "./greenSwitch.svelte";
  import { goto } from "$app/navigation";
  import { getUserData, getHeaders } from "$lib/helpers/facade";
  import { error } from "@sveltejs/kit";

    export let currentElement:Element;
    export let visibleToSearch:boolean | null = null;
    // getUserData()
    // .then((e)=>visibleToSearch = e.visible)

    let changeVisibility = async ()=>{
        const userData = await getUserData();

        const request:RequestInit = {
            method:"POST",
            headers:getHeaders(),
            body:JSON.stringify({
                id:userData._id,
                visibility:visibleToSearch
            })
        }

        const x = await fetch("/api/update_visibility",request);

        if(!x.ok)
            error(404,{
                message:"there is an error"
            });
    };

</script>
<div bind:this={currentElement} class="w-[20rem] top-24 bg-white absolute
        min-[415px]:-translate-x-full -translate-x-[80%]
        min-[415px]:top-20 min-[415px]:rounded-l-2xl rounded-b-2xl
        min-[950px]:-translate-x-[40%] min-[740px]:-translate-x-[60%]"
    transition:fade={{duration:100}}>

    <!-- <div class="w-full h-16 rounded-tl-[15px] p-5 cursor-pointer
            border-solid border-black flex justify-between items-center
            font-semibold border-b-2">
        <p class="text-xl">Visible on search</p>
        <GreenSwitch
        on:click={changeVisibility}
        bind:checked={visibleToSearch}/>
    </div> -->
 
    <div class="w-full h-16 p-5 cursor-pointer
            border-solid border-black flex items-center
            font-semibold border-b-2 hover:bg-gray-200">
        <p class="text-xl">Credits</p>
    </div>
 
    <button on:click={async ()=>
                goto("/profile/" + (await getUserData())._id)} class="w-full h-16 p-5 cursor-pointer
            border-solid border-black flex items-center
            font-semibold border-b-2 hover:bg-gray-200">
        <p class="text-xl">Profile</p>
    </button>
 
    <button on:click={async ()=>
                goto("/dashboard")} class="w-full h-16 p-5 cursor-pointer
            border-solid border-black flex items-center
            font-semibold border-b-2 hover:bg-gray-200">
        <p class="text-xl">Dashboard</p>
    </button>
 
    <button on:click={()=>{
        document.body.style.overflowY = "hidden";
        localStorage.removeItem("JU_POSTS_SESSION_ID");
        goto("/login")
        }} class="w-full h-16 p-5 rounded-b-[15px]
            flex justify-between items-center
            font-semibold bg-red-500 cursor-pointer
            hover:bg-red-700 transition text-white">
        <p class="text-xl text-center">Log out</p>
    </button>
 
</div>