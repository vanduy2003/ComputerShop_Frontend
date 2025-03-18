<template>
    <v-app>
        <v-main style="background-color: #f3f3f3;">
            <HeaderApp />
            <BuySuccess />
            <FooterApp />
            <SocialIcon />
        </v-main>
    </v-app>
</template>

<script>
import HeaderApp from '../../components/Header/HeaderApp.vue'
import FooterApp from '@/components/Footer/FooterApp.vue';
import SocialIcon from '@/components/content/social/SocialIcon.vue';
import BuySuccess from '@/components/content/cart/BuySuccess.vue';


export default {
    name: 'HomePage',
    components: {
        HeaderApp,
        FooterApp,
        SocialIcon,
        BuySuccess,

    }
}
</script>

<style></style>