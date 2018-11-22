<template>
  <div id="app">
    <navbar v-if="loggedIn"/>
    <div class="mainwrapper">
      <router-view/>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/partials/navbar'
export default {
  name:'App',
  components:{
    Navbar
  },
  computed:{
    loggedIn(){
      return this.$store.state.authState.loggedIn
    }
  },
  mounted(){
    this.$store.dispatch("CHECK_AUTH");
  }
  
}
</script>
