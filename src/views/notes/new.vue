<template>
<div>
    <div class="section-header">
        <div>
            <h1>Nueva nota</h1>
        </div>
        <div>
            <router-link :to="{ name: 'notes' }" class="btn btn-link">Volver</router-link>
        </div>
    </div>
    <div class="section-body">

        <form @submit.prevent="add()">
            
            <div class="fields">
                <div class="form-group">
                    <label for="title">Título (*)</label>
                    <input id="title" type="text" class="form-control" v-model="note.title">
                </div>
                <div class="form-group">
                    <label for="category">Categoría</label>
                    <select  id="category" class="form-control" v-model="note.category">
                        <option value="sin categoría">Sin categoría</option>
                        <option v-for="item in CATEGORIES" :key="item._id" :value="item.title">{{ item.title }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="description">Descripción (*)</label>
                    <textarea id="description" class="form-control" v-model="note.content"></textarea>
                </div>
            </div>
            <button type="submit" class="btn btn-success">AGREGAR</button>
        </form>
        
    </div>
</div>
</template>

<script>
import _ from 'underscore'
import moment from 'moment'
import { mapGetters } from "vuex";
import Auth from '@/middleware/auth'
import sysMsg from '@/helpers/sys.messages.js' 
import noteServices from '@/services/note.services'
import categoryServices from '@/services/category.services';
let now = moment();
export default {
    name:'newNote',
    data(){
        return {
            note:{
                title: "",
                content: "",
                category: {
                    title: '' || 'Sin categoría',
                    pic:'' || null,
                    color:'' || null
                },
                createdAt: now
            },
            categories:[],
            uID: Auth.getUser().id
        }
    },
    mounted(){
        this.$store.dispatch("GET_CATEGORIES");
    },
    computed:{
        ...mapGetters(["CATEGORIES"])
    },
    methods:{
        validation(){
            let valid = this.note.title.toString().trim() == '' || this.note.content.toString().trim() == '' ? false : true
            return valid
        },
        add(){

            if(this.validation()){
                
                this.$store.dispatch("SAVE_NOTE", this.note).then(response => {
                    this.note = {
                        title: "",
                        content: "",
                        category: {
                            title: '' || 'Sin categoría',
                            pic:'' || null,
                            color:'' || null
                        },
                        createdAt: now
                    }
                }).catch(err => {
                    sysMsg.toastMsg('error', 'Ha ocurrido un problema. ' + err.response);
                });

            } else {
                 sysMsg.toastMsg('warning', 'Rellena los cambos requeridos.');
            }
        }
    }

}
</script>

<style>

</style>
