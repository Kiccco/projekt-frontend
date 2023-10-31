<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>


  <RouterView />
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
      computed: { 
        ...mapGetters(['getUser']),
      },

      created() {
        if(this.getUser == null) {
          this.$router.push('/login');
        }
      }

  }
</script>

<style scoped>

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

</style>
