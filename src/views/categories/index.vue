<template>
    <div>
        <div class="section-header">
            <div>
                <h1>Categorías</h1>
            </div>
            <div>
                <router-link v-if="!CATEGORIES || CATEGORIES.length > 0" :to="{ name: 'newcategory' }" class="btn btn-success btn-sm"><i class="fa  fa-plus-circle"></i> Agregar </router-link>
            </div>
        </div>
        <div class="section-body">
            <div v-if="error" class="alert alert-danger text-center">
                Ocurrió un error 😪
            </div>
            <spinner v-if="loading"/>
            <div v-else class="list-group">
                
                <div class="text-center" v-if="!CATEGORIES || CATEGORIES.length == 0" >
                    <p>Aún no existen categorías.</p>
                    <router-link :to="{ name: 'newcategory' }" class="btn btn-primary"> Crea una nueva </router-link>
                </div>

                <template>
                    <router-link  v-for="item in CATEGORIES" 
                    :key="item._id" 
                    :to="'/categories/' + item._id" 
                    class="list-group-item list-group-item-action">
                     <i class="fa fa-circle" :style="'color:' + item.color"></i> {{ item.title }}
                    </router-link>
                </template> 
            </div>
        </div>
    </div>
</template>


<script>
import _ from 'underscore';
import { mapGetters } from "vuex";
import Auth from '@/middleware/auth';
import categoryServices from '@/services/category.services';
export default {
    name:'categories',
    data(){
        return {
            loading: false,
            categories:[],
            error: false,
            uID: Auth.getUser().id
        }
    },
    mounted(){
        this.loading = true;
        this.$store.dispatch("GET_CATEGORIES").then(response => {
            this.error = false;
            this.loading = false;
        }).catch(err => {
            this.loading = false;
            this.error = true;
        });
    },
    computed:{
        ...mapGetters(["CATEGORIES"])
    }

}
</script>