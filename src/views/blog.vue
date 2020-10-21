<template>
  <div>
    <el-row class="blog">
      <el-col class="blank_L" :span="8" style="max-width:360px;">
        <el-calendar v-model="currentTime"></el-calendar>

        <div class="blog-item-container">
          <div class="blog-item" v-for="item,key in blogs.datas" :key="key">
            <div class="blog-item-title" v-html="item.title" @click="showBlog(item.id)"></div>
          </div>
          <!-- 分页插件 -->
          <div class="blog-item-page">
            <el-pagination
              @size-change="handleSizeChange()" @current-change="handleCurrentChange()" :current-page.sync="pageData.page"
              :page-size="pageData.size" layout="prev, next, jumper" :total="pageData.totalPage">
              <!-- 注意适配 -->
              <!-- :page-size="pageData.size" layout="prev, pager, next, jumper" :total="pageData.total"> -->
            </el-pagination>
          </div>
        </div>

      </el-col>

      <el-col class="blog-content" :span="15">
        <!-- 具体文章 -->
        <div v-if="blogView" class="blog-container">
          <div class="blog-head float-block">
            <div class="blog-title">{{currentBlog.title}}</div>
            <el-row class="blog-meta">
              <el-col :span="16" style="text-align: left;">
                <!-- {{currentBlog.tags}} -->
                <span class="blog-tag" v-for='tag,key in currentBlog.tags' :key='key'>{{tag}}</span>
              </el-col>
              <el-col :span="8" class="blog-time">{{currentBlog.createTime}}</el-col>
            </el-row>
          </div>
          <div class="blog-text float-block" v-html="currentBlog.content"></div>
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
        blogs: {
          datas: []
        },
        pageData: {
          page: 0,
          size: 10,
          totalPage: 0,
          keyText: null,
          valid: '1'
        }
      }
    },
    created: function() {
      this.blogs.datas = [
            {id:1,title:"麻辣火锅羊肉串"},
            {id:2,title:"葱姜"},
            {id:3,title:"欸，又加班，我想回家。"},
            {id:4,title:"提丰孙宇"},
            {id:5,title:"麻辣火锅羊肉串"},
            {id:6,title:"麻辣火锅羊肉串"},
            {id:7,title:"麻辣火锅羊肉串"},
            {id:8,title:"麻辣火锅羊肉串<br>水水水水<br>嗡嗡嗡"},
            {id:9,title:"麻辣火锅羊肉串"}
      ]

      this.currentBlog = { //当前展示的 blog
          id: 10,
          title: '疯狂动物城',
          tags: '动物城,百科,朱迪,动漫,影视',
          createTime: '2020-09-15',
          content: '一个现代化的动物都市，每种动物在这里都有自己的居所，有沙漠气候的撒哈拉广场、常年严寒的冰川镇等等，它就像一座大熔炉，动物们在这里和平共处——无论是大象还是小老鼠，只要努力，都能闯出一番名堂。兔子朱迪从小就梦想能成为动物城市的警察，尽管身边的所有人都觉得兔子不可能当上警察，但她还是通过自己的努力，跻身到了全是大块头动物城警察局，成为了第一个兔子警官。为了证明自己，她决心侦破一桩神秘案件。追寻真相的路上，朱迪迫使在动物城里以坑蒙拐骗为生的狐狸尼克帮助自己，却发现这桩案件背后隐藏着一个意欲颠覆动物城的巨大阴谋，他们不得不联手合作，去尝试揭开隐藏在这巨大阴谋后的真相 [3-4]。' +
            '在最初组成狐尼克和兔朱迪的想法构建之前，该片一直是以狐尼克为主打的，而狐尼克的形象来自于迪斯尼1973年的动画电影《罗宾汉》中的狐狸罗宾汉形象 [13]  。' +
            '<br>' +
            '<br>在《冰雪奇缘》里为安娜公主配音的克里斯汀·贝尔在该片为粉红女树懒普希拉配音，因为事实上克里斯汀·贝尔非常喜欢树懒。抢劫花店的威斯顿公爵由艾伦·图代克配音，艾伦同时也为《冰雪奇缘》中同名的威斯顿公爵配音 [14]  。' +
            '<br>' +
            '<br>该片中有64种动物，动画师保留了真实动物的特点并将其带到片中角色中 [15]  。' +
            '<br>' +
            '<br>该片是荣获过多项大奖的作曲家迈克·吉亚奇诺与迪士尼动画工作室第一部合作的动画长片 [16]  。' +
            '<br>' +
            '<br>金妮弗·古德温之前为动画配音的经验很少，创作人员一开始就让她参与其中，给她展示电影的创作和人物形象，帮助她了解角色的方方面面 [15]  。' +
            '<br>' +
            '<br>片中警察局长是一只体型健硕的公牛，剧组研究了健身人士的日常搭配以及肌肉比较发达的警官穿衣风格，于是在最终稿里把脖子那里的扣子打开了一颗 [17]  。' +
            '<br>' +
            '<br>黑帮老大原设定为一头北极熊，他的手下也是一群北极熊，执行制片人约翰·拉塞特认为，应该通过不同类型的角色抖更多的笑料，把黑帮老大设定为北极熊没惊喜可言。编剧之一吉姆·里尔顿提议，给黑帮老大取名为“大先生”（Mr. Big） [18]  。' +
            '<br>' +
            '<br>该片有致敬好莱坞黑帮片《教父》的味道，片中的鼩鼱“大先生”说着一口地道的的意大利口音，为大先生配音的莫利斯·拉马谢非常擅长模仿马龙·白兰度 [14]  。' +
            '<br>' +
            '<br>设计角色时，制作方会把明星的照片贴出来，以供员工参考，让他们知道角色大概是什么感觉 [18]  。' +
            '<br>' +
            '<br>该片最初是一个关于间谍的故事，类似一部动物版007，片名叫《Savage Sees》，但没人喜欢这个片名，后来采用《Zootopia》。因在欧洲、英国等地面临着版权问题，所以不得不进行更改，在欧洲地区片名为《Zootropolis》 [18]  。' +
            '<br>' +
            '<br>该片绵羊道格的穿着打扮以及在车厢里利用蒸馏设备制毒的方式，是在对美剧《绝命毒师》致敬。道格身边两只为其购买咖啡的羊助手分别叫做“沃特”与“杰西”，这恰好是《绝命毒师》中两位主人公的名字 [10]  。' +
            '<br>' +
            '<br>伊德瑞斯·艾尔巴配音的牛局长跟他在罪案剧《火线》里的眼镜形象几乎一样，同时牛局长的霸气与犄角造型还原了伊德瑞斯在《雷神》中扮演的彩虹桥守护者海姆达尔 [14]  [17]  。' +
            '<br>' +
            '<br>制作方想把世界各地的动物都放进影片中，但没有空间塞进去，所以就为各个国家特别定制了一些角色。比如在北美地区上映的版本中，主播是一只麋鹿，由一位加拿大主持人配音；在澳大利亚版本中主播是一只考拉；在日本是一只狸猫；在中国是一只熊猫；在巴西就是一只美洲豹；英国则是柯基犬 [18]  。' +
            '<br>' +
            '<br>动物城里的人气天后夏奇羊，其造型和服饰的设计灵感都来自于拉丁美洲天后夏奇拉，夏奇羊的配音也由夏奇拉亲自上阵担纲的。',
          reference: [{
              name: '百科',
              link: 'http://www.baidu.com'
            },
            {
              name: '百度百科',
              link: 'http://www.baidu.com'
            }
          ]
        }

        //
        this.pageData.current = 1

    },

    methods: {
      handleSizeChange: function(arg){
        // 每页数量发生变化
        console.log('size change')
        console.log(arg)
        this.searchBlogs(this.pageData.page)
      },
      handleCurrentChange: function(arg){
        // 页码发生变化
        console.log('page change')
        console.log(arg)
        this.searchBlogs(this.pageData.page)
      },
      showBlog: function(id){
        // 切换博文
        this.blogView = true
        this.getBlogInfo(id)
      },

      // 获取博文详细信息
      getBlogInfo: function(id){
        const _this = this
        mbapi.getBlog( { id: id },  function (res) {
          console.log("get:")
          console.log(res)
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
        })
      },

      // 搜索博文信息
      searchBlogs: function(page) {
        const _this = this
        const queryVo = {
          page: this.pageData.page,
          size: this.pageData.size,
          keyText: this.pageData.keyText,
          valid: this.pageData.valid
        }

        mbapi.searchBlogs(queryVo, function(res) {
          console.log('查询结果')
          console.log(res)

          _this.pageData.page = res.page
          _this.pageData.size = res.pageNum
          _this.pageData.totalPage = res.totalPage
          _this.blogs.datas = res.list
        })
      },

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
  }

  .blog-title {
    font-size: 24px;
    font-weight: bold;
    text-align: left;
    color: #FF7F50;
  }

  .blog-meta {
    margin-top: 10px;
  }

  .blog-tag {
    display: inline-block;
    padding: 4px;
    color: #00bfff;
  }

  .blog-time {
    text-align: right;
    color: grey;
  }

  .blog-text {
    text-align: left;
    text-indent: 2rem;
    margin-top: 10px;
    padding: 10px 8px 10px 8px;
    color: darkslateblue;
  }

  .blog-refrence {
    margin-top: 10px;
    padding-bottom: 10px;
    text-align: left;
  }
</style>
