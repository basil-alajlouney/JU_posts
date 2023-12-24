<script lang="ts">
    import Card from "$lib/components/card.svelte";
    import LOGO from "$lib/assets/Logo.svg";
    import { getHeaders, getUserData } from "$lib/helpers/facade";
    import { error } from "@sveltejs/kit";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let getData = async ()=>{
        const {username} = await getUserData();

        const request:RequestInit = {
            method:"POST",
            headers:getHeaders(),
            body:JSON.stringify({username})
        };


        if(username != "ADMIN")
            throw error(401,{
                message:"this is accessable only to tha admin of the website"
            })

        const x = await fetch("/api/get_all_users",request);

        if(!x.ok)
            error(401,{
                message:"somthing went wrong"
            });

        const data = await x.json();

        // console.log(data);   

        return data;
    }

    onMount(()=>{
        document.body.style.overflowY = "auto";
    })

</script>
{#await getData()}
    <!-- waiting -->
{:then users}
<main class="w-full min-h-full bg-[#101010]">
    <header class="w-full h-20 bg-gray-700 px-4 flex justify-between items-center">
        <img width="68" src={LOGO} alt="LOGO"/>

        <p class="text-2xl font-semibold text-white"> Admin here</p>

        <button on:click={()=>{
            localStorage.removeItem("JU_POSTS_SESSION_ID")
            goto("/login")
            }}
        class="text-white p-2 bg-red-500 hover:bg-red-800 transition rounded-full">
            <svg width="52" height="52" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
                    <path stroke-linejoin="round" d="m15.667 8l2.083 2.5L15.667 8Zm0 5l2.083-2.5l-2.083 2.5Z" clip-rule="evenodd"/>
                    <path d="M16.5 10.5H10m-6-7h9m-9 14h9m0-14v4m0 6v4m-9-14v14"/>
                </g>
            </svg>
        </button>

    </header>
    <div class="w-full p-12 flex flex-wrap justify-around">
        {#each users as user,i}
            <Card
            labelsId={i}
            id={user._id}
            postsCount={user.posts.length}
            pfp={user.pfp}
            frineds={user.friends}
            friendsCount={user.friends.length}
            email={user.email}
            date={new Date(user.dateJoined).toLocaleDateString()}
            username={user.username}
            />
        {/each}
    </div>

</main>
{/await}

<style>
    :global(body){
        overflow: auto;
    }
</style>