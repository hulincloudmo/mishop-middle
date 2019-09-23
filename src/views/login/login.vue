<template>
    <div style="position: relative">
        <img src="./login-bg.jpg" alt="">
       <div class="container" style="position: absolute;top: 15rem;left: 60rem">
           <div class="row m-auto">
               <div class="el-col-12 el-col-sm-8 el-col-md-6 el-col-lg-4 m-auto" style="width:500px;height: 250px">
                   <el-card>
                       <div class="el-card__header text-center">
                           <h3>陌上青夏的管理平台</h3>
                       </div>

                       <div class="el-card__body">
                            <el-form ref="ruleForm" :model="form" label-width="80px" :rules="rules">
                                  <el-form-item label="账号" prop="username">
                                      <el-input v-model="form.username" size="medium" placeholder="请输入账号"></el-input>
                                  </el-form-item>
                                <el-form-item label="密码" prop="password">
                                    <el-input v-model="form.password" size="medium" placeholder="请输入密码"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button @click="submit" type="primary" size="medium" class="w-100">立即登录</el-button>
                                </el-form-item>
                            </el-form>
                       </div>
                       <div style="text-align: center;color: #1c7430">输入任意账号密码即可登录</div>
                   </el-card>
               </div>
           </div>
       </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                form: {
                    username: "",
                    password: ""
                },
                rules: {
                    username: [
                        { required: true,message: "请输入用户名", trigger: 'blur' }
                    ],
                    password: [
                        { required: true,message: "请输入用户名", trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submit() {
                // this.$refs.ruleForm.validate( (val) => {
                //     if (!val) {
                //         return;
                //     } else {
                //         let serverUrl = this.serverUrl;
                //         let form = this.form;
                //         this.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                //         //转换请求为form-data
                //         this.axios.defaults.transformRequest = [function (data) {
                //             let ret = '';
                //             for (let it in data) {
                //                 ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                //             }
                //             return ret
                //         }];
                //         this.axios.post(`${serverUrl}/user/login`, {
                //                 username:form.username,
                //                 password:form.password
                //
                //         }).then((res) => {
                //             if (res.data.status === 200) {
                //                 this.$router.push({name: 'index'})
                //             }
                //         })
                //     }
                // });
                localStorage.setItem('userInfo',{
                    name: '陌上青夏'
                })

                this.$router.push({
                    name: 'layout'
                })
            }
        }
    }
</script>

<style scoped>

</style>
