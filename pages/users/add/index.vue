<template>
    <div class="container-fluid">
        <div class="card mb-3">
            <div class="card-header">
                <h4 class="card-title"></h4>
            </div>
            <div class="card-body">
                <app-user-form />
            </div>
        </div>
    </div>
</template>
<script>
import UserForm from '@/components/form/User.vue' 
export default {
    components: {
        'app-user-form': UserForm
    }
}
</script>