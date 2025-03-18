<template>
    <v-overlay v-model="localLoading" class="d-flex justify-center align-center">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </v-overlay>
</template>

<script>
import { computed } from "vue";

export default {
    props: {
        isLoading: Boolean,
    },
    setup(props) {
        // Tạo một biến computed dựa trên props để tránh thay đổi trực tiếp
        const localLoading = computed(() => props.isLoading);

        return { localLoading };
    },
};
</script>
