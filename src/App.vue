<template>
  <div id="app">
    <navbar v-if="loggedIn"/>
    <div class="mainwrapper">
      <router-view/>
    </div>
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
