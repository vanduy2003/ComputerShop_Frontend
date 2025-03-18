<template>
    <v-app>
        <v-main style="background-color: #f3f3f3;">
            <HeaderApp />
            <CartConfirmBuy />
            <FooterApp />
            <SocialIcon />
        </v-main>
    </v-app>
</template>

<script>
import HeaderApp from '../../components/Header/HeaderApp.vue'
import FooterApp from '@/components/Footer/FooterApp.vue';
import SocialIcon from '@/components/content/social/SocialIcon.vue';
import CartConfirmBuy from '@/components/content/cart/CartConfirmBuy.vue';


export default {
    name: 'HomePage',
    components: {
        HeaderApp,
        FooterApp,
        SocialIcon,
        CartConfirmBuy,

    }
}
</script>

<style></style>