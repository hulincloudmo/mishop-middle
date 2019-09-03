<template>
    <div>
        <el-container style="position: absolute; left: 0; top: 0; bottom:0; right: 0; overflow: hidden">
            <el-header
                    style="display:flex;align-items:center;flex-direction: row; background-color: #545c64; justify-content: space-between">
                <a href="" class="h5 text-align"
                   style="width: 10%;color: #E9EEF3;text-decoration: none;font-weight: bold;font-style: italic;letter-spacing: 8px">{{$conf.logo}}</a>
                <div class="line"></div>
                <el-menu
                        :default-active="navBar.active"
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="handleSelect"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-menu-item :index="index|numToString" v-for="(item,index) in navBar.list" :key="index">
                        {{item.name}}
                    </el-menu-item>
                    <el-submenu index="5">
                        <template slot="title">
                            <el-avatar size="small" :src="userInfo.avator"></el-avatar>
                            {{userInfo.name}}
                        </template>
                        <el-menu-item index="2-1">修改</el-menu-item>
                        <el-menu-item index="2-2">退出</el-menu-item>
                    </el-submenu>
                </el-menu>

            </el-header>
            <!--          给一个下边距，这样才能显示完整-->
            <el-container style="height: 100%;">
                <el-aside width="200px">
                    <el-menu
                            :default-active="slideMenuActive"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b"
                            @select="slideSelect"
                            style="height: 100%"
                    >
                        <el-menu-item :index="index|numToString" v-for="(item,index) in slideMenus" :key="index">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main class="bg-light" style="position: relative;">
                    <!--= 面包导航-->
                    <div class="border-bottom mb-3 bg-white d-flex" style="padding:20px;margin: -20px"
                         v-if="bran.length > 0">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item
                                    v-for="(item,index) in bran" :key="index"
                                    :to="{ path: item.path }">{{item.title}}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                        <div style="margin-left: 50px; margin-top: -10px">
                            <el-tag
                                    v-for="(tag,index) in tags"
                                    :key="index"
                                    closable
                                    style="margin-left: 20px;cursor:pointer;"
                                    :type="tag.type"
                                    @close="close(index)"
                                    @click="navPath(tag)"
                            >
                                {{tag.name}}
                            </el-tag>
                        </div>
                    </div>
                    <router-view></router-view>

                    <el-backtop target=".el-main" :bottom="100">
                        <div
                                style="{
                                    height: 100%;
                                    width: 100%;
                                    background-color: #f2f5f6;
                                    box-shadow: 0 0 6px rgba(0,0,0, .12);
                                    text-align: center;
                                    line-height: 40px;
                                    color: #1989fa;
                                    }"
                        >
                            GoUP
                        </div>
                    </el-backtop>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    import mixin from "@/common/mixins/common.js"

    export default {
        mixins: [mixin],
        inject: ['reload'],
        name: "layout",
        data() {
            return {
                navBar: [],
                bran: [],
                userInfo: {},
                tags: [],
                nav_flag: false
            }
        },
        created() {
            //初始化数据
            this.navBar = this.$conf.navBar;
            this.userInfo = this.$conf.userInfo;
            this.getRouterBran();
            //初始化选中
            this.__initNavBar();
        },
        watch: {
            '$route'(to, from) {
                localStorage.setItem('navActive', JSON.stringify({
                    top: this.navBar.active,
                    left: this.slideMenuActive
                }));
                this.getRouterBran();
            }
        },
        computed: {
            slideMenus() {
                return this.navBar.list[this.navBar.active].subMenu || [];
            },
            slideMenuActive: {
                get() {
                    return this.navBar.list[this.navBar.active].subActive || '0'
                },
                set(val) {
                    this.navBar.list[this.navBar.active].subActive = val
                }
            }
        },
        methods: {
            __initNavBar() {
                let r = JSON.parse(localStorage.getItem('navActive'));
                if (r) {
                    this.navBar.active = r.top;
                    this.navBar.list[this.navBar.active].subActive = r.left;

                }
            },
            handleSelect(key, keyPath) {
                if (key === "2-1") {
                    console.log("修改用户资料")
                } else if (key === '2-2') {
                    console.log("退出登录")
                } else {
                    this.navBar.active = key;
                    localStorage.setItem('navActive', JSON.stringify({
                        top: this.navBar.active,
                        left: this.slideMenuActive
                    }));
                    this.slideMenuActive = '0';
                    this.$router.push({
                        name: this.slideMenus[this.slideMenuActive].path_name
                    })
                }

            },
            slideSelect(key, keypath) {
                this.slideMenuActive = key;
                localStorage.setItem('navActive', JSON.stringify({
                    top: this.navBar.active,
                    left: this.slideMenuActive
                }));
               if (this.$route.name !== this.slideMenus[key].path_name) {
                   this.$router.push({
                       name: this.slideMenus[key].path_name
                   })
               }
            },
            getRouterBran() {
                let filter = this.$route.matched.filter(v => v.name);
                let arr = [];
                filter.forEach((v, k) => {
                    if (v.name === 'index' || v.name === 'layout') {
                        return
                    }
                    arr.push({
                        name: v.name,
                        path: v.path,
                        title: v.meta.title
                    });
                    let path_name = this.$route.name;
                    let path_filter = this.tags.filter(v=>path_name === v.path_name);
                    if (path_filter.length === 0) {
                        this.tags.push({name: v.meta.title,path_name: v.name});
                    }

                });
                if (arr.length > 0) {
                    arr.unshift({name: 'index', path: '/index', title: '后台首页'});
                }
                this.bran = arr
            },
            close(index) {
                this.tags.splice(index, 1)
            },
            navPath(tag) {
                if (this.$route.name === tag.path_name) {
                    this.reload();
                    return
                }
                this.$router.push({name:tag.path_name})
            }
        }
    }
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;

    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>
