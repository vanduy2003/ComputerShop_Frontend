<template>
    <section class="category">
        <div class="list-category-featured mt-4">
            <div class="background-white container">
                <h2 class="title">Danh mục nổi bật</h2>
                <div class="list">

                    <div v-if="categories.length > 0" class="row  d-flex flex-wrap">
                        <router-link :to="`/category/${category.categoryId}`" class="col-md-3 col-sm-6 item"
                            v-for="category in categories" :key="category.categoryId">
                            <div class="txt">
                                <div class="name line-clamp-1">
                                    {{ category.name }}
                                </div>
                                <span class="note line-clamp-1">
                                    <p>{{ category.description }}</p>
                                </span>
                            </div>
                            <div class="img">
                                <img :src="category.imageUrl" alt="PC gaming" width="100%" height="100%" />
                            </div>
                        </router-link>
                    </div>

                    <div v-else>
                        <h4 class="text-center p-5">Dữ liệu đang được cập nhật... Bạn chờ trong giây lát!!!</h4>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            categories: [],
        };
    },
    mounted() {
        this.fetchDataCategory();
    },
    methods: {

        async fetchDataCategory() {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/data/category');
                this.categories = response.data;
            } catch (error) {
                console.error(error);
            }
        },
    },
}
</script>

<style scoped>
.background-white {
    background: #ffffff;
    padding: 24px;
}

.list-category-featured .title {
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 3px solid #3278f6;
    padding-bottom: 3px;
    display: inline-block;
    margin-bottom: 24px;
}



.list-category-featured .item {

    padding: 16px;
    border: 1px solid #ccc;
    position: relative;
}

.list-category-featured .txt {
    position: relative;
    margin-bottom: 16px;
    z-index: 99;
    color: #29324e;
}

.list-category-featured .txt .name {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
}

.list-category-featured .txt .note {
    display: block;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
}

.list-category-featured img {
    width: 105px;
    margin: 0 auto;
    display: block;
    -o-object-fit: contain;
    object-fit: contain;
}

.list-category-featured .item::before {
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    width: 0;
    height: 100%;
    background: #8d94ac;
    -webkit-clip-path: polygon(0 0, 100% 0, 65% 100%, 0% 100%);
    clip-path: polygon(0 0, 100% 0, 65% 100%, 0% 100%);
    transition: .4s;
}

.list-category-featured .item:hover:nth-child(1)::before {
    background: #5188ff;
}

.list-category-featured .item:hover::before {
    width: 100px;
}

.list-category-featured .item:hover:nth-child(2)::before {
    background: #72f5cb;
}

.list-category-featured .item:hover:nth-child(3)::before {
    background: #e4fb49;
}

.list-category-featured .item:hover:nth-child(4)::before {
    background: #e520ff;
}

.list-category-featured .item:hover:nth-child(5)::before {
    background: #ff1b3d;
}

.list-category-featured .item:hover:nth-child(6)::before {
    background: #2dff11;
}

.list-category-featured .item:hover:nth-child(7)::before {
    background: #b8ffe4;
}

.list-category-featured .item:hover:nth-child(8)::before {
    background: #ff950b;
}
</style>