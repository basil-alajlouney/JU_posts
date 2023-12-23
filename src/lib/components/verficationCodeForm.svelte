<script lang="ts">
    export let amount:number;
    export let value:string[] = new Array(amount);

    let boxes:Element[] = new Array(amount);
    let keyUpInit = (e:Event)=>{
        const el = e.currentTarget as Element;
        const nSibling = el!.nextSibling as Element & {focus:()=>void};
            nSibling?.focus();
    };

    let keyDownInit = (e:any)=>{
        e.currentTarget.value = "";
    };

</script>
<div class="flex justify-between">
    {#each value as _,i}
    <input class="w-10 h-10 rounded-lg border-solid border-2 border-black
    shadow-[3px_3px_0px_0px_black] focus:shadow-none mx-1
    focus:translate-x-[3px] focus:translate-y-[3px] transition
    p-1 text-center font-bold text-3xl"
    bind:value={value[i]}
    bind:this={boxes[i]}
    type="text"maxlength="1"
    on:keydown={keyDownInit}
    on:keyup={keyUpInit}>
    {/each}
</div>