<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { getHeaders, getUserData } from "$lib/helpers/facade";
    import { page } from "$app/stores";
    import Post from "$lib/components/Post.svelte";
    import SearchBar from "$lib/components/SearchBar.svelte";
    import SettingsTools from "$lib/components/SettingsTools.svelte";
    import DEFAULT_PFP from "$lib/assets/defaultPFP.png";
    import { error } from "@sveltejs/kit";

    let PFP = DEFAULT_PFP;
    let username = "";
    let settingsChecked = false;
    let settingsPopup:any;

    let init = ()=>{
        document.addEventListener("click",(e:any)=>{
            if(e.target != settingsPopup
            && !settingsPopup?.contains(e.target)
            && settingsChecked){
                settingsChecked = false;
            }
            
        });
    };

    let settingsSet = (e:any)=>{
        if(settingsChecked)
        setTimeout(()=>settingsChecked = false,50)

        setTimeout(()=>settingsChecked = !settingsChecked,20)
    }

    let load = async ()=>{

        const request:RequestInit = {
        method:"POST",
        headers:getHeaders(),
        body:JSON.stringify({
            id:$page.params.post
        })
    };

    const x = await fetch("/api/get_post_by_id",request)

    if(!x.ok)
        error(405,{
            message:"somthing went worong"
        })

    let data = await x.json();

    let userData = await getUserData();

    console.log(data);

    return {
        data,
        userData
    };

    }

    onMount(init);

    onMount(()=>{
        document.body.style.overflowY = "auto";
    })

</script>
<div class="flex flex-col justify-start items-center bg-[#242526] w-full min-h-full">

{#await load()}
    <header class="w-full h-24 bg-[#293031] flex justify-between items-center">

        <button class="min-[740px]:w-72 p-4 hidden justify-around items-center
                min-[550px]:flex">
            <img src={PFP}
            class="rounded-full"
            width="72"
            height="72"
            alt="PFP"/>

            <p class="text-lg font-semibold text-white hidden 
            min-[620px]:text-2xl min-[740px]:block">
                {username}
            </p>
        </button>

        <SearchBar/>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="min-[740px]:w-72 ">

        {#if settingsChecked}
        <SettingsTools bind:currentElement={settingsPopup} />
        {/if}

            <!-- svelte-ignore missing-declaration -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click={settingsSet} class="m-6 ml-auto p-1 w-[60px] cursor-pointer bg-white rounded-full
            hover:rotate-90 transition duration-[400ms]
            hover:text-white hover:bg-black">
            <svg width="52" height="52" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088l-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36l-116.224-25.088l-65.28 113.152l79.68 88.192l-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136l-79.808 88.192l65.344 113.152l116.224-25.024l22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152l24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296l116.288 25.024l65.28-113.152l-79.744-88.192l1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136l79.808-88.128l-65.344-113.152l-116.288 24.96l-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384a192 192 0 0 1 0-384m0 64a128 128 0 1 0 0 256a128 128 0 0 0 0-256"/>
            </svg>
        </div>
    </div>
    </header>
{:then {data,userData}}


<header class="w-full h-24 bg-[#293031] flex justify-between items-center">

    <button on:click={()=>goto("/profile/"+userData._id)} class="min-[740px]:w-72 p-4 hidden justify-around items-center
            min-[550px]:flex">
        <img src={userData.pfp}
        class="rounded-full"
        width="72"
        height="72"
        alt="PFP"/>

        <p class="text-lg font-semibold text-white hidden 
        min-[620px]:text-2xl min-[740px]:block">
            {userData.username}
        </p>
    </button>

    <SearchBar/>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="min-[740px]:w-72 ">

    {#if settingsChecked}
    <SettingsTools bind:currentElement={settingsPopup} />
    {/if}

        <!-- svelte-ignore missing-declaration -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div on:click={settingsSet} class="m-6 ml-auto p-1 w-[60px] cursor-pointer bg-white rounded-full
        hover:rotate-90 transition duration-[400ms]
        hover:text-white hover:bg-black">
        <svg width="52" height="52" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088l-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36l-116.224-25.088l-65.28 113.152l79.68 88.192l-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136l-79.808 88.192l65.344 113.152l116.224-25.024l22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152l24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296l116.288 25.024l65.28-113.152l-79.744-88.192l1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136l79.808-88.128l-65.344-113.152l-116.288 24.96l-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384a192 192 0 0 1 0-384m0 64a128 128 0 1 0 0 256a128 128 0 0 0 0-256"/>
        </svg>
    </div>
</div>
</header>

<main class="w-full min-h-full bg-[#242526]
        flex flex-col justify-center p-6">
    <Post 
    comments={data.comments}
    PFP={data.poster.pfp}
    username={data.poster.username}
    posterId={data.poster._id}
    postText={data.post}
    showComments={true}
    postId={data._id}
    />
</main>

{/await}
</div>