<template>
    <div>
        <!--        data-->
        <el-row :gutter="20">
            <el-col :span="6" v-for="(item,index) in counts" :key="index">
                <el-card shadow="hover" >
                    <div class="d-flex ml-2" style="height: 100px;">
                        <div class="ml-4" style="line-height: 100px">
                            <i :class="[item.icon,item.color]" class="" style="width: 40px;height: 40px;text-align: center;line-height: 40px;color: white" ></i>
                        </div>
                        <div class="d-flex mt-2" style="flex-direction: column;width: 1000px; line-height: 2px;justify-content: center;text-align: left" >
                            <p class="mb-3 ml-3" style="font-weight: bold;font-size: 30px">
                                <count-to :end="item.num|numToString"></count-to>
                            </p>
                            <p class="ml-3 text-muted">{{item.desc}}</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
<!--        店铺，订单-->
        <el-row :gutter="20" class="mt-3 d-flex flex-column py-3" style="height: 450px; flex-wrap: wrap">
                <el-col :span="12" style="height: 300px" >
                    <el-card class="box-card mb-3"  v-for="(item,index) in tips" v-bind:key="index">
                        <div slot="header" class="clearfix">
                              <span>{{item.title}}</span>
                              <el-button style="float: right;padding: 3px 0" type="text">{{item.desc}}</el-button>
                        </div>
                        <div class="row">
                            <div  :class="item.layout" v-for="(itemn,indexn) in item.list" :key="indexn">
                                <button class="btn btn-light w-100 mb-3">
                                <h4>{{itemn.value}}</h4>
                                <small class="text-muted">{{itemn.name}}</small>
                            </button></div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>交易提示</span>
                            <el-button style="float: right;padding: 3px 0" type="text">操作</el-button>
                        </div>
                        <div ref="myChart" style="width: 100%;height:300px;"></div>
                    </el-card>
                </el-col>
         </el-row>
<!--        销售-->
        <el-row :gutter="20">
                <el-col :span="12">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                              <span>销售情况统计</span>
                              <el-button style="float: right;padding: 3px 0" type="text">按周期统计商家店铺的订单量和订单金额</el-button>
                        </div>
                        <div class="border w-100 d-flex flex-column px-3" style="height: 280px;justify-content: center">
                            <div class="d-flex mb-3 border" style="height: 100px">
                                <div style="width: 30%;text-align: center;line-height: 80px" class=" text-muted pt-2 bg-light">昨日销量</div>
                                <div class="d-flex flex-column w-100 ml-2" style="justify-content: center">
                                    <div class="d-flex w-100 border-bottom">
                                        <span class="text-muted mr-2" style="line-height: 40px">订单量(件)</span>
                                        <span class="border-bottom" style="line-height: 40px">12</span>
                                    </div>
                                    <div class="d-flex mt-2">
                                        <span class="mr-2 text-muted">订单金额(元)</span>
<!--                                        <span>12</span>-->
                                        <count-to end="2534"></count-to>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex mb-3 border" style="height: 100px">
                                <div style="width: 30%;text-align: center;line-height: 80px" class=" text-muted pt-2 bg-light">本月销量</div>
                                <div class="d-flex flex-column w-100 ml-2" style="justify-content: center">
                                    <div class="d-flex w-100 border-bottom">
                                        <span class="text-muted mr-2" style="line-height: 40px">订单量(件)</span>
                                        <span class="border-bottom" style="line-height: 40px">12</span>
                                    </div>
                                    <div class="d-flex mt-2">
                                        <span class="mr-2 text-muted">订单金额(元)</span>
                                        <span>12</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card class="box-card" style="height: 383px">
                        <div slot="header" class="clearfix">
                              <span>单品销售排名</span>
                              <el-button style="float: right;padding: 3px 0" type="text">按周期统计商家店铺的订单量和订单金额</el-button>
                        </div>
                        <div>
                            <el-table
                                    :data="tableData"
                                    height="250"
                                    style="width: 100%"
                                    :row-class-name="tableRowClassName">
                                <el-table-column
                                        prop="id"
                                        label="商品id"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="商品名称"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="price"
                                        label="价格">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-col>
         </el-row>
        <div style="height: 60px"></div>
    </div>
</template>

<script>
    import countTo from '@/components/count-to/count-to'
    import mixin from '@/common/mixins/common'
    export default {
        mixins:[mixin],
        components:{
            countTo
        },
        name: "index",
        data() {
          return {
              counts: [],
              tips:[],
              tableData: [{
                  id: '1',
                  name: '陌上青夏管理系统',
                  price: '996',
              }, {
                  id: '2',
                  name: '陌上青夏管理系统',
                  price: '996'
              }, {
                  id: '3',
                  name: '陌上青夏管理系统',
                  price: '996',
              }, {
                  id: '3',
                  name: '陌上青夏管理系统',
                  price: '996'
              }, {
                  id: '2',
                  name: '陌上青夏管理系统',
                  price: '996'
              }, {
                  id: '3',
                  name: '陌上青夏管理系统',
                  price: '996',
              }, {
                  id: '3',
                  name: '陌上青夏管理系统',
                  price: '996'
              }
              ]
          }
        },
        beforeMount() {
            let data = localStorage.getItem('userInfo')
            if(!data) {
                this.$router.push({
                    name: 'login'
                })
            }
            //初始化数据
            this.counts = this.$conf.counts;
            this.tips = this.$conf.tips
        },
        mounted() {
           //dom完成
            this.drawLine();

        },
        methods: {
            drawLine() {
                //初始化echart实例
                let myChart = this.$eCharts.init(this.$refs.myChart);
                myChart.setOption({
                    title: {},
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : ['周一','周二','周三','周四','周五','周六','周日']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'邮件营销',
                            type:'line',
                            stack: '总量',
                            areaStyle: {},
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'联盟广告',
                            type:'line',
                            stack: '总量',
                            areaStyle: {},
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name:'视频广告',
                            type:'line',
                            stack: '总量',
                            areaStyle: {},
                            data:[150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name:'直接访问',
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data:[320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name:'搜索引擎',
                            type:'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            areaStyle: {normal: {}},
                            data:[820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                });
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            }
        }
    }
</script>

<style scoped>
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>
