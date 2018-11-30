<template>
  <div id="app">
    <navbar v-if="loggedIn"/>
    <main class="1section section-shaped">
      <div class="container pt-lg-md">
        <router-view/>
      </div>   
    </main>  
  </div>
</template>
<script>
import Auth from '@/middleware/auth'
import Navbar from '@/components/partials/navbar'
export default {
  name:'App',
  components:{
    Navbar
  },
  computed:{
    loggedIn(){
      return Auth.isLoggedIn();
    }
  },
  mounted(){
    this.$store.dispatch("CHECK_AUTH");
  }
  
}
</script>