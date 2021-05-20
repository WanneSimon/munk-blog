<template>
  <div>

    <el-row>
      <el-col class="blank_L" :lg="2" :md="1" :sm="0"></el-col>

      <el-col class="" :lg="20" :md="22" :sm="24" >
         <el-row >
           <el-col class="card-wrapper" :lg="4" :md="6" :sm="8" :xs="12"
                v-for="v,index in infos" :key="index" >
             <el-card class="box-card"  shadow="hover">
               <div slot="header" class="item-header clearfix">
                 <!-- 超链接必须带协议 -->
                 <a :href="v.link" target="_blank"
                 :class="v.valid && v.valid==false ? 'invalid-item' : 'valid-item'">
                    <span>{{v.name}}</span>
                </a>
                <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
               </div>
               <div>
                 <span class="item-link">{{v.link}}</span>
                 <p class="item-desc">{{v.desc}}</p>
               </div>
             </el-card>
           </el-col>
         </el-row>
      </el-col>

      <el-col class="blank_R" :lg="2" :md="1" :sm="0"></el-col>
    </el-row>

  </div>

</template>

<script>


  export default {
    name: "collections",
    data() {
      return {
        infos: []
      }
    },
    created() {
      let type = this.$route.params.type
      this.getInformations(type)
      // this.getInformations(this.$base.favoritesType.COLLECTION.name)
    },
    methods: {
      // 根据 favi 和 collection
      getInformations(type){
        var types = this.$base.favoritesType
        let attr = Object.keys(types).filter( e=> types[e].name==type)
        if(!attr || attr.length <= 0){
          return
        }

        // this.$axios.get('/coco/static/cellections/collections.json')
        this.$axios.get(types[attr].link)
          .then( (res) => {
            // console.log(this.infos)
            this.infos = res.data
          }).catch( (error) => {
            throw error
          })
      }
    },

  }
</script>

<style scoped>
  .card-wrapper{
    text-align: left;
    min-height: 10rem;
  }
  .box-card{
    width: 11rem;
    height: 14rem;
    float: left;
    margin: 0.5rem;
  }
  .item-header{
    text-align: center;
    font-size: 1rem;
  }
  .item-link{
    font-size: 0.7rem;
    color: grey;
  }
  .item-desc{
    font-size: 0.8rem;
  }

  .invalid-item {
    text-decoration: line-through;
    color:  grey;
  }
  .valid-item {
    text-decoration: none;
    color:  #18988c;
  }
</style>
