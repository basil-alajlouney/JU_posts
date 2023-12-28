<script lang="ts">
    import forgot_password_assets_1 from "$lib/assets/forgot_password_assets_1.svg";
    import Button_3D from "$lib/components/Button_3D.svelte";
    import AnimatedTextInput from "$lib/components/animated_text_input.svelte";
    import SquareShade from "$lib/components/squareShade.svelte";

    const toSignUp = (e:Event)=>{
        e.preventDefault();
        location.href = "/signup";
    };
</script>
<main class="bg-[#0f1674] w-full h-full -z-10">
    <SquareShade
    rotation="48deg"
    offset="-50%"
    />

    <section class="z-30 absolute flex flex-col items-center
            w-full h-full">

        <div class="w-full justify-around hidden min-[950px]:flex">
            <p class="text-8xl font-bold text-white mt-auto mb-36
            text-opacity-50">
                HOW FORGETFUL!
            </p>

            <img class="z-10 mt-auto mb-12 ml-4"
            width="360px"
            height="360px"
            src={forgot_password_assets_1}
            alt="forgot_password_assets_1"/>
        </div>
        
        <form class="bg-slate-100 w-5/6 min-[450px]:w-[380px] h-[250px]
                rounded-3xl flex flex-col justify-around pt-6 p-8
                min-[950px]:-translate-y-1/3 translate-y-1/2">

        <p class="text-center text-2xl font-semibold">
            A 5-digit code will be sent to this email
        </p>

        <AnimatedTextInput>EMAIL</AnimatedTextInput>

        <div class="flex justify-end">
            <Button_3D>SEND</Button_3D>
        </div>

        </form>
        <img class="z-10 mt-auto mb-12 ml-4 min-[450px]:w-[300px]
        translate-y-12 min-[950px]:hidden"
        width="70%"
        height="70%"
        src={forgot_password_assets_1}
        alt="forgot_password_assets_1"/>

    </section>
</main>

<style>
        img{
        object-fit: fill;
        aspect-ratio: none;
    }
</style>