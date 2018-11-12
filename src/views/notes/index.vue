<template>
    <div>
        <div class="section-header">
            <div>
                <h1>Notas</h1>
            </div>
            <div>
                <router-link v-if="NOTES && NOTES.length > 0" :to="{ name: 'newnote' }" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> Agregar </router-link>
            </div>
        </div>
        <div class="section-body">
            <spinner v-if="loading"/>
            <ul v-else class="list-unstyled p-relative">
                <li v-if="NOTES && NOTES.length == 0">
                    <div class="text-center">
                        <p>Aún no existen notas.</p>
                        <router-link :to="{ name: 'newnote' }" class="btn btn-primary"> Crea una nueva </router-link>
                    </div>
                </li>
                <template v-else >
                    <router-link class="media" v-for="item in NOTES" :key="item.id" :to="'/notes/' + item.id">
                        <img class="mr-3" :src="item.category.icon" alt="Generic placeholder image">
                        <div class="media-body">
                        <h5 class="mt-0 mb-1">{{ item.title }}</h5>
                        <div><strong>{{ item.category.title }}</strong>. Creada en {{ moment(item.created_at).format('MMM Do YY') }}</div>
                        </div>
                    </router-link>
                </template>
            </ul>
        </div>
        </div>
</template>

<script>
import _ from 'underscore';
import { mapGetters } from "vuex";
import Auth from '@/middleware/auth'
import noteServices from '@/services/note.services';
export default {
    name:'notes',
    data(){
        return {
            loading: false,
            notes: [],
            errors:[],
            tmp: [],
            uID: Auth.getUser().id
        }
    },
    mounted(){
        this.$store.dispatch("GET_NOTES");
    },
    computed:{
        ...mapGetters(["NOTES"])
    },
    created(){
        //this.getNotes();
    },
    methods:{
        getNotes(){
            this.loading = true;
            noteServices.getAll().then(response => {
                let $this = this
                this.notes =  _.filter(response.data, (filter) => { return filter.userId == $this.uID });
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