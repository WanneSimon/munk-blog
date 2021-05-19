<template>
  <div>
      <el-row>
        <el-col class="blank_L" :lg="4" :md="2" :sm="0"></el-col>
        <el-col  :lg="16" :md="20" :sm="24">
           <el-row>
             <el-col :lg="24" :md="24" :sm="24">
              <el-form style="margin-left: 10%;margin-top: 2rem;">
                <el-form-item label="标题">
                  <el-input v-model="blogVo.title"></el-input>
                </el-form-item>
                <el-form-item label="标签" >
                  <el-tag  :key="key" v-for="tag,key in blogVo.tags" closable :disable-transitions="false"
                   @close="handleTagClose(tag)"> {{tag.tagName}} </el-tag>
                  <el-input class="input-new-tag"
                    v-if="tagView.inputVisible" v-model="tagView.inputValue"
                    ref="saveTagInput"
                    @keyup.enter.native="handleTagInputConfirm"
                    @blur="handleTagInputConfirm"
                  >
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showTagInput"> + </el-button>
                </el-form-item>
                <el-form-item label="归类">
                  <el-input v-model="blogVo.groupType"></el-input>
                </el-form-item>

                <el-form-item class="form_buttons">
                  <el-button v-if="!blogVo.id" type="primary" size="small" @click="addBlog()">添加</el-button>
                  <el-button v-else type="success" size="small" @click="updateBlog()">更新</el-button>
                </el-form-item>
                <!--
                <el-form-item>
                  <div v-for="q,key in blogVo.quotations" :key="key" style="text-align: left;">
                    <a :href="q.link" target="_blank">{{q.name}}</a>
                    <a href="javascript:void(0);" @click="editQuotation(q)"><i class="el-icon-edit"></i></a>
                    <el-popconfirm
                      confirmButtonText='不要了'
                      cancelButtonText='我手贱了'
                      icon="el-icon-info"
                      iconColor="red"
                      title="删除这条引用？"
                      @onConfirm="deleteQuotation(q)"
                    >
                    <a href="javascript:void(0);" slot="reference"><i class="el-icon-delete"></i></a>
                    </el-popconfirm>
                  </div>
                </el-form-item>
                -->
              </el-form>
             </el-col>

             <el-col :lg="12" :md="12" :sm="12">
              </textarea>
              <el-input class="inputErea"
                type="textarea"
                :rows="30"
                placeholder="请输入内容"
                @change="wordsChange"
                v-model="blogVo.content">
              </el-input>
             </el-col>

             <el-col :lg="12" :md="12" :sm="12" >
              <!-- <pre v-highlight> -->
                <div class="htmlView" v-highlight v-html="htmlContent" ></div>
               <!-- </pre> -->
             </el-col>

           </el-row>
        </el-col>
        <el-col class="blank_R" :lg="4" :md="2" :sm="0"></el-col>
        <el-col class="blank_R" :lg="24" :md="24" :sm="24" style=" height: 6rem;"></el-col>
      </el-row>

  </div>
</template>

<script>
  var showdown  = require('showdown')
  import mbapi from '../../cfg/mbapi.js'

  export default {
    data() {
      return {
        // content: '',
        htmlContent: '',
        converter: null,

        blogVo: {
          id: null,
          title: null,
          content: '',
          groupType: null,

          tags: [ ], // {tagName }
          quotations: [] // { name, link }
        },
        tagView: {
          inputVisible: false, // 新增标签，输入款的可见性
          inputValue: '' // 新增标签的值
        },
      }
    },
    computed: {

    },
    mounted: function(){
      // 测试高亮展示
      // let blocks = decoument.querySelectorAll('pre code');
      // blocks.forEach((block)=>{
      //   hljs.highlightBlock(block)
      // })
    },
    created(){
      this.converter = new showdown.Converter()
      // console.log(this.converter.makeHtml('~~~ java int a = 10; ~~~'))
      this.checkAndInitBlog()
    },
    methods: {
      /** 视图渲染部分 **/
      wordsChange(){
        console.log(this.blogVo.content)
        if(this.blogVo.content && this.blogVo.content!=''){
          this.htmlContent = this.converter.makeHtml(this.blogVo.content)
        } else {
          this.htmlContent = ''
        }
      },
      // 移除一个标签
      handleTagClose: function(tag) {
        this.blogVo.tags.splice(this.blogVo.tags.indexOf(tag), 1)
      },
      // 新增标签，展示输入框
      showTagInput: function() {
        this.tagView.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      // 处理新增标签
      handleTagInputConfirm: function() {
        let inputValue = this.tagView.inputValue
        if (inputValue) {
          this.blogVo.tags.push( { tagName: inputValue})
        }
        this.tagView.inputVisible = false
        this.tagView.inputValue = ''
      },

      // 后台交互
      // 初始化时，检查是否是更新某个博文
      checkAndInitBlog: function() {
        const bid = this.$route.params.id
        if ( bid ){
          this.getBlog(bid)
        }
      },
      // po 转 vo
      poToVo: function(po) {
        return {
          id: po.id,
          title: po.title,
          content: po.content,
          groupType: po.groupType,
          tags: po.tags,
          quotations: po.quotations
        }
      },
      // vo 转 要存储的vo
      voToPo: function(vo) {
        return {
          id: vo.id,
          title: vo.title,
          content: vo.content,
          groupType: vo.groupType,
          tags: vo.tags,
          quotations: vo.quotations
        }
      },
      getBlog: function(id){
        const _this = this
        mbapi.getBlog( { id: id },  function (res) {
          console.log("get:")
          console.log(res)

          _this.blogVo = _this.poToVo(res.data)
          _this.wordsChange()
        })
      },
      // 更新
      updateBlog: function(){
        if (!this.blogVo.id) {
          mbapi.error("该文章似乎是新文章")
          return
        }

        // 转为要存储的vo
        const blogVo =this.voToPo(this.blogVo)
        const _this = this
        mbapi.updateBlog( blogVo, function (res) {
          _this.blogVo = _this.poToVo(res.data)
          mbapi.info(res.info)
        })
      },

      addBlog: function(){
        console.log("add")
        console.log(this.blogVo)

        if( this.blogVo.id || this.blogVo.id==0 ) {
          mbapi.error("该文章似乎是更新文章")
          return
        }

        if( !this.blogVo.title ) {
          mbapi.error("标题还没有填啊")
          return
        }

        if( !this.blogVo.content ) {
          mbapi.error("写点什么吧")
          return
        }

        if( !this.blogVo.tags ) {
          mbapi.error("加个标签吧")
          return
        }

        const blogVo = this.voToPo(this.blogVo)
        blogVo.editor = this.$base.editorType.SHOW_DOWN
        const _this = this
        mbapi.addBlog(blogVo, function(res){
          if(res.data){
            _this.blogVo = _this.poToVo(res.data)
          }
          mbapi.info(res.info)
        })
      },

    },


  }

</script>

<style scoped>
  .inputErea{
    width: 100%;
    height: 100%;
  }

  .htmlView{
    /* min-height: 1px; */
    height: 100%;
/*    overflow-y: show; */
    text-align: left;
    margin-left: 1rem;
    padding: 6px;
    background-color: whitesmoke;
    min-height: 40rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .el-form-item {
    text-align: left !important;
  }
  .el-input {
    text-align: right !important;
  }
  .input-new-tag {
    max-width: 6rem;
  }
  .form_buttons{
    text-align: right !important;
    margin-right: 16%;
  }
</style>
