<script lang="ts">
    import auth_assets_1 from "$lib/assets/auth_assets_1.svg";
    import auth_assets_2 from "$lib/assets/auth_assets_2.svg";
    import Button_3D from "$lib/components/Button_3D.svelte";
    import SquareShade from "$lib/components/squareShade.svelte";
    import VerficationCodeForm from "$lib/components/verficationCodeForm.svelte";
    import { getHeaders } from "$lib/helpers/facade";
    import { error } from "@sveltejs/kit";

    let actCode:string[];

    let validateCode = async (e:MouseEvent)=>{
        e.preventDefault();


        let verificationCode = actCode.join("");

        let request:RequestInit = {
            method:"POST",
            headers:getHeaders(),
            body:JSON.stringify({
                verificationCode
            })
        };

        const x = await fetch("/api/verifyUser",request);

        if(!x.ok)
            error(401,{
                message:"somthing went wrong"
            })
    }

</script>
<main class="bg-[#0f1674] w-full h-full -z-10">
    <SquareShade
    rotation="45deg"
    offset="-50%"
    />

    <section class="z-30 absolute flex flex-col justify-center items-center
            w-full h-full">

        <div class="min-[1250px]:translate-y-16 translate-x-0">
            <img class="mx-auto"
            width="256"
            src={auth_assets_1} 
            alt="auth_assets_1">
            <form class="bg-slate-100 w-full min-[450px]:w-[380px] h-[250px]
                    rounded-3xl flex flex-col justify-around pt-6 
                    min-[450px]:p-8 p-4 
                    ">

                    <p class="text-center text-2xl font-semibold">verification code</p>

                    <VerficationCodeForm
                    amount={5}
                    bind:value={actCode}
                    />

                    <Button_3D on:click={validateCode}>SUBMIT</Button_3D>

            </form>
        </div>
        <img class="ml-auto my-auto mr-24 hidden min-[1250px]:block" src={auth_assets_2} alt="auth_assets_1">
    </section>
</main>

<style>
        img{
        object-fit: fill;
        aspect-ratio: none;
    }
</style>