<script lang="ts">
    import signup_assets_1 from "$lib/assets/signup_assets_1.svg";
    import signup_assets_2 from "$lib/assets/signup_assets_2.svg";
    import Button_3D from "$lib/components/Button_3D.svelte";
    import AnimatedTextInput from "$lib/components/animated_text_input.svelte";
    import CustomImgUploader from "$lib/components/custom_img_uploader.svelte";
    import SquareShade from "$lib/components/squareShade.svelte";

    const loginInit = (e:Event)=>{
        e.preventDefault();
        location.href = "/login"
    }
</script>

<main class="bg-[#0f1674] w-full h-full -z-10">
    <SquareShade
    rotation="58deg"
    offset="-65%"
    />

    <section class="z-30 absolute flex items-center
            justify-between w-full h-full">

        <img class="z-10 mb-auto mt-8 ml-4 hidden min-[500px]:block
        min-[900px]:w-[240px] min-[900px]:h-[240px] md:420px md:420px"
        width="20%"
        height="20%"
        src={signup_assets_1}
        alt="signup_assets_1"/>

        <form method="POST" enctype="multipart/form-data" 
            class="bg-slate-100 w-[380px] h-[500px] mx-auto
            my-16 rounded-3xl flex flex-col justify-around pt-10 p-12">        

        <AnimatedTextInput name="username" >USERNAME</AnimatedTextInput>
        <AnimatedTextInput name="email" >E-MAIL</AnimatedTextInput>
        <AnimatedTextInput type="password" name="password" >PASSWORD</AnimatedTextInput>

        <CustomImgUploader name="PFP"/>

        <Button_3D>Create account</Button_3D>

        <Button_3D on:click={loginInit}>Login</Button_3D>
    </form>

        <img class="z-10 mt-auto mb-[5%] mr-4 hidden min-[500px]:block
        min-[900px]:h-[240px] min-[900px]:w-[240px] md:420px md:420px"
        width="20%"
        height="20%"
        src={signup_assets_2}
        alt="signup_assets_2"/>

    </section>
</main>
