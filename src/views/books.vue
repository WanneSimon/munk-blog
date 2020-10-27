<template>
  <div>
    <el-row class="blog">
      <!-- <el-col class="blank_L" :span="2" style="max-width:360px;"></el-col> -->
      <el-col class="blank_L" :span="2" ></el-col>

      <el-col :span="20">
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


      <!-- <el-col class="blank_R" :span="2" style="max-width:360px;"></el-col> -->
      <el-col class="blank_R" :span="2" ></el-col>
    </el-row>

    <!-- <div style="height: 200px;"></div> -->
  </div>
</template>

<script>
  import TitleTagEditor from '../components/TitleTagEditor.vue'
  import mbapi from '../cfg/mbapi.js'

  export default {
    name: "books",
    components: { TitleTagEditor },
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
        longText: 'ES6， 全称 ECMAScript 6.0 ，是 JavaScript 的下一个版本标准，2015.06 发版。'+
+'\nES6 主要是为了解决 ES5 的先天不足，比如 JavaScript 里并没有类的概念，但是目前浏览器的 JavaScript 是 ES5 版本，大多数高版本的浏览器也支持 ES6，不过只实现了 ES6 的部分特性和功能。'
+'\nJavaScript 是大家所了解的语言名称，但是这个语言名称是商标（ Oracle 公司注册的商标）。因此，JavaScript 的正式名称是 ECMAScript 。1996年11月，JavaScript 的创造者网景公司将 JS 提交给国际化标准组织 ECMA（European computer manufactures association，欧洲计算机制造联合会），希望这种语言能够成为国际标准，随后 ECMA 发布了规定浏览器脚本语言的标准，即 ECMAScript。这也有利于这门语言的开放和中立。'
+'\nES6 是 ECMAScript 标准十余年来变动最大的一个版本，为其添加了许多新的语法特性。'
+'\n'
+'\n1997 年 ECMAScript 1.0 诞生。'
+'\n1998 年 6 月 ECMAScript 2.0 诞生，包含一些小的更改，用于同步独立的 ISO 国际标准。'
+'\n1999 年 12 月 ECMAScript 3.0诞生，它是一个巨大的成功，在业界得到了广泛的支持，它奠定了 JS 的基本语法，被其后版本完全继承。直到今天，我们一开始学习 JS ，其实就是在学 3.0 版的语法。'
+'\n2000 年的 ECMAScript 4.0 是当下 ES6 的前身，但由于这个版本太过激烈，对 ES 3 做了彻底升级，所以暂时被"和谐"了。'
+'\n2009 年 12 月，ECMAScript 5.0 版正式发布。ECMA 专家组预计 ECMAScript 的第五个版本会在 2013 年中期到 2018 年作为主流的开发标准。2011年6月，ES 5.1 版发布，并且成为 ISO 国际标准。'
+'\n2013 年，ES6 草案冻结，不再添加新的功能，新的功能将被放到 ES7 中；2015年6月， ES6 正式通过，成为国际标准。',
        dialogs: {}

      }
    },
    mounted () {
    },
    created: function() {
      this.books =  [ ]

      var _this = this
      this.requestPage( 1, function(res){
        _this.searchVo.page = res.data.pageNum
        _this.searchVo.totalPage = res.data.pages
        _this.books = res.data.list
        // console.log(res )
        // console.log(_this.books  )
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

    }
  }
</script>

<style>

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
