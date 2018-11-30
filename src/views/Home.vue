<template>
  <div class="home">
        <div class="section-header">
            <div>
                <h5>¡Hola, {{ user.name }}!</h5>
            </div>
            <div>
                
            </div>
        </div>

        <div class="section-body">

            <router-link :to="{ name: 'notes' }"  class="card card-app notes">
              <div class="card-body">
                <h5 class="card-title my-0 ">Notas</h5>
                <p class="card-text">Crea y lista tus notas fácil y rápidamente.</p>
              </div>
            </router-link>

            <router-link :to="{ name: 'categories' }"  class="card card-app categories">
              <div class="card-body">
                <h5 class="card-title my-0">Categorías</h5>
                <p class="card-text">Crea categorías para tus notas y clasifícalas como quieras.</p>
              </div>
            </router-link>


            <div class="card card-app tasks">
              <div class="card-body">
                <h5 class="card-title my-0">Tareas</h5>
                <p class="card-text">Crea una lista de tareas para que controles tus actividades.</p>
              </div>
            </div>

        </div>
  </div>
</template>

<script>
import Auth from '@/middleware/auth'
export default {
  name: 'home',
  components: {},
  computed:{
  user(){
    return Auth.getUser();
  }
}
}
</script>
<style scoped>
.card {
  max-width: 310px;
  margin: 0 auto 10px auto;
}
</style>
