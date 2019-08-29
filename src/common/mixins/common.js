export default {
    filters: {
        numToString(val) {
            return val.toString();
        }
    },
    mounted() {
        window.addEventListener('beforunload',e=>this.beforeUnloadHandler())
    },
    methods: {
        beforeUnloadHandler() {

            // localStorage.setItem('navActive', JSON.stringify({
            //     top: 0,
            //     left: 0
            // }));
        }
    }
}
