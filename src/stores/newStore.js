import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import dayjs from "dayjs";

export const useNewStore = defineStore("news", () => {
    const news = ref([]); // Danh sách bài viết
    const newCurrent = ref({}); // Bài viết đang xem
    const loading = ref(false);
    const error = ref(null);

    // 🟢 Lấy danh sách tất cả bài viết
    const fetchNews = async () => {
        loading.value = true;
        error.value = null;
        try {
            const response = await axios.get(
                "http://localhost:3000/api/v1/data/news"
            );

            // Format ngày tháng
            news.value = response.data.map((newItem) => ({
                ...newItem,
                updatedAt: dayjs(newItem.updatedAt).format(
                    "DD/MM/YYYY, HH:mm A"
                ),
            }));
        } catch (err) {
            error.value = "Không thể tải dữ liệu bài viết";
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    // 🟢 Lấy thông tin bài viết theo ID
    const fetchNewDataByID = async (newId) => {
        newId = Number(newId);

        newCurrent.value = {}; // 🔄 Reset trước khi gọi API

        loading.value = true;
        error.value = null;
        try {
            const response = await axios.get(
                `http://localhost:3000/api/v1/data/news/${newId}`
            );

            if (!response.data) {
                throw new Error("Không có dữ liệu bài viết");
            }

            newCurrent.value = {
                ...response.data[0],
                updatedAt: dayjs(response.data[0].updatedAt).format(
                    "DD/MM/YYYY, HH:mm A"
                ),
            };
        } catch (err) {
            error.value = "Không thể tải bài viết";
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    // 🟢 Thêm bài viết mới
    const addNews = async (newData) => {
        try {
            console.log("Gửi API với dữ liệu:", newData);
            const response = await axios.post(
                "http://localhost:3000/api/v1/data/news/add-new",
                newData
            );
            console.log("Kết quả API:", response.data);

            if (response.data.success) {
                this.news.unshift(response.data.newArticle);
                return { success: true };
            } else {
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            console.error("❌ Lỗi khi thêm bài viết:", error);
            return { success: false, message: "Lỗi server" };
        }
    };

    // 🟢 Cập nhật bài viết
    const updateNews = async (newData) => {
        try {
            console.log("Gửi API cập nhật với dữ liệu:", newData);
            const response = await axios.put(
                `http://localhost:3000/api/v1/data/news/${newData.newId}`,
                newData
            );

            if (response.data.success) {
                fetchNews(); // Lấy lại danh sách bài viết
                return true;
            } else {
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            console.error("❌ Lỗi khi cập nhật bài viết:", error);
            return { success: false, message: "Lỗi server" };
        }
    };

    const deleteNews = async (newId) => {
        try {
            const response = await axios.delete(
                `http://localhost:3000/api/v1/data/news-delete/${newId}`
            );
            if (response.status === 200) {
                fetchNews(); // Cập nhật danh sách bài viết
                return true;
            }
        } catch (err) {
            error.value = "Không thể xóa bài viết";
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    return {
        news,
        newCurrent,
        loading,
        error,
        fetchNews,
        fetchNewDataByID,
        addNews,
        updateNews,
        deleteNews,
    };
});
