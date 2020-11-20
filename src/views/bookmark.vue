<template>
   <el-row class="bookmark float-block">
     <el-col :span="1" class="blank_L"></el-col>

     <el-col :span="22">
        <el-row class="bookmark-head ">
          <el-col :span="4"> Bookmark </el-col>
          <el-col :span="20" style="text-align: right;">
            <el-input placeholder="请输入内容" style="width: 160px;" v-model="searchInput" clearable>
            </el-input>
            <i class="el-icon-search clickable"
                @click="search()"></i>&emsp;
            <!-- <i class="el-icon-circle-plus-outline clickable"></i>&emsp; -->
            <i class="el-icon-document-add"
                @click="openBookmarkDialog()" ></i>
          </el-col>
        </el-row>

        <el-row class="bookmark-container ">

          <el-col :span="6"
            class="bm_left">
              <div class="box-card_folder" shadow="hover"
                v-for="f,key in folders" :key="key"
                  @mouseover="onFolderHover(f,true)" @mouseout="onFolderHover(f,false)">
                <div class="folder_name">{{f.name}}</div>
                <div class="folder_op" v-show="testVisible(f, '__folderVisible')">
                  <i class="el-icon-circle-plus-outline clickable"
                        @click="openBookmarkDialog({})" style="color:#409eff;font-size: 1.1rem;"></i>
                  <i class="el-icon-edit clickable"
                        @click="openFolderRenameDialog({})" style="color:#409eff;font-size: 1.1rem;"></i>
                  <el-popconfirm
                    confirmButtonText='不要了'
                    cancelButtonText='再考虑考虑'
                    icon="el-icon-info"
                    iconColor="red"
                    title="删除此文件夹？(书签会移动到默认目录下)"
                    @onConfirm="deleteFolder(item.id)"
                  >
                  <i class="el-icon-delete" slot="reference"
                    clickable style="color:#f56c6c;font-size: 1.1rem;" ></i>
                  </el-popconfirm>
<!--                  <i class="el-icon-remove-outline clickable"
                        style="color:#f56c6c"></i> -->
                </div>
              </div>
          </el-col>

          <el-col :span="18"
            class="bm_right">
               <div class="box-card_content" shadow="hover"
                 v-for="bm,key in bookmarks" :key="key"
                  @mouseover="onBmHover(bm,true)" @mouseout="onBmHover(bm,false)">
                 <div class="bm_name"><a :href="bm.link" :target="'_blank'">{{bm.name}}</a></div>
                 <div class="bm_op" v-show="testVisible(bm,'__bmVisible')">
                   <i class="el-icon-info clickable"
                      @click="openBookmarkDialog({})" style="color:#409eff"></i>
                   <i class="el-icon-rank clickable"
                      @click="openMoveBookmarkDialog()" style="color:#f56c6c"></i>
                 </div>
               </div>
            </el-col>

        </el-row>

        <el-dialog title=""
          :visible.sync="view.dialogVisible"
          width="60%" center top="3rem">

          <!-- 书签添加弹窗 -->
          <div class="bookmark_dialog" v-if="view.bmVisible">
            <el-form :model="bookmarkVo" >
              <el-form-item label="文件夹" :rules="rules.addBookmark.folderName" prop="folderName">
                <el-input v-model="bookmarkVo.folderName" :disabled="view.folderNameDisabled"></el-input>
              </el-form-item>
              <el-form-item label="书签名" :rules="rules.addBookmark.name" prop="name">
                <el-input v-model="bookmarkVo.name" ></el-input>
              </el-form-item>
              <el-form-item label="Link" :rules="rules.addBookmark.link" prop="link">
                <el-input v-model="bookmarkVo.link"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="bookmarkVo.description" ></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="bookmarkVo.remark"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="view.dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addBookmark()">确 定</el-button>
            </div>
          </div>

          <!-- 书签更新弹窗 -->
          <div class="bookmark_dialog" v-if="view.bmMoveVisible" >
            <el-form :model="bookmarkVo" >
              <el-form-item label="文件夹" :rules="rules.addBookmark.folderName" prop="folderName">
                <el-input v-model="bookmarkVo.folderName" ></el-input>
              </el-form-item>
              <el-form-item label="书签名" >
                <el-input v-model="bookmarkVo.name" disabled></el-input>
              </el-form-item>
              <el-form-item label="Link" >
                <el-input v-model="bookmarkVo.link" disabled></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="bookmarkVo.description" disabled></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="bookmarkVo.remark" disabled></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="view.dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="changeFolder()">确 定</el-button>
            </div>
          </div>

          <!-- 文件夹改名弹窗 -->
          <div class="bookmark_dialog" v-if="view.folderRenameVisible" >
            <el-form :model="bookmarkVo" >
              <el-form-item label="移动到其它文件夹或更改名字" :rules="rules.addBookmark.folderName" prop="folderName">
                <el-input v-model="bookmarkVo.folderName" ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="view.dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="changeFolder()">确 定</el-button>
            </div>
          </div>

        </el-dialog>


      </el-col>

      <el-col :span="1" class="blank_L"></el-col>

   </el-row>
</template>

<script>
  import mbapi from '../cfg/mbapi.js'

  export default {
    name: "bookmark",
    // components: { SimEditor },
    data() {
      return {
        searchInput: '',
        folders: [],
        bookmarks: [],

        view: {
          dialogVisible: false, // 弹框的可见性
          bmVisible: false, // 弹窗中书签表单的可见性
          bmMoveVisible: false, // 移动书签的弹窗
          folderRenameVisible: false, //重命名文件夹的视图

          folderNameDisabled: false, // 书签表单中文件夹的名字是否可编辑
        },

        // 新增书签的 vo
        bookmarkVo: {
          id: null,
          folderId: null,
          folderName: '',
          name: '',
          link: '',
          description: '',
          remark: ''
        },

        rules: {
          addBookmark: {
            folderName: [{ required: true, message: '请输入文件夹', trigger: 'blur' }],
            name: [{ required: true, message: '请输入标签名', trigger: 'blur' }],
            link: [{ required: true, message: '请输入链接', trigger: 'blur' }],
          }
        }

      }
    },
    created: function(){
      this.folders = [ {name:"学习学习学习学习学习学习学习学习学习学习学习学习学习学习"}, {name:"注释"}, {name:"网络"}, {name:"轻语"}]
      this.bookmarks = [
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"https://dnzs.ykit.cn/nr-4-3034-0.html"},
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"https://dnzs.ykit.cn/nr-4-3034-0.html"},
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"https://dnzs.ykit.cn/nr-4-3034-0.html"},
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"https://dnzs.ykit.cn/nr-4-3034-0.html"},
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"https://dnzs.ykit.cn/nr-4-3034-0.html"},
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"https://dnzs.ykit.cn/nr-4-3034-0.html"},
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"https://dnzs.ykit.cn/nr-4-3034-0.html"},
        {name: 'Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识Windows Apps 在默认状态下无法访问本地回环端口_有客电脑知识', link:"wwwhttps://dnzs.ykit.cn/nr-4-3034-0.html"}
      ]
    },
    methods: {
      // 视图
      testVisible: function(ob, attr){
        if(!ob[attr]) {
          return false
        }
        return true
      },
      onBmHover: function (bm,isHover) {
        this.$set(bm, '__bmVisible', isHover)
        // bm.bmVisible = isHover
      },
      onFolderHover: function (f,isHover) {
        this.$set(f, '__folderVisible', isHover)
        // f.folderVisible = isHover
      },
      clearFormValidate: function(){
        // this.$refs.bookmarkVo.clearValidate()
        // this.$refs.bookmarkVo.clearValidate()
      },
      // 清除书签vo
      clearBookmarkVo: function(){
        this.bookmarkVo.folderId = null,
        this.bookmarkVo.folderName = '',
        this.bookmarkVo.name = '',
        this.bookmarkVo.link = '',
        this.bookmarkVo.description = '',
        this.bookmarkVo.remark = ''
      },
      // 打开书签视图 (传入书签参数)
      openBookmarkDialog: function(bm){
        this.clearBookmarkVo()
        this.clearFormValidate()

        this.view.folderVisible = false
        this.view.bmMoveVisible = false
        this.view.folderRenameVisible = false
        this.view.bmVisible = true
        this.view.dialogVisible = true

        this.view.folderNameDisabled = bm ? true:false


      },
      // 移动书签视图
      openMoveBookmarkDialog: function(){
        this.clearBookmarkVo()
        this.clearFormValidate()

        this.view.folderVisible = false
        this.view.bmVisible = false
        this.view.folderRenameVisible = false
        this.view.bmMoveVisible = true
        this.view.dialogVisible = true

      },
      // 文件夹重命名视图
      openFolderRenameDialog: function(){
        this.clearBookmarkVo()
        this.clearFormValidate()

        this.view.folderVisible = false
        this.view.bmVisible = false
        this.view.bmMoveVisible = false
        this.view.folderRenameVisible = true
        this.view.dialogVisible = true

      },

      // 功能
      // 搜索功能（批量查询）
      search: function(){

      },
      // 删除一个文件夹
      deleteFolder: function(folderId){

      },
      // 添加书签
      addBookmark: function() {
        // this.view.dialogVisible=false;
        // this.view.bmVisible=false;

        const vo = {
          folderId: null,
          folderName: this.bookmarkVo.folderName,
          name: this.bookmarkVo.name,
          link: this.bookmarkVo.link,
          description: this.bookmarkVo.description,
          remark: this.bookmarkVo.remark
        }

        // mbapi.addBookmark(vo, (res) => {})
        mbapi.addBookmark(vo)
      },
      // 修改单个书签所属的文件夹
      changeBookmarkFolder: function(){
        if(this.bookmarkVo.folderId){
          mbapi.error("没有选中文件夹，请检查")
          return;
        }

        if(this.bookmarkVo.folderId){
          mbapi.error("没有选中文件夹，请检查")
          return;
        }

        const voArr = [{
          folderId: this.bookmarkVo.folderId,
          folder: this.bookmarkVo.folderName
        }]
        mbapi.updateFolder(voArr)
      },

      // 更新单个书签详细信息
      updateBookmark: function(){

      },

      // 获取单个书签详细信息
      getBookmark: function(){

      },
      
      // 获取所有文件夹
      getAllFolders: function(){
      
      },
    }

  }
</script>

<style scoped>
  i{
    font-size: 1.5rem;
  }
  .bookmark{
    background-color: #eae8ea !important;
    min-width: 620px;
  }

  .bookmark-head{
    padding: 10px;
    color: darkgoldenrod;
    box-shadow: 0 2px 4px rgba(0,0,0,.2);
    background-color: #fefefe;
  }

  .bm_left, .bm_right{
    margin-top: 1px;
    padding-top: 0.2rem;
    min-height: 46rem;
    background-color: #fefefe;
    box-shadow: 0 2px 4px rgba(0,0,0,.2);
  }

  .bm_right{
    background-color: #efefef;
  }

  .clickable:hover{
    cursor: pointer;
  }


  .box-card_folder {
    padding: 0.2rem !important;
    margin: 0.3rem 1rem;
    height: 1.4rem;
    font-size: 1rem;
    text-align: left;
    line-height: 1.4rem;
    border-radius: 6px;
/*    background-color: #f9f9f9ed; */
    background-color: #ebecef;

    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
  }

  .folder_name{
    flex: 12;
    color: #4eb143;
    z-index: 0;

    padding: 2px 8px;
    /* background-color: #ebecef; */

    overflow: hidden;  /*溢出内容隐藏*/
    white-space: nowrap;  /* 强制文本在一行内显示*/
    text-overflow: ellipsis; /*当对象内文本溢出时显示省略标记*/
  }
  .folder_op{
    flex: 4;
    text-align: right;
    z-index: 1;
    min-width: 2.2rem;
  }

  .box-card_content {
    padding: 2px 8px !important;
    margin: 1rem;
    height: 2.2rem;
    line-height: 2.2rem;

/*    background-color: #fff; */
    border-radius: 6px;
    box-shadow: 0 2px 18px rgba(0,0,0,.2);

    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
  }
  .bm_name {
    flex: 11;
    text-align: left;
    overflow: hidden;  /*溢出内容隐藏*/
    white-space: nowrap;  /* 强制文本在一行内显示*/
    text-overflow: ellipsis; /*当对象内文本溢出时显示省略标记*/
  }
  .bm_name a{
    text-decoration: none;
    color: #bd4782;
  }
  .bm_op {
    flex: 2;
    min-width: 4rem;
  }
</style>
