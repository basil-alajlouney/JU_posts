<script lang="ts">

    export let options:any[] = [];
    export let title:string = "drop-down-";
    export let value:string = "Select";

    let id = JSON.stringify(Math.random());
    let checked:boolean;
</script>

<div class="my-4">

    <input bind:checked={checked} class="hidden" type="checkbox" id={title+id}>
    <label for={title+id} class="border-solid border-2 border-black
            p-1 flex text-xl items-center w-40 justify-between">
        <p>{value}</p>
        <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1 1 0 0 1 1.41.15a1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16"/>
        </svg>
    </label>

    <div class="list absolute bg-white z-[999]
        flex flex-col mx-auto w-40 translate-y-2 max-h-36
        overflow-y-auto scrollbar-thin ">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        {#each options as option}
        <span on:click={()=>(value = title = option) && (checked = false)}
        class="border-solid last:border-0 border-black text-black 
        border-b-2 text-center text-lg font-semibold hover:bg-gray-200 
        cursor-pointer">{option}</span>
        {/each}
    </div>

</div>

<style>
input[type="checkbox"]:checked ~ .list {
    transform: rotateX(0);
    transition: .3s;
}
input[type="checkbox"]:checked + label svg {
    transform: rotateZ(-180deg);
    transition: .3s;

}
div label {
    transform: rotateZ(0deg);
    transition: .3s;
}

.list {
    transform: rotateX(90deg);
    transform-origin: top center;
    transition: .3s;
}
</style>