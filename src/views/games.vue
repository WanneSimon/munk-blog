<template>
  <div>
    <el-row class="games">
      <el-col class="blank_L" :span="2" style="max-width:360px;"></el-col>

      <el-col :span="20">
          <title-tag-editor class="simEditor" id="game_editor"
            @onAdd="addGame" @onUpdate="updateGame" v-if="$mbapi.hasPermission()"
            :showCode="false" :showOutput="false" :titleName="'名称'" :data="editorVo"
            style="min-height:40px; " >
          </title-tag-editor>

          <el-row class="game-container"
              v-infinite-scroll="nextPage" infinite-scroll-immediate='true'>
            <el-col class="game-block" :span="4"
              v-for="g,key in games" :key="key">
                <!-- <el-button slot="reference">hover 激活</el-button> -->
                <div class="game-block-item-wrapper float-block">

                  <el-row>
                    <el-col :span="10">
                      <el-image class="game-image" :src="g.url" :fit='fit'>
                        <div slot="placeholder" class="image-slot">
                          加载中<span class="dot">...</span>
                        </div>
                        <div slot="error" class="image-slot">
                                <!-- <i class="el-icon-picture-outline"></i> -->
                            <img style="width: 100%;height: 100%;" :src="'/coco/static/images/book-default.jpg'" />
                        </div>
                      </el-image>
                    </el-col>

                    <el-col :span="14" class="game-right">
                      <div class="game-name">{{g.name}}</div>
                      <div>
                        <a href="javascript:void(0);" @click="editGame(g.id)"><i class="el-icon-edit"></i></a>
                        <el-popconfirm
                          confirmButtonText='退坑'
                          cancelButtonText='继续受苦'
                          icon="el-icon-info"
                          iconColor="red"
                          title="不玩了吗？"
                        >
                        <a href="javascript:void(0);" slot="reference"><i class="el-icon-delete"></i></a>
                        </el-popconfirm>
                      </div>
                    </el-col>
                  </el-row>


                  <p class="game-desc" @click="setDialog(g, true)" v-html="g.desciption"></p>
                  <el-dialog  class="output ql-snow " :title="g.title" :visible.sync="dialogs[g.id]"
                    width="50%" >
                    <div>  &nbsp;<span class="ql-editor" v-html="g.desciption"></span>
                    </div>
                  </el-dialog>

              </div>
            </el-col>
          </el-row>


        </el-col>
     </el-row>


      <el-col class="blank_R" :span="2" style="max-width:360px;"></el-col>
    </el-row>

    <div style="height: 200px;"></div>
  </div>
</template>

<script>
  import TitleTagEditor from '../components/TitleTagEditor.vue'
  import mbapi from '../cfg/mbapi.js'

  export default {
    name: "games",
    components: { TitleTagEditor },
    data() {
      return {
        // imageFits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        fit: 'contain',
        games: [],
        searchVo: { // 搜索对象
          page: 0,
          size: 20,
          totalPage: 0,
          name: null,
          // text: null,
          valid: '1'
        },
        maxId: 6,

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
    created: function() {
      // this.games =  [
      //   {id: 1, name: 'CS GO', img:'', desciption:'V社经典 cs 的延续', process: '0'},
      //   {id: 2, name: '奥日与黑暗森林', img:'', desciption:'Ori and The Blind Forest, 2015 惊艳世界的横版游戏，音乐、玩法、美术各方面都是无法超越的巅峰', process: '1'},
      //   {id: 3, name: '奥日与萤火意志', img:'', desciption:'Ori and The Wisps, 奥日与黑暗森林的延续，开放式地图，全新的技能和机制。将2D横版类游戏发挥到了极致。', process: '1'},
      //   {id: 4, name: '空洞骑士', img:'', desciption:'Hellow Knight, 2D横版动作游戏，类银河风，有着优秀的美术风格和打斗极致，动作流程，打击感十足。不少人称之为“2d黑魂”', process: '1'},
      //   {id: 5, name: '无主之地3', img:'', desciption:'V社2020年，无主之地系列的最后一部。是个RPG刷刷刷宝箱的开放世界FPS射击游戏。我映像最深的是 中文配音 十分接地气。', process: '0'},
      //   {id: 6, name: '求生之路2', img:'', desciption:'Left 4 Dead 2, V社 2008发售的 《求生之路》续作，融合了一代的所有内容。是合作、丧尸、末日类的求生射击游戏，靠着创意工坊，至今任然非常火', process: '1'}
      // ]

      this.games =  [ ]

      var _this = this
      this.requestPage( 1, function(res){
        _this.searchVo.page = res.data.pageNum
        _this.searchVo.totalPage = res.data.pages
        _this.games = res.data.list
        // console.log(res )
        // console.log(_this.games  )
      })

    },
    methods: {
      setDialog: function(game, visible){
        this.$set(this.dialogs, game.id, visible)
      },

      addGame: function(data){
        // console.log("add callback")
        // console.log(data)
        const bookVo =  {name: data.title, description: data.content, valid: '1'}
        const _this = this

        mbapi.addGame(
          bookVo,
          function(res){
            mbapi.info(res.info)
            // console.log(res)
        })

        // this.maxId = this.maxId + 1
        // this.games.push({id: this.maxId, name: data.title, img:'', desciption: data.content, process: '0'})
      },

      // 选中需要编辑的对象
      editGame: function(bookId){
        this.tempVo = {}
        this.editorVo = { title: '', content: '' }

        const _this = this
        mbapi.getGame({id: bookId}, function(res){
          // console.log("res")
          // console.log(res)
           _this.tempVo = res.data
           _this.editorVo.title = res.data.name
           _this.editorVo.content = res.data.description; // 这个分号不要删，解释器好像把后面的一起识别成函数了
           // console.log(1)

           (_this.$el.querySelector('#game_editor')).scrollIntoView()
           // _this.$refs.title_tag_editor.blur()
        })
      },

      updateGame: function(data){
        console.log("update callback")
        console.log(data)

        const _this = this
        console.log("update")
        console.log(data)
        mbapi.updateGame(
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
        mbapi.updateGame(
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
        mbapi.searchGame( requestVo, callback)
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
                _this.games.push(res.data.list[i])
              }
            })
         }
      },


    }
  }
</script>

<style>
  .game-container{
    margin: 40px 0px 10px 0px;
    -ms-overflow-style: none; /*IE10+*/
    overflow: -moz-scrollbars-none; /* firefox */

    height:800px;
    overflow:auto;
  }
  /** 隐藏滚动条*/
  .game-container::-webkit-scrollbar {
    width: 0 !important; /* 谷歌 safari*/
  }

  .game-block{
    text-align: left;
    margin: auto;
    padding: 8px 8px 10px 8px;
    height: 200px;
    min-width: 260px;
    /* max-width: 310px; */
  }

  .game-image{
    /* width: 100px; */
    height: 100px;
    margin-right: 8px;
  }

  .game-right{

  }
  .game-name{
    padding: 5px 3px;
  }
  .game-desc{
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
