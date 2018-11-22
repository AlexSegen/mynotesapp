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
                    <div class="fields">
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
export default {
    name:'login',
    data(){
        return {
            payload:{
                email:'',
                password:''
            }
        }
    },
    methods: {
        login(){
            let payload = this.payload;
            this.$store.dispatch('LOGIN', payload);
        }

    }
}
</script>

<style>

</style>
