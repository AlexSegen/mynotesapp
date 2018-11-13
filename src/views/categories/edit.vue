<template>
<div>
    <div class="section-header">
        <div>
            <h1>Editar categoría</h1>
            <span>Creada: {{ moment(CATEGORY.created_at).format('MMM Do YY') }}</span>
        </div>
        <div>
           <router-link :to="{ name: 'categories' }" class="btn btn-link">Volver</router-link>
        </div>
    </div>
    <div class="section-body">
        <form @submit.prevent="updateItem()">
            <div class="fields">
                <div class="form-group">
                    <label for="title">Título</label>
                    <input id="title" type="text" class="form-control" v-model="CATEGORY.title">
                </div>
            </div>
            <button type="submit" class="btn btn-success">Actualizar</button>
            <button type="button" class="btn btn-danger" @click="deleteCategory(category)">Eliminar</button>
        </form>        
    </div>
</div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from "vuex";
import Auth from '@/middleware/auth'
import sysMsg from '@/helpers/sys.messages.js' 
import categoryServices from '@/services/category.services';
let now = moment().format('LLLL');
export default {
    name:'EditCategory',
    data(){
        return {
            category:{
                title:'',
                icon:'' || 'http://placehold.it/',
                created_at: now,
                userId: Auth.getUser().id
            }
        }
    },
    mounted(){
        this.$store.dispatch("GET_CATEGORY", this.$route.params.id);
    },
    computed:{
        ...mapGetters(["CATEGORY"])
    },
    methods:{
        validation(){
            let valid = this.CATEGORY.title.toString().trim() == '' ? false : true
            return valid
        },
        updateItem(){
            if(this.validation()){ 
                this.$store.dispatch("PUT_CATEGORY", this.CATEGORY)
            } else {
                sysMsg.toastMsg('warning', 'El campo Título es requerido.');
            }
        },
        deleteCategory() {
            let  category = this.CATEGORY
            this.$store.dispatch("DELETE_CATEGORY", category).then(response => {
                this.$router.push('/categories');
            }).catch(err => {
                sysMsg.toastMsg('error', 'Ha ocurrido un problema. ' + err.response);
            });
        }
    }

}
</script>