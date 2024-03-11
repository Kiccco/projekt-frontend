<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>

  <RouterView />
</template>

<script>
  import { mapGetters } from 'vuex'
  import router from "./router"
  export default {
      computed: { 
        ...mapGetters(['getUser']),
      },

      methods: {
      },
      
      mounted() {
   

      },

      created() {
        router.push("/home")
        /*
        if(this.getUser == null) {
          this.$router.push('/login');
        } else {
          this.$router.push("/home")
        }
        */
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

#head {
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgb(82, 41, 122);
  width: 100%;
  user-select: none;
  -webkit-app-region: drag;


}


</style>
