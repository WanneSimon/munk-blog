<template>
  <div>
    <el-dialog :visible="viewVisible"
        :title="''"  @beforeClose="beforeViewClose">

      <el-upload
        class="upload_container"
        ref="uploadForm"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSucess"
        :on-error="handleError"
        :file-list="fileList"
        :auto-upload="false"
        :drag = 'false'
        list-type="picture">
        <!-- <el-button size="small" type="primary">点击上传</el-button> -->
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>

    </el-dialog>
  </div>
</template>

<script>
  import mbapi from '../cfg/mbapi.js'

  export default {
    name: 'UploadModule',
    props: {
        onSucess: { type: Function, default: function(data){ console.log("sucess");console.log((data)) } } ,// 文件上传成功后的处理
        viewVisible: { type:Boolean, default: true } // 上传显示
    },
    data() {
      return {
        // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        successList: [ {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
          {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        ],
      }
    },
    computed: {

    },
    created: function(){
    },
    methods: {
      // 关闭弹框
      beforeViewClose: function(done){
        this.viewVisible = false
        done()
      },
      // 文件操作
      submitUpload: function() {
        this.$refs.uploadForm.submit();
      },
      handleRemove: function(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview: function(file) {
        console.log(file);
      },
      // 文件上传成功
      handleSucess: function(data) {
        // 添加到 filelist
        // {id, name, base, filename, type, valid, createTime, updateTime}
        this.successList.push({name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'})
        console.log(this.successList)
        console.log(data)


        this.onSucess(data)
      },
      handleError: function(data){
        console.log("error")
        console.log(data)
      }

    }
  };
</script>

<style scoped>
  .upload_container{
    min-height: 200px;
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
