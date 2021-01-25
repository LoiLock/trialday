<template>
<section class="preloader-wrapper">
    <section class="preloader">
        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="30" viewBox="0 0 42 30" fill="#fff" fill-rule="evenodd"><path d="M36.378 0a5.43 5.43 0 0 0-4.955 3.229l-9.686 21.71c-1.032 2.313.65 4.93 3.17 4.93h3.396c1.914 0 3.65-1.132 4.436-2.9L41.335 7.7C42.948 4.1 40.318 0 36.378 0M20.9 0a5.43 5.43 0 0 0-4.956 3.23L6.26 24.94c-1.032 2.313.65 4.93 3.168 4.93h3.396c1.914 0 3.652-1.132 4.436-2.9L25.856 7.7C27.47 4.1 24.84 0 20.9 0"></path><ellipse cx="5.357" cy="5.377" rx="5.357" ry="5.377"></ellipse></svg>
    </section>
</section>
</template>



<script>
export default{
    name: "Preloader"
}
</script>


<style lang="scss" scoped>
    .preloader-wrapper {
        position: fixed;
        display: grid;
        height: 100%;
        width: 100%;
    }
    .preloader {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        margin: auto;
        transform-origin: center center;
        background-color: var(--primary-color);
        padding: 6vmax;
        width: 40vmax;
        height: 40vmax;
        animation: 1s bounceIn forwards cubic-bezier(0.68, -0.6, 0.32, 1.6);
        svg {
            width: 100%;
            height: auto;
        }
    }
    @keyframes bounceIn {
        from {
            transform: scale(0.6)
        }
        to {
            transform: scale(0.6)
        }
    }
</style>