<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="添加规格">
                <div class="card mb-3" style="line-height: 1.2;"
                     v-for="(item,index) in skuCard" :key="index">
                    <div class="card-header d-flex align-items-center">
                        <span>规格项：</span>
                        <el-input size="mini" :value="item.name" @input="vModel(index,'name',$event)"
                                  style="width: 200px;">
                            <el-button slot="append"
                                       icon="el-icon-more"></el-button>
                        </el-input>
                        <el-radio-group size="mini"
                                        :value="item.type"
                                        @input="vModel(index,'type',$event)"
                                        style="margin-bottom: -10px;" class="ml-2">
                            <el-radio :label="0">无</el-radio>
                            <el-radio :label="1">颜色</el-radio>
                            <el-radio :label="2">图片</el-radio>
                        </el-radio-group>
                        <!--上移-->

                        <el-button size="mini" class="ml-auto"
                                   icon="el-icon-top"
                                   :disabled="index === 0"
                                   @click="sortCard('moveUp',index)"
                        ></el-button>
                        <!--下移-->
                        <el-button size="mini"
                                   icon="el-icon-bottom"
                                   :disabled="index === getSkuCardLength"
                                   @click="sortCard('moveDown',index)"
                        ></el-button>
                        <el-button size="mini"
                                   type="text" @click="delSkuCard(index)">删除
                        </el-button>
                    </div>
                    <div class="card-body">
                        <!--                        规格属性-->
                        <div class="d-flex align-items-center flex-wrap">
                            <div class="border py-2 px-4 rounded mr-2 position-relative" v-if="item.type !== 0">
                                <div class="d-flex align-items-center" v-if="item.type === 1">
                                    <div class="block mr-2">
                                        <el-color-picker size="mini" v-model="skus_color"></el-color-picker>
                                    </div>
                                    <span>颜色</span>
                                </div>
                                <span class="btn btn-light mr-2" v-if="item.type === 2">
                                    <i class="el-icon-plus"></i>
                                </span>
                                <span class="btn btn-light p-0 position-absolute"
                                      style="line-height: 1;right: -10px;top:-10px">
                                <i class="icon el-icon-circle-close"></i>
                            </span>
                            </div>
                        </div>
                        <!--规格列表-->
                            <div class="d-flex align-items-center flex-wrap mt-3">
                                <div class="py-2 position-relative rounded mr-2" v-for="(sku,skuIndex) in item.list" :key="skuIndex">
                                    <el-input
                                            size="mini"
                                            style="width: 80px"
                                            :value="sku.name"
                                            @input="vModelSku(index,skuIndex,'name',$event)"
                                    ></el-input>
                                    <span class="btn btn-light p-0 position-absolute"
                                          style="line-height: 1;right: -10px;top:-10px"
                                          @click="delSkuValue({ index,skuIndex })">
                                        <i class="icon el-icon-circle-close"></i>
                                    </span>
                                </div>
                            </div>
                        <!-- 占位 -->
<!--                        <div style="height: 50px"></div>-->

                        <div>
                            <el-button type="text" size="mini"
                                       icon="el-icon-plus" @click="addSkuValue(index)">
                                增加规格值
                            </el-button>
                        </div>
                    </div>
                </div>
                <el-button class="" type="success"
                           size="mini" @click="addSkuCard">添加规格
                </el-button>
            </el-form-item>
            <el-form-item label="批量设置">
                <el-button type="text">销售价</el-button>
                <el-button type="text">市场价</el-button>
                <el-button type="text">成本价</el-button>
                <el-button type="text">库存</el-button>
                <el-button type="text">体积</el-button>
                <el-button type="text">重量</el-button>
            </el-form-item>
            <el-form-item label="规格设置">
                规格设置
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {mapState, mapMutations} from "vuex"

    export default {
        name: "multiple-attrs",
        data() {
            return {
                skus_color: ""
            }
        },
        computed: {
            ...mapState({
                oprice: state => state.goodCreate.oprice,
                pprice: state => state.goodCreate.pprice,
                cprice: state => state.goodCreate.cprice,
                weight: state => state.goodCreate.weight,
                volume: state => state.goodCreate.volume,
                skuCard: state => state.goodCreate.skuCard
            }),
            getSkuCardLength() {
                return this.skuCard.length - 1
            }
        },
        methods: {
            ...mapMutations([
                'vModelState',
                'addSkuCard',
                'delSkuCard',
                'vModelSkuCard',
                'sortSkuCard',
                'addSkuValue',
                'updateSkuValue',
                'delSkuValue'
            ]),
            vModel(index, key, value) {
                this.vModelSkuCard({index, key, value})
            },
            sortCard(action, index) {
                this.sortSkuCard({action, index})
            },
            vModelSku(index,skuIndex,key,value) {
                this.updateSkuValue({ index,skuIndex,key,value })
            }
        }
    }
</script>

<style scoped>

</style>
