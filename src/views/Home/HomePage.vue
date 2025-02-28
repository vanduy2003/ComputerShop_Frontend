<template>
    <v-app>
        <v-main style="background-color: #f3f3f3">
            <HeaderApp />
            <BannerApp />
            <CatagoryApp />
            <ProductAll />
            <ArticleSale />
            <FeetBack />
            <BrandApp />
            <FooterApp />
            <SocialIcon />
        </v-main>
    </v-app>
</template>

<script>
import HeaderApp from "../../components/Header/HeaderApp.vue";
import BannerApp from "@/components/content/banner/BannerApp.vue";
import CatagoryApp from "@/components/content/catagory/CatagoryApp.vue";
import ProductAll from "@/components/content/product/productHome/ProductAll.vue";
import ArticleSale from "@/components/content/articleSale/ArticleSale.vue";
import FeetBack from "@/components/content/feetback/FeetBack.vue";
import BrandApp from "@/components/content/brand/BrandApp.vue";
import FooterApp from "@/components/Footer/FooterApp.vue";
import SocialIcon from "@/components/content/social/SocialIcon.vue";

export default {
    name: "HomePage",
    components: {
        HeaderApp,
        BannerApp,
        CatagoryApp,
        ProductAll,
        ArticleSale,
        FeetBack,
        BrandApp,
        FooterApp,
        SocialIcon,
    },
};
</script>

<style></style>
