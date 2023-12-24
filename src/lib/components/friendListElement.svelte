<script lang="ts">
    import defaultPFP from '$lib/assets/defaultPFP.png';
    export let username:string = "";
    export let sender_PFP:string = defaultPFP;
    export let friendRequestElement:HTMLElement | null = null;
    export let id:string = "";
</script>

<div bind:this={friendRequestElement} class="min-h-20 p-3 flex flex-col justify-center items-center text-2xl text-white">
    <a href={"/profile/"+id} class="flex justify-between p-4 w-full items-center">
        <img 
        class="rounded-full"
        width="72"
        height="72"
        src={sender_PFP}
        alt="sender_PFP"/>

        <p>{username}</p>
    </a>

    <div class="flex w-full justify-evenly">
    </div>
</div>