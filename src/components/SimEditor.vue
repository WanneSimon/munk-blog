<template>
  <el-row >

    <!-- <el-col :span="4"></el-col> -->
    <!-- 给编辑器预留 -->
    <el-col :span="width" :offset="offset" class="editor-container">
      <el-collapse accordion>
         <el-collapse-item title="">

           <template slot="title" style="text-align: right;">
                 <div>编辑器<i class="header-icon el-icon-info"></i></div>
           </template>

           <quill-editor class="editor" ref="myTextEditor"
            v-model="content"  :options="editorOption"
             @change="onEditorChange()"
             @blur="onEditorBlur($event)"
             @focus="onEditorFocus($event)"
             @ready="onEditorReady($event)"
           />
           <div class="output code" v-if="showCode && showCode===true">
             <code class="hljs" v-html="contentCode"></code>
           </div>
           <!-- 自定义按钮部分 -->
           <div class="editor-bottom">
             <el-button type="primary" @click="addClick()">添加</el-button>
             <el-button type="primary" @click="updateClick()">更新</el-button>
           </div>
           <!-- 预览部分 -->
           <div class="output ql-snow" v-if="showOutput && showOutput===true">
             <div class="ql-editor" v-html="content"></div>
           </div>
         </el-collapse-item>
      </el-collapse>
    </el-col>

   <!-- <el-col :span="4"></el-col> -->

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

  export default {
    name: 'SimEditor',
    components: { quillEditor },
    props: {
      // onEditorChange: { type:Function, default: function(){ console.log("onEditorChange") } },
      onEditorBlur: { type:Function, default: function(){ console.log("onEditorBlur") } },
      onEditorFocus: { type:Function, default: function(){ console.log("onEditorFocus") } },
      onEditorReady: { type:Function, default: function(){ console.log("onEditorReady") } },
      onAdd: { type:Function, default: function(){ console.log("onAdd") } },
      onUpdate: { type:Function, default: function(){ console.log("onUpdate") } },
      showCode: Boolean, // 是否展示代码
      showOutput: Boolean, // 是否展示预览
      background: String, // 背景颜色
      width: { type: Number, default: 16}, // 宽度
      offset: { type: Number, default: 4}, // 左偏移量
      // right: { type: Number, default: 4}, // 宽度

      data: { type: String, default:''},// 绑定的数据
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
        // content: '',
        // content_test: dedent`
        //          <h1 class="ql-align-center"><span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am snow example! </span></h1><p><br></p><p><span class="ql-font-serif">W Can a man still be brave if he's afraid? That is the only time a man can be brave. </span></p><p><br></p><p><strong class="ql-font-serif ql-size-large">Courage and folly is </strong><strong class="ql-font-serif ql-size-large" style="color: rgb(230, 0, 0);">always</strong><strong class="ql-font-serif ql-size-large"> just a fine line.</strong></p><p><br></p><p><u class="ql-font-serif">There is only one God, and his name is Death. And there is only one thing we say to Death: "Not today."</u></p><p><br></p><p><em class="ql-font-serif">Fear cuts deeper than swords.</em></p><p><br></p><pre class="ql-syntax" spellcheck="false"><span class="hljs-keyword">const</span> a = <span class="hljs-number">10</span>;
        //          <span class="hljs-keyword">const</span> editorOption = { <span class="hljs-attr">highlight</span>: <span class="hljs-function"><span class="hljs-params">text</span> =&gt;</span> hljs.highlightAuto(text).value };</pre><p><br></p><p><span class="ql-font-serif">Every flight begins with a fall.</span></p><p><br></p><p><a href="https://surmon.me/" rel="noopener noreferrer" target="_blank" class="ql-font-serif ql-size-small" style="color: rgb(230, 0, 0);"><u>A ruler who hides behind paid executioners soon forgets what death is. </u></a></p><p><br></p><iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0" height="238" width="560"></iframe><p><br></p><p><span class="ql-font-serif">Hear my words, and bear witness to my vow. Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the fire that burns against the cold, the light that brings the dawn, the horn that wakes the sleepers, the shield that guards the realms of men. I pledge my life and honor to the Night’s Watch, for this night and all the nights to come.</span></p><p><br></p><p><span class="ql-font-serif">We are born to suffer, to suffer can make us strong.</span></p><p><br></p><p><span class="ql-font-serif">The things we love destroy us every time.</span></p>
        //        `,

      }
    },
    computed: {
      editor() {
        return this.$refs.myTextEditor.quill
      },
      contentCode() {
        // return hljs.highlightAuto(this.content).value
        return hljs.highlightAuto(this.data).value
      }
    },
    created: function(){

    },
    methods: {
      onEditorChange: function(){
        this.$emit('onEditorChange')
      },

      addClick: function(){
        console.log("add clicked!")
        const context = this
        this.$confirm('添加新内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('onAdd', this.content)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      updateClick: function(){
        console.log("update clicked!")
        const context = this
        this.$confirm('添加新内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.onUpdate(this.content);
        }).catch((e) => {
          console.log(e)
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }

    }
  };
</script>

<style scoped>
  /* .editor>.ql-container{
    height: 20rem;
    overflow-y: hidden;
    min-height: 300px !important;
   } */

   .editor-bottom{
    min-height: 20px;
    border-top: 1px solid #ccc;
    padding-top: 8px;
   }
  .editor-container{
    padding: 10px;
    background-color: #fff;
  }
  /** 隐藏滚动条*/
  .ql-editor::-webkit-scrollbar {
    width: 0 !important; /* 谷歌 safari*/
  }
  .ql-editor{
    -ms-overflow-style: none; /*IE10+*/
    overflow: -moz-scrollbars-none; /* firefox */
   }

</style>
