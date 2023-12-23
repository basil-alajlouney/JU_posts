<script lang="ts">
    import phone_back from "$lib/assets/phone_back.svg";
    import phone_posts from "$lib/assets/phone_posts.svg";
    import phone_post from "$lib/assets/post.svg";
    import phone_settings from "$lib/assets/settings.svg";
    import phone_chats from "$lib/assets/chatssvg.svg";

    const resetAnimation = (ms:number)=>{
        return (e:Event & {currentTarget:Element})=>{
        const x = e.currentTarget;
        const p = x.parentElement;
        x.remove();
        setTimeout(() => {
            p?.append(x);
        }, ms);
    };
    }

    const resetAllAmimations = (e:Event & {currentTarget:Element})=>{
        const x = e.currentTarget.parentElement
        const p = x?.parentElement;
        x?.remove();
        setTimeout(() => 
            p?.append(x!)
        , 100);
    }

    export let width:number;
    export let height:number;

</script>
    <div class="w-[315.49px] h-[504px]
            -translate-x-3">
        <div>
            <img
            {width}
            {height}
            on:animationend={resetAnimation(5000)} class="phone-frame phone-back back" src={phone_back} alt="phone_back">
            <img
            {width}
            {height}
            class="phone-frame posts-face" src={phone_posts} alt="phone_back">
            <img
            {width}
            {height}
            class="phone-frame post-face" src={phone_post} alt="phone_back">
            <img
            {width}
            {height}
            class="phone-frame message-face" src={phone_chats} alt="phone_back">
            <img
            {width}
            {height}
            on:animationend={resetAllAmimations} class="phone-frame settings-face" src={phone_settings} alt="phone_back">
        </div>
    </div>

<style>
    .phone-frame{
        filter: drop-shadow(5px 5px 0px black);
    }

    .phone-back{
        position: absolute;
    }

    .settings-face{
        position: absolute;
        transform: rotateY(90deg);
        animation: spin 5s linear 27.15s  1;
        animation-fill-mode: both;
    }
    .message-face{
        position: absolute;
        transform: rotateY(90deg);
        animation: spin 5s linear 19.15s  1;
        animation-fill-mode: both;
    }
    .post-face{
        position: absolute;
        transform: rotateY(90deg);
        animation: spin 5s linear  11.15s  1;
        animation-fill-mode: both;
    }
    .posts-face{
        position: absolute;
        transform: rotateY(90deg);
        animation: spin 5s linear 3.15s  1;
        animation-fill-mode: both;
    }

    .back{
        animation: spin-back 3s linear 0s  1;
        animation-fill-mode: both;
    }

    @keyframes spin{
        20%,80%{
            transform: rotateY(0deg);
        }
            0%,100%{
            transform: rotateY(90deg);
        }
    }
    @keyframes spin-2{
        20%,100%{
        transform: rotateY(90deg);
        }
    }
    @keyframes spin-3{
        20%,100%{
        transform: rotateY(90deg);
        }
    }
    @keyframes spin-4{
        20%,80%{
        transform: rotateY(90deg);
        }
    }
    @keyframes spin-back{
            50%{
                transform: rotateY(0deg);
            }

            0%,100%{
            transform: rotateY(90deg);
        }
    }
</style>