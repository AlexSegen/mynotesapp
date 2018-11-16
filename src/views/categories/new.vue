<template>
<div>
    <div class="section-header">
        <div>
            <h1>Nueva categoría</h1>
        </div>
        <div>
           <router-link :to="{ name: 'categories' }" class="btn btn-link">Volver</router-link>
        </div>
    </div>
    <div class="section-body">
        <spinner v-if="loading"/>
        <form v-show="!loading" @submit.prevent="addItem()">
            <div class="fields">
                <div class="form-group">
                    <label for="title">Título</label>
                    <input id="title" type="text" class="form-control" v-model="category.title">
                </div>
                <div class="form-group">
                    <label for="title">Color</label>
                    <input id="title" type="text" class="form-control" placeholder="#4CAF50, #3F51B5, #f44336, ..." v-model="category.color">
                </div>
                <input type="text" v-model="category.picture" hidden>
            </div>
            <button type="submit" class="btn btn-success">AGREGAR</button>
        </form>
        
    </div>
</div>
</template>

<script>
import moment from 'moment'
import Auth from '@/middleware/auth'
import sysMsg from '@/helpers/sys.messages.js' 
import categoryServices from '@/services/category.services';
let now = moment();
export default {
    name:'newCategory',
    data(){
        return {
            loading: false,
            category:{
                title:'',
                color:'',
                picture:'' || 'http://placehold.it/64x64',
                createdAt: now,
                updatedAt: null,
                userId: Auth.getUser().id
            }
        }
    },
    methods:{
        validation(){
            let valid = this.category.title.toString().trim() == '' ? false : true
            return valid
        },
        addItem(){
            this.loading = true;
            if(this.validation()){
                this.$store.dispatch("SAVE_CATEGORY", this.category).then(response => {
                    this.loading = false;
                    this.category = {
                        title:'',
                        color:'' || 'blue',
                        picture:'' || 'http://placehold.it/64x64',
                        createdAt: now,
                        updatedAt: null,
                        userId: Auth.getUser().id
                    }
                }).catch(err => {
                    this.loading = false;
                    sysMsg.toastMsg('error', 'Ha ocurrido un problema. ' + err );
                });
                            
            } else {
                this.loading = false;
                sysMsg.toastMsg('warning', 'El campo Título es requerido.');
            }
        }
    }

}
</script>

<style>

</style>
