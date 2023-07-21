<template>
    <RootButton :icon="logoutIcon" width="65px" height="65px"/>
</template>

<script lang="ts">
import { shallowRef } from 'vue';
import RootButton from './RootButton.vue';
import LogoutButtonIcon from './icons/LogoutButtonIcon.vue';

export default {
    components: {
        RootButton
    },
    data() {
        return {
            logoutIcon: shallowRef(LogoutButtonIcon)
        }
    }
} 

</script>