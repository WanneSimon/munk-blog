<template>
  <div>
    <el-row class="blog">
      <el-col class="blank_L" :span="2" style="max-width:360px;"></el-col>

      <el-col :span="20">

          <el-col class="book-block float-block" :span="7"
            v-for="book,key in books" :key="key">

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
                </el-col>
              </el-row>

              <p class="book-desc">{{book.desciption}}</p>
          </el-col>


        </el-col>
     </el-row>


      <el-col class="blank_R" :span="2" style="max-width:360px;"></el-col>
    </el-row>
    
    <div style="height: 200px;"></div>
  </div>
</template>

<script>
  export default {
    name: "books",
    data() {
      return {
        // imageFits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        fit: 'contain',
        books: [
          {id: 1, name: '你不知道的JavaScript', img:'', desciption:'没看过', process: '0'},
          {id: 2, name: '深入学习Java虚拟机', img:'', desciption:' Java虚拟机：它是由一组规范所定义出的抽象计算机。主要任务就是负责将字节码封装到内部，解释/编译为对应平台上的机器指令执行', process: '0'},
          {id: 3, name: 'Reids实战', img:'', desciption:'Redis（Remote Dictionary Server )，即远程字典服务，是一个开源的使用ANSI C语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API。从2010年3月15日起，Redis的开发工作由VMware主持。', process: '1'},
          {id: 4, name: '深入理解Spring（2版）', img:'', desciption:'没看过', process: '0'},
          {id: 5, name: 'Vue实战', img:'', desciption:'没看过', process: '0'},
          {id: 6, name: 'kafka中间件', img:'', desciption:'没看过', process: '0'}
        ]
      }
    },
    created: function() {

    }
  }
</script>

<style scoped>

  .book-block{
    text-align: left;
    margin-top: 20px;
    margin-right: 20px;
    padding: 8px 8px 10px 8px;
    height: 200px;
    min-width: 260px;
    max-width: 310px;
  }

  .book-image{
    width: 100px;
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
    height: 100%;
    /* max-width: 300px; */
    width: 100%;
    overflow: hidden;  /*溢出内容隐藏*/
    white-space: nowrap;  /*强制文本在一行内显示*/
    text-overflow: ellipsis; /*当对象内文本溢出时显示省略标记*/
    font-size: 14px;
  }
</style>
