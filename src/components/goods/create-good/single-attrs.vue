<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="市场价格">
                <el-input type="number" :value="oprice"
                          @input="vModel('oprice',$event)"
                          class="w-25">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="销售价格">
                <el-input type="number" :value="pprice"
                          @input="vModel('pprice',$event)"
                          class="w-25">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="成本价格">
                <el-input type="number" :value="cprice"
                          @input="vModel('cprice',$event)"
                          class="w-25">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="商品重量">
                <el-input type="number" :value="weight"
                          @input="vModel('weight',$event)"
                          class="w-25">
                    <template slot="append">公斤</template>
                </el-input>
            </el-form-item>
            <el-form-item label="商品体积">
                <el-input type="number" :value="volume"
                          @input="vModel('volume',$event)"
                          class="w-25">
                    <template slot="append">立方米</template>
                </el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { mapState,mapMutations } from "vuex"
    export default {
        name: "single-attrs",
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
