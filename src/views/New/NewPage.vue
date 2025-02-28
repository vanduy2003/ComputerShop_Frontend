<template>
    <v-app>
        <v-main style="background-color: #f3f3f3;">
            <HeaderApp />
            <NewDetailApp />
            <FooterApp />
            <SocialIcon />
        </v-main>
    </v-app>
</template>

<script>
import HeaderApp from '../../components/Header/HeaderApp.vue'
import FooterApp from '@/components/Footer/FooterApp.vue';
import SocialIcon from '@/components/content/social/SocialIcon.vue';
import NewDetailApp from '@/components/content/News/NewDetailApp.vue';


export default {
    name: 'HomePage',
    components: {
        HeaderApp,
        FooterApp,
        SocialIcon,
        NewDetailApp,

    }
}
</script>

<style></style>