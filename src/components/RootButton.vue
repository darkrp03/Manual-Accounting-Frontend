<template>
    <div class="button" :style="{ 'border-radius': borderRadius, 'width': width, 'height': height }">
        <div class="image-container" v-if="icon">
            <component :is="icon" />
        </div>
        <div v-else>
            <span>{{ text }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { type Component } from 'vue';

export default {
    props: {
        height: String,
        width: String,
        borderRadius: String,
        icon: Object as () => Component,
        text: String
    }
}
</script>

<style scoped>
@import "../assets/css/buttons.css";
</style>