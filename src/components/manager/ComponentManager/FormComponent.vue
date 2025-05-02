<template>
    <div>
        <v-container>
            <div class="row mb-4">
                <div class="item-input col-md-12">
                    <label>Tên linh kiện điện tử<span>*</span></label>
                    <input v-model="formData.name" componentType="text" class="form-control"
                        placeholder="Nhập tên linh kiện điện tử" />
                </div>
            </div>
            <div class="row mb-4">
                <div class="item-input col-md-12">
                    <label>Loại linh kiện điện tử<span>*</span></label>
                    <input v-model="formData.componentType" componentType="text" class="form-control"
                        placeholder="Nhập loại linh kiện điện tử" />
                </div>
            </div>
            <div class="row mb-4">
                <div class="item-input col-md-12">
                    <label>Thông số kỹ thuật<span>*</span></label>
                    <input v-model="formData.specifications" componentType="text" class="form-control"
                        placeholder="Nhập mô tả linh kiện điện tử" />
                </div>
            </div>
            <div class="row mb-4">
                <div class="item-input col-md-12">
                    <label>Link ảnh linh kiện điện tử<span>*</span></label>
                    <input v-model="formData.imageUrl" componentType="text" class="form-control"
                        placeholder="Nhập link ảnh linh kiện điện tử" />
                </div>
            </div>
            <div class="mt-5 text-center">
                <v-btn variant="outlined" color="primary" @click="submitForm" prepend-icon="mdi-note-plus">
                    {{ component ? 'Cập nhật linh kiện' : 'Thêm linh kiện' }}
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
        component: Object, // Nhận dữ liệu từ component cha
    },
    setup(props, { emit }) {
        const formData = ref({
            name: "",
            componentType: "",
            specifications: "",
            imageUrl: ""
        });

        // Nếu là chỉnh sửa, cập nhật dữ liệu vào form
        watch(() => props.component, (newVal) => {
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