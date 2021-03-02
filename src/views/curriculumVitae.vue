<template>
  <div class="container-fluid" >

    <div class="container_wrapper" style="position: relative;height: 1px;">
        <div style="height: 1rem;"></div>

        <el-row class="content_wrapper">
          <el-col :lg="3" :md="4" :sm="12" :offset="4"> 我 </el-col>
          <el-col :lg="8" :md="8" :sm="12">
              <label>性 别：<span>男</span> </label>
              <label>年 龄：<span>23</span> </label>
              <label>电 话：<span>151 2378 3682</span> </label>
              <label>邮 箱：<span>wanneseville@foxmail.com</span> </label>
          </el-col>
          <el-col :lg="8" :md="8" :sm="12">
              <label>学 历：<span>本科</span> </label>
              <label>学 校：<span>重庆理科大学</span> </label>
              <label>专 业：<span>计算机科学与技术</span> </label>
              <label>工作时间：<span>2019.07 - 至今</span> </label>
          </el-col>
        </el-row>

        <div class="intro_section">
          <h3> 个人技能 </h3>
          <ol>
            <li>  熟悉使用SpringBoot、Mybatis、Bootstrap、Vue、ElementUI框架，了解并使用过 AngularJS、NodeJS、UniApp、Jquery等前端框架以及Hibernate技术。</li>
            <li>	熟练整合 SpringMVC、Spring、Mybatis、SpringBoot技术。</li>
            <li>	熟悉 Mysql关系型数据库、Redis非关系型数据库，了解并使用过Oracle数据库。</li>
            <li>	熟悉 nginx、docker，了解并使用过 Jenkins构建工作流，搭建过nexus私服，了解Tomcat。</li>
            <li>	熟悉C语言、HTML、JavaScript，了解并使用过C++、C#、Lua、PHP、Ruby等语言。</li>
            <li>	熟悉项目管理工具maven和版本控制工具git，了解svn。</li>
            <li>	熟悉Linux操作系统常用命令，了解shell脚本的编写，可基于Linux平台部署项目等操作。</li>
            <li>	了解HTTP、HTTPS、TCP、UDP、SFTP等网络协议。</li>
            <li>	熟悉eclispe、HBuilderX、VSCode、IntelliJ IDEA、PhotoShop等辅助开发工具。</li>
            <li>	了解 srs+obs视频推流，frp内网穿透，拥有私人云盘。</li>
          </ol>
        </div>

        <div class="intro_section">
          <h3> 项目经验 </h3>
          <div>
            <h4>新非车承保</h4>
            <p>
              新飞车承保系统是一个保险公司的出单系统，大部分的数据和业务处理都集中在这里。
            我在此项目中负责保单投保、批改时与渠道平台的交互，以及与打印交互，生成电子保单，上传到存储系统。
            涉及技术 SpringBoot、Mybatis、数据库连接池Alibaba-Druid，数据库Oracle，定时任务Quartz，
            消息队列kafka，服务发现Eureka,网关Zuul,代理和负载均衡nginx，前端AngluarJS-1.x、Axios等。
            </p>
            <h4>新非车渠道平台</h4>
            <p>
              渠道平台是迎合互联网发展趋势，在线上灵活并极大简化流程的投保平台，属于承保周边系统。
            在此系统中，负责第三方对接投保、出单、退保、续费、退保试算、注销全流程。
            自定义轮询工具，解决无状态批量消息是否消费完毕的问题。
            此外还有电子保单生成、OSS存储与下载。支持美团、360大并发出单，凭证号生成。
            涉及主要技术有 SpringBoot、kafka、redis、mysql、OSS云存储、SFTP文件传输。
            </p>
            <h4>打印系统</h4>
            <p>
              打印系统是为保单生成电子保单所设计，由我自己负责，目前已接入3个内部系统。
              此系统将数据填充到模板中生成PDF文件，灵活性极强，稳定性高。
              技术架构主要有SpringBoot、Jxls、Openoffice、itext。
            </p>
            <h4>个人网站</h4>
            <p>该项目的作用是练习平时学习知识点的，学习时一边应用一遍记录， 例如SpringBoot从零开始搭建、Vue从零搭建项目、Axios、ElementUI等。
            项目从最初的原始HTML 到 Vue+SpringBoot，经历多次重构后，逐渐成为个人练习新知识的地方 。
            此外该项目也记录部分笔记。
            </p>
          </div>
        </div>

        <div class="intro_section">
          <h3> 自我描述 </h3>
          <div>
            <p>本人积极乐观，性格随和，对学习和工作认真，态度端正。
            对软件开发技术有很强的兴趣，平时从社区论坛等学习到的新知识点通常会记录下来，
            能力方面偏向于实操，对查漏补缺的部分会进行充分实验，然后再记录下知识点。</p>
          </div>
        </div>

        <div style="height: 4rem;"></div>
    </div>

  </div>
</template>

<script>
export default {
    name: "CurriculumVitae",
    data() {
        return {

        }
    },
    created: function(){

    },
    methods: {

    }

}
</script>

<style scoped>
.container_wrapper{
  position: absolute;
  margin: auto;
  top: 0rem;
  left: 0rem;
  right: 0rem;
  bottom: 0rem;
  width: 60rem;
}
.content_wrapper{
  text-align: left;
  background-color: #F9FAFC;
  color: darkslategray;
  padding: 2rem 1rem;
  min-height: 10rem;
  min-width: 10rem;
}
.content_wrapper label{
  display: block;
  font-weight: 700;
  color: #d87006;
}
.content_wrapper label span{
  font-weight: 500;
  color: #159856;
}

.intro_section{
  padding: 0.5rem 1rem;
  margin: 1rem;
  text-align: left;
  margin-left: 20%;
  width: 60%;
  background-color: #d4d1c8;
}

.intro_section h3{
  color: #78cc0a;
}

.intro_section h4{
  text-indent: 2rem;
  color: #f98b1b;
}

.intro_section p{
  text-indent: 2rem;
}
</style>
