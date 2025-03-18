<template>
    <v-app>
        <v-main style="background-color: #f3f3f3;">
            <HeaderApp />
            <div class="container">
                <div class="content-404 mt-5 text-center">
                    <img src="https://www.tncstore.vn/static/assets/default/images/404Error.png" width="100%"
                        height="100%" alt="error 404">
                    <h2 class="fs-2 fw-semibold">LẠC ĐƯỜNG RỒI</h2>
                    <p class="fs-6">Nội dung bạn đang tìm có vẻ như không tồn tại, hoặc đã được chuyển đi nơi khác</p>
                    <router-link to="/" class="btn-submit"><span class="txt text-white">Về trang
                            chủ</span></router-link>
                </div>
            </div>
            <FooterApp />
            <SocialIcon />
        </v-main>
    </v-app>
</template>

<script>
import HeaderApp from '@/components/Header/HeaderApp.vue';
import FooterApp from '@/components/Footer/FooterApp.vue';
import SocialIcon from '@/components/content/social/SocialIcon.vue';



export default {
    components: {
        HeaderApp,
        FooterApp,
        SocialIcon,


    }
}
</script>

<style>
.content-404 img {
    width: 450px;
    display: block;
    margin: 0 auto 32px auto;
}

.btn-submit {
    display: inline-block;
    height: 40px;
    padding: 0 24px;
    text-align: center;
    background: var(--color-global);
    text-align: center;
    line-height: 40px;
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
}

.btn-submit::before {
    position: absolute;
    content: "";
    width: 0;
    height: 40px;
    top: 0;
    left: 0;
    -webkit-clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%);
    clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%);
    background: #193c7b;
    transition: .5s;
    opacity: 0;
}

.btn-submit:hover::before {
    opacity: 1;
    width: 120%;
}

.btn-submit .txt {
    position: relative;
    z-index: 9;
}
</style>