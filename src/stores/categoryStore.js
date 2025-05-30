import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export const useCategoryStore = defineStore("category", () => {
    const categorys = ref([]); // Danh sách danh mục
    const error = ref(null);

    // 🟢 Lấy danh sách tất cả danh mục
    const fetchCategory = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/v1/data/category"
            );

            // ✅ Cập nhật lại toàn bộ danh sách với dữ liệu mới nhất
            categorys.value = response.data.map((category) => ({
                ...category,
                createdAt: dayjs(category.createdAt).format(
                    "DD/MM/YYYY, HH:mm A"
                ),
            }));

            console.log("categorys", categorys.value);
        } catch (err) {
            error.value = "Không thể tải dữ liệu danh mục";
            console.error(err);
        }
    };

    // 🟢 Thêm danh mục mới
    const addCategory = async (category) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/data/category/add-category",
                category
            );

            const confirm = await Swal.fire({
                title: "Thêm danh mục thành công",
                icon: "success",
                confirmButtonText: "OK",
            });

            if (!confirm.isConfirmed) {
                return;
            }

            const newCategory = response.data;
            if (!newCategory || !newCategory.categoryId || !newCategory.name) {
                console.error("Dữ liệu trả về không hợp lệ:", newCategory);
                return;
            }

            // ✅ Thêm trực tiếp vào danh sách để cập nhật ngay lập tức
            categorys.value.unshift({
                ...newCategory,
                createdAt: dayjs(newCategory.createdAt).format(
                    "DD/MM/YYYY, HH:mm A"
                ),
            });
        } catch (err) {
            error.value = "Không thể thêm danh mục mới";
            console.error(err);
        }
    };

    // 🟢 Cập nhật danh mục
    const updateCategory = async (category) => {
        try {
            await axios.put(
                `http://localhost:3000/api/v1/data/category/update-category/${category.categoryId}`,
                category
            );

            const confirm = await Swal.fire({
                title: "Cập nhật danh mục thành công",
                icon: "success",
                confirmButtonText: "OK",
            });

            if (!confirm.isConfirmed) {
                return;
            }

            // ✅ Cập nhật danh mục trong danh sách mà không cần gọi API lại
            const index = categorys.value.findIndex(
                (item) => item.categoryId === category.categoryId
            );
            if (index !== -1) {
                categorys.value[index] = {
                    ...category,
                    createdAt: dayjs(category.createdAt).format(
                        "DD/MM/YYYY, HH:mm A"
                    ),
                };
            }
            await fetchCategory();
        } catch (err) {
            error.value = "Không thể cập nhật danh mục";
            console.error(err);
        }
    };

    // Xóa danh mục
    const deleteCategory = async (categoryId) => {
        const result = await Swal.fire({
            title: "Bạn có chắc chắn muốn xóa danh mục này không?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Có, chắc chắn!",
            cancelButtonText: "Hủy",
        });
        if (!result.isConfirmed) {
            return;
        }

        try {
            await axios.delete(
                `http://localhost:3000/api/v1/data/category/delete-category/${categoryId}`
            );

            // 🔥 Xóa danh mục trực tiếp trong danh sách mà không cần gọi API lại
            categorys.value = categorys.value.filter(
                (category) => category.categoryId !== categoryId
            );
            return true;
        } catch (err) {
            error.value = "Không thể xóa danh mục";
            console.error(err);
        }
    };

    return {
        categorys,
        error,
        fetchCategory,
        addCategory,
        updateCategory,
        deleteCategory,
    };
});
