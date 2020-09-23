<template>
  <div>
    <el-row class="blog">
      <!-- <el-col class="blank_L" :span="2" style="max-width:360px;"></el-col> -->
      <el-col class="blank_L" :span="2" ></el-col>

      <el-col :span="20">

          <el-col class="book-block" :span="5"
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
                  </el-col>


                </el-row>

                <p class="book-desc" @click="setDialog(book, true)">{{book.desciption}}</p>
                <!-- <el-popover placement="top-start"   :title="book.title" trigger="click" width="400"
                    :content="longText">
                  <p class="book-desc" slot="reference">{{book.desciption}}</p>
                </el-popover> -->
                <el-dialog  :title="book.title" :visible.sync="dialogs[book.id]"
                  width="50%" >
                  <span>{{book.desciption}}</span>
                  <!-- <span slot="footer" class="dialog-footer">
                    <el-button @click="setDialog(book, false)"> 关闭 </el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                  </span> -->
                </el-dialog>

              </div>
          </el-col>


        </el-col>
     </el-row>


      <!-- <el-col class="blank_R" :span="2" style="max-width:360px;"></el-col> -->
      <el-col class="blank_R" :span="2" ></el-col>
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
        ],
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
    created: function() {
      this.books =  [
          {id: 1, name: '你不知道的JavaScript', img:'', desciption:'没看过', process: '0'},
          {id: 2, name: '深入学习Java虚拟机', img:'', desciption:' Java虚拟机：它是由一组规范所定义出的抽象计算机。主要任务就是负责将字节码封装到内部，解释/编译为对应平台上的机器指令执行', process: '0'},
          {id: 3, name: 'Reids实战', img:'', desciption:'Redis（Remote Dictionary Server )，即远程字典服务，是一个开源的使用ANSI C语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API。从2010年3月15日起，Redis的开发工作由VMware主持。', process: '1'},
          {id: 4, name: '深入理解Spring（2版）', img:'', desciption:'没看过', process: '0'},
          {id: 5, name: 'Vue实战', img:'', desciption:'没看过', process: '0'},
          {id: 6, name: 'kafka中间件', img:'', desciption:'没看过', process: '0'}
        ]
    },
    methods: {
      setDialog: function(book, visible){
        this.$set(this.dialogs, book.id, visible)
      }
    }
  }
</script>

<style>

  .book-block{
    text-align: left;
/*    margin-top: 20px;
    margin-right: 20px; */
    margin: auto;
    padding: 8px 8px 10px 8px;
    height: 200px;
    min-width: 260px;
    /* max-width: 310px; */
  }

  .book-block-item-wrapper{
    margin: 10px 4px;
  }
  .book-image{
    /* width: 100px; */
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
