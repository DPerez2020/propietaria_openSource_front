<template>
  home
</template>

<script>

export default {
  name: 'HomeView',
  created() {
    this.$store.commit('SET_LAYOUT', 'PrincipalLayout')
  },
  components: {
  },
};
</script>
