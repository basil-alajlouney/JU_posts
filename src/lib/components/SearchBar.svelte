<script lang="ts">
    import type { SlideParams } from "svelte/transition";
    import { onMount } from "svelte";
    import {slide} from "svelte/transition";
    import SearchResult from "./searchResult.svelte";
    import { linear } from "svelte/easing";

    function foucsDetection(el:Element){
        document.addEventListener("click",(e:any)=>{
            if(e.target != el
            && !el?.contains(e.target)
            && searching){
                searching = false;
            }
            
        });
    }

    let searching:boolean = false;
    let searchText:string;
    let SearchResultsElement:Element;
    let isDisabled:boolean = false;
    let rendered:boolean = false;

    let disableSearch = (isDisabled:boolean,rendered:boolean)=>{

        if(!rendered) return;

        const x = document.getElementById("searchInput") as any;
        const y = document.getElementById("seachBtn") as any;

        if(isDisabled){
            y.disabled = true;
            x.disabled = true;
        }
        else{
            y.disabled = false;
            x.disabled = false;
        }
    }

    $: _ = disableSearch(isDisabled,rendered)

    let searchUser = async ()=>{

        isDisabled = true;

        const body = {search:searchText}

        let headers = new Headers();
        headers.append("JU_POSTS_SESSION_ID",localStorage.getItem("JU_POSTS_SESSION_ID")!)

        const request = await fetch("/api/search",{
            method:"POST",
            headers,
            body:JSON.stringify(body)
        });

        const data = await request.json();

        
        isDisabled = false
        console.log(data);

    return data as any[];
    };

    onMount(()=>{

        rendered = true;

        document.getElementById("searchInput")
        ?.addEventListener("keydown",(e)=>{
            if(e.key == "Enter")
                document.getElementById("seachBtn")?.click();
        })

        foucsDetection(SearchResultsElement);

    })

    let slidingParams:SlideParams = {
        axis:"y",
        duration:100,
        easing:linear
    };

</script>

<div class="ml-8  w-2/3 h-12 py-5 pl-5 pr-1.5 bg-white rounded-full
        flex items-center justify-between 
        min-[550px]:w-2/5 min-[550px]:ml-0">
<input
class="h-12 bg-transparent outline-none text-2xl p-1
    w-full font-semibold"
type="text"
id="searchInput"
bind:value={searchText}
placeholder="Search..."
/>


    <button id="seachBtn" on:click={()=>
        setTimeout(()=>searching = true,100)} class="bg-black text-white p-2 rounded-full">
        <svg class="rotate-y-180" width="24" height="24" viewBox="0 0 717 766" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="m541 517l176 176l-72 73l-184-185c-45 25-97 39-151 39C139 620 0 481 0 310S139 0 310 0s311 139 311 310c0 80-31 153-80 207M103 310c0 115 92 207 207 207s207-92 207-207s-92-207-207-207s-207 92-207 207"/>
        </svg>
    </button>

</div>

{#if searching}

    <div bind:this={SearchResultsElement} transition:slide={slidingParams} 
    class="absolute min-[650px]:w-5/12 w-2/3 h-96 bg-[#293031] rounded-2xl
            top-[40%] left-1/2 -translate-y-1/2 -translate-x-1/2
            overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400
            scrollbar-mod">

            {#await searchUser() then value}

                {#each value as result}
                <SearchResult
                id={result._id}
                PFP={result.pfp}
                username={result.username}
                />
                {/each}

            {/await}

        <p class="text-center m-3 text-white text-lg">-That is all-</p>
    </div>

{/if}
<style>
    .rotate-y-180{
        transform: rotateY(180deg);
    }

    ::-webkit-scrollbar-thumb{
        border-radius: 1000px  ;
    }
</style>