<template>
    <div>
        <div class="section-header">
            <div>
                <h1>Notas</h1>
            </div>
            <div>
                <router-link v-if="notes && notes.length > 0" :to="{ name: 'newnote' }" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> Agregar </router-link>
            </div>
        </div>
        <div class="section-body">
            <ul class="list-unstyled">
                <li v-if="notes && notes.length == 0">
                    <div class="text-center">
                        <p>Aún no existen notas.</p>
                        <router-link :to="{ name: 'newnote' }" class="btn btn-primary"> Crea una nueva </router-link>
                    </div>
                </li>
                <template v-else >
                    <router-link class="media" v-for="item in notes" :key="item.id" :to="'/notes/' + item.id">
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
import Auth from '@/middleware/auth'
import noteServices from '@/services/note.services';
import _ from 'underscore';
export default {
    name:'notes',
    data(){
        return {
            notes: noteServices.getUserNotes(),
            errors:[],
            tmp: [],
            uID: Auth.getUser().id
        }
    },
    created(){
        this.getNotes();
    },
    methods:{
        getNotes(){
            noteServices.getAll().then(response =>{
                let $this = this
                this.notes =  _.filter(response.data, function (filter) { return filter.userId == $this.uID });
                this.errors = []
            }).catch(err => {
                this.errors.push(err);
                console.log(err.response);
            });
        }
    }

}
</script>