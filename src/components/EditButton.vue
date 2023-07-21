<template>
    <RootButton :icon="editIcon" />
</template>

<script lang="ts">
import EditButtonIcon from './icons/EditButtonIcon.vue';
import { shallowRef } from 'vue';
import RootButton from './RootButton.vue';

export default {
    components: {
        RootButton
    },
    data() {
        return {
            editIcon: shallowRef(EditButtonIcon)
        }
    }
}
</script>