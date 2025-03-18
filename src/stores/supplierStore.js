import { defineStore } from "pinia";
import axios from "axios";

const useSupplierStore = defineStore(" supplier", {
    state: () => ({
        suppliers: [], // Danh sách danh mục
    }),

    actions: {
        // 🟢 Lấy danh sách tất cả bài viết
        async fetchSupplier() {
            if (this.suppliers.length > 0) return; // Nếu đã có dữ liệu, không gọi lại API

            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/data/suppliers"
                );

                this.suppliers = response.data;
                console.log("supplier", this.suppliers);
            } catch (error) {
                this.error = "Không thể tải dữ liệu sản phẩm";
                console.error(error);
            }
        },
    },
});

export { useSupplierStore };
