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
                        <!--规格列表-->
                        <div class="d-flex align-items-center flex-wrap">
                            <sku-card :type="item.type"
                                      v-for="(item2,index2) in item.list"
                                      v-dragging="{ item: item2,list:item.list,group: `skuItem${index}` }"
                                      :key="index2" :item="item2"
                                      :index="index2" :cardIndex="index"
                            ></sku-card>
                        </div>
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
    import skuCard from './sku-card-children.vue'

    export default {
        components: {
            skuCard
        },
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
        mounted() {
            this.$dragging.$on(`dragend`,(e)=>{
                console.log(e)
            })
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
                'delSkuValue',
                'sortSKuCardValue'
            ]),
            vModel(index, key, value) {
                this.vModelSkuCard({index, key, value})
            },
            sortCard(action, index) {
                this.sortSkuCard({action, index})
            }
        }
    }
</script>

<style scoped>

</style>
