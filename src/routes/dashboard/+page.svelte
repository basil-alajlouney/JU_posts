<script lang="ts">
    import { goto } from "$app/navigation";
    import { error } from "@sveltejs/kit";
    import { onMount } from "svelte";
    import { getHeaders, getUserData } from "$lib/helpers/facade";
    import Post from "$lib/components/Post.svelte";
    import Slider from "$lib/components/Slider.svelte";
    import WritePost from "$lib/components/writePost.svelte";
    import HeadersComponent from "$lib/components/headersComponent.svelte";

    let init = async ()=>
        document.body.style.overflowY = "auto";
    ;

    let load = async ()=>{
        const userData = await getUserData();

        // console.log(userData);
        if(userData?.message)
            goto("/login")

        const request:RequestInit={
            method:"POST",
            headers:getHeaders(),
            body:JSON.stringify({
                id:userData._id
            })
        }

        const x = await fetch("/api/get_friends_post",request)

        if(!x.ok)
            error(405,{
                message:"somthing went wrong"
            })

            let posts = await x.json() as any[];

            posts = posts.map(e=>{
                const {username, pfp} = e;
                e.posts = e.posts.map((x:any)=>({
                username,
                pfp,
                ...x
                }))
                return e.posts;
            })

            posts = posts.flatMap((e:any)=>e);

            posts = posts.sort((a:any,b:any)=>
                parseInt(a.datePosted) - parseInt(b.datePosted)
            )

            // console.log(userData);
            if(!posts.length)
                return {userData, posts:[]};

            return {
                posts,
                userData
            }
    }

    onMount(init);
</script>

<div class="flex flex-col bg-[#242526] w-full min-h-full">
{#await load()}
    <HeadersComponent/>
{:then {posts,userData}}

    <HeadersComponent
    username={userData.username}
    pfp={userData.pfp}
    id={userData._id}
    />

    <main class="w-full flex flex-col items-center">
        <WritePost
        id={userData?._id}
        />
        {#each posts as post}
                <Post
                username={post.username}
                postText={post.post}
                postId={post._id}
                posterId={post.poster[0]}
                PFP={post.pfp}
                comments={[]}
                />
        {/each}
    </main>

<div class="fixed top-0 right-0 h-full min-w-2 bg-white">

    <Slider
    data={userData?.pendingRequest ?? []}
    notifications={userData?.notification ?? []}
    friends={userData.friends ?? []}
    id={userData?._id ?? ""}
    />

</div>
{/await}
</div>
