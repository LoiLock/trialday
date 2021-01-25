<template>
    <Leaderboard/>
</template>

<script>
import Leaderboard from './components/Leaderboard.vue'
import "../src/scss/style.scss"
export default {
    name: 'App',
    components: {
        Leaderboard
    }
}
</script>

<style>
#app {
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--bg-color);
    height: 100%;
}
</style>
