<script lang="ts">
    import { getHeaders, getUserData } from "$lib/helpers/facade";
    import { error } from "@sveltejs/kit";
    import { goto } from "$app/navigation";
    import ExchangeCoursePost from "$lib/components/exchangeCoursePost.svelte";
    import ExchangeHeaders from "$lib/components/ExchangeHeaders.svelte";
    import ExchangeCourse from "$lib/components/exchange_course.svelte";
    // import FilterExchange from "$lib/components/filter_exchange.svelte";
    import EditExchangeCourse from "$lib/components/edit_exchange_course.svelte";

    type ExchangePost = {
            ownedCourse:string,
            ownedCourseTime:string,
            requestedCourse:string,
            requestedCourseTime:string,
            contactMethod:string,
            contactLink:string}

    let showExchangeCourse = false;
    let showFilter = false;
    let showEdit = false;
    let editingDataHolder:ExchangePost & {id:string, postId:string};


    const sendNotification = async ({detail}:{detail:any})=>{
        const senderData = await getUserData();
        const request:RequestInit = {
            method:"POST",
            headers:getHeaders(),
            body:JSON.stringify({
                text:`${senderData.username} requested an exchange for ${detail.ownedCourse}`,
                reciverId:detail.id,
                senderId:senderData._id
            })
        }

        const x = await fetch("/api/exchange_request_notification",request)
        if(!x.ok)
            error(401,{
                message:"somthing went wrong"
            })
    }

    const makeExchangeRequest = async (e:any)=>{
        const {detail}:{detail:ExchangePost} = e;

        let request:RequestInit={
            method:"POST",
            headers:getHeaders(),
            body:JSON.stringify(detail)
        };

        const x = await fetch("/api/make_exchange_request",request);
        
        if(!x.ok)
            error(405,{
                message:"somthing went wrong"
            })
        
        showExchangeCourse = false;
    }

    const getData = async ()=>{
        const request:RequestInit = {
            method:"POST",
            headers:getHeaders(),
        };

        const x = await fetch("/api/get_all_exchange_request",request)

        if(!x.ok){
            goto("/login")
            error(401,{
                message:"something went wrong"
            })
        }

            const exchanges = await x.json();
            const userData = await getUserData();

            return {exchanges,userData};
    }

    const editInit = ({detail}:{detail:ExchangePost & {id:string, postId:string}})=>{
        showEdit = true;

        console.log(detail);

        editingDataHolder = detail;
    }

    const submitEdit = async ({detail}:{detail:any})=>{

        const request:RequestInit = {
            method:"POST",
            headers:getHeaders(),
            body:JSON.stringify({
                ...detail,
                id:editingDataHolder.id,
                postId:editingDataHolder.postId,
            })
        }

        const x = await fetch("/api/update_exchange_request",request);

        if(!x.ok)
            error(401,{
                message:"somthing went wrong"
            })

        showEdit = false;
    }

</script>
<div class="w-full min-h-full bg-[#242526]">
    <ExchangeHeaders/>

    <div class="w-full flex items-center justify-end text-white pt-2 px-8">
        <!-- <button on:click={()=>showFilter = true} class="outline-none cursor-pointer mr-6">
            <svg width="64" height="64" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M6.5 4a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1m12 2h-11m-2 0h-3m4 8a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1m12 2h-11m-2 0h-3m12-7a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1m-1 2h-11m16 0h-3"/>
            </svg>
        </button> -->

        <button on:click={()=>showExchangeCourse = true} 
            class="transition duration-300 hover:rotate-90 hover:bg-gray-700 p-2 border-solid border-2 border-white rounded-full cursor-pointer">
            <svg width="32" height="32" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32"/>
            </svg>
        </button>

    </div>

    <main class="px-12 flex flex-wrap justify-around">
        {#await getData()}
            <!-- waiting -->
        {:then {exchanges,userData}}
        {#each exchanges as exchange}
            <ExchangeCoursePost
            canEdit={userData._id == exchange.poster._id}
            postId={exchange._id}
            id={exchange.poster._id}
            username={exchange.poster.username}
            pfp={exchange.poster.pfp}
            socialMedia={exchange.contactMethod}
            requestedCourseTime={exchange.requestedCourseTime}
            requestedCourse={exchange.requestedCourse}
            ownedCourseTime={exchange.ownedCourseTime}
            ownedCourse={exchange.ownedCourse}
            link={exchange.contactLink}
            on:requestExchange={sendNotification}
            on:edit={editInit}
            />
        {/each}
        {/await}
    </main>

</div>

{#if showExchangeCourse}
    <ExchangeCourse
    on:submit={makeExchangeRequest}
    on:cancel={()=>showExchangeCourse = false}/>
{/if}

{#if showEdit}
<EditExchangeCourse
ownedCourse={editingDataHolder.ownedCourse},
ownedCourseTime={editingDataHolder.ownedCourseTime},
requestedCourse={editingDataHolder.requestedCourse},
requestedCourseTime={editingDataHolder.requestedCourseTime},
contactMethod={editingDataHolder.contactMethod},
contactLink={editingDataHolder.contactLink}
on:submit={submitEdit}
on:cancel={()=>showEdit = false}
/>
{/if}

<!-- {#if showFilter}
    <FilterExchange
    on:submit
    on:cancel={()=>showFilter = false}/>
{/if} -->


<style>
    :global(body){
        overflow: auto;
    }
    
</style>