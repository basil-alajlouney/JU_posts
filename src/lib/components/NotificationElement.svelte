<script lang="ts">
    import Button_3D from "./Button_3D.svelte";
    import DEFAULT_PFP from "$lib/assets/defaultPFP.png";
    import { getHeaders } from "$lib/helpers/facade";
  import { error } from "@sveltejs/kit";

    export let sender_PFP = DEFAULT_PFP;
    export let isFriendRequest:boolean = false;
    export let username = "Lorem Ipsum_1_";
    export let id = "";
    export let userId = "";

    let friendRequestElement:HTMLElement;

    let acceptRequest = async ()=>{
        const request:RequestInit = {
            method:"POST",
            headers:getHeaders(),
            body:JSON.stringify({
                senderId:id,
                reciverid:userId
            })
        };

        const x = await fetch("/api/accept_friend_request",request);

        if(!x.ok)
            return error(404,{
        message:"somthing went wrong"
    })

    friendRequestElement.remove();

    }

    let declineRequest = async ()=>{
        const request:RequestInit = {
            method:"POST",
            headers:getHeaders(),
            body:JSON.stringify({
                senderId:id,
                reciverid:userId
            })
        };

        const x = await fetch("/api/decline_friend_request",request);

        if(!x.ok)
            return error(404,{
        message:"somthing went wrong"
    })

    friendRequestElement.remove();
    }

</script>

{#if isFriendRequest}
    <div bind:this={friendRequestElement} class="min-h-20 p-3 flex flex-col justify-center items-center text-2xl text-white">
        <p class="text-center">Friend Request</p>

        <a href="/profile/12" class="flex justify-between p-4 w-full items-center">
            <img 
            class="rounded-full"
            width="72"
            src={sender_PFP}
            alt="sender_PFP"/>

            <p>{username}</p>
        </a>

        <div class="flex w-full justify-evenly">
            <Button_3D on:click={acceptRequest} color="green">accept</Button_3D>
            <Button_3D on:click={declineRequest} color="red" >decline</Button_3D>
        </div>
    </div>
{:else}
    <div class="h-fit min-h-20 p-3 flex justify-center items-center text-2xl text-white">
        <p class="text-center">
            <span class="text-red-600 font-bold">
                Notification message !
                <br>
            </span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic minus, vel soluta dolor debitis sequi asperiores iusto reprehenderit adipisci facere sed, cumque natus repellat praesentium necessitatibus quaerat, eveniet numquam reiciendis.
        </p>
    </div>
{/if}
<hr>