<template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
        <v-sheet width="400" class="mx-auto">
            <v-toolbar class="text-center" color="primary"></v-toolbar>
            <v-form fast-fail @submit.prevent="login">
                <v-text-field v-model="username" label="User Name"></v-text-field>

                <v-text-field v-model="password" label="password"></v-text-field>

                <v-btn type="submit" color="primary" block class="mt-2">Login</v-btn>

            </v-form>
        </v-sheet>
    </div>
</template>
<script>
 
import http from '../http-common';

export default {
    name: 'LoginView',
    data() {
        return {
            username: '',
            password: '',
        };
    },
    created() {
        this.$store.commit('SET_LAYOUT', 'LoginLayout')
    },
    methods: {
        login() {
            http.post("/login", {
                username: this.username,
                password: this.password
            }).then(response => {
                this.$router.push('/')
            }).catch(error => {
                
                console.log(error)
            })
        },
    },
}
</script>