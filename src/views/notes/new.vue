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
        <spinner v-if="loading"/>

        <form v-show="!loading" @submit.prevent="add()">
            
            <div class="fields">
                <div class="form-group">
                    <label for="title">Título (*)</label>
                    <input id="title" type="text" class="form-control" v-model="note.title">
                </div>
               <!--  <div class="form-group">
                    <label for="category">Categoría</label>
                    <select  id="category" class="form-control" v-model="note.category">
                        <option v-for="item in CATEGORIES" :key="item._id" :value="item">{{ item.title }}</option>
                    </select>
                </div> -->

                <div class="form-group">
                    <label for="category">Categoría</label>
                    <v-select :options="CATEGORIES" label="title"  v-model="note.category">
                        <template slot="option" slot-scope="option">
                            <li class="fa fa-circle" :style="'color:' + option.color"></li> 
                            {{ option.title }}
                        </template>
                    </v-select>
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
import moment from 'moment'
import vSelect from 'vue-select'
import { mapGetters } from "vuex";
import Auth from '@/middleware/auth'
import sysMsg from '@/helpers/sys.messages.js' 
let now = moment();
export default {
    name:'newNote',
    components: {
        vSelect
    },
    data(){
        return {
            loading:false,
            error: false,
            note:{
                title: "",
                content: "",
                category: {
                    title: '' || 'Sin categoría',
                    picture:'' || null,
                    color:'' || null
                },
                createdAt: now
            },
            categories:[],
            uID: Auth.getUser().id
        }
    },
    mounted(){
        this.loading = true;
        this.$store.dispatch("GET_CATEGORIES").then(response => {
            this.loading = false;
        }).catch(err => {
            sysMsg.toastMsg('error', 'Ha ocurrido un problema. ' + err);
            this.loading = false;
        });
        
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
            this.loading = true;
            const categorySelected = this.CATEGORIES
            .filter(cat => {
                return cat._id === this.note.category._id;
            })
            .map(cat => {
                let arr = {
                    title: cat.title,
                    color: cat.color,
                    picture: cat.picture
                }
                return arr;
            });

            this.note.category = categorySelected[0];

            if(this.validation()){
               
                this.$store.dispatch("SAVE_NOTE", this.note).then(response => {
                    this.loading = false;
                    this.note = {
                        title: "",
                        content: "",
                        category: {
                            title: '' || 'Sin categoría',
                            picture:'' || null,
                            color:'' || null
                        },
                        createdAt: now
                    }
                }).catch(err => {
                    this.loading = false;
                    sysMsg.toastMsg('error', 'Ha ocurrido un problema. ' + err.response);
                });

            } else {
                 sysMsg.toastMsg('warning', 'Rellena los cambos requeridos.');
                 this.loading = false;
            }
        }
    }

}
</script>

<style>

</style>
