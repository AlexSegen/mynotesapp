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
        <spinner v-if="loading"/>
        <form v-show="!loading" @submit.prevent="updateItem()">
            <div class="fields">
                <div class="form-group">
                    <label for="title">Título</label>
                    <input id="title" type="text" class="form-control" v-model="CATEGORY.title">
                </div>
                <div class="form-group">
                    <label for="title">Color</label>
                    <input id="title" type="text" class="form-control" placeholder="#4CAF50, #3F51B5, #f44336, ..." v-model="CATEGORY.color">
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
            loading: false,
            category:{
                title:'',
                color:'' || 'blue',
                picture:'' || 'http://placehold.it/64x64',
                createdAt: now,
                updatedAt: null
            }
        }
    },
    mounted(){
        this.loading = true;
        this.$store.dispatch("GET_CATEGORY", this.$route.params.id).then(response => {
            this.loading = false;
        }).catch((error)=> {
            sysMsg.toastMsg('error', 'Ha ocurrido un problema. ' + error.response);
        });
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
            }).catch(error => {
                sysMsg.toastMsg('error', 'Ha ocurrido un problema. ' + error.response);
            });
        }
    }

}
</script>