<template>
    <v-app>
        <v-content>
            <router-view/>
        </v-content>        
    </v-app>
</template>
<script>
export default {
    name: 'LoginLayout',
    created() {
        this.$store.commit('SET_LAYOUT', 'LoginLayout')
    },
    data() {
        return {
        };
    },
    methods: {
    },
}
</script>