<template>
    <div class="page-cart">
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
                        <a href="/gaming-pc.html" class="text-custom">
                            <span itemprop="name">
                                GIỎ HÀNG
                            </span>

                        </a>
                    </li>


                </ol>
            </div>
            <!-- end breadcrumb -->
            <div class="row">
                <div class="col-md-8">
                    <CartsLeft :carts="cart" />
                </div>
                <div class="col-md-4">
                    <CartsRight :carts="cart" :countItems="countItems" :totalCartPrice="totalCartPrice" />
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { useCartStore } from "@/stores/cartStore";
import { storeToRefs } from "pinia";
import CartsLeft from "./CartsLeft.vue";
import CartsRight from "./CartsRight.vue";

export default {
    components: {
        CartsLeft,
        CartsRight,
    },

    setup() {
        const cartStore = useCartStore();
        const { cart, countItems, totalCartPrice } = storeToRefs(cartStore);
        return {
            cart,
            countItems,
            totalCartPrice
        };
    }
};

</script>

<style></style>