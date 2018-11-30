<template>
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="card bg-secondary shadow border-0">
              <div class="card-body px-lg-5 py-lg-5">
                <div class="text-center text-muted mb-4">
                  <small>Bienvenido a Notes</small>
                </div>
                <form role="form" @submit.prevent="login()">
                    <spinner v-if="loading"/>
                    <div v-show="!loading" class="fields">
                        <div class="form-group mb-3">
                            <div class="input-group input-group-alternative">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                            </div>
                            <input class="form-control" placeholder="Tu correo electrónico" type="email" v-model="payload.email" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group input-group-alternative">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                            </div>
                            <input class="form-control" placeholder="Tu contraseña" type="password" v-model="payload.password" required>
                            </div>
                        </div>
                        <div class="custom-control custom-control-alternative custom-checkbox">
                            <input class="custom-control-input" id=" customCheckLogin" type="checkbox">
                            <label class="custom-control-label" for=" customCheckLogin">
                            <span>Recordar contraseña</span>
                            </label>
                        </div>
                    </div>
                  <div class="text-center">
                    <button type="submit" class="btn btn-primary my-4" :disabled="loading">Iniciar sesión</button>
                  </div>
                </form>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-6">
                <a href="javascript:void(0);" class="text-light">
                  <small>¿Olvidaste tu contraseña?</small>
                </a>
              </div>
              <div class="col-6 text-right">
                <router-link :to="{ name: 'register' }" class="text-light">
                  <small>¡Únete ahora!</small>
                </router-link>
              </div>
            </div>
          </div>
        </div>
</template>

<script>
import Auth from '@/middleware/auth'
import sysMsgs from '@/helpers/sys.messages.js'
export default {
    name:'login',
    data(){
        return {
            loading: false,
            payload:{
                email:'',
                password:''
            }
        }
    },
    methods: {
        login(){
            this.loading = true;
            this.$store.dispatch('LOGIN', this.payload).catch(error => {
                this.payload.password = ''
                this.loading = false;
                switch (error.response.status) {
                    case 401:
                    sysMsgs.toastMsg('error', 'Datos incorrectos');  
                    break;

                    case 404:
                    sysMsgs.toastMsg('error', 'Usuario no encontrado');
                    break;

                    case 500:
                    sysMsgs.toastMsg('error', 'Error al conectar con el servidor.');
                    break;
                
                    default:
                    sysMsgs.toastMsg('error', 'Ocurrió un error. Reintenta mas tarde.');
                    break;
                }
            });
        }
    }
}
</script>

<style>

</style>
