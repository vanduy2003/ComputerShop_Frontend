<template>
    <div class="article ">
        <!-- Article Sale -->
        <section class="article-sale mt-5">
            <div class="container background-white">
                <h2 class="title">Chuyên trang khuyến mãi</h2>
                <div class="row g-3 list-article d-flex flex-wrap">
                    <div v-for="article in articles" :key="article.newId" class="col-md-6 item-sale">
                        <router-link :to="`/new/${article.newId}`" class="image">
                            <img :src="article.thumbnail" width="100%" height="100%" :alt="article.title" />
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
        <!-- End Article Sale -->

        <!-- group-article -->
        <section class="group-article mt-5">
            <div class="container">
                <div class="row d-flex">
                    <!--  article-video  -->
                    <div class="article-video col-md-6">
                        <div class="background-white">
                            <div class="title d-flex align-items-center justify-content-between">
                                <h2>TNC channel</h2>
                                <router-link to="!" class="more-all">
                                    Xem tất cả
                                    <i class="mdi mdi-arrow-right"></i>
                                </router-link>
                            </div>
                            <div class="list-article" id="js-article-video">
                                <div v-for="channel in channels" :key="channel.newId" class="item-video d-flex mb-4">
                                    <router-link :to="`/new/${channel.newId}`" class="image">
                                        <img :src="channel.thumbnail" :alt="channel.title" width="100%" height="100%" />
                                        <i class="mdi mdi-youtube"></i>
                                    </router-link>
                                    <div class="info">
                                        <h3 class="name line-clamp-2">
                                            <router-link :to="`/new/${channel.newId}`">{{ channel.title }}</router-link>
                                        </h3>
                                        <div class="summary line-clamp-2">{{ channel.description }}</div>
                                        <div class="time d-flex align-items-center">
                                            <div class="datetime">
                                                <i class="mdi mdi-clock-time-four"></i>
                                                {{ channel.updatedAt }}
                                            </div>
                                            <div class="view">
                                                <i class="mdi mdi-eye"></i>
                                                {{ channel.eyeWatch }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- article-news -->
                    <div class="article-new col-md-6">
                        <div class="background-white">
                            <div class="title d-flex align-items-center justify-content-between">
                                <h2>Tin tức</h2>
                                <router-link to="!" class="more-all">
                                    Xem tất cả
                                    <i class="mdi mdi-arrow-right"></i>
                                </router-link>
                            </div>
                            <div class="list-article">
                                <div v-for="item in news" :key="item.newId" class="item-article d-flex mb-4">
                                    <router-link :to="`/new/${item.newId}`" class="image">
                                        <img :src="item.thumbnail" width="100%" height="100%" :alt="item.title" />
                                    </router-link>
                                    <div class="info">
                                        <h3 class="name line-clamp-2">
                                            <router-link :to="`/new/${item.newId}`">
                                                {{ item.title }}
                                            </router-link>
                                        </h3>
                                        <div class="summary line-clamp-2">
                                            {{ item.description }}
                                        </div>
                                        <div class="time d-flex align-items">
                                            <div class="datetime">
                                                <i class="mdi mdi-clock-time-four"></i>
                                                {{ item.updatedAt }}
                                            </div>
                                            <div class="view">
                                                <i class="mdi mdi-eye"></i>
                                                {{ item.eyeWatch }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

</template>

<script>
import { useNewStore } from "@/stores/newStore";
import { storeToRefs } from "pinia";
import { onMounted, computed } from "vue";
export default {
    setup() {
        const store = useNewStore();
        const { news } = storeToRefs(store);

        onMounted(() => {
            store.fetchNews(); // Gọi API chỉ khi chưa có dữ liệu
        });

        const filterNews = computed(() => {
            return news.value.filter((item) => item.type === "new");
        });

        const filterChannel = computed(() => {
            return news.value.filter((item) => item.type === "channel");
        });


        // Giới hạn số bài viết hiển thị tối đa là 
        const limitNews = computed(() => {
            return filterNews.value.slice(0, 5);
        });

        const limitChannel = computed(() => {
            return filterChannel.value.slice(0, 5);
        });

        const limitArticle = computed(() => {
            return filterNews.value.slice(1, 5);
        });

        return {
            news: limitNews,
            channels: limitChannel,
            articles: limitArticle
        };
    },

};
</script>

<style>
.article-sale .title {
    display: inline-block;
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 3px solid #3278f6;
    padding-bottom: 3px;
    margin-bottom: 24px;
}

.article-sale .item-sale .image {
    display: block;
    overflow: hidden;
    height: 300px;
    border: 3px solid #ff85c1;
    border-radius: 10px;
}

.article-sale .item-sale img {
    display: block;
    width: 100%;
    height: 100%;
    -o-object-fit: fill;
    object-fit: fill;
    transition: .5s all;
    transform: scale(1);
}

.article-sale .item-sale img:hover {
    transform: scale(1.05);
}

.group-article .title h2 {
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 3px solid #3278f6;
    padding-bottom: 3px;
    display: inline-block;
    margin-bottom: 24px;
}

.item-video .image {
    position: relative;
    display: block;
    width: 160px;
    height: 90px;
    margin-right: 16px;
}

.item-video .image i {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 32px;
    color: #fff;
    z-index: 9;
    opacity: .9;
}

.item-video .image::after {
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    background: #222;
    opacity: .4;
    z-index: 8;
    width: 100%;
    height: 100%;
}

.item-video .image:hover::after {
    opacity: 0;
}

.item-video .image img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
}

.item-video .info {
    width: calc(100% - 170px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.info .name {
    font-size: 18px;
    font-weight: 700;
}

.time {
    color: #8d94ac;
    font-size: 12px;
}

.datetime {
    padding-right: 15px;
    border-right: 1px solid #ccc;
}

.time i {
    margin-right: 5px;
}

.view {
    padding-left: 15px;
}

.item-article .image {
    position: relative;
    display: block;
    width: 160px;
    height: 90px;
    margin-right: 16px;
    overflow: hidden;
}

.item-article .info {
    width: calc(100% - 170px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>