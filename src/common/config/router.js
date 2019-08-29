let routes = [
    {
        path: '/',
        name: 'layout',
        redirect:{ name: 'index' },
        component: 'layout/layout',
        children: [
            {
                meta:{title:'后台首页'},
                component: 'index/index'
            },
            {
                meta:{title:'商品列表'},
                component: 'shop/goods/list'
            },
            {
                meta:{ title: '相册管理' },
                component: 'camera/camera'
            },
            {
                meta:{ title: '增加商品' },
                component: 'shop/goods/create-good'
            },
            {
                meta:{ title: '财务管理' },
                component: 'finance/finance'
            }
            ]
    },
    {
      component: 'login/login'
    },
    {
        path: "*",
        redirect: { name: 'index' }
    }
    ];

//路由获取方法
let getRoutes = function () {
    createRoute(routes);
    return routes;
};

//递归生成路由
function createRoute(routerArr) {
    for (let i=0; i<routerArr.length; i++) {
        if (!routerArr[i].component) {
            return
        }
        let val = removeRoute(routerArr[i].component);
        routerArr[i].name = routerArr[i].name || val.replace(/\//g,'_');
        routerArr[i].path = routerArr[i].path || `/${val}`;
        let componentFun = import(`../../views/${routerArr[i].component}.vue`);
        routerArr[i].component = () => componentFun;
        if (routerArr[i].children && routerArr[i].children.length > 0 ) {
            createRoute(routerArr[i].children)
        }
    }
}

//去除路由无关项
function removeRoute(routeStr) {
    let index = routeStr.lastIndexOf('/');
    let val = routeStr.substring(index+1,routeStr.length);
    if (val === 'index') {
        return routeStr.substring(index,-1)
    } else {
        return routeStr
    }
}



export default getRoutes()
