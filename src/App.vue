<template>
  <div id="app">
    <navbar/>
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
  }
  
}
</script>
