<template>
    <div class="customer-review">
        <div class="box-review background-white mt-4" id="review">
            <h2 class="title fs-5 fw-semibold">Đánh giá của khách hàng</h2>

            <div class="content-form-review">
                <div class="review-info d-flex align-items-center m-4">
                    <div class="box-avgRate">
                        <div class="avgRate d-flex justify-content-center align-items-center">
                            <span>5</span><i class="mdi mdi-star-shooting ms-1 fs-2"></i>
                        </div>
                    </div>
                    <div class="box-avg-rate-count">
                        <div class="avg-rate-item">
                            <span class="rate-number">5 <i class="mdi mdi-star fs-5 ms-1"></i></span>
                            <div class="box-percent">
                                <div class="percent percent5" style="width: 100%"></div>
                            </div>
                            <span class="total-avg-rate" title="Xem các đánh giá này">100%</span>
                        </div>
                        <div class="avg-rate-item">
                            <span class="rate-number">4 <i class="mdi mdi-star fs-5 ms-1"></i></span>
                            <div class="box-percent">
                                <div class="percent percent5" style="width: 0%"></div>
                            </div>
                            <span class="total-avg-rate" title="Xem các đánh giá này">0%</span>
                        </div>
                        <div class="avg-rate-item">
                            <span class="rate-number">3 <i class="mdi mdi-star fs-5 ms-1"></i></span>
                            <div class="box-percent">
                                <div class="percent percent5" style="width: 0%"></div>
                            </div>
                            <span class="total-avg-rate" title="Xem các đánh giá này">0%</span>
                        </div>
                        <div class="avg-rate-item">
                            <span class="rate-number">2 <i class="mdi mdi-star fs-5 ms-1"></i></span>
                            <div class="box-percent">
                                <div class="percent percent5" style="width: 0%"></div>
                            </div>
                            <span class="total-avg-rate" title="Xem các đánh giá này">0%</span>
                        </div>
                        <div class="avg-rate-item">
                            <span class="rate-number">1 <i class="mdi mdi-star fs-5 ms-1"></i></span>
                            <div class="box-percent">
                                <div class="percent percent5" style="width: 0%"></div>
                            </div>
                            <span class="total-avg-rate" title="Xem các đánh giá này">0%</span>
                        </div>
                    </div>
                    <div class="button-review">
                        <a href="javascript:;" id="js-show-review" class="btn-review"
                            onclick="show_form_review();"><span class="hover-txt">Viết đánh giá</span></a>
                    </div>
                </div>
                <!----info review--->

                <div class="list-review"
                    :style="{ height: expanded ? 'auto' : '510px', overflow: expanded ? 'visible' : 'hidden' }">
                    <!---load ajax--->

                    <div class="item-user-review item-review">
                        <div class="name-info d-flex align-items-center">
                            <b>Quốc Huy </b>
                            <i class="icon-star star5"></i>
                        </div>
                        <div class="content-info">
                            <p>Dân edit đã thấy và chốt đơn lẹ</p>
                            <div class="action-reply">
                                <a href="javascript:void(0)" class="click-reply" onclick="show_form_reply(5011)">Phản
                                    hồi</a>
                                <span class="time">28/12/2024</span>
                            </div>
                        </div>

                        <div class="box-list-reply" id="list-reply-5011">
                            <div class="item-review">
                                <div class="name-info d-flex">
                                    <img src="./TNC.png" width="14px" height="14px" alt="avatar" />
                                    <b>TNC Store</b>
                                </div>
                                <div class="content-info">
                                    <p>TNC Store cảm ơn bạn đã mua hàng ạ</p>
                                    <div class="action-reply">
                                        <!--<a href="javascript:void(0)" class="click-reply" onclick="show_form_reply(1253)">Phản hồi</a>-->
                                        <span class="time" style="padding-left: 0">28/12/2024</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!---end reply -->


                    </div>

                    <div class="item-user-review item-review">
                        <div class="name-info d-flex align-items-center">
                            <b>Nguyen Thao </b>
                            <i class="icon-star star5"></i>
                        </div>
                        <div class="content-info">
                            <p>PC y ảnh luôn, linh kiện cũng vậy</p>
                            <div class="action-reply">
                                <a href="javascript:void(0)" class="click-reply" onclick="show_form_reply(4953)">Phản
                                    hồi</a>
                                <span class="time">19/12/2024</span>
                            </div>
                        </div>

                        <div class="box-list-reply" id="list-reply-4953"></div>
                        <!---end reply -->


                    </div>

                    <div class="item-user-review item-review">
                        <div class="name-info d-flex align-items-center">
                            <b>Songon</b>
                            <i class="icon-star star5"></i>
                        </div>
                        <div class="content-info">
                            <p>
                                pc đẹ[, chạy mượt, giá này khá rẻ, mới dùng kcg
                                để chê
                            </p>
                            <div class="action-reply">
                                <a href="javascript:void(0)" class="click-reply" onclick="show_form_reply(4892)">Phản
                                    hồi</a>
                                <span class="time">9/12/2024</span>
                            </div>
                        </div>

                        <div class="box-list-reply" id="list-reply-4892">
                            <div class="item-review">
                                <div class="name-info d-flex">
                                    <img src="./TNC.png" width="14px" height="14px" alt="avatar" />
                                    <b>TNC Store</b>
                                </div>
                                <div class="content-info">
                                    <p>TNC Store cảm ơn bạn đã mua hàng ạ</p>
                                    <div class="action-reply">
                                        <!--<a href="javascript:void(0)" class="click-reply" onclick="show_form_reply(1170)">Phản hồi</a>-->
                                        <span class="time" style="padding-left: 0">11/12/2024</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <!---end reply -->


                    </div>

                    <div class="item-user-review item-review">
                        <div class="name-info d-flex align-items-center">
                            <b>Chúi </b>
                            <i class="icon-star star5"></i>
                        </div>
                        <div class="content-info">
                            <p>10/10 chất lượng cực tốt</p>
                            <div class="action-reply">
                                <a href="javascript:void(0)" class="click-reply" onclick="show_form_reply(4848)">Phản
                                    hồi</a>
                                <span class="time">2/12/2024</span>
                            </div>
                        </div>

                        <div class="box-list-reply" id="list-reply-4848">
                            <div class="item-review">
                                <div class="name-info d-flex">
                                    <img src="./TNC.png" width="14px" height="14px" alt="avatar" />
                                    <b>TNC Store</b>
                                </div>
                                <div class="content-info">
                                    <p>TNC Store cảm ơn bạn đã mua hàng ạ</p>
                                    <div class="action-reply">
                                        <!--<a href="javascript:void(0)" class="click-reply" onclick="show_form_reply(1144)">Phản hồi</a>-->
                                        <span class="time" style="padding-left: 0">3/12/2024</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <!---end reply -->


                    </div>

                    <div class="item-user-review item-review">
                        <div class="name-info d-flex align-items-center">
                            <b>yencutie</b>
                            <i class="icon-star star5"></i>
                        </div>
                        <div class="content-info">
                            <p>công nhận dùng thích thật, cấu hình ổn</p>
                            <div class="action-reply">
                                <a href="javascript:void(0)" class="click-reply" onclick="show_form_reply(4815)">Phản
                                    hồi</a>
                                <span class="time">28/11/2024</span>
                            </div>
                        </div>

                        <div class="box-list-reply" id="list-reply-4815">
                            <div class="item-review">
                                <div class="name-info d-flex">
                                    <img src="./TNC.png" width="14px" height="14px" alt="avatar" />
                                    <b>TNC Store</b>
                                </div>
                                <div class="content-info">
                                    <p>TNC Store cảm ơn bạn đã mua hàng ạ</p>
                                    <div class="action-reply">
                                        <!--<a href="javascript:void(0)" class="click-reply" onclick="show_form_reply(1120)">Phản hồi</a>-->
                                        <span class="time" style="padding-left: 0">28/11/2024</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <!---end reply -->


                    </div>

                    <div class="item-user-review item-review">
                        <div class="name-info d-flex align-items-center">
                            <b>Nguyễn Đức Hưng</b>
                            <i class="icon-star star5"></i>
                        </div>
                        <div class="content-info">
                            <p>Có AIO Cooler à shop?</p>
                            <div class="action-reply">
                                <a href="javascript:void(0)" class="click-reply" onclick="show_form_reply(4803)">Phản
                                    hồi</a>
                                <span class="time">26/11/2024</span>
                            </div>
                        </div>

                        <div class="box-list-reply" id="list-reply-4803"></div>
                        <!---end reply -->


                    </div>

                    <div class="item-user-review item-review">
                        <div class="name-info d-flex align-items-center">
                            <b>Ninh Bích </b>
                            <i class="icon-star star5"></i>
                        </div>
                        <div class="content-info">
                            <p>Cho mình xin video tổng quát sản phẩm nhé</p>
                            <div class="action-reply">
                                <a href="javascript:void(0)" class="click-reply" onclick="show_form_reply(4637)">Phản
                                    hồi</a>
                                <span class="time">29/10/2024</span>
                            </div>
                        </div>

                        <div class="box-list-reply" id="list-reply-4637"></div>
                        <!---end reply -->


                    </div>
                </div>
                <input type="hidden" id="current_page_review" value="1" />

                <button @click="toggleContent" class="btn-toggle mt-3">
                    {{ expanded ? 'Thu nhỏ' : 'Xem thêm' }}<i class="mdi mdi-chevron-down ms-2"></i>
                </button>
            </div>





        </div>
    </div>

</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const expanded = ref(false);

        const toggleContent = () => {
            expanded.value = !expanded.value;
        };

        return {
            expanded,
            toggleContent,
        };
    },
}
</script>

<style scoped>
.box-avgRate {
    width: 160px;
    height: 116px;
    line-height: 116px;
    border-right: 1px solid #ccc;
}

.box-avgRate .avgRate {
    font-size: 24px;
    font-weight: 700;
    color: #f5bf02;
}

.box-avg-rate-count {
    width: calc(100% - 200px - 160px);
    padding: 0 24px;
}

.avg-rate-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #8d94ac;
}

.rate-number {
    display: flex;
    align-items: center;
    width: 10%;
}

.avg-rate-item .box-percent {
    width: 70%;
    height: 8px;
    background: #d9d9d9;
    border-radius: 3px;
    position: relative;
    overflow: hidden;
}

.avg-rate-item .percent {
    position: absolute;
    left: 0;
    top: 0;
    height: 8px;
    background: #F5BF02;
}

.total-avg-rate {
    width: 10%;
    text-align: right;
    font-weight: 600;
}

.button-review {
    width: 200px;
}

.btn-review {
    display: block;
    margin: 0 auto;
    width: 120px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-weight: 600;
    color: var(--color-global);
    border: 1px solid var(--color-global);
}

.list-review .item-review {
    padding: 16px;
    border-bottom: 1px solid #EDEDED;
}

.name-info {
    margin-bottom: 8px;
}

.name-info b {
    margin-right: 10px;
}

.action-reply {
    margin-top: 8px;
}

.action-reply .click-reply {
    color: var(--color-global);
    font-weight: 600;
    padding-right: 10px;
    border-right: 2px solid #c4c4c4;
}

.action-reply .time {
    padding-left: 10px;
    color: #CCC;
    font-weight: 600;
}

p {
    margin: 0;
}

.box-list-reply {
    background: #F5F5F5;
    margin-top: 10px;
}

.item-review {
    padding: 16px;
    border-bottom: 1px solid #EDEDED;
}

.item-review .name-info img {
    width: 25px;
    height: 25px;
    object-fit: cover;
    margin-right: 10px;
}
</style>
