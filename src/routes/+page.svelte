<script lang="ts">
    import { onMount } from "svelte";
    import LightEffectButton from "$lib/components/LightEffectButton.svelte";
    import LOGO from "$lib/assets/Logo.svg";
  import PhoneAnimation from "$lib/components/phone_animation.svelte";

    const changePageInit = (endpoint:string)=>{
        return ()=>{
            document.body.style.overflowY = "hidden";
            location.href = endpoint;
        }
    };

    onMount(()=>{
        document.body.style.overflowY = "auto";
    })
</script>

<img 
class="absolute inset-3 z-50"
width="86"
src={LOGO}
alt="LOGO">

<main class="w-full min-h-full bg-black flex flex-col justify-between">

<div class="w-full min-h-[80%] h-fit z-20">

        <div class="flex flex-wrap justify-around items-center
        w-full sm:p-24">

        <section class="text-center flex flex-col justify-around">
            <p class="text-white text-5xl sm:mt-0 mt-24">
                share your life with your<br>
                collage mates.<br>
            </p>
            <div class="flex flex-col my-32 flex-grow justify-end p-2">
                    <LightEffectButton
                    on:click={changePageInit("/signup")}
                    >Join Now</LightEffectButton><br>
                    <LightEffectButton
                    on:click={changePageInit("/login")}
                    >Already have an Account?</LightEffectButton>
            </div>
        </section>

        
        <!-- <div class="w-[320px] h-[580px]">
            <spline-viewer url="https://prod.spline.design/r4WeeoJ067nfrerb/scene.splinecode"></spline-viewer>
        </div> -->

        <PhoneAnimation
        width={320}
        height={640}
        />
    </div>

    <footer class="text-center m-3 text-white text-lg -translate-y-f">
        All right are preserved 2024
    </footer>

</div>


</main>