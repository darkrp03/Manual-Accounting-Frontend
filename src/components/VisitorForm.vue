<template>
    <div class="overlay" v-if="visible">
        <div class="add-form">
            <div class="form">
                <div class="close-button-container">
                    <CloseFormButton @click="closeForm" />
                </div>
                <div class="name-container">
                    <h3>Name</h3>
                    <input type="text" v-model="visitorName">
                </div>
                <div class="surname-container">
                    <h3>Surname</h3>
                    <input type="text" v-model="visitorSurname">
                </div>
                <div class="submit-button">
                    <SubmitButton @click="submitButtonClick"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import SubmitButton from './SubmitButton.vue';
import CloseFormButton from './CloseFormButton.vue';

export default {
    data() {
        return {
            visitorName: '',
            visitorSurname: ''
        }
    },
    props: {
        visible: Boolean
    },
    components: {
        SubmitButton,
        CloseFormButton
    },
    methods: {
        submitButtonClick() {
            this.$emit('data-updated', { visitorName: this.visitorName, visitorSurname: this.visitorSurname });
        },
        closeForm() {
            this.$emit('close');
        }
    }
};
</script>

<style scoped>
@import "../assets/css/forms.css";
</style>