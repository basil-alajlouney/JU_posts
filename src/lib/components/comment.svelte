<script lang="ts">
    import {commentId} from "$lib/index";
    import DEFAULT_PFP from "$lib/assets/defaultPFP.png";
    let id:string = "like-comment" + $commentId++;

    export let username:string = "_Lorem Ipsum";
    export let PFP:string = DEFAULT_PFP;
    export let commentText = "1__Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, architecto eos voluptatum odit optio recusandae sed at quo error earum eaque, suscipit enim debitis. Quibusdam quaerat quisquam ducimus distinctio quo.";
    // export let value:boolean | null = null;
</script>

<div class="p-5">

    <div>
        <div class="flex flex-wrap items-center">
            <img src={PFP}
                class="rounded-full mx-4 mr-8"
                width="86"
                height="86"
                alt="PFP">
        
            <p class="text-xl text-white font-bold">
                {username}
            </p>
        </div>
    </div>
    <p class="ml-12 my-4 text-lg font-semibold text-white">
        {commentText}
    </p>

    <!-- <div class="w-full h-9 flex justify-around px-6 py-1
    items-center text-white">
            <input bind:group={value} value="liked" class="hidden" name={"reaction_" + id} type="radio" {id}/>
            <label for={id} class="like font-semibold text-2xl flex hover:text-blue-500
            duration-300 cursor-pointer">
            <span class="hidden min-[450px]:block">
                Likes  
            </span>
                <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2M20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2"/>
                </svg>
            </label>

            <div class="h-full w-1 bg-gray-500 bg-opacity-30 rounded-full
                    mx-2"/>

            <input bind:group={value} value="disliked" class="hidden" name={"reaction_" + id} type="radio" id={"dis"+id}/>
            <label for={"dis"+id} class="like font-semibold text-2xl hover:text-blue-500
            duration-300 cursor-pointer flex items-center">
                <span class="hidden min-[450px]:block">
                    dislike  
                </span>
                <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M20 3h-1v13h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2M4 16h7l-1.122 3.368A2 2 0 0 0 11.775 22H12l5-5.438V3H6l-3.937 8.649l-.063.293V14a2 2 0 0 0 2 2"/>
                </svg>
            </label>
            
        </div> -->

</div>
<hr class="opacity-10 last:hidden" />

<!-- <style>
    input[type='radio']:checked + .like{
        color: rgb(22, 116, 147)    }
</style> -->