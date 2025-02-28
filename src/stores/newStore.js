import { defineStore } from "pinia";
import axios from "axios";
import dayjs from "dayjs";

const useNewStore = defineStore("new", {
    state: () => ({
        news: [], // Danh sách bai viết
        newCurrent: {}, // bai viet đang xem
        loading: false,
        error: null,
    }),

    actions: {
        // 🟢 Lấy danh sách tất cả bài viết
        async fetchNews() {
            if (this.news.length > 0) return; // Nếu đã có dữ liệu, không gọi lại API

            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/data/news"
                );

                // format ngày tháng
                this.news = response.data.map((newItem) => {
                    return {
                        ...newItem,
                        updatedAt: dayjs(newItem.updatedAt).format(
                            "DD/MM/YYYY, HH:mm A"
                        ),
                    };
                });
            } catch (error) {
                this.error = "Không thể tải dữ liệu sản phẩm";
                console.error(error);
            } finally {
                this.loading = false;
            }
        },

        // 🟢 Lấy thông tin sản phẩm theo ID
        async fetchNewDataID(newId) {
            newId = Number(newId); // Ép kiểu để tránh lỗi so sánh

            // 🛑 Nếu sản phẩm đã được load và đúng ID, không gọi API nữa
            if (this.newCurrent && this.newCurrent.newId === newId) return;

            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/v1/data/news/${newId}`
                );
                if (!response.data || response.data.length === 0) {
                    throw new Error("Không có dữ liệu sản phẩm");
                }

                // format ngày tháng
                let newCurrent = response.data[0];
                newCurrent.updatedAt = dayjs(newCurrent.updatedAt).format(
                    "DD/MM/YYYY, HH:mm A"
                );

                this.newCurrent = newCurrent;
            } catch (error) {
                this.error = "Không thể tải sản phẩm";
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
    },
});

export { useNewStore };
