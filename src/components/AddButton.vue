<template>
<RootButton :icon="addIcon"/>
</template>

<script lang="ts">
import { shallowRef } from 'vue';
import AddButtonIcon from './icons/AddButtonIcon.vue'
import RootButton from './RootButton.vue';

export default {
    components: {
        RootButton
    },
    data() {
        return {
            addIcon: shallowRef(AddButtonIcon)
        }
    }
};
</script>