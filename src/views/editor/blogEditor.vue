<template>
  <el-row style="padding-top: 50px;padding-bottom: 40px;">

    <el-col class="e_left" :span="1"></el-col>
    <el-col class="e_left" :span="7">
      <el-form>
        <el-form-item class="form_item shadow_item" label="标题">
          <el-input v-model="blogVo.title"></el-input>
        </el-form-item>
        <el-form-item class="form_item shadow_item" label="标签" >
          <el-tag  :key="key" v-for="tag,key in blogVo.tags" closable :disable-transitions="false"
           @close="handleTagClose(tag)"> {{tag.tagName}} </el-tag>
          <el-input class="input-new-tag"
            v-if="tagView.inputVisible" v-model="tagView.inputValue"
            ref="saveTagInput" size="small"
            @keyup.enter.native="handleTagInputConfirm"
            @blur="handleTagInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showTagInput"> + </el-button>
        </el-form-item>
        <el-form-item class="form_item shadow_item" label="归类">
          <el-input v-model="blogVo.groupType"></el-input>
        </el-form-item>

        <el-form-item class="form_buttons">
          <el-button type="primary" size="small" plain
            @click="showCode = !showCode">代码</el-button>
          <el-button type="success" size="small" plain
            @click="openNewQuotation()"> + 参考 </el-button>
          <!-- 还是不要预览了 <el-button type="primary" @click="preview()">预览</el-button> -->
          <el-button type="primary" size="small" @click="addBlog()">添加</el-button>
          <el-button type="success" size="small" @click="updateBlog()">更新</el-button>
        </el-form-item>

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
      </el-form>
    </el-col>

    <!-- 给编辑器预留 -->
    <el-col :span="15" class="" >
         <quill-editor class="editor shadow_item" ref="myTextEditor"
            v-model="blogVo.content"  :options="editorOption"
             @change="onEditorChange()"
             @blur="onEditorBlur($event)"
             @focus="onEditorFocus($event)"
             @ready="onEditorReady($event)"
           />
           <div class="output code" v-if="showCode && showCode===true">
             <code class="hljs" v-html="contentCode"></code>
           </div>
           <!-- 预览部分 -->
           <div class="output ql-snow" v-if="showOutput && showOutput===true">
             <div class="ql-editor" v-html="blogVo.content"></div>
           </div>
    </el-col>

    <el-col class="e_right" :span="1"></el-col>

    <el-dialog title="添加引用" :visible.sync="dialogFormVisible" @beforeClose="beforeCloseQuotationView">
      <el-form :model="quotationView" ref="ruleForm" :rules="rules.quotation">
        <el-form-item label="名称" prop="name">
          <el-input v-model="quotationView.name"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="link">
          <el-input v-model="quotationView.link"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateQuotation()">更 新</el-button>
        <el-button type="primary" @click="addNewQuotation()">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import dedent from 'dedent'
  import hljs from 'highlight.js'
  import debounce from 'lodash/debounce'
  import { quillEditor } from 'vue-quill-editor'

  // highlight.js style
  import 'highlight.js/styles/tomorrow.css'

   // import theme style
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import mbapi from '../../cfg/mbapi.js'


  export default {
    name: 'BlogEditor',
    components: { quillEditor },
    props: {
      // onEditorChange: Function, onEditorBlur: Function,
      // onEditorFocus: Function, onEditorReady: Function,
    },
    data() {
      return {
        editorOption: {
          modules: {
            toolbar: [
               ['bold', 'italic', 'underline', 'strike'],
                 ['blockquote', 'code-block'],
                 ['clean'],
                 // [{ 'header': 1 }, { 'header': 2 }],
                 [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                 [{ 'script': 'sub' }, { 'script': 'super' }],
                 [{ 'indent': '-1' }, { 'indent': '+1' }],
                 [{ 'direction': 'rtl' }],
                 [{ 'size': ['small', false, 'large', 'huge'] }],
                 [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                 [{ 'font': [] }],
                 [{ 'color': [] }, { 'background': [] }],
                 [{ 'align': [] }],

                 ['link', 'image', 'video']
              ] ,
            syntax: {
                highlight: text => hljs.highlightAuto(text).value
            },
          },
        },

        blogVo: {
          id: null,
          title: null,
          content: '',
          groupType: null,

          tags: [ ], // {tagName }
          quotations: [] // { name, link }
        },

        showCode: false, // 是否展示代码
        showOutput: false, // 是否展示预览
        dialogFormVisible: false, //是否展示新增引用视图
        tagView: {
          inputVisible: false, // 新增标签，输入款的可见性
          inputValue: '' // 新增标签的值
        },
        quotationView: {
          index : null,// 更新引用的下标
          name: '' , // 新增引用的名称
          link: '', // 新增引用的链接
        },

        rules: {
          // 添加引用时的验证
          quotation: {
            name: [
                { required: true, message: '请输入引用名称', trigger: 'blur' },
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            link: [
                // { required: true, message: '请输入引用链接', trigger: 'blur' },
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
          }
        },

      }
    },
    computed: {
      editor() {
        return this.$refs.myTextEditor.quill
      },
      contentCode() {
        return hljs.highlightAuto(this.blogVo.content).value
      }
    },
    created: function(){
      console.log("create")
      // this.blogVo.title = '标题'
      // this.blogVo.groupType = '测试'
      // this.blogVo.content = dedent`
      //            <h1 class="ql-align-center"><span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am snow example! </span></h1><p><br></p><p><span class="ql-font-serif">W Can a man still be brave if he's afraid? That is the only time a man can be brave. </span></p><p><br></p><p><strong class="ql-font-serif ql-size-large">Courage and folly is </strong><strong class="ql-font-serif ql-size-large" style="color: rgb(230, 0, 0);">always</strong><strong class="ql-font-serif ql-size-large"> just a fine line.</strong></p><p><br></p><p><u class="ql-font-serif">There is only one God, and his name is Death. And there is only one thing we say to Death: "Not today."</u></p><p><br></p><p><em class="ql-font-serif">Fear cuts deeper than swords.</em></p><p><br></p><pre class="ql-syntax" spellcheck="false"><span class="hljs-keyword">const</span> a = <span class="hljs-number">10</span>;
      //            <span class="hljs-keyword">const</span> editorOption = { <span class="hljs-attr">highlight</span>: <span class="hljs-function"><span class="hljs-params">text</span> =&gt;</span> hljs.highlightAuto(text).value };</pre><p><br></p><p><span class="ql-font-serif">Every flight begins with a fall.</span></p><p><br></p><p><a href="https://surmon.me/" rel="noopener noreferrer" target="_blank" class="ql-font-serif ql-size-small" style="color: rgb(230, 0, 0);"><u>A ruler who hides behind paid executioners soon forgets what death is. </u></a></p><p><br></p><iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0" height="238" width="560"></iframe><p><br></p><p><span class="ql-font-serif">Hear my words, and bear witness to my vow. Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the fire that burns against the cold, the light that brings the dawn, the horn that wakes the sleepers, the shield that guards the realms of men. I pledge my life and honor to the Night’s Watch, for this night and all the nights to come.</span></p><p><br></p><p><span class="ql-font-serif">We are born to suffer, to suffer can make us strong.</span></p><p><br></p><p><span class="ql-font-serif">The things we love destroy us every time.</span></p>
      //          `
      // this.blogVo.tags = [ {tagName: '标签1'},{tagName: '标签2'},{tagName: '标签3'},{tagName: '标签4'} ],
      // this.blogVo.quotations = [
      //   { name: '百度一下', link:'https://www.baidu.com' },
      //   { name: 'BiliBli干杯', link:'https://www.bilibili.com' },
      //   { name: 'CS', link:'http://www.wanforme.cc' },
      //   { name: '百度一下', link:'http://www.baidu.com' }
      // ]

      this.checkAndInitBlog()
    },
    methods: {
      /** 视图渲染部分 **/
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
      // 预览
      preview: function(){
        this.$alert(this.blogVo.content, {
          dangerouslyUseHTMLString: true
        });
      },
      // 打开引用添加视图
      openNewQuotation: function() {
        this.dialogFormVisible = true
      },
      // 添加新引用
      addNewQuotation: function() {
        // console.log(this.quotationView)
        const temp = {
          name: this.quotationView.name,
          link: this.quotationView.link
        }
        this.blogVo.quotations.push(temp)
        this.dialogFormVisible = false
        this.quotationView.index = null
        this.quotationView.name = ''
        this.quotationView.link = ''
        // console.log(this.blogVo.quotations)
      },
      // 关闭前的检查
      beforeCloseQuotationView: function(done){
        if ( !this.quotationView.name || this.quotationView.link
        || this.quotationView.name==='' || this.quotationView.link===''){
          console.log("未通过")
          mbapi.error("信息不完整")
          return
        } else {
          console.log("通过")
          done()
        }
      },
      // 编辑引用
      editQuotation: function(q){
        console.log("edit")
        const index = this.blogVo.quotations.indexOf(q)
        const temp = JSON.parse(JSON.stringify(this.blogVo.quotations[index]))
        this.quotationView = temp // this.blogVo.quotations[index]
        this.quotationView.index = index
        this.dialogFormVisible = true
      },
      // 删除引用
      deleteQuotation: function(q){
        this.blogVo.quotations.splice(this.blogVo.quotations.indexOf(q), 1)
      },
      // 更新引用
      updateQuotation: function(){
        console.log("update")
        if(!this.quotationView.index && this.quotationView.index!=0) {
          mbapi.error('该引用不能更新')
          return
        }
        const temp = this.blogVo.quotations[this.quotationView.index]
        temp.name = this.quotationView.name
        temp.link = this.quotationView.link

        this.dialogFormVisible = false
        this.quotationView = { index: null, name: '', link: '' }
      },


      /** 后台交互部分 **/
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
        })
      },

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
        blogVo.editor = this.$base.editorType.QUILL3_Plus
        const _this = this
        mbapi.addBlog(blogVo, function(res){
          if(res.data){
            _this.blogVo = _this.poToVo(res.data) 
          }
          mbapi.info(res.info)
        })
      },

      // 初始化时，检查是否是更新某个博文
      checkAndInitBlog: function() {
        const bid = this.$route.params.id
        if ( bid ){
          this.getBlog(bid)
        }
      },

      // quill编辑器事件
      onEditorChange: function(){
        this.$emit('onEditorChange')
      },
      onEditorBlur: function(){
        this.$emit('onEditorBlur')
      },
      onEditorFocus: function(){
        this.$emit('onEditorFocus')
      },
      onEditorReady: function(){
        this.$emit('onEditorReady')
      },

    }
  };
</script>

<style scoped>
  .e_left{
    padding: 10px;
  }
  .e_right{
    padding: 10px;
  }
  .form_item {
    padding: 4px 6px 6px 8px;
    background-color: #fff;
  }
  .shadow_item{
    box-shadow: 0 0 3px 3px hsla(0,0%,40.5%,.2);
    -webkit-box-shadow: 0 0 3px 3px hsla(0,0%,40.5%,.2);
  }
  .el-tag{
    margin-right: 2px;
    /* z-index: 10; */
  }

  .form_buttons button{
    margin: 2px 0px !important;
  }
  .ql-container, .ql-editor {
    height: 700px;
    overflow-y: auto;

    -ms-overflow-style: none; /*IE10+*/
    overflow: -moz-scrollbars-none; /* firefox */
   }
  /** 隐藏滚动条*/
  .ql-container::-webkit-scrollbar{
    width: 0 !important; /* 谷歌 safari*/
  }


   .editor-bottom{
    min-height: 20px;
    border-top: 1px solid #ccc;
   }

  /** 隐藏滚动条*/
  .ql-editor::-webkit-scrollbar {
    width: 0 !important; /* 谷歌 safari*/
  }
  .ql-editor{
    -ms-overflow-style: none; /*IE10+*/
    overflow: -moz-scrollbars-none; /* firefox */
  }

  /* 输出框*/
  .output{
    margin-top: 10px;
  }

  .ql-tooltip, .ql-editing{
    /* left: 2px !important; */
  }

</style>
