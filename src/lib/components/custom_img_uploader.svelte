<script lang="ts">
    import Button_3D from "./Button_3D.svelte";
    import DEFAULT_PFP from "$lib/assets/defaultPFP.png";

    export let name:string = "";

    let fileInput:HTMLInputElement; 

    let PFP = DEFAULT_PFP;

    const uploadInit = (e:Event)=>{
        e.preventDefault();
        fileInput?.click();
    };

    const changeInit = ()=>{
        PFP = URL.createObjectURL(fileInput!.files![0]);
    };
</script>
<div class="flex justify-between">
    <input {name} class="hidden" on:change={changeInit} bind:this={fileInput} type="file">
    <div class="rounded-xl">
        <img class="rounded-lg object-cover w-[86px] h-[86px]"
        src={PFP}
        alt="PFP">
    </div>

    <div class="mt-auto mb-3">
        <Button_3D on:click={uploadInit}>choose</Button_3D>
    </div>
</div>