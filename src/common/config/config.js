export default {
    logo : "青夏管理系统",
    navBar: {
        active: '0',
        list: [
            {
                name:"首页",
                subActive: '0',
                subMenu:[
                    {
                        icon: "el-icon-s-home",
                        name: "后台首页",
                        path_name: 'index'
                    },
                    {
                        icon: "el-icon-picture",
                        name: "相册管理",
                        path_name: 'camera_camera'
                    },
                    {
                        icon: "el-icon-picture",
                        name: "财务管理",
                        path_name: 'finance_finance'
                    }
                ]
            },
            {
                name:"商品",
                subActive: '0',
                subMenu: [
                    {
                        icon: "el-icon-s-home",
                        name: "商品列表",
                        path_name: 'shop_goods_list'
                    },
                    {
                        icon: "el-icon-s-home",
                        name: "新增商品",
                        path_name: 'shop_goods_create-good'
                    },
                ]
            },
            {name:"订单"},
            {name:"会员"}
        ]
    },
    userInfo:{
        name: '陌上青夏',
        avator: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    },
    counts: [
        { icon:"el-icon-user-solid",desc:"关注人数(个)",num:"996",color:"bg-primary" },
        { icon:"el-icon-s-finance",desc:"订单总数(笔)",num:"996",color:"bg-success" },
        { icon:"el-icon-s-order",desc:"今日订单总金额(元)",num:"12580.80" ,color:"bg-danger"},
        { icon:"el-icon-s-data",desc:"本月销量(笔)",num:"996",color:"bg-warning" },
    ],
    tips:[
        {
            title:"店铺及商品提示",
            desc:"需要关注的店铺信息及待处理事项",
            layout: 'col-3',
            list:[
                { name:"出售中",value:"64" },
                { name:"待回复",value:"45 " },
                { name:"库存预警",value:"64" },
                { name:"仓库中",value:"23" },
            ]
        },
        {
            title:"交易提示",
            layout: 'col-2',
            desc:"需要立即处理的消息",
            list:[
                { name:"待付款",value:"64" },
                { name:"待发货",value:"35" },
                { name:"已发货",value:"45" },
                { name:"已收货",value:"40" },
                { name:"退款中",value:"2" },
                { name:"待售后",value:"3" },
            ]
        },
    ]
}
