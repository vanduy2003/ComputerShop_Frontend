<template>
    <div class="manage wrappers">
        <AdminSidebar />
        <AdminNavbar />
        <div class="content p-4">
            <h1 class="title text-white">{{ isEdit ? "Cập nhật bài viết" : "Thêm bài viết" }}</h1>
            <div class="btn-controll">
                <button class="btn-creat btn-lish mb-1 p-2 fs-6">
                    <router-link to="/admin/new-list-manage" class="text-white">
                        <v-icon>mdi mdi-package-variant-closed</v-icon>
                        <span>Danh sách bài viết</span>
                    </router-link>
                </button>
            </div>
            <div class="form-add-product">
                <div class="p-4 fs-6">
                    <!-- Tên + Ảnh  -->
                    <div class="row mb-4 ">
                        <div class="item-input col-md-6">
                            <label>Tên bài viết<span>*</span></label>
                            <input type="text" class="form-control" v-model="title" placeholder="Nhập tên bài viết" />
                            <div class="note-error text-danger" v-if="error.title">{{ error.title }}</div>
                        </div>

                        <div class="item-input col-md-6">
                            <label>Ảnh bài viết<span>*</span></label>
                            <input type="text" class="form-control" v-model="thumbnail"
                                placeholder="Nhập link ảnh bài viết" />
                            <div class="note-error text-danger" v-if="error.thumbnail">{{ error.thumbnail }}</div>
                        </div>
                    </div>

                    <div class="row mb-4 ">
                        <div class="item-input col-md-6">
                            <label>Thể loại bài viết<span>*</span></label>
                            <select v-model="type" class="form-select form-control form-control">
                                <option value="null">--- Chọn thể loại bài viết ---</option>
                                <option value="new">Tin Tức</option>
                                <option value="channel">Channel</option>
                            </select>
                            <div class="note-error text-danger" v-if="error.type">{{ error.type
                            }}
                            </div>
                        </div>

                        <div class="item-input col-md-6">
                            <label>Mã Video Channel<span>*</span></label>
                            <input type="text" class="form-control" v-model="codeVideo" :disabled="type !== 'channel'"
                                placeholder="Nhập mã video channel" />
                            <div class="note-error text-danger" v-if="error.codeVideo">{{ error.codeVideo }}</div>
                        </div>

                    </div>

                    <div class="row mb-4 ">
                        <div class="item-input col-md-12    ">
                            <label>Mô tả bài viết<span>*</span></label>
                            <textarea name="" class="form-control" v-model="description"
                                placeholder="Nhập mô tả bài viết"></textarea>
                            <div class="note-error text-danger" v-if="error.description">{{ error.description }}</div>
                        </div>

                        <!-- Content -->
                        <div class="editor-container mt-5">
                            <div class="editor-wrapper">
                                <h3 class="fs-4 fw-semibold">Nội dung bài viết</h3>
                                <div class="note-error text-danger" v-if="error.descHTML">{{
                                    error.descHTML }}</div>
                                <!-- TinyMCE Editor -->
                                <editor api-key="4n6dpjgkw31dad26xeu6w1khe7zndxb400mgoadce0ucr6j0" v-model="descHTML"
                                    :init="{
                                        height: 450,
                                        menubar: false,
                                        plugins: 'image link paste advlist lists',
                                        toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image',
                                        paste_data_images: true
                                    }" />

                            </div>

                            <div class="preview-wrapper mt-3">
                                <h3 class="fs-4 fw-semibold">Xem trước nội dung</h3>
                                <div class="preview-content" v-html="descHTML"></div>
                            </div>
                        </div>

                        <div class="mt-5 text-center">
                            <button type="button" @click="submitForm" class="btn btn-primary fw-semibold">
                                {{ isEdit ? "Cập nhật bài viết" : "Thêm bài viết" }}
                            </button>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import { useNewStore } from "@/stores/newStore";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import Editor from '@tinymce/tinymce-vue';
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import AdminNavbar from "../Dashboard/AdminNavbar.vue";
import AdminSidebar from "../Dashboard/AdminSidebar.vue";


export default {
    components: { Editor, AdminNavbar, AdminSidebar },

    props: {
        isEdit: {
            type: Boolean,
            default: false, // ✅ Đảm bảo luôn có giá trị mặc định
        },
        id: String // ID sản phẩm (chỉ khi edit)
    },

    setup(props) {
        const userStore = useUserStore();
        const { user } = storeToRefs(userStore);
        const newsStore = useNewStore();
        const { newCurrent } = storeToRefs(newsStore);
        const router = useRouter();
        const toast = useToast();



        // ✅ Dữ liệu bài viết
        const title = ref("");
        const thumbnail = ref("");
        const type = ref("");
        const description = ref("");
        const descHTML = ref("");
        const error = ref({});
        const codeVideo = ref("");

        // ✅ Lấy dữ liệu bài viết cần chỉnh sửa
        onMounted(async () => {
            if (props.isEdit) {

                const newId = props.id;
                await newsStore.fetchNewDataByID(newId);

                // Gán dữ liệu vào form
                title.value = newCurrent.value.title;
                thumbnail.value = newCurrent.value.thumbnail;
                type.value = newCurrent.value.type;
                description.value = newCurrent.value.description;
                descHTML.value = newCurrent.value.content;
                codeVideo.value = newCurrent.value.videoUrl;

            }
        });


        watch(type, (newType) => {
            if (newType !== "channel") {
                codeVideo.value = ""; // Reset giá trị nếu không phải Channel
            }
        });

        const newArticle = computed(() => ({
            newId: props.isEdit ? props.id : null,
            title: title.value,
            thumbnail: thumbnail.value,
            type: type.value,
            description: description.value,
            content: descHTML.value,
            authorId: user.value.userId,
            videoUrl: codeVideo.value
        }));

        const validateForm = () => {
            error.value = {};
            if (!title.value) error.value.title = "Vui lòng nhập tên bài viết!";
            if (!thumbnail.value) error.value.thumbnail = "Vui lòng nhập link ảnh!";
            if (!type.value) error.value.type = "Vui lòng chọn thể loại!";
            if (!descHTML.value) error.value.descHTML = "Vui lòng nhập nội dung bài viết!";
            return Object.keys(error.value).length === 0;
        };

        const submitForm = async () => {

            if (!validateForm()) {
                toast.error("Vui lòng kiểm tra lại thông tin!");
                return;
            }

            if (props.isEdit) {

                const success = await newsStore.updateNews(newArticle.value);

                if (success) {
                    toast.success("Cập nhật bài viết thành công!");
                    router.push("/admin/new-list-manage");
                } else {
                    toast.error("Lỗi khi cập nhật bài viết!");
                }
            } else {
                const result = await newsStore.addNews(newArticle.value);
                if (result) {
                    toast.success("Thêm bài viết thành công!");
                    title.value = "";
                    thumbnail.value = "";
                    type.value = "";
                    description.value = "";
                    descHTML.value = "";
                    codeVideo.value = "";
                } else {
                    toast.error("Lỗi khi thêm bài viết!");
                }
            }
        };


        return {
            title,
            thumbnail,
            type,
            description,
            descHTML,
            error,
            submitForm,
            codeVideo
        };
    },
};

</script>