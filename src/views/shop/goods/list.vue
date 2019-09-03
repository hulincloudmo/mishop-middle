<template>
    <div class="bg-white" style="margin: -20px;">
        <el-tabs v-model="activeIndex" @tab-click="handleClick">
            <el-tab-pane :label="item.name" v-for="(item,index) in barList" :key="index">
                <div class="d-flex align-items-center">
                    <router-link :to="{ name: 'shop_goods_create-good' }">
                        <el-button type="success" size="mini">发布商品</el-button>
                    </router-link>
                    <el-button class="ml-2" type="danger" size="mini">批量删除</el-button>
                    <div class="ml-auto d-flex" v-show="!form.showSenior">
                        <el-input v-model="form.keyword" placeholder="输入商品名称" size="mini" class="mr-1"></el-input>
                        <el-button type="info" size="mini">搜索</el-button>
                        <el-button size="mini" @click="form.showSenior = !form.showSenior">高级搜索</el-button>
                    </div>
                </div>
                <el-card class="box-card bg-light my-3" v-show="form.showSenior">
                    <div slot="header" class="clearfix">
                          <span style="font-size: 15px;">高级搜索</span>
                          <el-button style="float: right;padding: 3px 0" type="text" @click="form.showSenior = false">收起</el-button>
                        <div>
                            <el-form inline ref="form" :model="seniorSearch">
                                  <el-form-item label="商品名称">
                                      <el-input v-model="seniorSearch.goodName" size="mini" placeholder="商品名称"></el-input>
                                  </el-form-item>
                                <el-form-item label="商品编码">
                                    <el-input v-model="seniorSearch.goodCode" size="mini" placeholder="商品编码"></el-input>
                                </el-form-item>
                                <el-form-item label="商品类型">
                                    <el-select clearable size="mini" v-model="seniorSearch.goodType.typeSelect" placeholder="请选择商品类型" value="" @change="goodTypeChange">
                                        <el-option
                                                v-for="item in seniorSearch.goodType.goodOption"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="商品分类">
                                    <el-input v-model="seniorSearch.goodCategories" size="mini" placeholder=""></el-input>
                                </el-form-item>
                                <div>
                                    <el-button type="info" size="mini" @click="seniorSearchStart">搜索</el-button>
                                    <el-button  size="mini" @click="clearSeniorSearch">清空筛选条件</el-button>
                                </div>
                            </el-form>
                        </div>
                    </div>
                </el-card>
                <div>
                    <el-table
                            ref="multipleTable"
                            empty-text="主公~已经没有商品了呢~"
                            :data="tableData"
                            tooltip-effect="dark"
                            height="700"
                            style="width: 100%;padding-right: 20px;"
                            :border="true"
                            :show-summary="true"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                align="center"
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="title"
                                label="商品"
                                width="300">
                            <template slot-scope="scope">
                                <div class="media">
                                    <img :src="scope.row.cover" style="width: 50px;height: 50px;" alt="" class="mr-3">
                                    <div class="media-body">
                                        <h6 class="mt-0">{{scope.row.title}}</h6>
                                        <p class="mb-0">类别:{{scope.row.category}}</p>
                                        <p>{{scope.row.create_time}}</p>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="category"
                                label="商品类型"
                                align="center"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="sale_count"
                                label="实际销量"
                                align="center"
                                show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                                prop="order"
                                align="center"
                                label="商品排序"
                                show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                                prop="ischeck"
                                align="center"
                                label="商品状态"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-button :type="scope.row.status === 1 ? 'success' : 'danger'" size="mini" @click="changeStatus(scope.row)">{{scope.row.status === 1? '上架': '下架'}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="store"
                                align="center"
                                label="总库存"
                                show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                                prop="pprice"
                                align="center"
                                label="价格(元)"
                                show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                align="center"
                                label="操作"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-button type="danger" size="mini" @click="goodDel(scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <el-footer class="d-flex border-top bg-white align-items-center" style="bottom: 0;left: 200px;right: 0;">
                    <!--                底部分页-->
                    <div style="width: 200px;" class="h-100 d-flex align-items-center justify-center">
                        <el-button-group>
                            <el-button  size="mini">上一页</el-button>
                            <el-button  size="mini">下一页</el-button>
                        </el-button-group>
                    </div>
                    <div class="flex-1;px-2" style="flex-shrink: 0">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[100, 200, 300, 400]"
                                :page-size="100"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="400">
                        </el-pagination>
                    </div>
                </el-footer>
                <div class="w-100" style="height: 61px"></div>
            </el-tab-pane>
        </el-tabs>

        </div>

</template>

<script>
    export default {
        name: "list",
        data() {
            return {
                activeIndex: 0,
                currentPage: 1,
                barList:[
                    { name:"出售中" },
                    { name:"待回复" },
                    { name:"库存预警" },
                    { name:"仓库中" },
                    { name:"回收站" }
                ],
                form:{
                    keyword: "",
                    showSenior: false,
                    name: ""
                },
                seniorSearch:{
                    goodName: "",
                    goodCode: "",
                    goodType: {
                        goodOption: [
                            { value: "手机", label: "手机" }
                        ],
                        typeSelect: ""
                    },
                    goodCategories: ""
                },
                tableData: [
                    {
                        id:1,
                        title: '荣耀 V10全网通 标配版',
                        cover: 'http://static.yoshop.xany6.com/2018071718294208f086786.jpg',
                        create_time: '2019-07-17 18:34:14',
                        category:"手机",
                        sale_count:20,
                        order:100,
                        status:1,
                        store:200,
                        pprice:1000,
                        ischeck:1
                    }
                ],
                multipleSelection: []
            }
        },
        mounted() {
          for(let i = 0; i<20; i++) {
              this.tableData.push(this.tableData[0])
          }
        },
        methods: {
            handleClick(tab, event) {
                this.activeIndex = tab.index;
            },
            goodTypeChange(e) {
                if (e === "") {
                    return
                }

            },
            seniorSearchStart() {
                console.log("开始高级搜索")
            },
            clearSeniorSearch() {
                this.seniorSearch = {
                    goodName: "",
                        goodCode: "",
                        goodType: {
                        goodOption: [
                            { value: "手机", label: "手机" }
                        ],
                            typeSelect: ""
                    },
                    goodCategories: ""
                }
            },
            handleSelectionChange() {
                this.multipleSelection = val;
            },
            goodDel(index) {
                this.tableData.splice(index,1)
            },
            changeStatus(item) {
                return item.status=item.status === 1 ? 0 : 1
            },
            handleCurrentChange() {

            },
            handleSizeChange() {

            }

        }
    }
</script>

<style scoped>
    html, body {height:100%;overflow:auto;margin: 0;}
</style>
