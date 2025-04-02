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
                            <span itemprop="name"> GIỎ HÀNG </span>
                            <i class="mdi mdi-chevron-right"></i>
                        </a>
                    </li>

                    <li class="home float-start list-unstyled">
                        <a href="/gaming-pc.html" class="text-custom">
                            <span itemprop="name"> XÁC NHẬN MUA HÀNG </span>
                        </a>
                    </li>
                </ol>
            </div>
            <!-- end breadcrumb -->
            <div class="row">
                <div class="col-md-8">
                    <div class="content-left background-white">
                        <div class="title d-flex align-items-center justify-space-between">
                            <h2 class="fs-4 fw-semibold">Thông tin giao hàng</h2>
                            <div class="btn-action-cart d-flex align-items-center fs-7">
                                <a href="#" class="item">
                                    <i class="mdi mdi-file-download-outline"></i> Tải báo giá
                                </a>
                                <a href="#" class="item"> <i class="mdi mdi-printer"></i> In báo giá </a>
                            </div>
                        </div>

                        <div class="content-input-form mt-4 mb-4 border-bottom">
                            <div class="row">
                                <div class="item-input col-md-6">
                                    <label>Họ và tên người nhận<span>*</span></label>
                                    <input type="text" class="form-control" v-model="receiverName"
                                        placeholder="Họ tên người nhận hàng" />
                                    <div class="note-error text-danger" v-if="errors.receiverName">
                                        {{ errors.receiverName }}
                                    </div>
                                </div>

                                <div class="item-input col-md-6">
                                    <label>Số điện thoại<span>*</span></label>
                                    <input type="text" class="form-control" v-model="phoneNumber"
                                        placeholder="Dùng để liên lạc khi giao hàng" />
                                    <div class="note-error text-danger" v-if="errors.phoneNumber">
                                        {{ errors.phoneNumber }}
                                    </div>
                                </div>
                            </div>

                            <div class="row">

                                <div class="item-input col-md-6">
                                    <label>Email<span>*</span></label>
                                    <input type="text" class="form-control" v-model="email" placeholder="Nhập email " />
                                    <div class="note-error text-danger" v-if="errors.email">
                                        {{ errors.email }}
                                    </div>
                                </div>

                                <div class="item-input col-md-6">
                                    <label>Tỉnh/thành phố<span>*</span></label>
                                    <select v-model="locationStore.selectedProvince" class="form-control">
                                        <option :value="null">Chọn tỉnh/thành phố</option>
                                        <option v-for="province in locationStore.provinces" :key="province.code"
                                            :value="province">
                                            {{ province.name }}
                                        </option>
                                    </select>
                                    <div class="note-error text-danger" v-if="errors.provinceName">
                                        {{ errors.provinceName }}
                                    </div>
                                </div>
                            </div>



                            <div class="row">
                                <div class="item-input col-md-6">
                                    <label>Quận/Huyện<span>*</span></label>
                                    <select v-model="locationStore.selectedDistrict" class="form-control"
                                        :disabled="!locationStore.selectedProvince">
                                        <option :value="null">Chọn quận/huyện</option>
                                        <option v-for="district in locationStore.districts" :key="district.code"
                                            :value="district">
                                            {{ district.name }}
                                        </option>
                                    </select>
                                    <div class="note-error text-danger" v-if="errors.districtName">
                                        {{ errors.districtName }}
                                    </div>
                                </div>

                                <div class="item-input col-md-6">
                                    <label>Phường/xã<span>*</span></label>
                                    <select v-model="locationStore.selectedWard" class="form-control"
                                        :disabled="!locationStore.selectedDistrict">
                                        <option :value="null">Chọn phường/xã</option>
                                        <option v-for="ward in locationStore.wards" :key="ward.code" :value="ward">
                                            {{ ward.name }}
                                        </option>
                                    </select>
                                    <div class="note-error text-danger" v-if="errors.wardName">
                                        {{ errors.wardName }}
                                    </div>
                                </div>
                            </div>

                            <div class="item-input" style="width: 100%">
                                <label>Địa chỉ<span>*</span></label>
                                <textarea class="form-control" cols="30" rows="3" v-model="detailAddress"
                                    placeholder="Nhập địa chỉ giao hàng"></textarea>
                                <div class="note-error text-danger" v-if="errors.detailAddress">
                                    {{ errors.detailAddress }}
                                </div>
                            </div>
                        </div>

                        <div class="box-pay-method fs-6">
                            <h2 class="fs-4 fw-semibold">Hình thức thanh toán</h2>
                            <div class="content-select-radio d-flex align-items-center mt-4">
                                <label class="me-5">
                                    <input type="radio" name="pay_method" v-model="paymentMethod"
                                        value="Chuyển khoản" />
                                    Chuyển khoản
                                </label>
                                <label class="me-5">
                                    <input type="radio" name="pay_method" v-model="paymentMethod"
                                        value="Thanh toán khi nhận hàng" />
                                    Thanh toán khi nhận hàng
                                </label>
                                <label>
                                    <input type="radio" name="pay_method" v-model="paymentMethod" value="momo" />
                                    Thanh toán Online
                                </label>
                            </div>
                            <div class="text-danger" v-if="errors.paymentMethod">{{ errors.paymentMethod }}</div>

                            <div v-if="paymentMethod === 'momo'" @click="handleMoMoPayment"
                                class="cursor-pointer text-center mx-auto mt-3">
                                <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="MoMo"
                                    width="150px" />
                            </div>

                            <div v-if="paymentMethod === 'Chuyển khoản'" class="text-center mt-3">
                                <img src="https://i.imgur.com/IKDG04p.jpg" alt="Chuyển khoản" width="250px" />
                            </div>
                        </div>

                        <!-- dscs -->
                        <div class="content-info-pay active mt-4 fs-6">
                            <div class="item mb-3">
                                <b>Tại Ngân hàng Thương mại Cổ phần Quân đội - MB Bank - Chi nhánh Tràng
                                    An - PGD Láng Thượng</b>
                                <p>Số tài khoản: 282468888</p>
                                <p>Tên TK: CT TNHH TM VA TIN HOC TU NGUYET</p>
                            </div>
                            <div class="item mb-3">
                                <b>Tại Ngân hàng Thương mại Cổ phần Quân đội - MB Bank</b>
                                <p>Số tài khoản: 1919998888</p>
                                <p>Tên TK: Trương Trung Đức</p>
                            </div>
                            <div class="item mb-3">
                                <b>Tại Ngân hàng Thương mại Cổ phần Kỹ Thương Việt Nam (Techcombank)</b>
                                <p>Số tài khoản: 19026957036023 hoặc MS00T06900566980850</p>
                                <p>Tên TK: Trương Trung Đức</p>
                            </div>
                        </div>
                        <div class="content-info-pay"></div>
                    </div>
                </div>
                <div class="col-md-4">
                    <CartsRight :carts="cart" :countItems="countItems" :discountedTotal="discountedTotal"
                        :isConfirmBuy="isConfirmBuy" :orderData="orderData" @confirmOrder="handleConfirmOrder" />
                </div>
            </div>
        </div>

        <!-- Dùng component LoadingOverlay -->
        <LoadingOverlay :isLoading="isLoading" />
    </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import CartsRight from "./CartsRight.vue";
import { useLocationStore } from "@/stores/locationStore";
import { useCartStore } from "@/stores/cartStore";
import LoadingOverlay from "@/components/content/common/LoadingOverlay.vue";
import { useToast } from "vue-toastification";
import axios from "axios";

export default {
    components: {
        CartsRight,
        LoadingOverlay,
    },

    setup() {
        const router = useRouter(); // ✅ Thêm useRouter để điều hướng
        const locationStore = useLocationStore();
        const cartStore = useCartStore();
        const toast = useToast();
        const { cart, countItems, discountedTotal, userId } = storeToRefs(cartStore);
        const receiverName = ref("");
        const phoneNumber = ref("");
        const email = ref("");
        const detailAddress = ref("");
        const isConfirmBuy = ref(true);
        const paymentMethod = ref("");
        const isLoading = ref(false);
        const errors = ref({});

        // ✅ Dữ liệu đơn hàng
        const orderData = computed(() => ({
            userId: userId.value || null,
            receiverName: receiverName.value,
            phoneNumber: phoneNumber.value,
            email: email.value,
            provinceName: locationStore.selectedProvince?.name || null,
            districtName: locationStore.selectedDistrict?.name || null,
            wardName: locationStore.selectedWard?.name || null,
            detailAddress: detailAddress.value,
            countItems: countItems.value,
            total: discountedTotal.value,
            paymentMethod: paymentMethod.value,
            cartItems: cart.value,
        }));

        onMounted(() => {
            locationStore.fetchProvinces();
        });

        // ✅ Hàm kiểm tra lỗi
        const validateForm = () => {
            errors.value = {}; // Xóa lỗi cũ trước khi kiểm tra

            if (!receiverName.value) errors.value.receiverName = "Vui lòng nhập họ tên.";
            if (!phoneNumber.value) {
                errors.value.phoneNumber = "Vui lòng nhập số điện thoại.";
            } else if (!/^(0[3-9][0-9]{8})$/.test(phoneNumber.value)) {
                errors.value.phoneNumber = "Số điện thoại không hợp lệ.";
            }

            if (!email.value) {
                errors.value.email = "Vui lòng nhập email.";
            } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
                errors.value.email = "Email không hợp lệ.";
            }

            if (!locationStore.selectedProvince)
                errors.value.provinceName = "Vui lòng chọn tỉnh/thành phố.";
            if (!locationStore.selectedDistrict)
                errors.value.districtName = "Vui lòng chọn quận/huyện.";
            if (!locationStore.selectedWard) errors.value.wardName = "Vui lòng chọn phường/xã.";

            if (!detailAddress.value) errors.value.detailAddress = "Vui lòng nhập địa chỉ.";
            if (!paymentMethod.value)
                errors.value.paymentMethod = "Vui lòng chọn hình thức thanh toán.";

            return Object.keys(errors.value).length === 0; // Trả về `true` nếu không có lỗi
        };

        // ✅ Xử lý khi nhấn nút Xác nhận mua hàng
        const handleConfirmOrder = async () => {
            if (!validateForm()) {
                toast.error("Vui lòng kiểm tra lại thông tin.");
                return;
            }

            try {
                isLoading.value = true;

                // 🛒 Lưu lại số tiền trước khi tạo đơn hàng
                const totalAmount = discountedTotal.value.toString();

                // 🛒 ✅ Tạo đơn hàng trước, lấy orderId từ backend
                const response = await cartStore.createOrder(orderData.value);
                const newOrderId = response;

                if (!newOrderId) {
                    throw new Error("Không thể tạo đơn hàng!");
                }

                // Nếu chọn thanh toán bằng MoMo, gửi orderId + số tiền lên MoMo
                if (orderData.value.paymentMethod === "momo") {
                    handleMoMoPayment(newOrderId, totalAmount);
                    return;
                }

                // Nếu không dùng MoMo, chuyển đến trang đặt hàng thành công
                setTimeout(() => {
                    isLoading.value = false;
                    router.replace(`/me/cart/buy-success/${newOrderId}`);
                }, 2000);
            } catch (error) {
                console.error("Lỗi khi đặt hàng:", error);
                toast.error("Đã xảy ra lỗi, vui lòng thử lại!");
                isLoading.value = false;
            }
        };

        // ✅ Xử lý thanh toán MoMo
        const handleMoMoPayment = async (orderId, amount) => {
            try {
                isLoading.value = true;
                const response = await axios.post("http://localhost:3000/api/v1/data/create-payment", {
                    orderId, // Gửi orderId để MoMo biết đơn hàng nào cần thanh toán
                    amount,  // Dùng số tiền đã lưu trước khi gọi createOrder
                });

                if (response.data && response.data.payUrl) {
                    window.location.href = response.data.payUrl; // Điều hướng đến trang thanh toán MoMo
                } else {
                    alert("Lỗi khi tạo đơn hàng MoMo");
                }
            } catch (error) {
                console.error("Lỗi MoMo:", error.response ? error.response.data : error);
            } finally {
                isLoading.value = false;
            }
        };



        return {
            cart,
            userId,
            countItems,
            discountedTotal,
            locationStore,
            receiverName,
            phoneNumber,
            email,
            detailAddress,
            isConfirmBuy,
            orderData,
            paymentMethod,
            handleConfirmOrder,
            isLoading,
            errors,
            handleMoMoPayment,
        };
    },
};
</script>

<style>
.page-cart .item-input {
    margin-bottom: 20px;
}

.page-cart .item-input label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #8d94ac;
}

.page-cart .item-input label span {
    color: #fb4e4e;
    margin-left: 2px;
}

.form-control:focus-within {
    box-shadow: inset 0 0 0 0.5px var(--color-global) !important;
    outline: none !important;
    border: 1px solid var(--color-global);
}

.content-info-pay p {
    margin-bottom: 0 !important;
}
</style>
