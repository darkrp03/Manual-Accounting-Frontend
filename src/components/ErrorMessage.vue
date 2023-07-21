<template>
    <div class="error-container">
        <span>{{text}}</span>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        text: String
    }
}
</script>

<style scoped>
.error-container {
    display: flex;
    justify-content: center;
    color: red;
    text-align: center;
}
</style>