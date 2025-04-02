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
                            <div class="productDescription fs-5" v-html="product.descHTML">

                            </div>
                        </div>

                        <button @click="toggleContent" class="btn-toggle">
                            {{ expanded ? "Thu nhỏ" : "Xem thêm"
                            }}<i class="mdi mdi-chevron-down ms-2"></i>
                        </button>
                    </div>

                    <CustomerReview />
                </div>
                <!--  end content left -->
                <div class="content-right col-md-4">
                    <div class="box-specifications background-white mb-5">
                        <h4 class="title">Thông số kỹ thuật</h4>

                        <div class="content my-3" id="content-specifications">
                            <table class="table table-striped">
                                <tbody>
                                    <tr v-for="component in components" :key="component.id" class="fs-6">
                                        <td class="att-name">
                                            <a href="#" target="_blank"><strong>{{ component.componentType }}:
                                                </strong></a>
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
                    <!-- end box specifications -->

                    <NewApp />
                </div>
                <!--  end content right -->
            </div>
        </div>
    </div>
</template>

<script>
import NewApp from '../../News/NewApp.vue';
import CustomerReview from '../../CustomerReviews/CustomerReview.vue';
export default {
    components: {
        NewApp,
        CustomerReview,
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
    data() {
        return {
            expanded: false, // Trạng thái ban đầu của nội dung
        };
    },
    methods: {
        toggleContent() {
            this.expanded = !this.expanded; // Khi click vào button, đảo ngược trạng thái của nội dung
        },
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
