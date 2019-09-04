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

    },
    getters: {

    },
    mutations: {
        vModelState(state,{key,value}) {
            state[key] = value;
        }
    },
    actions: {

    }

}
