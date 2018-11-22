<template>
    <div>
        <div class="section-header">
            <div>
                <h1>Registrarse</h1>
            </div>
            <div>
                <router-link :to="{ name: 'login' }" class="btn btn-link">Ingresar</router-link>
            </div>
        </div>
        <div class="section-body">
            <div class="login-form">
              <div v-if="success" class="alert alert-success">
                <strong>¡Cuenta creada!</strong><br>
                Ya puedes <router-link :to="{ name: 'login' }">iniciar sesión</router-link>.
              </div>
                <form @submit.prevent="register()">
                    <div class="form-group">
                        <label for="name">Nombre</label>
                        <input type="text" class="form-control" v-model="payload.name">
                    </div>
                    <div class="form-group">
                        <label for="email">Correo electrónico</label>
                        <input type="email" class="form-control" v-model="payload.email">
                    </div>
                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input type="password" class="form-control" v-model="payload.password">
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary" type="submit">Comenzar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Auth from "@/middleware/auth.js";
import sysMsgs from '@/helpers/sys.messages';
export default {
  name: "register",
  data() {
    return {
      success: false,
      payload: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    register() {
      Auth.register(this.payload)
        .then(response => {
          this.success = true;
          this.payload = {
            name: "",
            email: "",
            password: ""
          }
        }).catch(() => {
          err.response.status == 500
            ? sysMsgs.toastMsg('error', 'Error al conectar con el servidor.')
            : sysMsgs.toastMsg( "error", "Ocurrió un error. Reintenta mas tarde.");
        });
    }
  }
};
</script>

<style>
</style>
