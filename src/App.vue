<template>
  <component :is="layout"></component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex';
import LoginLayout from './components/layout/Login.vue'
import PrincipalLayout from './components/layout/Principal.vue'

export default defineComponent({
  name: 'App',
  components: {LoginLayout, PrincipalLayout},
  computed: mapState(['layout'])
})
</script>
