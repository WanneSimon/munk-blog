<template>
  <div>
    <el-row class="blog">
      <el-col class="blank_L" :span="8" style="max-width:360px;">
        <el-calendar v-model="currentTime"></el-calendar>

        <div class="blog-item-container" v-loading="loading.blogs">
          <div class="blog-item" v-for="item,key in blogs" :key="key">
            <div class="blog-item-title" v-html="item.title" @click="showBlog(item)"></div>
            <div style="text-align: right;">
              <!-- <a href="javascript:void(0);" @click="editBlog(item.id)"></a> -->
              <router-link :to="{name:'eb', params: {id:item.id}}" target="_blank"><i class="el-icon-edit"></i></router-link>
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
          <!-- 分页插件 -->
          <div class="blog-item-page">
            <el-pagination
              @size-change="handleSizeChange()" @current-change="handleCurrentChange" :current-page.sync="pageData.page"
              :page-size="pageData.size" layout="prev, next, jumper" :page-count="pageData.totalPage">
              <!-- 注意适配 -->
              <!-- :page-size="pageData.size" layout="prev, pager, next, jumper" :total="pageData.total"> -->
            </el-pagination>
          </div>
        </div>

      </el-col>

      <el-col class="blog-content" :span="15">
        <!-- 具体文章 -->
        <div v-if="blogView" class="blog-container"
          v-loading="loading.blog"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          >
          <div class="blog-head float-block">
            <div class="blog-title">{{currentBlog.title}}</div>
            <el-row class="blog-meta">
              <el-col :span="8" class="blog-time">{{currentBlog.createTime}}</el-col>
              <el-col :span="16" style="text-align: left;">
                <!-- {{currentBlog.tags}} -->
                <!-- <span class="blog-tag" v-for='tag,key in currentBlog.tags' :key='key'>{{tag}}</span> -->
                <el-tag class="blog-tag" type="success" :key="key" v-for="tag,key in currentBlog.tags"
                  :disable-transitions="false"> {{tag.tagName}} </el-tag>
              </el-col>

            </el-row>
          </div>

          <div v-if="currentBlog.editor===$base.editorType.QUILL3_Plus"
              class="ql-snow blog-output float-block">
            <div class="ql-editor" v-html="currentBlog.content"></div>
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
        <div v-if="!blogView">
          <span> 快来看看我的文章吧 </span>
        </div>

      </el-col>

      <!-- <el-col class="blank_R" :span="3"></el-col> -->
    </el-row>

    <div style="height: 120px;"></div>
  </div>
</template>

<script>
  // import SimEditor from '../components/SimEditor.vue'
  import mbapi from '../cfg/mbapi.js'

  export default {
    name: "blog",
    // components: { SimEditor },
    data() {
      return {
        currentTime: new Date(), // 当前时间
        blogView: false, // 是否是查看具体文章的视图
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
        blogs: [],
        pageData: {
          page: 0,
          size: 10,
          totalPage: 0,
          keyText: null,
          valid: '1'
        },
        // 加载控制
        loading: {
          blogs: false,
          blog: false
        }
      }
    },
    created: function() {
      this.currentBlog = {}

       this.searchBlogs(1)
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
        // 切换博文
        this.blogView = true
        this.getBlogInfo(blog.id)
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
          _this.currentBlog.quotations = res.data.quotations
        }, (res) => {
          _this.loading.blog = false
          mbapi.error(data.info)
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
          // console.log(_this.pageData)
          // console.log(_this.blogs)
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
  }

  .blog-item {
    min-height: 22px;
    max-height: 80px;
    text-align: left;
    margin: 8px auto;
    padding: 2px 10px;
    border-radius: 8px;
    background-color: whitesmoke;
  }

  .blog-item-title {
    color: #42B983;
  }

  .blog-item-title:hover {
    cursor: pointer;
  }

  .blog-item-page{
    margin: 20px 0px 10px 0px;
  }

  .blog-content {
    margin: 0px 10px 0px 10px;
    padding: 6px 8px;
  }



  .blog-head {
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
    padding: 10px 8px 10px 8px;
  }
  .blog-text {
    text-align: left;
    text-indent: 2rem;
    color: darkslateblue;
  }

  .blog-refrence {
    margin-top: 10px;
    padding-bottom: 10px;
    text-align: left;
  }
</style>
