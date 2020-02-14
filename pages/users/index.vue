<template>
    <div class="container-fluid">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    <nuxt-link class="btn btn-primary float-right btn-sm" :to="{name: 'users-add'}">Add New</nuxt-link>
                </h4>
            </div>
            <div class="card-body">
                <b-table striped hover :items="users.data" :fields="fields" show-empty>
                    <template v-slot:cell(name)="row">
                        <p><strong>{{ row.item.name }}</strong></p>
                        <p>
                            ID: <span class="badge badge-success">{{ row.item.identity_id }}</span> <br>
                            Gender: <span class="badge badge-success">{{ row.item.gender ? 'Male':'Female' }}</span>
                        </p>
                    </template>
                </b-table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    async asyncData({store}) {
        await Promise.all([
            store.dispatch('user/getUsersData')
        ])
        return
    },
    data() {
        return {
            fields: ['name', 'address', 'email', 'phone_number'], 
            items: []
        }
    },
    computed: {
        ...mapState('user', {
            users: state => state.users
        })
    },
    methods: {
        ...mapActions('user', ['getUsersData'])
    }
}
</script>