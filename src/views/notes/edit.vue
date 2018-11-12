<template>
<div>
    <div class="section-header">
        <div>
            <h1>Nueva nota</h1>
            <span>Creada: {{ moment(note.created_at).format('MMM Do YY') }}</span>
        </div>
        <div>
            <router-link :to="{ name: 'notes' }" class="btn btn-link">Volver</router-link>
        </div>
    </div>
    <div class="section-body">

        <form @submit.prevent="updateItem()">
            
            <div class="fields">
                <div class="form-group">
                    <label for="title">Título (*)</label>
                    <input id="title" type="text" class="form-control" v-model="note.title">
                </div>
                <div class="form-group">
                    <label for="category">Categoría</label>
                    <select  id="category" class="form-control" v-model="note.category.title">
                        <option>{{ note.category.title }}</option>
                        <option v-for="item in categories" :key="item.id" :value="item">{{ item.title }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="description">Descripción (*)</label>
                    <textarea id="description" class="form-control" v-model="note.description"></textarea>
                </div>
            </div>
            <button type="submit" class="btn btn-success">Actualizar</button>
            <button type="button" class="btn btn-danger" @click="deleteItem()">Eliminar</button>
            
        </form>
        
    </div>
</div>
</template>

<script>
import _ from 'underscore'
import moment from 'moment'
import Auth from '@/middleware/auth'
import sysMsg from '@/helpers/sys.messages.js' 
import noteServices from '@/services/note.services'
import categoryServices from '@/services/category.services';
let now = moment().format('LLLL');
export default {
    name:'editNote',
    data(){
        return {
            note:{
                title:'',
                description:'',
                category: {
                    title:'Sin categoría',
                    icon:'http://placehold.it/'
                },
                created_at: now,
                userId: Auth.getUser().id
            },
            categories:[],
            uID: Auth.getUser().id
        }
    },
    created(){
        this.getCategories();
        this.getItem();
        console.log()
    },
    methods:{
        validation(){
            let valid = this.note.title.toString().trim() == '' || this.note.description.toString().trim() == '' ? false : true
            return valid
        },
        getItem(){
            noteServices.get(this.$route.params.id).then(response => {
                this.note = response.data;
            }).catch(err => {
                sysMsg.toastMsg('error', 'No se pudo cargar la nota. ' + err);
            });
        },
        deleteItem(){
            noteServices.delete(this.$route.params.id).then(response => {
                this.$router.push('/');
            }).catch(err => {
                sysMsg.toastMsg('error', 'Ha ocurrido un problema. ' + err);
            });
        },
        updateItem(){
            if(this.validation()){
                noteServices.put(this.$route.params.id, this.note).then(response => {
                    sysMsg.toastMsg('info', 'Nota actualizada con éxito');
                    this.note = response.data;    
                }).catch(err => {
                    sysMsg.toastMsg('error', 'Ha ocurrido un problema. ' + err);
                });
            } else {
                 sysMsg.toastMsg('warning', 'Rellena los cambos requeridos.');
            }
        },
        getCategories(){
            categoryServices.getAll().then(response =>{
                let tempCategories = response.data;
                tempCategories.push(
                    {
                        id: 0,
                        title:'Sin categoría',
                        icon:'http://placehold.it/64x64'
                    }
                );
                let $this = this
                this.categories = _.sortBy(_.filter(tempCategories, (filter) => { return filter.userId == $this.uID }), (sort) => { return sort.id })
            }).catch(err => {
                console.log(err);
            });
        }
    }

}
</script>