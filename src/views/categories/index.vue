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
            <div class="list-group">
                <router-link v-if="categories && categories.length == 0"  to="/" class="list-group-item list-group-item-action">
                    <div class="text-center">
                        <p>Aún no existen categorías.</p>
                        <router-link to="´{ name:'newcategory' }" class="btn btn-primary"> Crea una nueva </router-link>
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
import categoryServices from '@/services/category.services';
export default {
    name:'categories',
    data(){
        return {
            categories:[],
            errors:[]
        }
    },
    created(){
        this.getCategories();
    },
    methods:{
        getCategories(){
            categoryServices.getAll().then(response =>{
                this.categories = response.data;
                this.errors = []
            }).catch(err => {
                this.errors.push(err);
                console.log(err.response);
            });
        }
    }

}
</script>