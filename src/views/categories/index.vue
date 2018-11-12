<template>
    <div>
        <div class="section-header">
            <div>
                <h1>Categorías</h1>
            </div>
            <div>
                <router-link v-if="categories && categories.length > 0" :to="{ name: 'newcategory' }" class="btn btn-success btn-sm"><i class="fa  fa-plus-circle"></i> Agregar </router-link>
            </div>
        </div>
        <div class="section-body">
            <spinner v-if="loading"/>
            <div v-else class="list-group">
                <router-link v-if="categories && categories.length == 0"  to="/" class="list-group-item list-group-item-action">
                    <div class="text-center">
                        <p>Aún no existen categorías.</p>
                        <router-link :to="{ name: 'newcategory' }" class="btn btn-primary"> Crea una nueva </router-link>
                    </div>
                </router-link>
                <template>
                    <router-link  v-for="item in categories" :key="item.id" :to="'/categories/' + item.id" class="list-group-item list-group-item-action">{{ item.title }}</router-link>
                </template> 
            </div>
        </div>
    </div>
</template>


<script>
import _ from 'underscore';
import Auth from '@/middleware/auth'
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
    created(){
        this.getCategories();
    },
    methods:{
        getCategories(){
            this.loading = true;
            categoryServices.getAll().then(response =>{
                let $this = this
                this.categories =  _.filter(response.data, (filter) => { return filter.userId == $this.uID });
                this.errors = []
                this.loading = false;
            }).catch(err => {
                this.errors.push(err);
                this.loading = false;
                console.log(err.response);
            });
        }
    }

}
</script>