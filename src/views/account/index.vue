<template>
    <div>
        <div class="section-header">
            <div>
                <h1>Hola, {{ user.name }}</h1>
            </div>
            <div>
                
            </div>
        </div>
        <div class="section-body">
            <div class="card">
                <div class="card-body">
                    <p>Tus datos:</p>
                    <ul class="list-unstyled">
                        <li>
                            Nombre: {{ user.name }}
                        </li>
                        <li>
                            Correo: {{ user.email }}
                        </li>
                        <li>
                            Registrado: {{ moment(user.createdAt).format('MMM Do YY') }}
                        </li>
                    </ul>
                    <p>
                        <button class="btn btn-secondary btn-sm" @click="logout()">Cerrar sesión</button>
                    </p>
                </div>
            </div>
        </div>
        </div>
</template>

<script>
import Auth from '@/middleware/auth.js';
export default {
  name:'account',
  data(){
    return {
      user: Auth.getUser()
    }
  },
  methods:{
      logout(){
          Auth.logout();
      }
  }
}
</script>

<style>

</style>
