<template>
    <div>
            <el-form ref="form" label-width="80px">
                <el-form-item label="商品名称">
                    <el-input v-model="form.title" placeholder="请输入商品名称，不能超过60个字符" class="w-50"></el-input>
                </el-form-item>
                <el-form-item label="商品分类">
                    <el-cascader v-model="form.category" :options="options"></el-cascader>
                </el-form-item>
                <el-form-item label="商品描述">
                    <el-input  type="textarea" v-model="form.desc" placeholder="选填，商品卖点简述，例如：此款商品美观大方 性价比较高 不容错过" class="w-50"></el-input>
                </el-form-item>
                <el-form-item label="商品单位">
                    <el-input v-model="form.unit" placeholder="请输入商品单位" class="w-50"></el-input>
                </el-form-item>
                <el-form-item label="总库存">
                    <el-input type="number" v-model="form.stock" placeholder="" class="w-25">
                        <template slot="append">件</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="库存预警">
                    <el-input type="number" v-model="form.min_stock" placeholder="" class="w-25">
                        <template slot="append">件</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="库存显示">
                    <el-radio-group v-model="form.display_stock">
                        <el-radio :label="1" border>是</el-radio>
                        <el-radio :label="0" border>否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否上架">
                    <el-radio-group v-model="form.status">
                        <el-radio :label="0" border>放入仓库</el-radio>
                        <el-radio :label="1" border>立即上架</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="运费模板">
                    <el-select v-model="form.express"
                               placeholder="请选择运费模板">
                        <el-option label="区域一"
                                   value="shanghai"></el-option>
                        <el-option label="区域二"
                                   value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>


    </div>
</template>

<script>
    export default {
        name: "basic-setting",
        props:{
            form: {
                type: Object,
                default: ()=> {
                    return {}
                }
            },
            options: {
                type: Array,
                default: ()=> {
                    return []
                }
            }
        }
    }
</script>

<style scoped>

</style>
