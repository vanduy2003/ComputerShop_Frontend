<template>
    <div class="product-manage wrappers">
        <AdminSidebar />
        <AdminNavbar />
        <div class="content p-4">
            <h1 class="title text-white">{{ isEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm" }}</h1>
            <div class="form-add-product">
                <div class="p-4 fs-6">
                    <!-- Tên + Ảnh  -->
                    <div class="row mb-4 ">
                        <div class="item-input col-md-6">
                            <label>Tên sản phẩm<span>*</span></label>
                            <input type="text" class="form-control" v-model="productName"
                                placeholder="Nhập tên sản phẩm" />
                            <div class="note-error text-danger" v-if="error.productName">{{ error.productName }}</div>
                        </div>

                        <div class="item-input col-md-6">
                            <label>Ảnh sản phẩm<span>*</span></label>
                            <input type="text" class="form-control" v-model="productImage"
                                placeholder="Nhập link ảnh sản phẩm" />
                            <div class="note-error text-danger" v-if="error.productImage">{{ error.productImage }}</div>
                        </div>
                    </div>
                    <!-- Gia + nhom -->
                    <div class="row mb-4">
                        <div class="item-input col-md-3">
                            <label>Giá sản phẩm<span>*</span></label>
                            <input type="number" min="1" v-model="productPrice" class="form-control"
                                placeholder="Nhập giá sản phẩm" />
                            <div class="note-error text-danger" v-if="error.productPrice">{{ error.productPrice }}</div>
                        </div>

                        <div class="item-input col-md-3">
                            <label>Giảm giá<span>*</span></label>
                            <input type="number" min="0" v-model="discountPercent" class="form-control"
                                placeholder="Nhập giảm giá sản phẩm" />
                            <div class="note-error text-danger" v-if="error.discountPercent">{{ error.discountPercent }}
                            </div>
                        </div>

                        <div class="item-input col-md-3">
                            <label>Nhóm sản phẩm<span>*</span></label>
                            <select v-model="highlightType" class="form-select">
                                <option value="null">--- Chọn nhóm sản phẩm ---</option>
                                <option value="Best Seller">Best Seller</option>
                                <option value="Best Choice">Best Choice</option>
                            </select>
                            <div class="note-error text-danger" v-if="error.highlightType">{{ error.highlightType }}
                            </div>
                        </div>
                        <div class="item-input col-md-3">
                            <label>Số lượng sản phẩm<span>*</span></label>
                            <input type="number" min="1" class="form-control" v-model="stockQuantity"
                                placeholder="Nhập số lượng sản phẩm" />
                            <div class="note-error text-danger" v-if="error.stockQuantity">{{ error.stockQuantity }}
                            </div>
                        </div>
                    </div>
                    <!--  -->
                    <div class="row mb-4">
                        <div class="item-input col-md-4">
                            <label>Danh mục sản phẩm<span>*</span></label>
                            <select v-model="selectedCategory" class="form-select">
                                <option :value="null">--- Chọn danh mục sản phẩm ---</option>
                                <option v-for="category in categorys" :key="category.categoryId"
                                    :value="category.categoryId">
                                    {{ category.name }}
                                </option>
                            </select>
                            <div class="note-error text-danger" v-if="error.selectedCategory">{{ error.selectedCategory
                                }}
                            </div>
                        </div>

                        <div class="item-input col-md-4">
                            <label>Nhà cung cấp sản phẩm<span>*</span></label>
                            <select v-model="selectedSupplier" class="form-select">
                                <option :value="null">--- Chọn nhà cung cấp sản phẩm ---</option>
                                <option v-for="supplier in suppliers" :key="supplier.supplierId"
                                    :value="supplier.supplierId">
                                    {{ supplier.name }}
                                </option>
                            </select>
                            <div class="note-error text-danger" v-if="error.selectedSupplier">{{ error.selectedSupplier
                            }}
                            </div>
                        </div>

                        <div class="item-input col-md-4">
                            <label>Thương hiệu sản phẩm<span>*</span></label>
                            <select v-model="selectedBrand" class="form-select">
                                <option :value="null">--- Chọn thương hiệu sản phẩm ---</option>
                                <option v-for="brand in brands" :key="brand.brandId" :value="brand.brandId">
                                    {{ brand.name }}
                                </option>
                            </select>
                            <div class="note-error text-danger" v-if="error.selectedBrand">{{ error.selectedBrand }}
                            </div>
                        </div>
                    </div>
                    <!--  -->
                    <div class="row item-input mb-4">
                        <label>Chọn linh kiện<span>*</span></label>
                        <div class="item-input col-md-10">
                            <select class="form-select" v-model="selectedComponentId">
                                <option :value="null">--- Chọn linh kiện ---</option>
                                <option v-for="component in components" :key="component.componentId"
                                    :value="component.componentId">
                                    {{ component.name }}
                                </option>
                            </select>
                            <div class="note-error text-danger" v-if="error.selectedComponentId">{{
                                error.selectedComponentId }}</div>
                        </div>
                        <div class="col-md-2">
                            <button type="button" @click="addComponent" class="btn btn-primary">
                                Thêm linh kiện
                            </button>
                        </div>
                    </div>
                    <!-- Danh sách linh kiện đã chọn -->
                    <div v-show="selectedComponents.length > 0" class="row mb-4 p-3">
                        <div class="col-md-12">
                            <h5 class="fs-4 fw-semibold">Linh kiện đã chọn:</h5>
                            <ul class="list-group">
                                <li class="list-group-item row d-flex justify-content-between align-items-center"
                                    v-for="(component, index) in selectedComponents" :key="index">
                                    <span class="col-md-8"> {{ component.name }}</span>
                                    <div class="col-md-3">
                                        Số lượng:
                                        <input type="number" v-model="component.quantity" min="1"
                                            class="form-control d-inline w-25" />
                                    </div>
                                    <button type="button" @click="removeComponent(index)"
                                        class="btn btn-danger col-md-1 btn-sm">
                                        Xóa
                                    </button>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <!--  -->

                    <div class="editor-container mt-5">
                        <div class="editor-wrapper">
                            <h3 class="fs-4 fw-semibold">Nội dung sản phẩm</h3>
                            <div class="note-error text-danger" v-if="error.descHTML">{{
                                error.descHTML }}</div>
                            <!-- TinyMCE Editor -->
                            <editor api-key="4n6dpjgkw31dad26xeu6w1khe7zndxb400mgoadce0ucr6j0" v-model="descHTML" :init="{
                                height: 450,
                                menubar: false,
                                plugins: 'image link paste advlist lists',
                                toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image',
                                paste_data_images: true
                            }" />

                        </div>

                        <div class="preview-wrapper mt-3">
                            <h3 class="fs-4 fw-semibold">Xem trước nội dung</h3>
                            <div class="preview-content" v-html="descHTML"></div>
                        </div>
                    </div>

                    <div class="mt-5 text-center">
                        <button type="button" @click="submitForm" class="btn btn-primary  fw-semibold">
                            {{ isEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm" }}</button>
                    </div>
                </div>
            </div>
            <!-- Dùng component LoadingOverlay -->
            <LoadingOverlay :isLoading="isLoading" />
        </div>

    </div>
</template>

<script>
import AdminNavbar from "../Dashboard/AdminNavbar.vue";
import AdminSidebar from "../Dashboard/AdminSidebar.vue";
import { useCategoryStore } from "@/stores/categoryStore";
import { useSupplierStore } from "@/stores/supplierStore";
import { useBrandStore } from "@/stores/brandStore";
import { useProductStore } from "@/stores/productStore";
import { useComponentStore } from "@/stores/componentStore";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import LoadingOverlay from "@/components/content/common/LoadingOverlay.vue";
import { useToast } from "vue-toastification";
import Editor from '@tinymce/tinymce-vue';



export default {
    name: "ProductManagePage",

    props: {
        isEdit: {
            type: Boolean,
            default: false, // ✅ Đảm bảo luôn có giá trị mặc định
        },
        id: String // ID sản phẩm (chỉ khi edit)
    },

    components: {
        AdminNavbar,
        AdminSidebar,
        Editor,
        LoadingOverlay,
    },

    setup(props) {
        const categoryStore = useCategoryStore();
        const supplierStore = useSupplierStore();
        const productStore = useProductStore();
        const toast = useToast();
        const brandStore = useBrandStore();
        const componentStore = useComponentStore();
        const { components } = storeToRefs(componentStore);
        const { brands } = storeToRefs(brandStore);
        const { suppliers } = storeToRefs(supplierStore);
        const { categorys } = storeToRefs(categoryStore);
        const { product } = storeToRefs(productStore);
        const isLoading = ref(false);
        const selectedComponentId = ref(null); // ID linh kiện được chọn từ dropdown
        const selectedComponents = ref([]); // Danh sách linh kiện đã chọn với số lượng

        const descHTML = ref('');
        const error = ref({});
        const productName = ref("");
        const productPrice = ref("");
        const productImage = ref("");
        const selectedCategory = ref(null);
        const selectedSupplier = ref(null);
        const selectedBrand = ref(null);
        const stockQuantity = ref("");
        const discountPercent = ref("");
        const highlightType = ref("");

        onMounted(async () => {
            categoryStore.fetchCategory();
            supplierStore.fetchSupplier();
            brandStore.fetchBrand();
            componentStore.fetchComponent();

            if (props.isEdit) {
                // Lấy ID từ URL
                const productId = props.id;

                // Lấy dữ liệu sản phẩm từ store
                await productStore.fetchProductDataID(productId);

                // Gán dữ liệu vào form
                productName.value = product.value.name;
                productPrice.value = product.value.priceOld;
                productImage.value = product.value.imageUrl;
                selectedCategory.value = product.value.categoryId;
                selectedSupplier.value = product.value.supplierId;
                selectedBrand.value = product.value.brandId;
                stockQuantity.value = product.value.stockQuantity;
                discountPercent.value = product.value.sale;
                highlightType.value = product.value.highlightType;
                descHTML.value = product.value.descHTML;
                selectedComponents.value = product.value.components;
            }

        });

        // Giá mới sau khi giá cũ nhân với % giảm giá
        const priceNew = computed(() => {
            return productPrice.value - (productPrice.value * discountPercent.value) / 100;
        });

        // ✅ Dữ liệu sản phẩm
        const newProduct = computed(() => ({
            productId: props.isEdit ? props.id : null,
            name: productName.value,
            priceOld: productPrice.value,
            priceNew: priceNew.value,
            imageUrl: productImage.value,
            sale: discountPercent.value,
            stockQuantity: stockQuantity.value,
            categoryId: selectedCategory.value,
            supplierId: selectedSupplier.value,
            brandId: selectedBrand.value,
            highlightType: highlightType.value,
            descHTML: descHTML.value,
            components: selectedComponents.value.map((c) => ({
                componentId: c.componentId,
                quantity: c.quantity,
            })),
        }));

        // ✅ Hàm kiểm tra form
        const validateForm = () => {
            error.value = {};
            if (!productName.value) {
                error.value.productName = "Vui lòng nhập tên sản phẩm";
            }
            if (!productPrice.value) {
                error.value.productPrice = "Vui lòng nhập giá sản phẩm";
            }
            if (!productImage.value) {
                error.value.productImage = "Vui lòng nhập link ảnh sản phẩm";
            }
            if (!selectedCategory.value) {
                error.value.selectedCategory = "Vui lòng chọn danh mục sản phẩm";
            }
            if (!selectedSupplier.value) {
                error.value.selectedSupplier = "Vui lòng chọn nhà cung cấp sản phẩm";
            }
            if (!selectedBrand.value) {
                error.value.selectedBrand = "Vui lòng chọn thương hiệu sản phẩm";
            }
            if (!stockQuantity.value) {
                error.value.stockQuantity = "Vui lòng nhập số lượng sản phẩm";
            }
            if (!discountPercent.value) {
                error.value.discountPercent = "Vui lòng nhập giảm giá sản phẩm";
            }
            if (!highlightType.value) {
                error.value.highlightType = "Vui lòng chọn nhóm sản phẩm";
            }
            if (selectedComponents.value.length === 0) {
                error.value.selectedComponentId = "Vui lòng chọn ít nhất 1 linh kiện";
            }
            if (!descHTML.value) {
                error.value.descHTML = "Vui lòng nhập nội dung sản phẩm";
            }
            return Object.keys(error.value).length === 0;
        };

        // Hàm thêm linh kiện vào danh sách
        const addComponent = () => {
            if (!selectedComponentId.value) return;

            const selectedComponent = components.value.find(
                (c) => c.componentId === selectedComponentId.value
            );
            if (!selectedComponent) return;

            // Kiểm tra xem linh kiện đã có trong danh sách chưa
            const existingComponent = selectedComponents.value.find(
                (c) => c.componentId === selectedComponent.componentId
            );
            if (existingComponent) {
                existingComponent.quantity++;
            } else {
                selectedComponents.value.push({ ...selectedComponent, quantity: 1 });
            }

            selectedComponentId.value = null; // Reset dropdown
        };

        // Hàm xóa linh kiện khỏi danh sách
        const removeComponent = (index) => {
            selectedComponents.value.splice(index, 1);
        };

        // ✅ Hàm thêm sản phẩm
        const submitForm = async () => {
            if (!validateForm()) {
                toast.error("Vui lòng kiểm tra lại thông tin sản phẩm");
                return;
            }

            try {
                isLoading.value = true;

                if (props.isEdit) {
                    // Nếu là edit, gọi hàm update
                    await productStore.updateProduct(newProduct.value);
                    setTimeout(() => {
                        toast.success("Cập nhật sản phẩm thành công");
                        isLoading.value = false; // Chỉ đặt lại loading ở đây
                    }, 2000);
                } else {
                    await productStore.addProduct(newProduct.value);
                    setTimeout(() => {
                        toast.success("Thêm sản phẩm thành công");
                        productName.value = "";
                        productPrice.value = "";
                        productImage.value = "";
                        selectedCategory.value = null;
                        selectedSupplier.value = null;
                        selectedBrand.value = null;
                        stockQuantity.value = "";
                        discountPercent.value = "";
                        highlightType.value = "";
                        descHTML.value = "";
                        selectedComponents.value = [];
                        isLoading.value = false; // Chỉ đặt lại loading ở đây
                    }, 2000);
                }
            } catch (error) {
                console.error("Lỗi khi thêm sản phẩm:", error);
                isLoading.value = false; // Nếu có lỗi, cũng phải tắt loading
            }
        };


        return {
            newProduct,
            priceNew,
            highlightType,
            categorys,
            suppliers,
            brands,
            isLoading,
            components,
            selectedComponentId,
            selectedComponents,
            addComponent,
            removeComponent,
            submitForm,
            productName,
            productPrice,
            productImage,
            selectedCategory,
            selectedSupplier,
            selectedBrand,
            stockQuantity,
            descHTML,
            discountPercent,
            error,

        };
    },
};
</script>

<style>
.form-add-product {
    background: white;
    border-radius: 5px;
}

/* .editor-container {
    display: flex;
    gap: 20px;
}

.editor-wrapper,
.preview-wrapper {
    width: 50%;
} */
.item-input label {
    margin-bottom: 5px;
    font-weight: bold;
}

.item-input label span {
    color: red;
}

.preview-content {
    border: 1px solid #ddd;
    padding: 10px;
    min-height: 400px;
    background: #fff;
}
</style>
