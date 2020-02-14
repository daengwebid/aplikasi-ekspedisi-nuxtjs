<template>
    <div>
        <div class="form-group">
            <label for="">Identity ID</label>
            <input type="text" class="form-control" :class="{'is-invalid': errors.identity_id}" v-model="users.identity_id">
            <p class="text-danger" v-if="errors.identity_id">{{ errors.identity_id[0] }}</p>
        </div>
        <div class="form-group">
            <label for="">Name</label>
            <input type="text" class="form-control" :class="{'is-invalid': errors.name}" v-model="users.name">
            <p class="text-danger" v-if="errors.name">{{ errors.name[0] }}</p>
        </div>
        <div class="form-group">
            <label for="">Gender</label>
            <select class="form-control" :class="{'is-invalid': errors.gender}" v-model="users.gender">
                <option value="">Pilih</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
            </select>
            <p class="text-danger" v-if="errors.gender">{{ errors.gender[0] }}</p>
        </div>
        <div class="form-group">
            <label for="">Address</label>
            <input type="text" class="form-control" :class="{'is-invalid': errors.address}" v-model="users.address">
            <p class="text-danger" v-if="errors.address">{{ errors.address[0] }}</p>
        </div>
        <div class="form-group">
            <label for="">Email</label>
            <input type="text" class="form-control" :class="{'is-invalid': errors.email}" v-model="users.email">
            <p class="text-danger" v-if="errors.email">{{ errors.email[0] }}</p>
        </div>
        <div class="form-group">
            <label for="">Password</label>
            <input type="password" class="form-control" :class="{'is-invalid': errors.password}" v-model="users.password">
            <p v-if="$route.name == 'users-edit-id'">Leave blank if you don't change your password</p>
            <p class="text-danger" v-if="errors.password">{{ errors.password[0] }}</p>
        </div>
        <div class="form-group">
            <label for="">Phone Number</label>
            <input type="text" class="form-control" :class="{'is-invalid': errors.phone_number}" v-model="users.phone_number">
            <p class="text-danger" v-if="errors.phone_number">{{ errors.phone_number[0] }}</p>
        </div>
        <div class="form-group">
            <label for="">Role</label>
            <select class="form-control" :class="{'is-invalid': errors.role}" v-model="users.role">
                <option value="">Pilih</option>
                <option value="0">Admin</option>
                <option value="1">Driver</option>
                <option value="2">Users</option>
            </select>
            <p class="text-danger" v-if="errors.role">{{ errors.role[0] }}</p>
        </div>
        <div class="form-group">
            <label for="">Status</label>
            <select class="form-control" :class="{'is-invalid': errors.status}" v-model="users.status">
                <option value="">Pilih</option>
                <option value="0">Tidak Aktif</option>
                <option value="1">Aktif</option>
            </select>
            <p class="text-danger" v-if="errors.status">{{ errors.status[0] }}</p>
        </div>
        <button class="btn btn-primary btn-sm" @click="submit">Save</button>
        <nuxt-link :to="{name: 'users'}" class="btn btn-secondary btn-sm">Back</nuxt-link>
    </div>
</template>
<script>
import {mapActions, mapState} from 'vuex' 
export default {
    created() {
        if (this.$route.name == 'users-edit-id') {
            this.users = {
                name: this.user.name,
                identity_id: this.user.identity_id,
                gender: this.user.gender,
                address: this.user.address,
                email: this.user.email,
                password: '',
                phone_number: this.user.phone_number,
                role: this.user.role,
                status: this.user.status
            }
        }
    },
    data() {
        return {
            users: {
                name: '',
                identity_id: '',
                gender: '',
                address: '',
                email: '',
                password: '',
                phone_number: '',
                role: '',
                status: ''
            }
        }
    },
    computed: {
        ...mapState('user', {
            user: state => state.data,
            errors: state => state.errors
        })
    },
    methods: {
        ...mapActions('user', ['storeUsersData', 'updateUserData']),
        submit() {
            if (this.$route.name == 'users-edit-id') {
                let data = Object.assign({id: this.$route.params.id}, this.users)
                this.updateUserData(data).then((this.$router.push({name: 'users'})))
            } else {
                this.storeUsersData(this.users).then(() => this.$router.push({name: 'users'}))
            }
        }
    }
}
</script>