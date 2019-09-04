<template>
    <div>
        <!-- 规格选项 -->
        <el-form ref="form" label-width="80px">
            <el-form-item label="商品规格">
                <el-radio-group :value="skus_type"
                                @input="vModel('skus_type',$event)"
                                size="medium">
                    <el-radio-button :label="0">
                        单一规格</el-radio-button>
                    <el-radio-button :label="1">
                        多规格</el-radio-button>
                </el-radio-group>
            </el-form-item>
        </el-form>

        <!-- 单规格 -->
            <single-attrs v-if="skus_type === 0"></single-attrs>
        <!-- 多规格 -->
        <multiple-attrs v-else></multiple-attrs>
    </div>
</template>

<script>
    import { mapState,mapMutations } from "vuex"
    import singleAttrs from "@/components/goods/create-good/single-attrs.vue"
    import multipleAttrs from "@/components/goods/create-good/multiple-attrs.vue"
    export default {
        components: {
            singleAttrs,
            multipleAttrs
        },
        name: "skus_type",
        computed: {
            ...mapState({
                skus_type:state=>state.goodCreate.skus_type
            }),
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
