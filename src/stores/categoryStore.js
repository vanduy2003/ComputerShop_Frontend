import { defineStore } from "pinia";
import axios from "axios";

const useCategoryStore = defineStore("category", {
    state: () => ({
        categorys: [], // Danh sách danh mục
    }),

    actions: {
        // 🟢 Lấy danh sách tất cả bài viết
        async fetchCategory() {
            if (this.categorys.length > 0) return; // Nếu đã có dữ liệu, không gọi lại API

            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/data/category"
                );

                this.categorys = response.data;
                console.log("categorys", this.categorys);
            } catch (error) {
                this.error = "Không thể tải dữ liệu sản phẩm";
                console.error(error);
            }
        },
    },
});

export { useCategoryStore };
