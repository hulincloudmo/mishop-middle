<template>
    <div class="bg-white" style="margin: -20px;">
        <router-link :to="{ name: 'shop_goods_list' }">
            <el-button size="mini">返回商品列表</el-button>
        </router-link>

        <el-tabs style="padding-left: 20px" v-model="activeIndex">
            <el-tab-pane label="基础设置">
                <basicSetting></basicSetting>
            </el-tab-pane>
            <el-tab-pane label="商品规格">
                <skus-type></skus-type>
            </el-tab-pane>
            <el-tab-pane label="商品属性">商品属性</el-tab-pane>
            <el-tab-pane label="媒体设置">媒体设置</el-tab-pane>
            <el-tab-pane label="商品详情">商品详情</el-tab-pane>
            <el-tab-pane label="折扣设置">折扣设置</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import basicSetting from "@/components/goods/create-good/basic-setting.vue"
    import skusType from "@/components/goods/create-good/skus_type.vue"
    import { mapMutations } from "vuex"
    export default {
        components: {
            basicSetting,
            skusType
        },
        name: "goods",
        data() {
            return {
                activeIndex: 0
            }
        },
        computed:{

        },
        methods: {
            ...mapMutations([
                'vModelState'
            ]),
        //    修改
            vModel(key,value) {
                this.vModelState({ key,value })
            }
        }
    }
</script>

<style scoped>

</style>
