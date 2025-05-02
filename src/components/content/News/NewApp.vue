<template>
    <div class="new-app">
        <div class="box-related-news background-white ">
            <div class="d-flex align-items-center justify-content-between">
                <h2 class="title">Tin tức liên quan</h2>
                <span class="more-all d-flex align-items-center cursor-pointer">
                    Xem tất cả <i class="mdi mdi-arrow-right"></i>
                </span>
            </div>
            <div class="list-related mt-3" id="js-list-related">

                <div v-for="item in news" :key="item.newId" class="item-article d-flex mb-3">
                    <router-link :to="`/new/${item.newId}`" class="image">

                        <img :src="item.thumbnail" width="100%" height="100%"
                            alt="Hướng Dẫn Cách Mua Game Trên Steam Chi Tiết">

                    </router-link>
                    <div class="info">
                        <h3 class="name line-clamp-2"><router-link :to="`/new/${item.newId}`">
                                {{ item.title }}
                            </router-link></h3>
                        <div class="summary line-clamp-2">
                            {{ item.description }}
                        </div>
                        <div class="time d-flex align-items-center">
                            <div class="datetime">
                                <i class="mdi mdi-clock-time-four me-1"></i> {{ item.updatedAt }}
                            </div>
                            <div class="view">
                                <i class="mdi mdi-eye ms-3"></i> 3
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import { useNewStore } from "@/stores/newStore";
import { storeToRefs } from "pinia";
import { onMounted, computed } from "vue";


export default {
    props: {
        currentId: {
            type: Number,
            required: true
        },
        currentType: {
            type: String,
            required: true
        }
    },

    setup(props) {
        const store = useNewStore();
        const { news } = storeToRefs(store);


        onMounted(() => {
            store.fetchNews();
        });

        // Lọc tin tức, bỏ bài viết đang xem
        const filteredNews = computed(() => {
            return news.value
                .filter(item => item.type === props.currentType && item.newId !== props.currentId)
                .slice(0, 6);
        });


        return {
            news: filteredNews
        }
    }
}
</script>

<style scoped>
.new-app .title {
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 3px solid #3278f6;
    padding-bottom: 3px;
    display: inline-block;
    margin-bottom: 24px;
}

.item-article .image {
    width: 140px;
    position: relative;
    display: block;
    height: 90px;
    margin-right: 16px;
    overflow: hidden;
}

.item-article .image img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -o-object-fit: fill;
    object-fit: fill;
    transition: .5s all;
    transform: scale(1);
}

.box-related-news .item-article .info {
    width: calc(100% - 150px);
}

.item-article .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.item-article .name {
    font-size: 16px;
    font-weight: 600;
    color: black;
}

.item-article .image img:hover {
    transition: .5s all;
    transform: scale(1.08);
}

.item-article .time {
    color: #8d94ac;
    font-size: 12px;
    margin-top: 5px;
}

.item-article .datetime {
    padding-right: 15px;
    border-right: 1px solid #ccc;
}
</style>