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

</script>

<PopupTemplate title="Filter" on:cancel on:submit={async ()=>{
    dispatch("submit",{
        poster: (await getUserData())._id,
        ownedCourse,
        ownedCourseTime,
        requestedCourse,
        requestedCourseTime,
        contactMethod:null,
        contactLink:null
    })
}}>
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
        </div>
    </PopupTemplate>