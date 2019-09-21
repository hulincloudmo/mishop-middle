import $utils from "@/common/utils/util.js"
export default {
    state: {
            skus_type:0,
            title: "",
            category: [],
            desc:"",
            unit:"",
            stock:0,
            min_stock:0,
            display_stock:0,
            status:0,
            express:"",

            oprice:0, // 市场价格
            pprice:0, // 销售价格
            cprice:0, // 成本价格
            weight:0, // 重量
            volume:0, // 体积

            skuCard: [
                {
                    name: "颜色",
                    type: 0,
                    list:[

                    ]
                }
            ]

    },
    getters: {

    },
    mutations: {
        vModelState(state,{key,value}) {
            state[key] = value;
        },
        addSkuCard(state) {
            state.skuCard.push({
                name: "规格名称",
                type:0,
                list: []
            })
        },
        vModelSkuCard(state,{ key,index,value}){
            console.log(key,index,value)
            state.skuCard[index][key] = value
        },
        delSkuCard(state,index) {
            state.skuCard.splice(index,1)
        },
        delSkuValue(state,{ index,skuIndex }) {
            console.log(skuIndex)
            state.skuCard[index].list.splice(skuIndex,1)
        },
        sortSkuCard(state,{action,index}) {
            $utils[action](state.skuCard,index)
        },
        updateSkuValue(state,{cardIndex,valueIndex,key,value}){
            state.skuCard[cardIndex].list[valueIndex][key] = value
        },
    //    增加属性
        addSkuValue(state,index) {
            state.skuCard[index].list.push({
                name: "规格名称",
                image: "",
                color: ""
            })
        }
    },
    actions: {

    }

}
