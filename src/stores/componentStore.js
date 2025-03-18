import { defineStore } from "pinia";
import axios from "axios";

const useComponentStore = defineStore("component", {
    state: () => ({
        components: [], // Danh sách danh mục
    }),

    actions: {
        // 🟢 Lấy danh sách tất cả bài viết
        async fetchComponent() {
            if (this.components.length > 0) return; // Nếu đã có dữ liệu, không gọi lại API

            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/data/components"
                );

                this.components = response.data;
                console.log("components", this.components);
            } catch (error) {
                this.error = "Không thể tải dữ liệu sản phẩm";
                console.error(error);
            }
        },
    },
});

export { useComponentStore };
