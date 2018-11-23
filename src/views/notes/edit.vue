<template>
<div>
    <div class="section-header">
        <div>
            <h1>Editar nota</h1>
            <span v-cloak>Creada: {{ moment(NOTE.createdAt).format('MMM Do YY') }}</span>
        </div>
        <div>
            <router-link :to="{ name: 'notes' }" class="btn btn-link">Volver</router-link>
        </div>
    </div>
    <div class="section-body">
        <spinner v-if="loading"/>
        <form v-show="!loading" @submit.prevent="updateItem()">
            
            <div class="fields">
                <div class="form-group">
                    <label for="title">Título (*)</label>
                    <input id="title" type="text" class="form-control" v-model="NOTE.title">
                </div>
<!--                 <div class="form-group">
                    <label for="category">Categoría</label>
                    <select  id="category" class="form-control" v-model="NOTE.category.title">
                        <option v-for="item in CATEGORIES" :key="item.id" :value="item.title">{{ item.title }}</option>
                    </select>
                </div> -->
                <div class="form-group">
                    <label for="category">Categoría</label>
                    <v-select :options="CATEGORIES" label="title"  v-model="NOTE.category">
                        <template slot="option" slot-scope="option">
                            <li class="fa fa-circle" :style="'color:' + option.color"></li> 
                            {{ option.title }}
                        </template>
                    </v-select>
                </div>
                <div class="form-group">
                    <label for="description">Descripción (*)</label>
                    <textarea id="description" class="form-control" v-model="NOTE.content"></textarea>
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
import vSelect from 'vue-select'
import { mapGetters } from "vuex";
import Auth from '@/middleware/auth'
import sysMsg from '@/helpers/sys.messages.js' 
let now = moment().format('LLLL');
export default {
    name:'editNote',
    components:{
        vSelect
    },
    data(){
        return {
            loading:false,
            note:{
                title: "",
                content: "",
                category: {
                    title: '' || 'Sin categoría',
                    picture:'' || null,
                    color:'' || null
                },
                //createdAt: now,
                updatedAt: null
            },
            categories:[],
            uID: Auth.getUser().id
        }
    },
    mounted(){
        this.$store.dispatch("GET_CATEGORIES")
        this.$store.dispatch("GET_NOTE", this.$route.params.id)
    },
    computed:{
        ...mapGetters(["NOTE", "CATEGORIES"])
    },
    methods:{
        validation(){
            let valid = this.NOTE.title.toString().trim() == '' || this.NOTE.content.toString().trim() == '' ? false : true
            return valid
        },
        deleteItem(){
            let  note = this.NOTE
            this.loading = true;
            this.$store.dispatch("DELETE_NOTE", note).then(response => {
                this.$router.push({ name: 'notes'});
            }).catch(err => {
                this.loading = false;
                sysMsg.toastMsg('error', 'Ha ocurrido un problema. ' + err.response);
            });
        },
        updateItem(){

            const categorySelected = this.CATEGORIES
            .filter(cat => {
                return cat._id === this.NOTE.category._id;
            })
            .map(cat => {
                let arr = {
                    title: cat.title,
                    color: cat.color,
                    picture: cat.picture
                }
                return arr;
            });

            this.NOTE.category = categorySelected[0];
            
            
            /* console.log(this.NOTE)

            return false  */
            
            this.loading = true;
            if(this.validation()){ 
                this.$store.dispatch("PUT_NOTE", this.NOTE).then(() => {
                    this.loading = false;
                }).catch(error => {
                    this.loading = false;
                })
            } else {
                this.loading = false;
                sysMsg.toastMsg('warning', 'Rellena los campos requeridos.');
            }
        }
    }

}
</script>