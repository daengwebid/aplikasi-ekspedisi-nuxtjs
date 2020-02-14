<template>
    <div class="container-fluid">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    List Users
                    <nuxt-link class="btn btn-primary float-right btn-sm" :to="{name: 'users-add'}">Add New</nuxt-link>
                </h4>
            </div>
            <div class="card-body row">
                <div class="col-md-4 offset-md-8 mb-4">
                    <input type="text" placeholder="Search" v-model="search" @keypress.enter="findUser" class="form-control">
                </div>
                <div class="col-md-12">
                    <b-table striped hover :items="users.data" :fields="fields" show-empty responsive>
                        <template v-slot:cell(name)="row">
                            <p><strong>{{ row.item.name }}</strong></p>
                            <p>
                                ID: <span class="badge badge-success">{{ row.item.identity_id }}</span> <br>
                                Gender: <span class="badge badge-success">{{ row.item.gender == 1 ? 'Male':'Female' }}</span>
                            </p>
                        </template>
                        <template v-slot:cell(actions)="row">
                            <nuxt-link :to="{name: 'users-edit-id', params: {id: row.item.id}}" :key="'edit'+row.index" class="btn btn-warning btn-sm">Edit</nuxt-link>
                            <button class="btn btn-danger btn-sm" @click="openDeleteModal(row)">Delete</button>
                        </template>
                    </b-table>
                    <b-pagination
                        align="right"
                        v-model="users.current_page"
                        :total-rows="users.total"
                        :per-page="users.per_page"
                        @change="changePage"
                        aria-controls="my-table"
                    ></b-pagination>
                </div>

                <b-modal v-model="deleteModal" title="Delete Data User">
                    <p>Kamu yakin ingin menghapus data: <code>{{ user_selected ? user_selected.name:'' }}</code>?</p>
                    <template v-slot:modal-footer>
                        <div class="w-100 float-right">
                            <b-button
                                variant="secondary"
                                size="sm"
                                @click="deleteModal=false"
                            >
                                Close
                            </b-button>
                            <b-button
                                variant="primary"
                                size="sm"
                                @click="deleteDataUser"
                            >
                                Delete
                            </b-button>
                        </div>
                    </template>
                </b-modal>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
    async asyncData({store}) {
        await Promise.all([
            store.dispatch('user/getUsersData')
        ])
        return
    },
    data() {
        return {
            fields: ['name', 'address', 'email', 'phone_number', 'actions'], 
            items: [],
            deleteModal: false,
            user_selected: null,
            search: ''
        }
    },
    computed: {
        ...mapState('user', {
            users: state => state.users,
            page: state => state.page
        })
    },
    watch: {
        page() {
            this.getUsersData(this.search)
        }  
    },
    methods: {
        ...mapActions('user', ['getUsersData', 'destroyUsersData']),
        ...mapMutations('user', ['SET_PAGE']),
        openDeleteModal(row) {
            this.user_selected = row.item
            this.deleteModal = true
        },
        deleteDataUser() {
            this.destroyUsersData(this.user_selected.id).then(() => {
                this.deleteModal = false
                this.user_selected = null
            })
        },
        findUser() {
            this.getUsersData(this.search)
        },
        changePage(val) {
            this.SET_PAGE(val)
        }
    }
}
</script>