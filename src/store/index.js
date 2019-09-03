import Vue from 'vue'
import Vuex from 'vuex'
import goodCreate from './moudles/good-create.js'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        goodCreate
    }
})
