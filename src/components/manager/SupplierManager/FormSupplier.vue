<template>
    <div>
        <v-container>
            <div class="row mb-4">
                <div class="item-input col-md-6">
                    <label>Nhà cung cấp<span>*</span></label>
                    <input v-model="formData.name" type="text" class="form-control"
                        placeholder="Nhập tên nhà cung cấp" />
                    <p class="text-danger mb-0" v-if="errors.name">{{ errors.name }}</p>
                </div>
                <div class="item-input col-md-6">
                    <label>Họ tên<span>*</span></label>
                    <input v-model="formData.contactName" type="text" class="form-control"
                        placeholder="Nhập tên người liên hệ" />
                    <p class="text-danger mb-0" v-if="errors.contactName">{{ errors.contactName }}</p>
                </div>
            </div>
            <div class="row mb-4">
                <div class="item-input col-md-12">
                    <label>Ảnh nhà cung cấp<span>*</span></label>
                    <input v-model="formData.imageUrl" type="text" class="form-control" placeholder="Nhập URL ảnh" />
                    <p class="text-danger mb-0" v-if="errors.imageUrl">{{ errors.imageUrl }}</p>
                </div>
            </div>
            <div class="row mb-4">
                <div class="item-input col-md-6">
                    <label>Số điện thoại<span>*</span></label>
                    <input v-model="formData.phone" type="text" class="form-control" placeholder="Nhập số điện thoại" />
                    <p class="text-danger mb-0" v-if="errors.phone">{{ errors.phone }}</p>
                </div>
                <div class="item-input col-md-6">
                    <label>Email<span>*</span></label>
                    <input v-model="formData.email" type="text" class="form-control" placeholder="Nhập Email liên hệ" />
                    <p class="text-danger mb-0" v-if="errors.email">{{ errors.email }}</p>
                </div>
            </div>
            <div class="row mb-4">
                <div class="item-input col-md-12">
                    <label>Địa chỉ<span>*</span></label>
                    <input v-model="formData.address" type="text" class="form-control" placeholder="Nhập địa chỉ" />
                    <p class="text-danger mb-0" v-if="errors.address">{{ errors.address }}</p>
                </div>
            </div>
            <div class="mt-5 text-center">
                <v-btn variant="outlined" color="primary" @click="submitForm" prepend-icon="mdi-note-plus">
                    {{ supplier ? 'Cập nhật nhà cung cấp' : 'Thêm nhà cung cấp' }}
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
        supplier: Object, // Nhận dữ liệu từ component cha
    },
    setup(props, { emit }) {
        const formData = ref({
            name: "",
            contactName: "",
            imageUrl: "",
            phone: "",
            email: "",
            address: "",
        });

        const errors = ref({}); // Lưu lỗi validation

        // Nếu là chỉnh sửa, cập nhật dữ liệu vào form
        watch(() => props.supplier, (newVal) => {
            if (newVal) {
                formData.value = { ...newVal };
            }
        }, { deep: true, immediate: true });

        // 🎯 Validate dữ liệu nhập
        const validateForm = () => {
            errors.value = {}; // Reset lỗi

            if (!formData.value.name.trim()) errors.value.name = "Tên nhà cung cấp không được để trống!";
            if (!formData.value.contactName.trim()) errors.value.contactName = "Tên người liên hệ không được để trống!";
            if (!formData.value.imageUrl.trim()) errors.value.imageUrl = "Vui lòng nhập URL ảnh!";
            if (!formData.value.phone.trim()) {
                errors.value.phone = "Vui lòng nhập số điện thoại!";
            } else if (!/^\d+$/.test(formData.value.phone)) {
                errors.value.phone = "Số điện thoại chỉ được chứa số!";
            }
            if (!formData.value.email.trim()) {
                errors.value.email = "Vui lòng nhập email!";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
                errors.value.email = "Email không hợp lệ!";
            }
            if (!formData.value.address.trim()) errors.value.address = "Vui lòng nhập địa chỉ!";

            return Object.keys(errors.value).length === 0;
        };

        const submitForm = () => {
            if (validateForm()) {
                emit("submit", formData.value); // Gửi dữ liệu lên component cha nếu hợp lệ
            }
        };

        const closeForm = () => {
            emit("close");
        };

        return {
            formData,
            errors,
            submitForm,
            closeForm,
        };
    }
}
</script>


<style></style>