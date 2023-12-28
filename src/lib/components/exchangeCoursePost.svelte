<script lang="ts">
    import DEFAULT_PFP from "$lib/assets/defaultPFP.png";
    import { createEventDispatcher } from "svelte";
    import { getHeaders } from "$lib/helpers/facade";
    import { error } from "@sveltejs/kit";
    import Splitter from "./splitter.svelte";
    import PopupTemplate from "./popupTemplate.svelte";
    import Button_3D from "./Button_3D.svelte";
  import { goto } from "$app/navigation";

    export let socialMedia = "NONE";
    export let link = "https://www.facebook.com/BasilAhmad2004/";
    export let ownedCourse = "data Structure";
    export let ownedCourseTime = "8:30-10:00";
    export let requestedCourse = "data base";
    export let requestedCourseTime = "8:30-9:30";
    export let pfp:string | null = null;
    export let username:string = "lorem";
    export let id:string = "";
    export let postId:string = "";
    export let canEdit:boolean = false;
    let showConfirm:boolean = false;
    const dispatch = createEventDispatcher();

    const deleteInit = async ()=>{
        const request:RequestInit = {
            method:"POST",
            headers:getHeaders(),
            body:JSON.stringify({id:postId})
        };
        const x = await fetch("/api/delete_exchange_request",request);

        if(!x.ok)
            error(401,{
                message:"somthing went wrong"
            })

        showConfirm = false;
    }

</script>
<div class="max-w-md w-full my-4 bg-[#242526] border-solid
        border-2 rounded-xl flex flex-col p-4 min-w-[256px]">

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div class="flex justify-between">
        <div class="flex flex-wrap gap-4 items-center">
            <img on:click={()=>goto("/profile/"+id)} class="cursor-pointer w-16 rounded-full"
            src={ pfp ?? DEFAULT_PFP}
            alt="PFP">

            <div class="flex flex-col justify-start">
                <p on:click={()=>goto("/profile/"+id)} class="cursor-pointer text-xl text-white">
                    {username}
                </p>
            <a href={link.includes("/")? link : "#"}>
                <span class="cursor-pointer my-2 text-white text-xl
                font-semibold flex gap-2">
                    {#if socialMedia == "facebook"}
                        <span>
                            <svg width="24" height="24" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#1877F2" d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"/>
                                <path fill="#FFF" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165z"/>
                            </svg>
                        </span>
                    {:else if socialMedia == "instagram"}
                        <svg width="24" height="24" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none">
                                <rect width="256" height="256" fill="url(#skillIconsInstagram0)" rx="60"/>
                                <rect width="256" height="256" fill="url(#skillIconsInstagram1)" rx="60"/>
                                <path fill="#fff" d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396c0 26.688-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413c0-26.704.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5c3.5-3.5 6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355c0 28.361 22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334c-18.41 0-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334"/>
                                <defs>
                                    <radialGradient id="skillIconsInstagram0" cx="0" cy="0" r="1" gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#FD5"/>
                                        <stop offset=".1" stop-color="#FD5"/>
                                        <stop offset=".5" stop-color="#FF543E"/>
                                        <stop offset="1" stop-color="#C837AB"/>
                                    </radialGradient>
                                    <radialGradient id="skillIconsInstagram1" cx="0" cy="0" r="1" gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#3771C8"/>
                                        <stop offset=".128" stop-color="#3771C8"/>
                                        <stop offset="1" stop-color="#60F" stop-opacity="0"/>
                                    </radialGradient>
                                </defs>
                            </g>
                        </svg>
                    {:else if socialMedia == "whatsapp"}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="3" width="18" height="18" rx="8.5" fill="white"/>
                            <path d="M22.2051 5.54986C18.615 -0.000183582 11.2852 -1.6502 5.60089 1.79983C0.0661373 5.24986 -1.72892 12.7499 1.86119 18.3L2.16037 18.75L0.963664 23.25L5.4513 22.05L5.90006 22.35C7.8447 23.4 9.93893 24 12.0332 24C14.277 24 16.5208 23.4 18.4654 22.2C24.0002 18.6 25.6456 11.2499 22.2051 5.54986ZM19.0638 17.0999C18.4654 18 17.7175 18.6 16.6704 18.75C16.072 18.75 15.3241 19.05 12.3323 17.85C9.78934 16.6499 7.69511 14.6999 6.19924 12.4499C5.30171 11.3999 4.85295 10.0499 4.70336 8.69988C4.70336 7.49987 5.15212 6.44987 5.90006 5.69986C6.4579 5.14048 8.04527 4.85436 8.29347 5.84986C8.59264 6.59987 9.34058 8.39988 9.34058 8.54988C9.58332 8.79329 9.41435 9.67592 9.19099 9.89989C8.89983 10.1919 8.23167 10.826 8.44305 11.2499C9.0414 12.1499 9.78934 13.0499 10.5373 13.7999C11.4348 14.5499 12.3323 15.1499 13.3794 15.5999C13.6786 15.7499 13.9778 15.7499 14.1274 15.4499C14.277 15.1499 15.0249 14.3999 15.3241 14.0999C15.6233 13.7999 15.7729 13.7999 16.072 13.9499L18.4654 15.1499C18.7646 15.2999 19.0638 15.4499 19.2134 15.5999C19.363 16.0499 19.363 16.6499 19.0638 17.0999Z" fill="#00B147"/>
                        </svg>                        
                    {:else if socialMedia == "linkedIn"}
                        <svg width="24" height="24" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#0076b2" d="M116 3H12a8.91 8.91 0 0 0-9 8.8v104.42a8.91 8.91 0 0 0 9 8.78h104a8.93 8.93 0 0 0 9-8.81V11.77A8.93 8.93 0 0 0 116 3"/>
                            <path fill="#fff" d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 1 1-10.5 10.49a10.5 10.5 0 0 1 10.5-10.49m20.41 29h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z"/>
                        </svg>
                    {:else if socialMedia == "telegram"}
                        <svg width="24" height="24" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="logosTelegram0" x1="50%" x2="50%" y1="0%" y2="100%">
                                    <stop offset="0%" stop-color="#2AABEE"/>
                                    <stop offset="100%" stop-color="#229ED9"/>
                                </linearGradient>
                            </defs>
                            <path fill="url(#logosTelegram0)" d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51c0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0"/>
                            <path fill="#FFF" d="M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072"/>
                        </svg>
                    {:else}
                        <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M15 2H5L4 8h12zM0 10s2 1 10 1s10-1 10-1l-4-2H4zm8 4h4v1H8z"/>
                            <circle cx="6" cy="15" r="3" fill="currentColor"/>
                            <circle cx="14" cy="15" r="3" fill="currentColor"/>
                        </svg>
                    {/if}
                    {link.includes("/") ? link.split("/").at(-2): link}
                </span>
            </a>
            </div>
        </div>

        {#if canEdit}
        <div class="flex items-center h-12">
            <button on:click={()=>showConfirm = true} class="mr-3">
                <svg width="19" height="24" viewBox="0 0 304 384" xmlns="http://www.w3.org/2000/svg">
                    <path fill="red" d="M21 341V85h256v256q0 18-12.5 30.5T235 384H64q-18 0-30.5-12.5T21 341M299 21v43H0V21h75L96 0h107l21 21z"/>
                </svg>
            </button>
            <button on:click={()=>dispatch("edit",{
                contactMethod:socialMedia,
                contactLink:link,
                ownedCourse,
                ownedCourseTime,
                requestedCourse,
                requestedCourseTime,
                id,
                postId
            })} class="text-white">
                <svg width="32" height="32" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="m402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0m162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2M384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5"/>
                </svg>
            </button>
        </div>
        {/if}

    </div>


    <div class="flex justify-around items-center h-fit">

        <div class="text-xl text-white flex flex-col justify-around items-center gap-8">
            <p class="text-center">{ownedCourse}</p>
            <p class="text-center">{ownedCourseTime}</p>
        </div>
        
        <Splitter
        on:requestExchange={()=>
            dispatch("requestExchange",{id,ownedCourse})
        }
        />
        
        <div class="text-xl text-white flex flex-col justify-around items-center gap-8">
            <p class="text-center">{requestedCourse}</p>
            <p class="text-center">{requestedCourseTime}</p>
        </div>
    </div>

</div>

{#if showConfirm}
<PopupTemplate title="are you sure" showButtons={false}>
    <div class="flex justify-around p-8">
        <Button_3D on:click={deleteInit} color="green" >YES</Button_3D>
        <Button_3D on:click={()=>showConfirm = false} color="red" >NO</Button_3D>
    </div>
</PopupTemplate>
{/if}