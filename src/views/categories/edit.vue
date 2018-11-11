<template>
<div>
    <div class="section-header">
        <div>
            <h1>Editar categoría</h1>
            <span>Creada: {{ moment(category.created_at).format('MMM Do YY') }}</span>
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
                    <input id="title" type="text" class="form-control" v-model="category.title">
                </div>
            </div>
            <button type="submit" class="btn btn-success">Actualizar</button>
            <button type="button" class="btn btn-danger" @click="deleteItem()">Eliminar</button>
        </form>
        
    </div>
</div>
</template>

<script>
import moment from 'moment'
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
                created_at: now
            }
        }
    },
    created(){
        this.getItem();
    },
    methods:{
        getItem(){
            categoryServices.get(this.$route.params.id).then(response => {
                this.category = response.data;
            }).catch(err => {
                sysMsg.toastMsg('error', 'No se pudo cargar la catgoría. ' + err);
            });
        },
        deleteItem(){
            categoryServices.delete(this.$route.params.id).then(response => {
                this.$router.push('/categories');
            }).catch(err => {
                sysMsg.toastMsg('error', 'Ha ocurrido un problema. ' + err);
            });
        },
        updateItem(){
           categoryServices.put(this.$route.params.id, this.category).then(response => {
                sysMsg.toastMsg('info', 'Categoría actualizada con éxito');
                this.category = response.data;    
            }).catch(err => {
                sysMsg.toastMsg('error', 'Ha ocurrido un problema. ' + err);
            });
        }
    }

}
</script>