<template>
    <div>
        <div class="section-header">
            <div>
                <h1>Categorías</h1>
            </div>
            <div>
                <router-link v-if="CATEGORIES && CATEGORIES.length > 0" :to="{ name: 'newcategory' }" class="btn btn-success btn-sm"><i class="fa  fa-plus-circle"></i> Agregar </router-link>
            </div>
        </div>
        <div class="section-body">
            <spinner v-if="loading"/>
            <div v-else class="list-group">
                
                <div class="text-center" v-if="CATEGORIES && CATEGORIES.length == 0" >
                    <p>Aún no existen categorías.</p>
                    <router-link :to="{ name: 'newcategory' }" class="btn btn-primary"> Crea una nueva </router-link>
                </div>

                <template>
                    <router-link  v-for="item in CATEGORIES" :key="item.id" :to="'/categories/' + item.id" class="list-group-item list-group-item-action">{{ item.title }}</router-link>
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
            errors:[],
            uID: Auth.getUser().id
        }
    },
    mounted(){
        this.$store.dispatch("GET_CATEGORIES");
    },
    computed:{
        ...mapGetters(["CATEGORIES"])
    }

}
</script>