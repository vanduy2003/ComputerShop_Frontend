<template>
    <div class="new-description">
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
                            <span itemprop="name">
                                TIN TỨC
                            </span>
                            <i class="mdi mdi-chevron-right"></i>
                        </a>
                    </li>

                    <li class="home float-start list-unstyled">
                        <a href="/gaming-pc.html" class="text-custom">
                            <span itemprop="name">
                                {{ newCurrent.title }}
                            </span>
                        </a>
                    </li>
                </ol>
            </div>
            <!-- end breadcrumb -->
            <div class="row d-flex">
                <div class="content-left col-md-8">

                    <div class="background-white">
                        <h4 class="name fw-bold my-2">{{ newCurrent.title }}</h4>
                        <div class="time d-flex align-items fs-6 my-2">
                            <div class="datetime">
                                <i class="mdi mdi-clock-time-four"></i>
                                {{ newCurrent.updatedAt }}
                            </div>
                            <div class="view">
                                <i class="mdi mdi-eye"></i>
                                {{ newCurrent.eyeWatch }}
                            </div>
                        </div>

                        <div class="content-new-detail " id="js-find_content">
                            <div class="nd fs-5">
                                <span class="mb-3 d-block">{{ newCurrent.description }}</span>
                                <div v-if="newCurrent.videoUrl" class="text-center"><iframe class="text-center"
                                        width="750" height="450"
                                        :src="`https://www.youtube.com/embed/${newCurrent.videoUrl}?si=bBF32BcN8kACYABp`"
                                        title="YouTube video player" frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                                    </iframe></div>

                                <div v-html="newCurrent.content"></div>
                            </div>
                        </div>
                        <div class="btn-share-detail d-flex" style="margin-top: 20px;">
                            <b class="me-2">Chia sẻ bài viết:</b>
                            <!-- Nút Like -->
                            <div class="fb-like" :data-href="currentURL" data-width="" data-layout="standard"
                                data-action="like" data-size="small" data-share="true">
                            </div>
                        </div>
                        <!-- Plugin Facebook Comments -->
                        <div class="fb-comments" :data-href="currentURL" data-width="100%" data-numposts="5">
                        </div>
                    </div>
                </div>
                <div class="content-right col-md-4">
                    <NewApp />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useNewStore } from '@/stores/newStore';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

import NewApp from './NewApp.vue';

export default {
    components: {
        NewApp
    },
    setup() {
        const store = useNewStore();
        const { newCurrent } = storeToRefs(store);
        const route = useRoute();

        // Hàm fetch dữ liệu + re-render Facebook Plugin
        const fetchData = async (newId) => {
            if (!newId) return; // Tránh lỗi nếu newId chưa có
            await store.fetchNewDataByID(newId);

            setTimeout(() => {
                if (window.FB) {
                    window.FB.XFBML.parse(); // Re-render Facebook Plugin
                }
            }, 1000);
        };

        // Gọi API lần đầu khi component mount
        onMounted(() => {
            fetchData(route.params.id);
        });

        // Theo dõi sự thay đổi của ID trên URL
        watch(() => route.params.id, (newId) => {
            fetchData(newId);
        });

        return { newCurrent };
    }
};


</script>


<style>
.content-new-detail p,
h4 {
    font-weight: bold !important;
}

.content-new-detail h4 {
    padding: 10px 0;
}
</style>