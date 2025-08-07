// stores/componentStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

export const useComponentStore = defineStore("component", () => {
    const components = ref([]); // Danh sách linh kiện
    const error = ref(null);

    // 🟢 Lấy danh sách tất cả linh kiện
    const fetchComponent = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/v1/data/components"
            );
            components.value = response.data;
            console.log("components", components.value);
        } catch (err) {
            error.value = "Không thể tải dữ liệu sản phẩm";
            console.error(err);
        }
    };

    // 🟢 Thêm linh kiện mới
    const addComponent = async (component) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/data/components/add-component",
                component
            );
            // Hiển thị thông báo thành công
            Swal.fire({
                icon: "success",
                title: "Thành công",
                text: "Thêm linh kiện thành công",
                showConfirmButton: false,
                timer: 1500,
            });

            if (response.data.success) {
                const newComponent = response.data.component;
                if (
                    !newComponent ||
                    !newComponent.componentId ||
                    !newComponent.name
                ) {
                    console.error("Dữ liệu trả về không hợp lệ:", newComponent);
                    return;
                }
                // ✅ Thêm trực tiếp vào danh sách để cập nhật ngay lập tức
                components.value.unshift(newComponent);
            }
        } catch (err) {
            error.value = "Không thể thêm linh kiện";
            console.error(err);
        }
    };

    // 🟢 Cập nhật linh kiện
    const updateComponent = async (component) => {
        try {
            const response = await axios.put(
                `http://localhost:3000/api/v1/data/components/update-component/${component.componentId}`,
                component
            );
            // Hiển thị thông báo thành công
            Swal.fire({
                icon: "success",
                title: "Thành công",
                text: "Cập nhật linh kiện thành công",
                showConfirmButton: false,
                timer: 1500,
            });

            if (response.data.success) {
                const updatedComponent = response.data.component;
                if (
                    !updatedComponent ||
                    !updatedComponent.componentId ||
                    !updatedComponent.name
                ) {
                    console.error(
                        "Dữ liệu trả về không hợp lệ:",
                        updatedComponent
                    );
                    return;
                }
                await fetchComponent(); // Cập nhật lại danh sách linh kiện
            }
        } catch (err) {
            error.value = "Không thể cập nhật linh kiện";
            console.error(err);
        }
    };

    // 🟢 Xóa linh kiện
    const deleteComponent = async (componentId) => {
        // Hiển thị thông báo xác nhận trước khi xóa
        const result = await Swal.fire({
            title: "Bạn có chắc chắn muốn xóa linh kiện này không?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Có, xóa ngay!",
            cancelButtonText: "Hủy",
        });

        if (!result.isConfirmed) return;

        try {
            const response = await axios.delete(
                `http://localhost:3000/api/v1/data/components/delete-component/${componentId}`
            );

            // 🟢 Hiển thị thông báo thành công
            Swal.fire({
                icon: "success",
                title: "Đã xóa",
                text: "Xóa linh kiện thành công!",
                showConfirmButton: false,
                timer: 1500,
            });

            // 🧹 Cập nhật danh sách sau khi xóa
            if (response.data.success) {
                components.value = components.value.filter(
                    (component) => component.componentId !== componentId
                );
            }
        } catch (err) {
            console.error("Lỗi xóa linh kiện:", err);

            // 🟥 Trường hợp linh kiện đang được sử dụng trong sản phẩm
            if (
                err.response &&
                err.response.data &&
                err.response.data.errorCode === "ER_ROW_IS_REFERENCED_2"
            ) {
                Swal.fire({
                    icon: "error",
                    title: "Không thể xóa",
                    text: "Linh kiện này đang được sử dụng trong một số sản phẩm. Vui lòng xóa hoặc cập nhật sản phẩm trước.",
                });
            } else {
                // 🔧 Lỗi khác (mạng, server, v.v.)
                Swal.fire({
                    icon: "error",
                    title: "Lỗi",
                    text: "Không thể xóa linh kiện. Vui lòng thử lại.",
                });
            }
        }
    };

    return {
        components,
        error,
        fetchComponent,
        addComponent,
        updateComponent,
        deleteComponent,
    };
});
