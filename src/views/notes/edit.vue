<template>
<div>
    <div class="section-header">
        <div>
            <h1>Nueva nota</h1>
            <span>Creada: {{ moment(NOTE.created_at).format('MMM Do YY') }}</span>
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
                    <input id="title" type="text" class="form-control" v-model="NOTE.title">
                </div>
                <div class="form-group">
                    <label for="category">Categoría</label>
                    <select  id="category" class="form-control" v-model="NOTE.category.title">
                        <option>{{ NOTE.category.title }}</option>
                        <option v-for="item in CATEGORIES" :key="item.id" :value="item.title">{{ item.title }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="description">Descripción (*)</label>
                    <textarea id="description" class="form-control" v-model="NOTE.description"></textarea>
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
import { mapGetters } from "vuex";
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
    mounted(){
        this.$store.dispatch("GET_NOTE", this.$route.params.id);
        this.$store.dispatch("GET_CATEGORIES");
    },
    computed:{
        ...mapGetters(["NOTE", "CATEGORIES"])
    },
    methods:{
        validation(){
            let valid = this.NOTE.title.toString().trim() == '' || this.NOTE.description.toString().trim() == '' ? false : true
            return valid
        },
        deleteItem(){
            let  note = this.NOTE
            this.$store.dispatch("DELETE_NOTE", note).then(response => {
                this.$router.push('/');
            }).catch(err => {
                sysMsg.toastMsg('error', 'Ha ocurrido un problema. ' + err.response);
            });
        },
        updateItem(){
            if(this.validation()){ 
                this.$store.dispatch("PUT_NOTE", this.NOTE)
            } else {
                sysMsg.toastMsg('warning', 'Rellena los campos requeridos.');
            }
        }
    }

}
</script>