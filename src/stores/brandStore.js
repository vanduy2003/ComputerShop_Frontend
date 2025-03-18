import { defineStore } from "pinia";
import axios from "axios";

const useBrandStore = defineStore("brand", {
    state: () => ({
        brands: [], // Danh sách danh mục
    }),

    actions: {
        // 🟢 Lấy danh sách tất cả bài viết
        async fetchBrand() {
            if (this.brands.length > 0) return; // Nếu đã có dữ liệu, không gọi lại API

            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/data/brands"
                );

                this.brands = response.data;
                console.log("brands", this.brands);
            } catch (error) {
                this.error = "Không thể tải dữ liệu sản phẩm";
                console.error(error);
            }
        },
    },
});

export { useBrandStore };
