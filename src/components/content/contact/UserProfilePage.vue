<template>
    <div class="user-profile" style="background: rgb(243, 243, 243);">
        <HeaderApp />
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
                            <span itemprop="name">THÔNG TIN CÁ NHÂN</span>
                        </a>
                    </li>
                </ol>
            </div>

            <div class="row">
                <!-- Sidebar -->
                <div class="col-md-4">
                    <div class="card text-center fs-6">
                        <div class="card-body">
                            <div class="position-relative d-inline-block" style="cursor: pointer;"
                                @click="triggerFileInput">
                                <img :src="user.avatar" class="rounded-circle mb-3 img-avatar" alt="User Avatar"
                                    width="250" height="250" @click="() => $refs.avatarInput.click()"
                                    style="cursor: pointer;" />
                                <input type="file" ref="avatarInput" class="d-none" accept="image/*"
                                    @change="handleAvatarChange" />

                                <div class="position-absolute top-50 start-50 translate-middle text-white fw-bold"
                                    style="background: rgba(0,0,0,0.4); border-radius: 50%; padding: 10px;">
                                    <i class="mdi mdi-camera"></i>
                                </div>
                            </div>
                            <input type="file" ref="fileInput" accept="image/*" @change="handleAvatarChange"
                                class="d-none" />
                            <h5 class="card-title fw-semibold mt-3">{{ user.username }}</h5>
                        </div>

                        <ul class="list-group list-group-flush">
                            <li v-for="tab in tabs" :key="tab"
                                :class="['list-group-item list-group-item-action', activeTab === tab ? 'active' : '']"
                                @click="activeTab = tab" style="cursor: pointer;">
                                {{ tab }}
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="col-md-8">
                    <div class="card text-left fs-6">
                        <div class="card-body">
                            <h4 class="mb-4 text-center">Thông Tin Cá Nhân</h4>
                            <form @submit.prevent="updateProfile">
                                <div class="row mb-3">
                                    <div class="col">
                                        <label class="form-label">Tên hiển thị</label>
                                        <input type="text" v-model="user.username" class="form-control" required />
                                    </div>
                                    <div class="col">
                                        <label class="form-label">Đặc quyền</label>
                                        <input type="text" v-model="rule" class="form-control" disabled />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <label class="form-label">Email</label>
                                        <input type="email" v-model="user.email" class="form-control" disabled />
                                    </div>
                                    <div class="col">
                                        <label class="form-label">Phone Number</label>
                                        <input type="text" v-model="user.phone" class="form-control" />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <label class="form-label">Địa chỉ</label>
                                        <input type="text" v-model="user.address" class="form-control" />
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Bio</label>
                                    <textarea v-model="user.bio" rows="3" class="form-control"></textarea>
                                </div>

                                <div class="d-flex gap-2">
                                    <button type="submit" class="btn btn-primary">Cập Nhật</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <FooterApp />
        <SocialIcon />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import HeaderApp from '@/components/Header/HeaderApp.vue';
import FooterApp from '@/components/Footer/FooterApp.vue';
import SocialIcon from '../social/SocialIcon.vue';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const tabs = ['Thông Tin Tài Khoản', 'Đổi Mật Khẩu', 'Bảo Mật', 'Đơn Hàng Đã Mua', 'Thông Báo'];
const activeTab = ref('Thông Tin Tài Khoản');

const rule = user.value.role === 'admin' ? 'Quản trị viên' : 'Người dùng';

const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
        const uploadRes = await axios.post('http://localhost:3000/api/v1/data/upload/avatar', formData);
        user.value.avatar = uploadRes.data.avatarUrl;  // Cập nhật đường link avatar mới
    } catch (error) {
        console.error('Upload avatar failed:', error);
    }
};

const updateProfile = async () => {
    try {
        // Chỉ gửi những field được phép sửa (không gửi email, role)
        const formData = {
            username: user.value.username,
            phone: user.value.phone,
            bio: user.value.bio,
            address: user.value.address,
            avatar: user.value.avatar,
        };

        await axios.put(`http://localhost:3000/api/v1/data/update-user/${user.value.userId}`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        Swal.fire({
            icon: 'success',
            title: 'Cập nhật thành công!',
            text: 'Thông tin cá nhân đã được cập nhật thành công.',
            showConfirmButton: false,
            timer: 2000,
        });
    } catch (error) {
        console.error('Update profile failed:', error);
        Swal.fire({
            icon: 'error',
            title: 'Cập nhật thất bại!',
            text: error.response.data.message || 'Có lỗi xảy ra. Vui lòng thử lại.',
        });
    }
};
</script>



<style scoped>
.img-avatar {
    object-fit: cover;
}
</style>


<style>
.img-avatar {
    object-fit: cover;
}
</style>