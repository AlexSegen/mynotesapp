<template>
    <div>
        <div class="section-header">
        </div>
        <div class="section-body">
            <div class="card">
                <div class="card-header">
My Notes App
                </div>
                <div class="card-body">
                    <p>Estado del servicio: 
                    <label class="badge"
                            :class="status.status == 200 ? 'badge-success': 'badge-danger'"
                            v-text="status.statusText"
                    > </label>
                    </p>
                </div>
            </div>
            <div v-if="error" class="alert alert-danger text-center">
                Ocurrió un error 😪
            </div>
            <spinner v-if="loading"/>

        </div>
        </div>
</template>


<script>
import HTTP from '@/services/config'

export default {
    name:'status',
    data(){
        return {
            loading: false,
            status: {},
            error: false
        }
    },
    mounted(){
        HTTP.get('/status').then(response => {
            this.status = response;
            console.log(this.status)
        })
    }

}
</script>

<style>

</style>
