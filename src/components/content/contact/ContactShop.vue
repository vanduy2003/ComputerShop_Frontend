<template>
    <div>
        <HeaderApp />
        <div class="page-title container">
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
                        <a href="" class="text-custom">
                            <i class="mdi mdi-account"></i>
                            <span itemprop="name"> LIÊN HỆ </span>
                        </a>
                    </li>
                </ol>
            </div>

            <v-row>
                <v-col cols="12" md="12" class="contact-header d-flex flex-column align-center">
                    <!-- Ảnh với hiệu ứng bo tròn và đổ bóng -->
                    <img src="https://i.imgur.com/AGkTeSa.png" alt="Banner" max-width="400px" />

                    <!-- Tiêu đề nổi bật với hiệu ứng gradient -->
                    <h1 class="text-gradient mt-4">TẬN TÂM - TRÁCH NHIỆM - SÁNG TẠO - KHÁC BIỆT</h1>
                </v-col>
            </v-row>

            <v-row>
                <!-- Thông tin liên hệ -->
                <v-col cols="12" md="5">
                    <v-card class="pa-5 elevation-3 rounded-lg fs-6">
                        <h3 class="font-weight-bold mb-3">
                            Công ty TNHH Thương mại &amp; Tin học Tú Nguyệt
                        </h3>
                        <v-divider></v-divider>

                        <div class="box mt-3">
                            <v-icon color="green">mdi-storefront</v-icon>
                            <p class="ml-2">
                                <b>Showroom:</b> 172 Lê Thanh Nghị, P. Đồng Tâm, Hai Bà Trưng, Hà Nội
                            </p>
                        </div>

                        <div class="box">
                            <v-icon color="blue">mdi-phone</v-icon>
                            <p class="ml-2">
                                Tel:
                                <a href="tel:02436288790"><b>(024) 36288790</b></a> /
                                <a href="tel:0868302123"><b>(086) 830.2123</b></a>
                            </p>
                        </div>

                        <div class="box">
                            <v-icon color="red">mdi-email</v-icon>
                            <p class="ml-2">
                                Email:
                                <a href="mailto:support@tunguyet.vn"><b>support@tunguyet.vn</b></a>
                            </p>
                        </div>

                        <v-divider class="my-3"></v-divider>

                        <h4 class="font-weight-bold">Trung tâm bảo hành</h4>
                        <p>172 Lê Thanh Nghị, P. Đồng Tâm, Hai Bà Trưng, Hà Nội</p>
                        <p>
                            Tel:
                            <a href="tel:0989781468"><b>(098) 978 1468</b></a>
                        </p>
                    </v-card>

                    <!-- Form liên hệ -->
                    <v-card class="pa-5 my-4 elevation-3 rounded-lg fs-6">
                        <h3 class="font-weight-bold mb-4">Liên hệ với chúng tôi</h3>
                        <v-form>
                            <div class="row">
                                <div class="item-input col-md-12">
                                    <label>Họ và tên<span>*</span></label>
                                    <input type="text" class="form-control" v-model="name"
                                        placeholder="Nhập họ và tên" />
                                    <div class="note-error text-danger" v-if="errors.name">
                                        {{ errors.name }}
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="item-input col-md-12">
                                    <label>Email<span>*</span></label>
                                    <input type="text" class="form-control" v-model="email"
                                        placeholder="Nhập địa chỉ Email" />
                                    <div class="note-error text-danger" v-if="errors.email">
                                        {{ errors.email }}
                                    </div>
                                </div>
                            </div>

                            <div class="item-input mt-3" style="width: 100%">
                                <label>Nội dung<span>*</span></label>
                                <textarea class="form-control" v-model="content" cols="30" rows="3"
                                    placeholder="Nhập nội dung"></textarea>
                                <div class="note-error text-danger" v-if="errors.content">
                                    {{ errors.content }}
                                </div>
                            </div>

                            <v-btn block @click="sendContact" class="mt-4 gradient-button">
                                Gửi liên hệ
                            </v-btn>
                        </v-form>
                    </v-card>
                </v-col>

                <!-- Bản đồ Google -->
                <v-col cols="12" md="7">
                    <v-card class="elevation-3 overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14899.070737640484!2d105.844173!3d21.0019476!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac70cf94287f%3A0x7362ea6005b5ac6e!2sTNC%20Store!5e0!3m2!1sen!2s!4v1683824721069!5m2!1sen!2s"
                            width="100%" height="500" frameborder="0" allowfullscreen loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <FooterApp />
        <SocialIcon />
    </div>
</template>

<script>
import HeaderApp from "@/components/Header/HeaderApp.vue";
import FooterApp from "@/components/Footer/FooterApp.vue";
import SocialIcon from "@/components/content/social/SocialIcon.vue";
import { ref } from "vue";
import Swal from "sweetalert2"; // Thư viện thông báo đẹp

export default {
    name: "ContactShop",
    components: {
        HeaderApp,
        FooterApp,
        SocialIcon,
    },

    setup() {
        const name = ref("");
        const email = ref("");
        const content = ref("");
        const errors = ref({}); // Lưu trữ lỗi khi

        const validateForm = () => {
            errors.value = {};

            if (!name.value) {
                errors.value.name = "Vui lòng nhập họ và tên";
            }

            if (!email.value) {
                errors.value.email = "Vui lòng nhập email";
            }

            if (!content.value) {
                errors.value.content = "Vui lòng nhập nội dung";
            }

            return Object.keys(errors.value).length === 0;
        };

        const sendContact = () => {
            if (!validateForm()) {
                return;
            }
            Swal.fire("Thành công!", "Thông tin của bạn đã được gửi.", "success");
            name.value = "";
            email.value = "";
            content.value = "";
        };

        return {
            name,
            email,
            content,
            sendContact,
            errors,
        };
    },
};
</script>

<style scoped>
.contact-header {
    background: black;
    border-radius: 10px;
}

/* Hiệu ứng gradient cho tiêu đề */
.text-gradient {
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    background: linear-gradient(to right, #ff7e5f, #34d399);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* Đổ bóng và bo tròn cho ảnh */
.shadow-lg {
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
}

/* Gradient Button */
.gradient-button {
    background: linear-gradient(to right, #34d399, #ff7e5f);
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    transition: all 0.3s ease-in-out;
}

.gradient-button:hover {
    background: linear-gradient(to right, #ff7e5f, #34d399);
}

/* Căn chỉnh các khối */
.box {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

.box p {
    margin: 0;
}
</style>
