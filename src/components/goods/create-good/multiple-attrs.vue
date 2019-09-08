<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="添加规格">
                <div class="card mb-3" style="line-height: 1.2;"
                     v-for="(item,index) in skuCard" :key="index">
                    <div class="card-header d-flex align-items-center">
                        规格项：
                        <el-input size="mini" :value="item.name" style="width: 200px;">
                            <el-button slot="append"
                                       @input="vModel(index,'name',$event)"
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
                        <el-button size="mini" class="ml-auto"
                                   icon="el-icon-top"></el-button>
                        <el-button size="mini"
                                   icon="el-icon-bottom"></el-button>
                        <el-button size="mini"
                                   type="text" @click="delSkuCard(index)">删除</el-button>
                    </div>
                    <div class="card-body">
<!--                        规格属性-->
<!--                        规格列表-->
                        <div>
                            <el-button type="text" size="mini"
                                       icon="el-icon-plus">
                                增加规格值
                            </el-button>
                        </div>
                    </div>
                </div>
                <el-button class="" type="success"
                           size="mini" @click="addSkuCard">添加规格</el-button>
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
    import { mapState,mapMutations } from "vuex"
    export default {
        name: "multiple-attrs",
        computed:{
            ...mapState({
                oprice:state=>state.goodCreate.oprice,
                pprice:state=>state.goodCreate.pprice,
                cprice:state=>state.goodCreate.cprice,
                weight:state=>state.goodCreate.weight,
                volume:state=>state.goodCreate.volume,
                skuCard:state=>state.goodCreate.skuCard
            })
        },
        methods: {
            ...mapMutations([
                'vModelState',
                'addSkuCard',
                'delSkuCard',
                'vModelSkuCard'
            ]),
            vModel(index,key,value) {
                this.vModelSkuCard({index,key,value})
            }
        }
    }
</script>

<style scoped>

</style>
