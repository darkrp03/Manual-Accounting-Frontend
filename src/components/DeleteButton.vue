<template>
    <RootButton :icon="deleteIcon" />
</template>

<script lang="ts">
import { shallowRef } from 'vue';
import RootButton from './RootButton.vue';
import DeleteButtonIcon from './icons/DeleteButtonIcon.vue'

export default {
    components: {
        RootButton
    },
    data() {
        return {
            deleteIcon: shallowRef(DeleteButtonIcon)
        }
    }
}
</script>