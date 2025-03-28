import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import dayjs from "dayjs";

export const useSupplierStore = defineStore("supplier", () => {
    const suppliers = ref([]); // Danh sách nhà cung cấp

    // Hàm gọi API để lấy danh sách nhà cung cấp
    const fetchSupplier = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/v1/data/suppliers"
            );
            suppliers.value = response.data.map((supplier) => ({
                ...supplier,
                updatedAt: dayjs(supplier.updatedAt).format(
                    "DD/MM/YYYY, HH:mm A"
                ),
            }));
        } catch (error) {
            console.error("Không thể tải dữ liệu nhà cung cấp:", error);
        }
    };

    // Thêm nhà cung cấp mới
    const addSupplier = async (supplier) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/data/suppliers/add-supplier",
                supplier
            );

            if (response.data.success && response.data.newSupplier) {
                suppliers.value.unshift(response.data.newSupplier);
                return true;
            } else {
                console.error("⚠️ Dữ liệu trả về không hợp lệ:", response.data);
                return false;
            }
        } catch (error) {
            console.error("🚨 Lỗi khi thêm nhà cung cấp:", error);
            return false;
        }
    };

    // Sửa nhà cung cấp
    const updateSupplier = async (supplier) => {
        try {
            const response = await axios.put(
                `http://localhost:3000/api/v1/data/suppliers/update-supplier/${supplier.supplierId}`,
                supplier
            );

            if (response.data.success) {
                const index = suppliers.value.findIndex(
                    (item) => item.supplierId === supplier.supplierId
                );
                suppliers.value[index] = supplier;
                return true;
            } else {
                console.error("⚠️ Dữ liệu trả về không hợp lệ:", response.data);
                return false;
            }
        } catch (error) {
            console.error("🚨 Lỗi khi sửa nhà cung cấp:", error);
            return false;
        }
    };

    // Xóa nhà cung cấp
    const deleteSupplier = async (supplierId) => {
        try {
            const response = await axios.delete(
                `http://localhost:3000/api/v1/data/suppliers/delete-supplier/${supplierId}`
            );

            if (response.data.success) {
                suppliers.value = suppliers.value.filter(
                    (supplier) => supplier.supplierId !== supplierId
                );
                return true;
            } else {
                console.error("⚠️ Dữ liệu trả về không hợp lệ:", response.data);
                return false;
            }
        } catch (error) {
            console.error("🚨 Lỗi khi xóa nhà cung cấp:", error);
            return false;
        }
    };

    return {
        suppliers,
        fetchSupplier,
        addSupplier,
        updateSupplier,
        deleteSupplier,
    };
});
