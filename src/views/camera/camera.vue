<template>
    <div>
        <el-container style="height: 100%;position: absolute;top: 55px;left: 0;right: 0;bottom: 0">
            <el-header class="d-flex align-items-center" style="justify-content: space-between">
                <div class="d-flex">
                    <el-select placeholder="你想加班嘛~"
                               v-model="searchForm.order"
                               style="width: 300px"
                               size="medium" value=""
                               class="mr-2">
                        <el-option label="996加班" value="996"></el-option>
                        <el-option disabled label="不加班" value="nothing"></el-option>
                    </el-select>
                    <el-input style="height: 30px"
                              v-model="searchForm.inputValue"
                              size="medium"
                              placeholder="开始加班？请输入你的加班时长"></el-input>
                    <el-button type="success" size="medium">开始加班</el-button>
                </div>
                <div>
                    <el-button type="danger" size="medium" v-if="imageClickList.length > 0" @click="albumDel({all:true})">删除相片</el-button>
                    <el-button type="success" size="medium" @click.stop.native="albumEdit('')">创建相册</el-button>
                    <el-button type="warning" size="medium" @click.stop.native="UploadFormVisible = true">上传图片
                    </el-button>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px" style="height:100%;;overflow: auto;" class="bg-white border-right">
                    <ul class="list-group list-group-flush d-flex">
                        <li :class="{'active sum-active':albumsIndex === index}"
                            @click.stop="albumsClick(index)"
                            class="list-group list-group-item-action d-flex align-items-center"
                            style="flex-direction: row;height:60px;justify-content: space-around;cursor: pointer"
                            v-for="(item,index) in albums" :key="index">
                            <div class="flex-1">{{item.name}}</div>
                            <el-dropdown class="flex-1">
                          <span class="el-dropdown-link" style="color:#FD6801">
                            {{item.num}}<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.stop.native="albumEdit({index,item})">修改</el-dropdown-item>
                                    <el-dropdown-item @click.stop.native="albumDel(index)">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>


                    </ul>
                </el-aside>
                <el-container>
                    <el-main style="height: 100%;overflow: auto">
                        <el-row :gutter="10" class="d-flex" style="flex-direction: row;flex-wrap: wrap">
                            <el-col v-for="(item,index) in images" :key="index" :span="24" :lg="4" :md="6" :sm="8">
                                <el-card
                                        shadow="hover"
                                        style="cursor: pointer;position: relative"
                                        class="box-card mb-3 mr-3 border border-danger"
                                        :body-style="{'padding': '0'}"
                                        @click.native.stop="imageClick(item)"
                                >
                                    <el-tag effect="dark" size="mini"
                                            style="position: absolute;right: 0;top: 0" type="danger"
                                            v-if="item.imageClick">
                                        {{item.clickOrder}}
                                    </el-tag>
                                    <img class="w-100" style="height: 100px" :src="item.src" alt="">
                                    <el-input v-model="item.desc"
                                              :autofocus="true"
                                              :disabled="imageDescInput !== index"
                                              @blur="blurImageInput"
                                              size="mini"
                                              class="w-100 text-white text-center"
                                              style="background: rgba(0,0,0,0.5)"
                                              placeholder=""></el-input>
                                    <div>
                                        <el-button-group
                                                style="display: flex;justify-content: center;margin-top: 5px;margin-bottom: 5px">
                                            <el-button size="mini" class="p-2" icon="el-icon-view"
                                                       @click="previewImage(index)"></el-button>
                                            <el-button size="mini" class="p-2" icon="el-icon-edit"
                                                       @click="imageDescEdit(index)"></el-button>
                                            <el-button size="mini" class="p-2" icon="el-icon-delete"
                                                       @click="imageDel({index})"></el-button>
                                        </el-button-group>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-main>
                </el-container>
            </el-container>
            <el-footer class="d-flex border-top align-items-center">
<!--                底部分页-->
                <div style="width: 200px;" class="h-100 d-flex align-items-center justify-center">
                    <el-button-group>
                        <el-button  size="mini">上一页</el-button>
                        <el-button  size="mini">下一页</el-button>
                    </el-button-group>
                </div>
                <div class="flex-1;px-2" style="flex-shrink: 0">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[100, 200, 300, 400]"
                            :page-size="100"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="400">
                    </el-pagination>
                </div>
            </el-footer>
        </el-container>

        <!--        修改|创建相册-->
        <el-dialog :title="albumModelTitle" :visible.sync="dialogFormVisible">
            <el-form :model="albumsForm">
                <el-form-item label="相册名称" :label-width="formLabelWidth">
                    <el-input v-model="albumsForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序" :label-width="formLabelWidth">
                    <el-input-number v-model="albumsForm.order" autocomplete="off"></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmAlbumModel">确 定</el-button>
            </div>
        </el-dialog>
        <!--上传-->
        <el-dialog title="上传图片" :visible.sync="UploadFormVisible">
            <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple:true
                    :on-success="upload"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button @click="UploadFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmUploadModel">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 预览图片-->
        <el-dialog :visible.sync="previewImageVisible">
            <img class="w-100" :src="previewImageSrc" alt="">
        </el-dialog>

    </div>
</template>

<script>
    import mixin from '@/common/mixins/common'

    export default {
        name: "camera",
        data() {
            return {
                searchForm: {
                    order: '',
                    inputValue: ''
                },
                albums: [],
                albumsIndex: 0,
                albumsEditIndex: 0,
                albumsEditFlag: 0,
                dialogFormVisible: false,
                albumsForm: {
                    name: '',
                    order: ''
                },
                UploadFormVisible: false,
                fileList: [{
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }],
                formLabelWidth: '120px',
                previewImageVisible: false,
                previewImageSrc: '',
                imageDescInput: '',
                images: [],
                imageClickStatus: {},
                imageClickList: [],
                currentPage:0
            }
        },
        mixins: [mixin],
        computed: {
            albumModelTitle() {
                return this.albumsEditFlag < 0 ? '创建相册' : '修改相册'
            }
        },
        created() {
            this.__init();
            for (let i = 0; i < 25; i++) {
                this.images.push({
                    id: i,
                    src: 'https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/40.jpg',
                    desc: '陌上青夏' + i
                })
            }
            this.images.forEach((item) => {
                this.$set(item, 'imageClick', false);
                this.$set(item, 'clickOrder', 0)
            });
        },

        methods: {
            __init() {
                for (let i = 0; i < 20; i++) {
                    this.albums.push({
                        name: '相册' + i,
                        num: Math.floor(Math.random() * 100),
                        order: i
                    })
                }
            },
            albumsClick(index) {
                this.albumsIndex = index;
            },
            albumDel(obj) {
                this.$confirm(obj.all?'此操作将永久删除选中图片, 是否继续?':'此操作将永久删除该相册, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (!obj.all) {
                        this.albums.splice(obj.index, 1);
                    } else {
                        let list = this.images.filter( (img)=> {
                            return !this.imageClickList.some( (item)=> {
                                return item.id === img.id
                            } )
                        });
                        this.images = list;
                        this.imageClickList = [];
                    }

                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            albumEdit(obj) {
                if (obj) {
                    let {item, index} = obj;
                    //表单初始化
                    this.albumsForm.name = item.name;
                    this.albumsForm.order = item.order;
                    this.albumsEditFlag = 1;
                    this.albumsEditIndex = index;
                    this.dialogFormVisible = true;
                } else {
                    this.albumsForm = {
                        name: "",
                        order: 0
                    };
                    this.albumsEditFlag = -1;
                    this.dialogFormVisible = true;
                }

            },
            //提交表单
            confirmAlbumModel() {
                //表示修改列表
                if (this.albumsEditFlag > 0) {
                    this.albums[this.albumsEditIndex].name = this.albumsForm.name;
                    this.albums[this.albumsEditIndex].order = this.albumsForm.order;
                    return this.dialogFormVisible = false;
                } else {
                    //创建列表
                    this.albums.push({
                        name: this.albumsForm.name,
                        order: this.albumsForm.order
                    });
                    return this.dialogFormVisible = false;
                }
            },
            //编辑图片描述
            imageDescEdit(index) {
                //判断编辑状态，可否编辑可由后端指定 0:前端未编辑状态，1:前端编辑状态，-1：禁止编辑(后端）
                this.imageDescInput = index;
            },
            blurImageInput() {
                this.imageDescInput = -1;
            },
            //预览图片
            previewImage(index) {
                this.previewImageSrc = this.images[index].src;
                this.previewImageVisible = true
            },
            confirmUploadModel() {

            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            upload(response, file, fileList) {
                console.log(response, file, fileList)
            },
            imageDel(index) {
                this.images.splice(index, 1)
            },
            imageClick(item) {

                if (!item.imageClick) {
                    //选中
                    this.imageClickList.push({id: item.id, url: item.url});
                    // 计算序号
                    item.clickOrder = this.imageClickList.length;
                    // 修改状态
                    item.imageClick = true;
                    return;
                } else {
                    //取消选中
                    let i = this.imageClickList.findIndex(v => v.id === item.id);
                    if (i === -1) return;
                    // 重新计算序号
                    let length = this.imageClickList.length;
                    // 取消选中中间部分
                    if (i + 1 < length) {
                        // 重新计算imageList选中序号
                        for (let j = i; j < length; j++) {
                            let no = this.images.findIndex(v => v.id === this.imageClickList[j].id);
                            if (no > -1) {
                                this.images[no].clickOrder--
                            }
                        }
                    }
                    // 删除
                    this.imageClickList.splice(i, 1);
                    // 修改状态
                    item.imageClick = false;
                    // 重置序号
                    item.checkOrder = 0
                }
            },
            handleSizeChange() {

            },
            handleCurrentChange() {

            }
        }
    }
</script>

<style scoped>
    .el-header, .el-footer {

        color: #333;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
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

    .sum-active {
        color: #67C23A !important;
        background-color: #f0f9eb !important;
        border-color: #c2e7b0 !important;
    }
</style>
