<script lang="ts">
  import { getHeaders } from "$lib/helpers/facade";
  import { error } from "@sveltejs/kit";
    import Button_3D from "./Button_3D.svelte";

    export let id:string;
    let postContent:string = "";

    let sendPost = async ()=>{
        if(postContent.length <3)
            return error(405,{
                message:"Empty message"
        });

        const request:RequestInit = {
            method:"POST",
            headers:getHeaders(),
            body:JSON.stringify({
                postText:postContent,
                id
            })
        }
        const x = await fetch("/api/make_post",request);

        if(!x.ok)
            error(404,{
                message:"somthing went worng"
            })

            postContent = "";
    }

</script>
<div class="min-[950px]:w-1/2 w-2/3 bg-[#303132] my-6 p-2 rounded-xl
        mx-auto h-fit">

    <div class=" min-h-96 bg-[#202122] rounded-xl
            p-8 mx-auto
            w-full">

        <p class="mb-6 text-white text-3xl">
            Write a post
        </p>

        <div bind:innerText={postContent} contenteditable="true" class="w-full
                text-white bg-black bg-opacity-20 
                p-6 py-4 rounded-3xl text-xl outline-none"/>
            <div class="flex justify-end pr-6 pt-2">
                <Button_3D color="white" on:click={sendPost}>
                    <p class="text-2xl font-semibold">POST</p>  
                    <svg width="26" height="26" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2"/>
                    </svg>
                </Button_3D>
            </div>
    </div>
</div>