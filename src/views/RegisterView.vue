<template>
    <main>
        <div class="flex-holder">
            <div class="register-header">
                Sign up to use Manual Accounting
            </div>
            <div class="register-container">
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
                <div class="box-repassword">
                    <div class="repassword-header">Re-enter password</div>
                    <div class="password-input">
                        <input type="password" v-model="rePassword">
                    </div>
                </div>
                <div class="register-button-container">
                    <RegisterButton @click="register"/>
                </div>
                <div class="error-message-container">
                    <ErrorMessage :text="warningText"/>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import RegisterButton from '@/components/RegisterButton.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import router from '@/router';

export default {
    components: {
        RegisterButton,
        ErrorMessage
    },
    data() {
        return {
            username: '',
            password: '',
            rePassword: '',
            warningText: ''
        }
    },
    methods: {
        async register() {
            if (this.username == '' || this.password == '' || this.rePassword == '') {
                this.warningText = 'Empty fields!'

                return;
            }

            if (this.password != this.rePassword) {
                this.warningText = 'Passwords missmatch!';

                return;
            }

            const newUser = {
                username: this.username,
                password: this.password
            };

            const response = await fetch(import.meta.env.VITE_REGISTER, {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.status == 400) {
                this.warningText = 'The user already exists';

                return;
            }

            router.push({path: '/'});
        }
    }
}
</script>

<style scoped>
@import "../assets/css/login-register.css";
</style>