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
  import HeadersComponent from "$lib/components/headersComponent.svelte";

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
    <HeadersComponent/>
{:then {data,userData}}

<HeadersComponent
    id={userData._id}
    pfp={userData.pfp}
    username={userData.username}
    />

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