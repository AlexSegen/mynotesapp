<template>
    <div>
        <div class="section-header">
            <div>
                <h1>Notas</h1>
            </div>
            <div>
                <router-link v-if="!NOTES || NOTES.length > 0" :to="{ name: 'newnote' }" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> Agregar </router-link>
            </div>
        </div>
        <div class="section-body">
            <div v-if="error" class="alert alert-danger text-center">
                Ocurrió un error 😪
            </div>
            <spinner v-if="loading"/>
            <ul v-else class="list-unstyled p-relative">
                <li v-if="!NOTES || NOTES.length == 0">
                    <div class="text-center">
                        <p>Aún no existen notas.</p>
                        <router-link :to="{ name: 'newnote' }" class="btn btn-primary"> Crea una nueva </router-link>
                    </div>
                </li>
                <template v-else >
                    <router-link class="media" v-for="item in NOTES" :key="item.id" :to="'/notes/' + item._id">
                        <img class="mr-3" :src="item.picture == null ? 'https://via.placeholder.com/64/' + item.category.color + '/' + item.category.color: item.picture">
                        <div class="media-body">
                        <h5 class="mt-0 mb-1">{{ item.title }}</h5>
                        <div><strong>{{ item.category.title }}</strong>. Creada en {{ moment(item.createdAt).format('MMM Do YY') }}</div>
                        </div>
                    </router-link>
                </template>
            </ul>
        </div>
        </div>
</template>

<script>
import { mapGetters } from "vuex";
import Auth from '@/middleware/auth'
import noteServices from '@/services/note.services';
export default {
    name:'notes',
    data(){
        return {
            loading: false,
            notes: [],
            error: false,
            tmp: [],
            uID: Auth.getUser().id
        }
    },
    mounted(){
        this.loading = true;
        this.$store.dispatch("GET_NOTES").then(response => {
            this.error = false;
            this.loading = false;
        }).catch(err => {
            this.error = true;
            this.loading = false;
        });
    },
    computed:{
        ...mapGetters(["NOTES"])
    }
}
</script>