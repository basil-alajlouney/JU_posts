<script lang="ts">
    import { goto } from "$app/navigation";
    import { postElementId } from "$lib/index";
    import { getHeaders, getUserData } from "$lib/helpers/facade";
    import { error } from "@sveltejs/kit";
    import { page } from "$app/stores";
    import Comment from "./comment.svelte";
    import DEFAULT_PFP from "$lib/assets/defaultPFP.png";
    import Button_3D from "./Button_3D.svelte";


    export let PFP:string = DEFAULT_PFP;
    export let username = "Lorem Ipsum_2_";
    export let posterId:string = "";
    export let postText:string = "";
    export let showComments:boolean = false;
    export let postId:string = "";
    export let comments:any[];
    // export let isLiked:boolean = false;

    let id:string = "like" + $postElementId++;
    let commentText:string = "";

    let posterProfileInit = ()=>{
        goto("/profile/"+posterId);
        setTimeout(() =>
            location.reload()
        , 100);
    }

    let sentComment = async ()=>{

        if(!commentText.length)
            error(405,{
                message:"somthing went wrong"
            })

        const userData = await getUserData();
        const body = {
                comment:commentText,
                commenterId:userData._id,
                postId:$page.params.post
            };

            console.log(body);
        const request:RequestInit = {
            method:"POST",
            headers:getHeaders(),
            body:JSON.stringify(body)
    };

    const x = await fetch("/api/make_comment",request);

    if(!x.ok)
        error(401,{
            message:"somthing went worng"
        })

    commentText = "";
    location.reload();
    }
</script>

<div class="min-[950px]:w-1/2 w-2/3 bg-[#303132] my-6 p-2 rounded-xl
        mx-auto h-fit min-w-fit">

    <div class=" min-h-96 bg-[#202122] rounded-xl
            p-8 mx-auto w-full">
        <button on:click={posterProfileInit} class="flex flex-wrap items-center">
            <img src={PFP ?? DEFAULT_PFP}
                class="rounded-full mx-4 mr-8"
                width="86"
                height="86"
                alt="PFP">

            <p class="text-xl text-white font-semibold">
                {username}
            </p>
        </button>

        <p class="my-12 text-lg text-white">
            {postText}
        </p>

        <div class="w-full h-9 flex justify-around px-6 py-1
                items-center text-white">

            <!-- <input class="hidden" type="checkbox" bind:value={isLiked} {id}/>
            <label for={id} class="like font-semibold text-2xl flex hover:text-blue-500
            duration-300 cursor-pointer">
            <span class="hidden min-[450px]:block">
                Likes  
            </span>
                <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2M20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2"/>
                </svg>
            </label> -->

            <!-- <div class="h-full w-1 bg-gray-500 bg-opacity-30 rounded-full
                    mx-2"/> -->

            <button on:click={()=>goto("/dashboard/"+postId)} class="font-semibold text-2xl hover:text-blue-500
            duration-300 cursor-pointer flex items-center">
                <span class="hidden min-[450px]:block">
                    Comments  
                </span>
                <svg class="" width="28" height="28" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32m0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2l-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29c7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1l-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160s-93.3 160-208 160"/>
                </svg>
            </button>
            
        </div>
    </div>
    {#if showComments}
        <div>
            <div class="px-12">
                <input contenteditable="true"
                bind:value={commentText}
                placeholder="Write your Comment"
                class=" w-full  min-h-10 px-4 py-2 outline-none rounded-3xl bg-black bg-opacity-10
                        mt-6 mb-2 break-all text-xl text-
                        placeholder:underline placeholder:text-gray-300
                        placeholder:opacity-50 text-white"/>
            </div>

            <div class="flex justify-end pr-12">
                <Button_3D on:click={sentComment} color="white">
                    <p class="text-xl font-semibold">Comment</p>
                </Button_3D>
            </div>

            {#each comments as comment}
                <Comment
                username={comment.commenter[0].username}
                PFP={comment.commenter[0].pfp}
                commentText={comment.comment}
                />
            {/each}
        </div>
    {/if}
</div>

<!-- <style>
    input[type='checkbox']:checked + .like{
        color: rgb(22, 116, 147)    }
</style> -->