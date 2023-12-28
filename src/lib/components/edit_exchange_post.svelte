<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import DropDown from "./dropDown.svelte";
    import InputText from "./inputText.svelte";
    import PopupTemplate from "./popupTemplate.svelte";
    import { getUserData } from "$lib/helpers/facade";

    const dispatch = createEventDispatcher();
    let ownedCourse:string = "";
    let ownedCourseTime:string = "";
    let requestedCourse:string = "";
    let requestedCourseTime:string = "";
    let contactMethod:string = "";
    let contactLink:string = "";

    let times = [
        "8:30-9:30",
        "8:30-10:00",
        "9:30-10:30",
        "10:00-11:30",
        "10:30-11:30",
        "11:30-1:00",
        "11:30-12:30",
        "12:30-1:30",
        "1:00-2:30",
        "1:30-2:30",
        "2:30-4:00",
        "2:30-3:30",
        "3:30-4:30",
        "4:00-5:30",
        "4:30-5:30",
        "5:30-6:30",
        "6:30-7:30",
    ];

    let socialMedia = [
        "facebook",
        "instagram",
        "whatsapp",
        "LinkedIn",
        "telegram"
    ];
</script>

<PopupTemplate title="Exchange Courses" on:cancel on:submit={async ()=>
        dispatch("submit",{
            poster: (await getUserData())._id,
            ownedCourse,
            ownedCourseTime,
            requestedCourse,
            requestedCourseTime,
            contactMethod,
            contactLink})}>
    <div class="flex flex-col w-full h-full items-center">
        <p>You want</p>
        <InputText bind:value={ownedCourse} title="course"/>
        <DropDown
        bind:value={ownedCourseTime}
        title={"Time"}
        options={times}
        />
        <p>You Have</p>
        <InputText bind:value={requestedCourse} title="course"/>
        <DropDown
        bind:value={requestedCourseTime}
        title={"Time"}
        options={times}
        />
        <p>contact method</p>
        <div class="w-full px-6 flex justify-between items-center">
            <DropDown
            bind:value={contactMethod}
            title="Select"
            options={socialMedia}
            />
            <div class="flex h-10 ">
                <input type="text"
                bind:value={contactLink}
                class="w-full max-w-[160px] bg-white pl-2 
                text-base font-semibold outline-0 rounded-l-lg
                border-solid border-2 border-black border-r-0
                text-black" placeholder="" id="">
                <button class="bg-[#242526] 
                    border-solid border-2 border-black p-2 border-l-0 
                    rounded-r-lg text-white font-semibold 
                    hover:bg-white hover:text-black transition-colors
                    flex justify-center items-center">
                    <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor" d="M10.5 20H2a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h1V3l2.03-.4a3 3 0 0 1 5.94 0L13 3v1h1a2 2 0 0 1 2 2v1h-2V6h-1v1H3V6H2v12h5v2zM8 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m2 4h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2m0 2v8h8v-8z"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
    </PopupTemplate>