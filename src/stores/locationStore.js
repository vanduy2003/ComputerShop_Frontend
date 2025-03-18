import { defineStore } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";

export const useLocationStore = defineStore("location", () => {
    const provinces = ref([]);
    const districts = ref([]);
    const wards = ref([]);

    const selectedProvince = ref(null);
    const selectedDistrict = ref(null);
    const selectedWard = ref(null);

    // Lấy danh sách tỉnh/thành phố
    const fetchProvinces = async () => {
        try {
            const { data } = await axios.get(
                "https://provinces.open-api.vn/api/p/"
            );
            provinces.value = data;
        } catch (error) {
            console.error("Lỗi tải danh sách tỉnh/thành phố:", error);
        }
    };

    // Lấy danh sách quận/huyện khi chọn tỉnh
    const fetchDistricts = async (provinceCode) => {
        try {
            if (!provinceCode) return;
            const { data } = await axios.get(
                `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
            );
            districts.value = data.districts;
        } catch (error) {
            console.error("Lỗi tải danh sách quận/huyện:", error);
        }
    };

    // Lấy danh sách phường/xã khi chọn huyện
    const fetchWards = async (districtCode) => {
        try {
            if (!districtCode) return;
            const { data } = await axios.get(
                `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
            );
            wards.value = data.wards;
        } catch (error) {
            console.error("Lỗi tải danh sách phường/xã:", error);
        }
    };

    // Khi chọn tỉnh, load danh sách quận/huyện
    watch(selectedProvince, (newProvince) => {
        districts.value = [];
        wards.value = [];
        selectedDistrict.value = null;
        selectedWard.value = null;
        if (newProvince) fetchDistricts(newProvince.code);
    });

    // Khi chọn quận/huyện, load danh sách xã/phường
    watch(selectedDistrict, (newDistrict) => {
        wards.value = [];
        selectedWard.value = null;
        if (newDistrict) fetchWards(newDistrict.code);
    });

    return {
        provinces,
        districts,
        wards,
        selectedProvince,
        selectedDistrict,
        selectedWard,
        fetchProvinces,
    };
});
