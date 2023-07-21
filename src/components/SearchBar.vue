<template>
    <div class="search-container">
        <input class="form-control me-1" type="search" v-model="searchInput" placeholder="Search" aria-label="Search">
        <div class="btn btn-success" @click="searchButtonClick">Search</div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            searchInput: ''
        }
    },
    methods: {
        searchButtonClick() {
            this.$emit('data-updated', this.searchInput);
        }
    }
}
</script>

<style scoped>
.search-container {
    display: flex;
}
</style>