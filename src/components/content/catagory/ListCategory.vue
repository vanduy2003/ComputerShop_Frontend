<template>
    <div class="form-product">
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
                                {{ categoryName }}
                            </span>
                        </a>
                    </li>
                </ol>
            </div>

            <FormProduct :products="filteredProducts" />
            <div class="image-baner my-5">
                <img :src="imageCategory" alt="banner" width="100%" height="100%" />
            </div>

            <div>
                <FormProductAll :products="filteredProducts" :categoryName="categoryName" />
            </div>


        </div>
    </div>
</template>

<script>
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import FormProduct from "@/components/content/product/FormProduct.vue";
import FormProductAll from "../product/FormProductAll.vue";

export default {
    components: {
        FormProduct,
        FormProductAll,
    },

    setup() {
        const store = useProductStore();
        const { products } = storeToRefs(store);
        const route = useRoute();

        // Lấy categoryId từ URL
        const idCategory = computed(() => Number(route.params.id));

        // Gọi API nếu chưa có dữ liệu
        onMounted(() => {
            if (products.value.length === 0) {
                store.fetchProducts();
            }
        });

        // Lọc sản phẩm theo danh mục
        const filteredProducts = computed(() =>
            products.value.filter(
                (product) => product.categoryId === idCategory.value
            )
        );

        // Lấy tên danh mục từ sản phẩm đầu tiên (nếu có)
        const categoryName = computed(() => {
            return filteredProducts.value.length > 0
                ? filteredProducts.value[0].categoryName
                : "Danh mục không tồn tại";
        });

        // Lấy imagebaner theo categoryId
        const imageCategory = computed(() => {
            const banners = {
                1: "https://www.tncstore.vn/media/banner/banner-pc-gaming.jpg",
                2: "https://www.tncstore.vn/media/banner/banner-man-hinh-gaming-nvbh.jpg",
                3: "https://www.tncstore.vn/media/banner/04_03-b3e741136852e85da3bc997d22376d2e.jpg",
                7: "https://www.tncstore.vn/media/banner/banner-laptop-van-phong.jpg",
                4: "https://www.tncstore.vn/media/banner/24_07-81d61eb8aa443e0ed4cf7ff832cc2533.jpg",
                8: "https://www.tncstore.vn/media/banner/18_11-464a8f2b6369b4da7c8f56ec0b63f8fd.jpg",
            };
            return banners[idCategory.value] || "https://via.placeholder.com/500";
        });


        return { filteredProducts, categoryName, imageCategory, products };
    },
};
</script>
