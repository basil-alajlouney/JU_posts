<script lang="ts">
    export let title:string = "";
    export let value:string = "";
</script>
<div>
    <label for={title} class="block text-white font-semibold text-sm"
        >{title}</label>
    <div class="mt-2">
        <input
        type="text"
        name="inputname"
        bind:value={value}
        class="outline-none block w-56 rounded-md py-1.5
        px-2 ring-1 ring-inset ring-gray-400 text-gray-800
        border-solid border-2 border-black"
        />
    </div>
</div>