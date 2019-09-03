export default {
    state: {
        createGood: {
            skus_type:0,
            title: "",
            category: [],
            desc:"",
            unit:"",
            stock:0,
            min_stock:0,
            display_stock:0,
            status:0,
            express:""
        }
    },
    getters: {
        getSku: (state)=> {
            return state.createGood.skus_type === 0
        }
    },
    mutations: {
        setSku(state) {
            state.skus_type =  state.skus_type === 1? 0 : 1
        },
        vModelState(state,{key,value}) {
            console.log(value)
            state[key] = value;
        }
    },
    actions: {

    }

}
