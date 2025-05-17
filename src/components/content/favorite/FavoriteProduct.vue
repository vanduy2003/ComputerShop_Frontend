<template>
    <div>
        <HeaderApp />
        <div class="favorite-product">
            <div class="container">
                <!-- breadcrumb -->
                <div id="breadcrumb" class="breadcrumb">
                    <ol class="w-100 float-start p-0 m-0 bg-transparent">
                        <li class="home float-start list-unstyled">
                            <a href="/" class="text-custom">
                                <span itemprop="name"><i class="mdi mdi-home"></i> TRANG CHỦ</span>
                            </a>
                            <i class="mdi mdi-chevron-right"></i>
                        </li>

                        <li class="home float-start list-unstyled">
                            <a href="" class="text-custom">

                                <span itemprop="name"> SẢN PHẨM YÊU THÍCH </span>
                            </a>
                        </li>
                    </ol>
                </div>

                <div class="list-product-favorite">

                    <div v-if="productFavorite && productFavorite.length > 0" class="mb-4 pa-2" border>
                        <div v-for="item in productFavorite" :key="item.productId"
                            class="row d-flex align-items-center fs-6 fw-semibold mb-1">
                            <!-- Hình ảnh -->
                            <div class="col-2 text-center">
                                <router-link :to="`/products/${item.productId}`" class="product-image">
                                    <v-img :src="item.imageUrl" :alt="item.name" aspect-ratio="1"
                                        class="rounded mx-auto" width="150px" />
                                </router-link>

                            </div>

                            <!-- Nội dung -->
                            <div class="col-9">
                                <div class="d-flex align-center mb-2">
                                    <v-chip color="success">{{ item.highlightType }}</v-chip>
                                </div>
                                <div class="d-flex align-center mb-1">
                                    <router-link :to="`/products/${item.productId}`"
                                        class="product-name line-clamp-2 fs-6 fw-semibold text-black">

                                        {{ item.name }}

                                    </router-link>

                                </div>
                                <div class="d-flex justify-space-between align-center">
                                    <span class="text-orange">{{ Number(item.priceNew).toLocaleString('vi-VN')
                                    }}₫</span>
                                </div>
                                <v-btn icon size="small" @click="removeFromFavorite(item.productId)" color="danger"
                                    variant="plain">
                                    <v-icon size="25">mdi-delete-outline</v-icon>
                                </v-btn>
                            </div>

                            <div class="col-1 d-flex justify-end">
                                <v-btn color="orange" @click="addToCart(item.productId)" icon size="small">
                                    <v-icon size="20" class="text-white">mdi-cart</v-icon>
                                </v-btn>
                            </div>
                            <v-divider class="mt-3"></v-divider>
                        </div>
                    </div>

                    <div v-else>
                        <v-card class="pa-4 mb-3 shadow-lg fs-6">
                            <v-img
                                src="https://static.vecteezy.com/system/resources/previews/018/985/237/non_2x/wishlist-icon-in-comic-style-like-document-cartoon-illustration-on-white-isolated-background-favorite-list-splash-effect-business-concept-vector.jpg"
                                height="400px"></v-img>
                            <p class="text-center fs-5 fw-semibold">Không có sản phẩm nào được yêu thích!!!</p>
                        </v-card>
                    </div>
                </div>

            </div>

        </div>
        <FooterApp />
        <SocialIcon />
    </div>

</template>

<script>
import HeaderApp from '@/components/Header/HeaderApp.vue'
import FooterApp from '@/components/Footer/FooterApp.vue';
import SocialIcon from '@/components/content/social/SocialIcon.vue';
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useUserStore } from '@/stores/userStore';
import { useCartStore } from '@/stores/cartStore';

export default {
    name: 'FavoriteProduct',
    components: {
        HeaderApp,
        FooterApp,
        SocialIcon
    },

    setup() {
        const store = useProductStore();
        const { productFavorite } = storeToRefs(store);
        const userStore = useUserStore();
        const { user } = storeToRefs(userStore);
        const cartStore = useCartStore();

        onMounted(async () => {
            await store.getFavoriteList(user.value.userId);
        });

        const addToCart = (product) => {
            cartStore.addToCart(product, 1);
        };

        const removeFromFavorite = (productId) => {
            store.deleteFavorite(user.value.userId, productId);
        };

        return {
            productFavorite,

            addToCart,
            removeFromFavorite,
        };
    },
}
</script>

<style>
.favorite-product {
    background-color: #f3f3f3;
    padding: 20px 0;
}

.list-product-favorite {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>