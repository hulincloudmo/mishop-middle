<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="添加规格">
                <div class="card" style="line-height: 1.2;">
                    <div class="card-header d-flex align-items-center">
                        规格项：
                        <el-input size="mini" style="width: 200px;">
                            <el-button slot="append"
                                       icon="el-icon-more"></el-button>
                        </el-input>
                        <el-radio-group size="mini" style="margin-bottom: -10px;" class="ml-2">
                            <el-radio label="无"></el-radio>
                            <el-radio label="颜色"></el-radio>
                            <el-radio label="图片"></el-radio>
                        </el-radio-group>
                        <el-button size="mini" class="ml-auto"
                                   icon="el-icon-top"></el-button>
                        <el-button size="mini"
                                   icon="el-icon-bottom"></el-button>
                        <el-button size="mini"
                                   type="text">删除</el-button>
                    </div>
                    <div class="card-body">
                        <div>
                            <el-button type="text" size="mini"
                                       icon="el-icon-plus">
                                增加规格值
                            </el-button>
                        </div>
                    </div>
                </div>
                <el-button class="mt-3" type="success"
                           size="mini">添加规格</el-button>
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
                volume:state=>state.goodCreate.volume
            })
        },
        methods: {
            ...mapMutations([
                'vModelState'
            ]),
            vModel(key,value) {
                this.vModelState({ key,value })
            }
        }
    }
</script>

<style scoped>

</style>
