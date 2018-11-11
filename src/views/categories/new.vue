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
        <form @submit.prevent="add()">
            <div class="fields">
                <div class="form-group">
                    <label for="title">Título</label>
                    <input id="title" type="text" class="form-control" v-model="category.title">
                </div>
                <input type="text" v-model="category.icon" hidden>
            </div>
            <button type="submit" class="btn btn-success">AGREGAR</button>
        </form>
        
    </div>
</div>
</template>

<script>
import moment from 'moment'
import categoryServices from '@/services/category.services';
import sysMsg from '@/helpers/sys.messages.js' 
let now = moment();
export default {
    name:'newCategory',
    data(){
        return {
            category:{
                title:'',
                icon:'http://placehold.it/64x64',
                created_at: now
            }
        }
    },
    methods:{
        add(){
            categoryServices.post(this.category).then(response => {
                 sysMsg.toastMsg('success', 'Categoría agregada');
                this.category = {
                    title:'',
                    icon:'',
                    created_at: now
                }
            }).catch(err => {
                sysMsg.toastMsg('error', 'Ha ocurrido un problema. ' + err );
            });
        }
    }

}
</script>

<style>

</style>
