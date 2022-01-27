<template>
  <div>
    <el-row class="blog">
      <el-col class="blank_L" :lg="4" :md="2" :sm="0"></el-col>
      <el-col class="blog-content" id="blog_content" :lg="16" :md="20" :sm="24" 
          v-loading="!currentBlog.id || currentBlog.id==0">
        <!-- 具体文章 -->
        <div v-if="currentBlog.id!=0" class="blog-container"
          v-loading="loading.blog"
          element-loading-text="拼命加载中"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          >
          <div class="blog-head float-block">
            <div class="blog-title">{{currentBlog.title}}
              <a @click="downloadMdBlog(currentBlog)" href="javascript:void(0)"><i class="el-icon-download"
               v-if="currentBlog.editor===$base.editorType.SHOW_DOWN"
                style="color: #0d83bb; font-size: 1.2rem; padding: 0.2rem; cursor: hand;"></i></a>
            </div>
            <el-row class="blog-meta">
              <el-col :span="8" class="blog-time">{{currentBlog.createTime}}</el-col>
              <el-col :span="16" style="text-align: left;">
                <el-tag class="blog-tag" type="success" :key="key" v-for="tag,key in currentBlog.tags"
                  :disable-transitions="false"> {{tag.tagName}} </el-tag>
              </el-col>

            </el-row>
          </div>

          <div v-if="currentBlog.editor===$base.editorType.QUILL3_Plus"
              class="ql-snow blog-output float-block">
            <div class="ql-editor" v-html="currentBlog.content"></div>
          </div>
          <div v-else-if="currentBlog.editor===$base.editorType.SHOW_DOWN"
              class="blog-output float-block md-content"  style="text-align: left;">
            <div v-highlight v-html="this.converter.makeHtml(currentBlog.content)"></div>
          </div>
          <div v-else class="blog-output blog-text float-block" v-html="currentBlog.content"></div>

          <div class="blog-refrence float-block" v-if="currentBlog.quotations && currentBlog.quotations.length>0">
            <h4>参阅：</h4>
            <div v-for="q,key in currentBlog.quotations" :key="key">
              <a :href="q.link" target="_blank">{{q.name}}</a>
            </div>
          </div>
        </div>

        <!-- 没有选中文章时 -->
        <div v-else>
          <span> 空空如野~~~ </span>
        </div>

      </el-col>

      <el-col class="blank_R" :lg="4" :md="2" :sm="0"></el-col>
      <!--
      <el-col class="blank_L" :lg="2" :md="2" :sm="2" style="text-align: right;">
        <i class="el-icon-notebook-2" @click="drawer.visible=!drawer.visible"
          style="font-size: 2rem; color: rgb(56, 192, 255); margin-top: 1rem;"></i>
      </el-col>
      -->
    </el-row>

    <div  style="z-index: 20;position: fixed;top: 2rem; right: 0.4rem; font-size: 2.4rem; max-width: 2.5rem;">
        <i class="el-icon-notebook-2" @click="drawer.visible=!drawer.visible" style="color: #63a9d2;"></i>
    </div>


    <el-drawer title="我是标题"  :visible.sync="drawer.visible" :with-header="false"
          size="30em">
        <div class="blog-item-container" v-loading="loading.blogs">
          <div class="blog-item" v-for="item,key in blogs" :key="key">
            <!-- <el-divider></el-divider> -->
            <div class="sim-divider"></div>
            <!-- <div class="blog-item-title" v-html="item.title" @click="showBlog(item)"> -->
              <router-link class="blog-item-title" :to="'/blog/'+item.id">
                <div  v-html="item.title" ></div>
              </router-link>
            <!-- </div> -->
            <div style="text-align: right;"  v-if="$mbapi.hasPermission('blog_add', 'blog_update')">
              <router-link  v-if="item.editor===$base.editorType.QUILL3_Plus"
                :to="{name:'eb', params: {id:item.id}}" target="_blank"><i class="el-icon-edit"></i>
                </router-link>

              <router-link  v-if="item.editor===$base.editorType.SHOW_DOWN"
                :to="{name:'md_update', params: {id:item.id}}" target="_blank"><i class="el-icon-edit"></i>
                </router-link>

              <el-popconfirm
                confirmButtonText='不要了'
                cancelButtonText='我手贱了'
                icon="el-icon-info"
                iconColor="red"
                title="删除这篇文章？"
                @onConfirm="deleteBlog(item.id)"
              >
              <a href="javascript:void(0);" slot="reference"><i class="el-icon-delete"></i></a>
              </el-popconfirm>
            </div>
          </div>
        </div>

          <!-- 分页插件 -->
          <div class="blog-item-page">
            <el-pagination
              @size-change="handleSizeChange()" @current-change="handleCurrentChange" :current-page.sync="pageData.page"
              :page-size="pageData.size" layout="prev, pager, next, jumper" :page-count="pageData.totalPage">
              <!-- 注意适配 -->
              <!-- :page-size="pageData.size" layout="prev, pager, next, jumper" :total="pageData.total"> -->
            </el-pagination>
          </div>

    </el-drawer>

    <div style="height: 120px;"></div>
  </div>
</template>

<script>
  // import SimEditor from './editor/SimEditor.vue'
  import mbapi from '../cfg/mbapi.js'
  var showdown  = require('showdown')
  var FileSaver = require('file-saver');

  export default {
    name: "blog",
    // components: { SimEditor },
    data() {
      return {
        currentTime: new Date(), // 当前时间
        // blogView: true, // 是否是查看具体文章的视图
        currentBlog: { //当前展示的 blog
          id: 0,
          title: null,
          content: null,
          groupType: null,
          createTime: null,
          updateTime: null,
          editor: null,
          valid: null,
          tags: [],
          quotations: [],
          // quotations: [ { name: '百科',  link: 'http://www.baidu.com' } ]
        },
        blogs: null, // 数组
        pageData: {
          page: 0,
          size: 11,
          totalPage: 0,
          keyText: null,
          valid: '1'
        },
        // 加载控制
        loading: {
          blogs: false,
          blog: false
        },
        drawer: {
          visible: false,
        },
        converter: new showdown.Converter()
      }
    },
    created: function() {
      this.currentBlog = {}

      this.searchBlogs(1)

      const bid = this.$route.params.id
      if(bid || bid==0){
        this.showBlog({id: bid})
      } else {
        // id=0表示默认文章
        setTimeout( () => this.showBlog({id: 0}), 2000)
      }
    },

    methods: {
      handleSizeChange: function(arg){
        // 每页数量发生变化
        // console.log('size change')
        // console.log(arg)
        this.searchBlogs(this.pageData.page)
      },
      handleCurrentChange: function(arg){
        // 页码发生变化
        // console.log('page change')
        // console.log(arg)
        this.searchBlogs(this.pageData.page)
      },
      showBlog: function(blog){
        //把默认文章改成第一篇文章
        if(blog.id == 0 && this.blogs.length>0){
          // blog = this.blogs[0]
          this.getBlogInfo(this.blogs[0].id)
        } else {
          this.getBlogInfo(blog.id)
        }

      },

      // 下载 md 博文
      downloadMdBlog: function(blog){
        var blob = new Blob([blog.content], {type: "text/plain;charset=utf-8"})
         FileSaver.saveAs(blob, blog.title+".md");
      },

      // 获取博文详细信息
      getBlogInfo: function(id){
        const _this = this
        this.loading.blog = true
        mbapi.getBlog( { id: id },  (res) => {
          // console.log("get:")
          // console.log(res)
          _this.loading.blog = false
          _this.currentBlog.id = res.data.id
          _this.currentBlog.title = res.data.title
          _this.currentBlog.content = res.data.content
          _this.currentBlog.groupType = res.data.groupType
          _this.currentBlog.editor = res.data.editor
          _this.currentBlog.valid = res.data.valid
          _this.currentBlog.createTime = res.data.createTime
          _this.currentBlog.updateTime = res.data.updateTime
          _this.currentBlog.tags = res.data.tags
          _this.currentBlog.quotations = res.data.quotations;
          // 定位到博文位置 (上面没打分号，被识别成方法了)
          (_this.$el.querySelector('#blog_content')).scrollIntoView();
        }, (res) => {
          _this.loading.blog = false
          if( id != 0 ){ // id=0表示默认文章
            mbapi.error(res.info)
          }
          console.log("get error:")
          console.log(res)
        })
      },

      // 搜索博文信息
      searchBlogs: function(page) {
        const _this = this
        if(!page){
          page = this.pageData.page
        }

        const queryVo = {
          page: page,
          size: this.pageData.size,
          keyText: this.pageData.keyText,
          valid: this.pageData.valid
        }

        this.loading.blogs = true
        mbapi.searchBlogs(queryVo, (res) => {
          console.log('查询结果')
          console.log(res)
          this.loading.blogs = false
          const data = res.data

          _this.pageData.page = data.page
          _this.pageData.size = data.size
          _this.pageData.totalPage = data.totalPage
          _this.blogs = data.datas


          this.loading.blog = false
        }, (res)=>{
          this.loading.blogs = false
          mbapi.error(data.info)
        })
      },

      deleteBlog: function(id){
        mbapi.updateBlog( {id:id, valid: '0'}, (res) => {
         mbapi.info(res.info)
        })
      }
    }

  }
</script>

<style>
  .blank_L .el-calendar-day {
    height: auto !important;
  }

  .blank_L .el-calendar {
    height: 360px;
  }

  .blog-item-container {
    margin-top: 20px;
    background-color: #fff;
    box-shadow: 0 8px 18px rgba(0, 0, 0, .2);
    padding: 8px;
    /* min-height: 440px; */
    /* height: 90vh; */
    max-height: 90vh;
  }

  .blog-item {
    min-height: 22px;
    max-height: 80px;
    text-align: left;
    /* margin: 8px auto; */
    padding: 2px 10px;
    /* border-radius: 8px;
    background-color: whitesmoke; */
  }

  .sim-divider {
    height: 1px;
    margin: 12px 0px;
    background-color: #DCDFE6;
    position: relative;
  }

  .blog-item-title {
    /* color: #42B983; */
    color: #5691a2;
    text-decoration: none;
  }

  .blog-item-title:hover {
    cursor: pointer;
    color: #FF7F50;
  }

  .blog-item-page{
    margin: 20px 0px 10px 0px;
    background-color: #f1f2fb;
  }

  .blog-content {
    margin: 0px 0px 0px 0px;
    padding: 6px 8px;
  }



  .blog-head {
    min-height: 6vh;
    margin-top: 20px;
    padding-bottom: 8px;
  }

  .blog-title {
    font-size: 24px;
    font-weight: bold;
    text-align: left;
    padding: 10px 6px 4px 6px;
    color: #FF7F50;
  }

  .blog-meta {
    margin-top: 10px;
  }

  .blog-tag {
    margin: 2px 1px;
    color: #00bfff;
  }

  .blog-time {
    text-align: left;
    color: grey;
  }

  .blog-output{
    margin-top: 10px;
    min-height: 80vh;
    padding: 10px 8px 10px 8px;
    text-align: left;
  }
  .blog-text {
    text-indent: 2rem;
    color: darkslateblue;
  }

  .md-content{
    font-size: 1rem;
  }

  .blog-refrence {
    margin-top: 10px;
    padding-bottom: 10px;
    text-align: left;
  }

  .el-drawer{
    max-width: 100% !important;
  }

</style>
