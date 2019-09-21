<template>
    <div class="mt-3 pb-2 bg-white">
        <div>
            <div class="pl-2 pt-2 mb-2 d-flex">
                <el-button class="pr-2" plain size="mini" type="success">对账</el-button>
                <el-button class="pr-2" plain size="mini" type="success">取消对账</el-button>
                <el-button class="pr-2" plain size="mini" type="success">￥修改对账时间</el-button>
                <el-button class="pr-2" plain size="mini" type="success">￥客户对账单(按票)</el-button>
                <el-button class="pr-2" plain size="mini" type="success">￥客户对账单(按箱)</el-button>
                <el-button class="pr-2" plain size="mini" type="success">
                    <div class="el-icon-s-promotion"></div>
                    费用输入
                </el-button>
                <el-button class="pr-2" plain size="mini" type="success"><div class="el-icon-s-promotion"></div>批量费用录入</el-button>
                <el-button class="pr-2" plain size="mini" type="success"><div class="el-icon-s-promotion"></div>费用报账单</el-button>
                <el-button class="pr-2" plain size="mini" type="success"><div class="el-icon-s-promotion"></div>导出明细</el-button>
                <el-button class="pr-2" plain size="mini" type="success"><div class="el-icon-s-promotion"></div>支票号</el-button>
                <el-button class="ml-auto mr-2" size="mini" type="warning"><div class="el-icon-setting"></div>设置</el-button>
            </div>
        </div>
        <div class="mb-2 pr-2">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    class="pr-2"
                    style="width: 100%"
                    border
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="业务编号"
                        >
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="门店地址"
                        >
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="司机"
                >
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="箱号"
                        >
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="费用录入人"
                        >
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="费用更新人"
                        >
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="委托单位"
                        >
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="委托人"
                >
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="客户编号"
                >
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="做箱日期"
                        >
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "reconciliation-receivable",
        data() {
            return {
                tableData: [
                    {
                    date: '2019.09.21',
                    name: '陌上青夏',
                    address: '陌上花开，可缓缓归矣'
                    },
                    {
                        date: '2019.09.21',
                        name: '陌上青夏',
                        address: '陌上花开，可缓缓归矣'
                    },
                    {
                        date: '2019.09.21',
                        name: '陌上青夏',
                        address: '陌上花开，可缓缓归矣'
                    },
                    {
                        date: '2019.09.21',
                        name: '陌上青夏',
                        address: '陌上花开，可缓缓归矣'
                    }

                ]
            }
        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>

</style>
