<template>
    <div>
        <div class="section-header">
            <div>
                <h1>Inicia sesión</h1>
            </div>
            <div>
                <router-link :to="{ name: 'register' }" class="btn btn-link">Registrarse</router-link>
            </div>
        </div>
        <div class="section-body">
            <div class="login-form">
                <form @submit.prevent="login()">
                    <spinner v-if="loading"/>
                    <div v-show="!loading" class="fields">
                        <div class="form-group">
                            <label for="email">Correo electrónico</label>
                            <input type="email" class="form-control" v-model="payload.email">
                        </div>
                        <div class="form-group">
                            <label for="password">Contraseña</label>
                            <input type="password" class="form-control" v-model="payload.password">
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary" type="submit">Entrar</button>
                        </div>
                    </div>
                </form>
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
