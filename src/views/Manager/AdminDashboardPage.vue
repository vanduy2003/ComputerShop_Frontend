<template>
    <v-app>
        <v-main style="background-color: #f3f3f3;">
            <AdminDashboard />
        </v-main>
    </v-app>
</template>

<script>

import AdminDashboard from '@/components/manager/Dashboard/AdminDashboard.vue';

export default {
    name: 'AdminDashboardPage',
    components: {
        AdminDashboard
    }
}
</script>

<style></style>