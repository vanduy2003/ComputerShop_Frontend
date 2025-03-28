<template>
    <div>
        <v-container>
            <div class="row mb-4">
                <div class="item-input col-md-12">
                    <label>Tên danh mục sản phẩm<span>*</span></label>
                    <input v-model="formData.name" type="text" class="form-control"
                        placeholder="Nhập tên danh mục sản phẩm" />
                </div>
            </div>
            <div class="row mb-4">
                <div class="item-input col-md-12">
                    <label>Mô tả danh mục sản phẩm<span>*</span></label>
                    <input v-model="formData.description" type="text" class="form-control"
                        placeholder="Nhập mô tả danh mục sản phẩm" />
                </div>
            </div>
            <div class="row mb-4">
                <div class="item-input col-md-12">
                    <label>Link ảnh danh mục sản phẩm<span>*</span></label>
                    <input v-model="formData.imageUrl" type="text" class="form-control"
                        placeholder="Nhập link ảnh danh mục sản phẩm" />
                </div>
            </div>
            <div class="mt-5 text-center">
                <v-btn variant="outlined" color="primary" @click="submitForm" prepend-icon="mdi-note-plus">
                    {{ category ? 'Cập nhật danh mục' : 'Thêm danh mục' }}
                </v-btn>
                <v-btn class="ms-3" prepend-icon="mdi-backspace-reverse" variant="outlined" color="red"
                    @click="closeForm">
                    Thoát
                </v-btn>
            </div>
        </v-container>
    </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
    props: {
        category: Object, // Nhận dữ liệu từ component cha
    },
    setup(props, { emit }) {
        const formData = ref({
            name: "",
            description: "",
            imageUrl: ""
        });

        // Nếu là chỉnh sửa, cập nhật dữ liệu vào form
        watch(() => props.category, (newVal) => {
            if (newVal) {
                formData.value = { ...newVal };
            }
        }, { deep: true, immediate: true });

        const submitForm = () => {
            emit("submit", formData.value); // Gửi dữ liệu lên component cha
        };

        const closeForm = () => {
            emit("close");
        };

        return {
            formData,
            submitForm,
            closeForm,

        };
    }
}
</script>


<style></style>