<template>
    <div class="compare-product">

        <div @click="openCompare" class="compare-product__header">
            <p class="compare-icon">So sánh ({{ countProductCompare }})</p>
        </div>

        <div v-if="isCompareOpen" class="compare-product__content">
            <!-- Modal So Sánh -->
            <div class="compare-modal">
                <div class="compare-header">
                    <h5 class="fs-5 fw-semibold mb-0">SO SÁNH SẢN PHẨM</h5>
                    <button @click="closeCompare" class="close-btn">&times;</button>
                </div>

                <div class="d-flex justify-content-between  align-items-center ">
                    <div class="compare-body">
                        <!-- Danh sách sản phẩm -->
                        <div v-for="item in compareList" :key="item.productId" class="compare-item">
                            <button @click="removeProduct(item.productId)" class="remove-btn">&times;</button>
                            <img :src="item.imageUrl" alt="Ảnh" class="compare-img" />
                            <p class="product-name line-clamp-2 ">{{ item.name }}</p>
                        </div>

                        <!-- Chỉ hiện nút "Thêm sản phẩm" nếu danh sách < 3 -->
                        <div v-if="compareList.length < 3" class="compare-item add-more" @click="openSearchModal">
                            <div class="add-icon">+</div>
                            <p class="add-text">Thêm sản phẩm</p>
                        </div>

                    </div>

                    <div class="compare-footer me-3">
                        <button @click="goToComparePage" class="compare-now-btn d-block">SO SÁNH NGAY</button>
                        <button @click="removeAll" class="clear-btn mt-3 fw-semibold  d-block">Xoá tất cả sản
                            phẩm</button>
                    </div>
                </div>


            </div>
        </div>

        <!-- Modal tìm kiếm sản phẩm -->
        <div v-if="isSearchModalOpen" class="search-modal">
            <div class="search-modal-content">
                <div class="search-header">
                    <h5 class="mb-0">Tìm kiếm sản phẩm</h5>
                    <button @click="closeSearchModal" class="close-form">
                        <i class="mdi mdi-close-circle-outline fs-3"></i>
                    </button>
                </div>

                <input v-model="searchKeyword" placeholder="Nhập tên sản phẩm..." class="form-control mb-3" />

                <div v-if="filteredProducts.length">
                    <div v-for="product in filteredProducts" :key="product.productId"
                        class="search-product-item fs-6 fw-semibold">
                        <img :src="product.imageUrl" alt="" width="80" />
                        <span class="ms-2">{{ product.name }}</span>
                        <button class="btn btn-sm btn-primary ms-auto" @click="addToCompare(product)">Thêm</button>
                    </div>
                </div>
                <div v-else>
                    <p>Không tìm thấy sản phẩm nào.</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
    setup() {
        const productStore = useProductStore();
        const { products } = storeToRefs(productStore);
        const router = useRouter();
        const isCompareOpen = ref(false);
        const isSearchModalOpen = ref(false);
        const searchKeyword = ref('');

        const compareList = ref([]);

        const countProductCompare = computed(() => {
            return compareList.value.length;
        });

        onMounted(() => {
            const storedList = localStorage.getItem('compareList');
            compareList.value = storedList ? JSON.parse(storedList) : [];
        });

        const openCompare = () => {
            isCompareOpen.value = true;
        };

        const closeCompare = () => {
            isCompareOpen.value = false;
        };

        const openSearchModal = () => {
            isSearchModalOpen.value = true;
        };

        const closeSearchModal = () => {
            isSearchModalOpen.value = false;
            searchKeyword.value = '';
        };

        // hàm tìm kiếm sản phẩm
        const filteredProducts = computed(() => {
            if (!searchKeyword.value) return products.value;
            return products.value.filter(product => {
                return product.name.toLowerCase().includes(searchKeyword.value.toLowerCase());
            });
        });

        // hàm thêm sản phẩm vào danh sách so sánh
        const addToCompare = (product) => {
            const exists = compareList.value.find(p => p.productId === product.productId);
            if (!exists) {
                compareList.value.push(product);
                localStorage.setItem('compareList', JSON.stringify(compareList.value));
            }
            closeSearchModal();
        };

        // hàm chuyển đến trang so sánh
        const removeProduct = (productId) => {
            compareList.value = compareList.value.filter(item => item.productId !== productId);
            localStorage.setItem('compareList', JSON.stringify(compareList.value));
        };

        // hàm xóa tất cả sản phẩm trong danh sách so sánh
        const removeAll = () => {
            compareList.value = [];
            localStorage.removeItem('compareList');
        };

        // hàm chuyển đến trang so sánh
        const goToComparePage = () => {
            if (compareList.value.length < 2) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Cảnh báo',
                    text: 'Bạn cần ít nhất 2 sản phẩm để so sánh!',
                    confirmButtonText: 'OK',
                });
                return;
            }

            // Kiểm tra các sản phẩm có cùng danh mục không
            const firstCategory = compareList.value[0].categoryName?.trim().toLowerCase();
            const allSameCategory = compareList.value.every(
                (item) => item.categoryName?.trim().toLowerCase() === firstCategory
            );

            if (!allSameCategory) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Tất cả sản phẩm so sánh phải thuộc cùng một danh mục!',
                    confirmButtonText: 'OK',
                });
                return;
            }

            // Nếu hợp lệ thì chuyển trang
            router.push("/compare");
        };


        return {
            isCompareOpen,
            openCompare,
            closeCompare,
            isSearchModalOpen,
            openSearchModal,
            closeSearchModal,
            searchKeyword,
            filteredProducts,
            compareList,
            addToCompare,
            removeProduct,
            removeAll,
            countProductCompare,
            goToComparePage,
        };
    },
};

</script>

<style>
.search-modal {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.search-modal-content {
    background: white;
    width: 640px;
    height: calc(100vh - 20vh);
    padding: 20px;
    border-radius: 8px;
    overflow: auto;
}

.search-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search-product-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}



.compare-product__header {
    position: fixed;
    bottom: 120px;
    left: 20px;
    z-index: 300;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.compare-icon {
    font-size: 16px;
    color: #245eff;
    font-weight: bold;
    cursor: pointer;
    margin: 0;
}

.compare-modal {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 500;
    width: 100%;
    max-width: 800px;
    background: white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

.compare-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #4a61dd;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
}

.close-btn {
    background: none;
    border: none;
    font-size: 30px;
    color: white;
    line-height: 1;
}

.compare-body {
    display: flex;
    gap: 20px;
    padding: 20px;
    justify-content: start;
    flex-wrap: wrap;
}

.compare-item {
    width: 170px;
    text-align: center;
    position: relative;
    border: 1px dashed #ccc;


}

.compare-img {
    width: 100%;
    border-radius: 6px;
}

.remove-btn {
    position: absolute;
    top: -10px;
    left: 5px;
    background: transparent;
    border: none;
    font-size: 35px;
    color: #6c6c6c;
    cursor: pointer;
}

.product-name {
    margin-top: 8px;
    font-size: 14px;
}

.add-more {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #666;
    cursor: pointer;
}

.add-icon {
    font-size: 30px;
    border: 1px dashed #999;
    width: 60px;
    height: 60px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}

.add-text {
    margin-top: 8px;
    font-size: 14px;
}



.compare-now-btn {
    background-color: #4a61dd;
    color: white;
    padding: 10px 16px;
    border-radius: 6px;
    border: none;
    font-weight: bold;
    cursor: pointer;
}

.clear-btn {
    color: red;
    background: none;
    border: none;
    cursor: pointer;
}
</style>