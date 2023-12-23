<script lang="ts">
    import { goto } from "$app/navigation";
    import DEFAULT_PFP from "$lib/assets/defaultPFP.png";

    export let PFP:string = DEFAULT_PFP;
    export let username:string = "Lorem Ipsum_4_";
    export let id:string = "";

    let selectUser = ()=>{
        goto("/profile/"+id);

        setTimeout(() => {
            location.reload();
        }, 100);
    }

</script>

<button on:click={selectUser} class="w-full h-20 bg-[#2d3435]
        border-solid border-t border-gray-900
        last:border-none first:border-none
        flex p-2 items-center">
    <img class="rounded-full mx-6" width="72" src={PFP} alt="PFP">

    <p class="text-xl font-medium text-white">
        {username}
    </p>
</button>