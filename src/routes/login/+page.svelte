<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import Button_3D from "$lib/components/Button_3D.svelte";
    import AnimatedTextInput from "$lib/components/animated_text_input.svelte";
    import SquareShade from "$lib/components/squareShade.svelte";
    import login_assets_2 from "$lib/assets/login_assets_2.svg"
    import login_assets_1 from "$lib/assets/login_assets_1.svg"

    const toSignUp = (e:Event)=>{
        e.preventDefault();
        goto("/signup");
    };

    const submit = async (e:MouseEvent)=>{
        e.preventDefault();

        const username:any = document.getElementsByName("username")[0]
        const password:any = document.getElementsByName("password")[0]

        if(!username.value.length
        || !password.value.length)
            throw new Error("wrong");

        const form = new FormData();

        form.append("username",username.value);
        form.append("password",password.value);

        const request = await fetch("/login",{
            method:"POST",
            body:form
        })

        let response = await request.json();

        if(!request.ok)
            goto("/login");
        else
            goto("/dashboard");



        localStorage.setItem("JU_POSTS_SESSION_ID",response.authToken);

    }

    onMount(()=>{
        document.body.style.overflow = "hidden";
    })

</script>

<main class="bg-[#0f1674] w-full h-full -z-10">
    <SquareShade
    rotation="55deg"
    offset="-50%"
    />

    <section class="z-30 absolute flex items-center
            justify-between w-full h-full">

        <img class="z-10 mt-auto mb-12 ml-4 hidden min-[1150px]:block"
        width="420px"
        height="420px"
        src={login_assets_1}
        alt="login_assets_1"/>
        
        <form method="POST" class="bg-slate-100 max-w-[380px] max-h-[360px] mx-auto
                my-16 rounded-3xl flex flex-col justify-around pt-10 p-12
                sm:w-1/2 sm:h-1/2 w-5/6 h-5/6">

        <AnimatedTextInput name="username">USERNAME</AnimatedTextInput>
        
        <div>
            <AnimatedTextInput type="password" name="password">PASSWORD</AnimatedTextInput>

            <br>

            <a
            class="text-blue-900 italic font-semibold underline"
            href="/forgot_password">forgot password?</a>
        </div>

        <div class="flex justify-around">
            <Button_3D on:click={submit}>Login</Button_3D>
            <Button_3D on:click={toSignUp}>sign up</Button_3D>
        </div>

        </form>

        <img class="z-10 mb-auto mt-12 mr-4 hidden min-[1150px]:block"
        width="420px"
        height="420px"
        src={login_assets_2}
        alt="login_assets_2"/>

    </section>
</main>
