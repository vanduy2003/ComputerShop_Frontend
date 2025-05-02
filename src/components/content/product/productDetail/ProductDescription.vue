<template>
    <div class="product-description mt-5">
        <div class="container">
            <div class="content-product-detail row d-flex">
                <div class="content-left col-md-8">
                    <div class="box-desciption background-white">
                        <h4 class="title">Mô tả sản phẩm</h4>

                        <div class="content nd" :style="{
                            height: expanded ? 'auto' : '510px',
                            overflow: expanded ? 'visible' : 'hidden',
                        }">
                            <div class="productDescription fs-5" v-html="product.descHTML"></div>
                        </div>

                        <button @click="toggleContent" class="btn-toggle">
                            {{ expanded ? "Thu nhỏ" : "Xem thêm" }}
                            <i class="mdi mdi-chevron-down ms-2"></i>
                        </button>
                    </div>

                    <div class="comment box-review background-white mt-4 fs-6">
                        <div class="btn-share-detail d-flex" style="margin-top: 20px;">
                            <b class="me-2">Chia sẻ bài viết:</b>
                            <!-- Nút Like -->
                            <div class="fb-like" :data-href="currentURL" data-width="" data-layout="standard"
                                data-action="like" data-size="small" data-share="true"></div>
                        </div>
                        <!-- Plugin Facebook Comments -->
                        <div class="fb-comments" :data-href="currentURL" data-width="100%" data-numposts="5"></div>
                    </div>
                </div>

                <!-- Content right -->
                <div class="content-right col-md-4">
                    <div class="box-specifications background-white mb-5">
                        <h4 class="title">Thông số kỹ thuật</h4>

                        <div class="content my-3" id="content-specifications">
                            <table class="table table-striped">
                                <tbody>
                                    <tr v-for="component in components" :key="component.id" class="fs-6">
                                        <td class="att-name">
                                            <a href="#" target="_blank"><strong>{{ component.componentType
                                            }}:</strong></a>
                                        </td>
                                        <td class="att-value">
                                            <a href="#" target="_blank">{{ component.name }}</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <a href="#full-spec" data-fancybox="spec" class="more-specifications"
                            data-content="#content-specifications">
                            Xem thêm <i class="mdi mdi-chevron-down ms-2"></i>
                        </a>
                    </div>

                    <NewApp :current-type="'channel'" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* global FB */
import { ref, computed, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router'; // Bổ sung
import NewApp from '../../News/NewApp.vue';

export default {
    components: {
        NewApp,
    },
    props: {
        components: {
            type: Array,
            required: true,
        },
        product: {
            type: Object,
            required: true,
        },
    },
    setup() {
        const expanded = ref(false);
        const route = useRoute(); // Lấy route từ vue-router

        const toggleContent = () => {
            expanded.value = !expanded.value;
        };

        const currentURL = computed(() => {
            if (process.env.NODE_ENV === 'development') {
                return 'https://example.com/products/' + route.params.id;
            }
            return window.location.origin + route.fullPath;
        });

        const loadFacebookPlugin = () => {
            if (typeof FB !== 'undefined' && FB.XFBML && typeof FB.XFBML.parse === 'function') {
                setTimeout(() => {
                    FB.XFBML.parse();
                }, 300);
            }
        };

        onMounted(() => {
            loadFacebookPlugin();
        });

        watchEffect(() => {
            // Cứ khi currentURL thay đổi thì gọi lại
            loadFacebookPlugin();
        });

        return {
            expanded,
            toggleContent,
            currentURL,
        };
    },
};
</script>




<style>
.box-desciption img {
    width: 100%;
    height: auto;
    margin: 0 auto;
}

.productDescription strong {
    color: #ff9900 !important;
}

.product-description .title {
    font-size: 24px;
    font-weight: 600;
    text-transform: uppercase;
    border-bottom: 3px solid #3278f6;
    display: inline-block;

}

.box-desciption .content {
    margin: 24px 0;
    width: 100%;
    display: block;
    overflow: hidden;
    position: relative;
}

.box-specifications .content {
    max-height: 510px;
    overflow: hidden;
}

table td {
    padding: 5px !important;
    font-weight: 500;
}

table .att-value {
    width: calc(100% - 120px);
    word-break: break-word;
}

table .att-name {
    width: 120px;
    color: #8d94ac;
}

.more-specifications {
    width: 115px;
    height: 35px;
    border: 1px solid var(--color-global);
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    display: flex;
    color: black;
}

.more-specifications:hover {
    background-color: var(--color-global);
    color: white;
}

.btn-toggle {
    display: flex;
    width: 120px;
    height: 40px;
    border: 1px solid var(--color-global);
    line-height: 35px;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin: 0 auto;
    font-weight: bold;
    color: var(--color-global);
}

.btn-toggle:hover {
    background-color: var(--color-global);
    color: white;
}
</style>
