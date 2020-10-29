<template>
  <div>
    <el-row class="blog">
      <!-- <el-col class="blank_L" :span="2" style="max-width:360px;"></el-col> -->
      <el-col class="blank_L" :span="2" ></el-col>

      <el-col :span="20">
          <!-- 上传组件 -->
          <!-- <UploadModule :viewVisible="uploadVisible" :afterClose="function() {uploadVisible=false}"></UploadModule> -->

          <title-tag-editor id="book_editor" class="simEditor"  v-if="$mbapi.hasPermission('book_add', 'book_update')"
            @onAdd="addBook" @onUpdate="updateBook"
            :showCode="false" :showOutput="false" :titleName="'书名'" :data="editorVo"
            style="min-height:40px; " >
          </title-tag-editor>

          <el-row class="book-container"
              v-infinite-scroll="nextPage" infinite-scroll-immediate='true'>
            <el-col class="book-block" :span="4"
              v-for="book,key in books" :key="key">
                    <!-- <el-button slot="reference">hover 激活</el-button> -->
                <div class="book-block-item-wrapper float-block">
                  <el-row>
                    <el-col :span="10">
                      <el-image class="book-image" :src="book.url" :fit='fit'>
                        <div slot="placeholder" class="image-slot">
                          加载中<span class="dot">...</span>
                        </div>
                        <div slot="error" class="image-slot">
                                <!-- <i class="el-icon-picture-outline"></i> -->
                            <img style="width: 100%;height: 100%;" :src="'/coco/static/images/book-default.jpg'" />
                        </div>
                      </el-image>
                    </el-col>

                    <el-col :span="14" class="book-right">
                      <div class="book-name">{{book.name}}</div>
                      <div v-if="$mbapi.hasPermission('book_add', 'book_update')">
                        <a href="javascript:void(0);" @click="editBook(book.id)"><i class="el-icon-edit"></i></a>
                        <a href="javascript:void(0);" @click="openUpload(book.id)"><i class="el-icon-upload"></i></a>
                        <el-popconfirm
                          confirmButtonText='不要了'
                          cancelButtonText='我只是手贱了'
                          icon="el-icon-info"
                          iconColor="red"
                          title="不要这本书了吗？"
                          @onConfirm="deleteBook(c.id)"
                        >
                        <a href="javascript:void(0);" slot="reference"><i class="el-icon-delete"></i></a>
                        </el-popconfirm>
                      </div>
                    </el-col>
                  </el-row>

                  <p class="book-desc" @click="setDialog(book, true)" v-html="book.description"></p>
                  <el-dialog class="output ql-snow " :title="book.title" :visible.sync="dialogs[book.id]"
                    width="50%" >
                      <div>  &nbsp;<span class="ql-editor" v-html="book.description"></span>
                      </div>
                  </el-dialog>

                </div>
            </el-col>
          </el-row>

        </el-col>
     </el-row>

<!--    <el-dialog :visible.sync="moduleVisible"
          :before-close="beforeUploadClose"
          :title="''" > -->
    <el-dialog :visible.sync="moduleVisible"
          :title="''" >

        <!-- action="https://jsonplaceholder.typicode.com/posts/" -->
        <el-upload
          class="upload_container"
          ref="uploadForm"
          :action="$base.api_context+$base.file_upload"
          :on-preview="function(){}"
          :on-remove="deleteUpload"
          :on-success="successUpload"
          :on-error="function(){}"
          :file-list="successList"
          :auto-upload="false"
          :drag = 'false'
          :close-on-click-modal	= 'false'
          :limit='1'
          :on-exceed="()=>$message({type:'error', message:'封面仅限一个哦！'})"
          list-type="picture">
          <!-- <el-button size="small" type="primary">点击上传</el-button> -->
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="$refs.uploadForm.submit()">上传文件</el-button>
          <el-button size="small" type="primary" @click="updateCover()">确认封面</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>

    </el-dialog>


      <!-- <el-col class="blank_R" :span="2" style="max-width:360px;"></el-col> -->
      <el-col class="blank_R" :span="2" ></el-col>
    </el-row>

    <!-- <div style="height: 200px;"></div> -->
  </div>
</template>

<script>
  import TitleTagEditor from '../components/TitleTagEditor.vue'
  // import UploadModule from '../components/UploadModule.vue'
  import mbapi from '../cfg/mbapi.js'

  export default {
    name: "books",
    components: { TitleTagEditor}, //UploadModule },
    data() {
      return {
        // imageFits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        fit: 'contain',
        books: [],
        searchVo: { // 搜索对象
          page: 0,
          size: 20,
          totalPage: 0,
          name: null,
          // text: null,
          valid: '1'
        },

        tempVo: '',// 正在被编辑的对象
        editorVo: { title: '', content: '' }, // 编辑器中的对象
        dialogs: {},

        // 上传组件中的变量
        moduleVisible: false,
        successList: [
          // {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
          // {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        ],
        uploadBookId: null, // 更新封面的书籍id
      }
    },
    mounted: function(){
    },
    created: function() {
      this.books =  [ ]

      var _this = this
      this.requestPage( 1, function(res){
        _this.searchVo.page = res.data.pageNum
        _this.searchVo.totalPage = res.data.pages
        _this.books = res.data.list
      })
    },
    methods: {
      setDialog: function(book, visible){
        this.$set(this.dialogs, book.id, visible)
      },
      addBook: function(data){
        // console.log("add!");
        // console.log(data)
        const bookVo =  {name: data.title, description: data.content, valid: '1'}
        const _this = this

        mbapi.addBook(
          bookVo,
          function(res){
            mbapi.info(res.info)
            // console.log(res)
        })
        // this.books.push({id: this.maxId, name: data.title, img:'', desciption: data.content, process: '0'})
      },

      // 选中需要编辑的对象
      editBook: function(bookId){
        this.tempVo = {}
        this.editorVo = { title: '', content: '' }

        const _this = this
        mbapi.getBook({id: bookId}, function(res){
          // console.log("res")
          // console.log(res)
           _this.tempVo = res.data
           _this.editorVo.title = res.data.name
           _this.editorVo.content = res.data.description; // 这个分号不要删，解释器好像把后面的一起识别成函数了
           // console.log(1)

           (_this.$el.querySelector('#book_editor')).scrollIntoView()
           // _this.$refs.title_tag_editor.blur()
        })
      },
      updateBook: function(data){
        const _this = this
        console.log("update")
        console.log(data)
        mbapi.updateBook(
          {
             id: this.tempVo.id,
             name: data.title,
             description: data.content,
          }, function(res){
            mbapi.info(res.info)
            _this.editorVo = {}
            _this.tempVo = {}
          })
      },
      deleteBook: function(id){
        mbapi.updateBook(
          {
             id: id,
             valid: '0'
          }, function(res){
            mbapi.info(res.info)
          })
      },

      // 搜索页
      requestPage: function(page, callback){
        console.log("page : " + page)

        var requestVo = JSON.parse(JSON.stringify(this.searchVo))
        if(page > this.searchVo.totalPage) {
          requestVo.page = this.searchVo.totalPage
        } // else
        if( page <= 0 ) {
          requestVo.page = 1
        } else {
          requestVo.page = page
        }
        mbapi.searchBook( requestVo, callback)
      },
      // 下一页
      nextPage: function(){
        if( this.searchVo.page > 0
          && this.searchVo.page < this.searchVo.totalPage ){
            var _this = this
            this.requestPage( this.searchVo.page+1, function(res){
              _this.searchVo.page = res.data.pageNum
              _this.searchVo.totalPage = res.data.pages
              // _this.comics.datas = res.data.list

              for(var i in res.data.list){
                _this.books.push(res.data.list[i])
              }
            })
         }
      },

      // 打开上传页面
      openUpload: function(id){
        this.uploadBookId = id
        this.moduleVisible = true
      },
      // 关闭上传页面前
      beforeUploadClose: function(done){
        console.log("关闭前")
        this.uploadBookId = null
        this.successList = []
        done()
      },
      // 单个文件上传成功
      successUpload: function(resVo, resFile){
        // resVo - 服务器的返回信息 ， resFile则是上传结束后的 组件封装的信息
        // this.successList 不会变成 resFile
        if(resVo.code != this.$base.SUCCESS){
          mbapi.error(resVo.info)
          console.log("上传错误")
          console.log(resVo)
          return
        }

        console.log("成功上传")
        console.log(resVo)
        console.log(resFile)
        console.log(this.successList)

        this.successList.push({id: resVo.data.id, name: resFile.name, url: this.$base.api_context + this.$base.file_get.replace('\{id\}', resVo.data.id)})

        // setTimeout(()=> {
        //   console.log("延时查看")
        //   console.log(this.successList)
        // }, 3000)
      },
      // 移除上传的文件
      deleteUpload: function(file, fileList){
        // file 是successList中被删除的那个对象， fileList 是删除后的列表
        // this.successList 不会变成 fileList
        console.log("删除上传")
        console.log(file)
        console.log(fileList)
        console.log(this.successList)

        const fileVo = {
          id: file.id,
          valid: '0',
        }
        mbapi.updateFile(fileVo, (res)=>{
          for (var i in this.successList){
            var temp = this.successList[i]
            if(temp.id == file.id){
              mbapi.info("删除成功")
              this.successList.remove(temp)
              break;
            }
          }
        }, (res)=>{
          mbapi.error(res.info)
        })

        // this.successList = fileList
      },
      // 文件上传结束，更新封面
      updateCover: function(){
        if(!this.uploadBookId && this.uploadBookId!=0){
          mbapi.info("找不到需要更新的文件......")
        }

        //
        if(!this.successList || this.successList.length==0){
          mbapi.info("文件呢？")
        }

        const vo = {
          id: uploadBookId,
          cover: {
            fileId: this.successList[0]
          }
        }
        mbapi.book_update( vo, (res)=>{
          mbapi.info(res.info)
          console.log("封面设置成功")
          console.log(res.info)
        })
      },
    },
  }
</script>

<style scoped>

  .book-container{
    margin: 40px 0px 10px 0px;
    -ms-overflow-style: none; /*IE10+*/
    overflow: -moz-scrollbars-none; /* firefox */

    height:800px;
    overflow:auto;
  }
  /** 隐藏滚动条*/
  .book-container::-webkit-scrollbar {
    width: 0 !important; /* 谷歌 safari*/
  }

  .book-block{
    text-align: left;
    margin: auto;
    padding: 8px 8px 10px 8px;
    height: 200px;
    min-width: 260px;
  }

  .book-block-item-wrapper{
    margin: 10px 4px;
  }
  .book-image{
    height: 100px;
    margin-right: 8px;
  }

  .book-right{

  }
  .book-name{
    padding: 5px 3px;
  }
  .book-desc{
    /* background: gainsboro; */
    /* width: 200px; */     /*设置文字显示宽度*/
    /* height: 100%; */
    width: 100%;
    height: 50px;
    overflow: hidden;  /*溢出内容隐藏*/
    white-space: nowrap;  /* 强制文本在一行内显示*/
    text-overflow: ellipsis; /*当对象内文本溢出时显示省略标记*/
    font-size: 14px;
  }


</style>
