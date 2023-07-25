<template>
    <main>
        <div class="flex-holder">
            <div class="login-header">
                Sign in to use Manual Accounting
            </div>
            <div class="login-container">
                <div class="box-username">
                    <div class="username-header">Username</div>
                    <div class="username-input">
                        <input type="text" v-model="username">
                    </div>
                </div>
                <div class="box-password">
                    <div class="password-header">Password</div>
                    <div class="password-input">
                        <input type="password" v-model="password">
                    </div>
                </div>
                <div class="box-button">
                    <SubmitButton @click="login"/>
                </div>
                <div class="sign-up-container">
                    <span>Don't have an account?  </span>
                    <a href="/register">Create Account</a>
                </div>
                <div class="error-message-container">
                    <ErrorMessage :text="warningText"/>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import SubmitButton from '@/components/SubmitButton.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import router from '@/router';

export default {
    components: {
        SubmitButton,
        ErrorMessage
    },
    data() {
        return {
            username: '',
            password: '',
            warningText: ''
        }
    },
    methods: {
        async login() {
            if (this.username == '' || this.password == '') {
                return;
            }

            const response = await fetch(import.meta.env.VITE_LOGIN, {
                method: 'POST',
                body: JSON.stringify({
                    username: this.username,
                    password: this.password
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.status == 401) {
                this.warningText = "Incorrect username or password";

                return;
            }

            router.push('/');
        }
    }
}
</script>

<style scoped>
@import "../assets/css/login-register.css";
</style>