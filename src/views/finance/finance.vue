<template>
    <div>
        <div class="p-2 bg-white w-100" style="height: 250px">
            <div class="row" style="padding-left: 5rem">
                <div class="col-3 d-flex flex-column">
                    <div class="d-flex">
                        <div style="font-size: 15px;flex:0.5">做箱时间:</div>
                        <div class="d-flex" style="flex:2">
                            <el-date-picker
                                    v-model="doValue"
                                    align="right"
                                    type="date"
                                    style="width: 50%"
                                    placeholder="选择起始日期"
                                    size="mini"
                                    :picker-options="pickerOptions">
                            </el-date-picker>
                            <div class="mx-1">-</div>
                            <el-date-picker
                                    v-model="doneValue"
                                    align="right"
                                    type="date"
                                    style="width: 50%"
                                    placeholder="选择结束日期"
                                    size="mini"
                                    :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="d-flex mt-2">
                        <div class="ml-auto" style="font-size: 15px;flex:0.5">客户编号:</div>
                        <div style="flex:2">
                            <el-input
                                    placeholder="请输入客户编号"
                                    prefix-icon="el-icon-search"
                                    v-model="customerNumber"
                                    size="mini"
                            >
                            </el-input>
                        </div>
                    </div>
                    <div class="d-flex mt-2">
                        <div style="font-size: 15px;flex:0.5;text-align: right">车牌号：</div>
                        <div style="flex:2">
                            <el-input
                                    placeholder="请输入车牌号"
                                    prefix-icon="el-icon-search"
                                    v-model="carNumber"
                                    size="mini"
                            >
                            </el-input>
                        </div>
                    </div>

                    <div class="d-flex mt-2">
                        <div style="font-size: 15px;flex:0.5;">对账状态:</div>
                        <div style="flex:2">
                            <el-button class="mr-1" size="mini" type="danger">全部</el-button>
                            <el-button class="mr-1" size="mini" type="danger">已对账</el-button>
                            <el-button class="mr-1" size="mini" type="danger">未对账</el-button>
                        </div>
                    </div>

                </div>
                <div class="col-3 d-flex flex-column">
                    <div class="d-flex">
                        <div style="font-size: 15px;flex:0.5;">业务编号:</div>
                        <div style="flex:2">
                            <el-input
                                    placeholder="请输入业务编号"
                                    prefix-icon="el-icon-search"
                                    v-model="businessNumber"
                                    size="mini"
                            >
                            </el-input>
                        </div>
                    </div>
                    <div class="d-flex mt-2">
                        <div style="font-size: 15px;flex:0.5;">提单号:</div>
                        <div style="flex:2">
                            <el-input
                                    placeholder="请输入提单号"
                                    prefix-icon="el-icon-search"
                                    v-model="orderNumber"
                                    size="mini"
                            >
                            </el-input>
                        </div>
                    </div>
                    <div class="d-flex mt-2">
                        <div class="d-flex">
                            <div style="font-size: 15px;flex:0.8">费用录入时间:</div>
                            <div class="d-flex" style="flex:2">
                                <el-date-picker
                                        v-model="doValue"
                                        align="right"
                                        type="date"
                                        style="width: 50%"
                                        placeholder="起始日期"
                                        size="mini"
                                        :picker-options="pickerOptions">
                                </el-date-picker>
                                <div class="mx-1">-</div>
                                <el-date-picker
                                        v-model="doneValue"
                                        align="right"
                                        type="date"
                                        style="width: 50%"
                                        placeholder="结束日期"
                                        size="mini"
                                        :picker-options="pickerOptions">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3 d-flex flex-column">
                    <div class="d-flex">
                        <div style="font-size: 15px;flex:0.5">客户名称:</div>
                        <el-select style="flex:1.7" size="mini" v-model="selectValue" placeholder="请选择" value="全部">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d-flex mt-2">
                        <div style="font-size: 15px;flex:0.6">费用更新人:</div>
                        <el-select style="flex:2" size="mini" v-model="selectValue" placeholder="请选择" value="全部">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d-flex mt-2">
                        <div style="font-size: 15px;flex:0.6">费用录入人:</div>
                        <el-select style="flex:2" size="mini" v-model="selectValue" placeholder="请选择" value="全部">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="col-3" style="text-align: right">
                    <el-button class="mr-2 mt-2" size="mini" type="success">高级查询</el-button>
                </div>
            </div>
            <div class="w-100 d-flex align-items-center justify-content-center mt-5">
                <el-button type="primary" plain icon="el-icon-search" size="mini">按需搜索</el-button>
                <el-button type="primary" plain icon="el-icon-search" size="mini">按费用搜索</el-button>
                <el-button type="primary" plain icon="el-icon-refresh" size="mini">重置</el-button>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                doValue: "",
                doneValue: "",
                customerNumber: "",
                carNumber: "",
                businessNumber: "",
                orderNumber: "",
                selectValue: "",
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }]
            }
        },
        computed: {}
    }
</script>

<style scoped>

</style>
