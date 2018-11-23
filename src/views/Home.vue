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

            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Notas</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p class="card-text">Crea y lista tus notas fácil y rápidamente.</p>
                <router-link :to="{ name: 'notes' }" class="card-link text-secondary">Ver todas</router-link>
                <router-link :to="{ name: 'newnote' }" class="card-link text-success">Crear nueva</router-link>
              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Categorías</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p class="card-text">Crea categorías para tus notas y clasifícalas como quieras.</p>
                <router-link :to="{ name: 'categories' }" class="card-link text-secondary">Ver todas</router-link>
                <router-link :to="{ name: 'newcategory' }" class="card-link text-success">Crear nueva</router-link>
              </div>
            </div>


            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Tareas</h5>
                <h6 class="card-subtitle mb-2 text-muted">Proximamente</h6>
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
<style <style scoped>
.card {
  max-width: 310px;
  margin: 0 auto 10px auto;
}
</style>
