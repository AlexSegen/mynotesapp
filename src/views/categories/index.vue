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
            <div v-if="error.value" class="alert alert-danger text-center">
                😪 Error: {{ error.text }}
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
import { mapGetters } from "vuex";
import Auth from '@/middleware/auth';
export default {
    name:'categories',
    data(){
        return {
            loading: false,
            categories:[],
            error: {
                value: false,
                text: ''
            },
            uID: Auth.getUser().id
        }
    },
    mounted(){
        this.loading = true;
        this.$store.dispatch("GET_CATEGORIES").then(response => {
            this.error = {
                value: false,
                text: ''
            };
            this.loading = false;
        }).catch(error => {
            this.loading = false;
            this.error.value = true;
            this.error.text = error.response.data.message;
        });
    },
    computed:{
        ...mapGetters(["CATEGORIES"])
    }

}
</script>