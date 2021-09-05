import Aplayer from 'vue-aplayer'
import AddOrEditMusic from './addOrEditMusic.vue'
import mbapi from '../../cfg/mbapi.js'

function defaultSong(){
    return {
        "title": "Flight Of The Silverbird",
        "artist": "Two Steps From Hell、Thomas Bergersen",
        "src": "/coco/static/music/Two Steps From Hell、Thomas Bergersen - Flight Of The Silverbird.mp3"
    }
}

export default {
    name: 'Music',
    components: { Aplayer, AddOrEditMusic },
    data () {
        return {
            // 是否选择过歌曲，选择过后就一直是 true
            isChoosedSong: false,

            // 被点击的组
            selectedGroup: '',
            groups: {}, // 数组元素：{ "groupName": { page: 1, total: 0, songs: [] } }
            
            // 展示区域
            listLoading: false,
            showGroupName: '',
            showGroup: { page: 1, total:0, songs: null },

            pageSize: 12,

            // player
            current: {
                // list: []
                list: [defaultSong()],
                playing: null,
                listFolded: true,
                // groups: [], // 所有组
            },

        }
    },
    created() {
        this.getGroups(()=>{
            let gs = Object.keys(this.groups)
            if(gs && gs.length>0){
                this.setSelected(gs[0])
            }
        })
        this.current.playing = this.current.list[0]
        // this.testData()
    },
    computed: {},
    methods:{
        testData(){
            this.groups = [
                { name: '组1', songs: [
                    {id: 1, name:'s1', artis:'绮丽', publishDate:'2021-08-19',time: 123, path:'', lrcPath:'', introduction:''},
                    {id: 2, name:'s2', artis:undefined, publishDate:'2021-08-19',time: 120, path:'', lrcPath:'', introduction:''},
                    {id: 3, name:'s3', artis:'张三', publishDate:'2021-08-19',time: 0, path:'', lrcPath:'', introduction:''},
                    {id: 4, name:'s4', artis:'', publishDate:'2021-08-19',time:undefined, path:'', lrcPath:'', introduction:''},
                ]},
                { name: '组2', songs: [
                    {id: 11, name:'s11', artis:'绮丽', publishDate:'2021-08-19',time: 123, path:'', lrcPath:'', introduction:''},
                    {id: 21, name:'s21', artis:undefined, publishDate:'2021-08-19',time: 120, path:'', lrcPath:'', introduction:''},
                    {id: 31, name:'s31', artis:'张三', publishDate:'2021-08-19',time: 0, path:'', lrcPath:'', introduction:''},
                    {id: 41, name:'s41', artis:'', publishDate:'2021-08-19',time:undefined, path:'', lrcPath:'', introduction:''},
                ]}
            ]
        },
        
        // 左侧组被选中
        setSelected(group){
            this.selectedGroup = group

            this.listLoading = true
            if(this.groups[group].songs && this.groups[group].songs.length>0){ // 没必要的步骤
                this.showGroup = this.groups[group]
                this.showGroupName = group
                this.listLoading = false
            } else {
                // 重新请求数据
                this.queryGroupSongs(group, 1, true)
            }
        },
        
        // 添加歌曲到播放列表
        addToCurrentList(song){
            let tmp = {
                title: song.name,
                artist: song.artis,
                src: mbapi.song_stream_url(song.id),
                pic: undefined,
            }

            // 检查重复， 名字和url一样则重复
            var re = this.current.list.filter( e=> e.title==tmp.title && e.src==tmp.src )

            if(re && re.length>0) {
                this.$message({
                    type: 'warning',
                    message: '列表中已存在此歌曲！',
                    showClose: true,
                    duration: 1000
                });
                return;
            }
            
            if( !this.isChoosedSong ) {
                let newList = []
                newList.push(tmp)
                this.current.playing = tmp
                this.current.list = newList
                this.isChoosedSong = true
            } else {
                this.current.list.push(tmp)
            }
            
            this.$message({
                type: 'success',
                message: '已添加到列表中',
                showClose: true,
                duration: 1000
            });
            return tmp
        },
        addToCurrentListAndPlay(song){
            let tmp = this.addToCurrentList(song)
            this.current.playing = tmp
            // debugger 需要设置延时，不知道为什么
            setTimeout(() => {
                this.$refs.aplayer.play()
            }, 500);
        },
        // 查询所有组
        getGroups(callback) {
            mbapi.co_group(res => {
                var resData = res.data
                if( !resData ) {
                    return
                }

                this.groups = {}
                for(let i=0; i<resData.data.length; i++) {
                    let groupObjVal = {page: 1, totalPage: 0, songs: []}
                    this.$set(this.groups, resData.data[i], groupObjVal)
                }

                if(callback){
                    callback()
                }
            }, res=>{
                this.$message({
                    type: 'error',
                    message: '组查询失败！'
                });
            })
        },
        // 分页查询查询组内歌曲信息 showThisGroup - 是否显示这个分组
        queryGroupSongs(groupName, page, showThisGroup) {
            let group = this.groups[groupName]
            if(!group) {
                return
            }
            const data = {
                page: page,
                size: this.pageSize,
                param: groupName
            }

            this.listLoading = true
            mbapi.co_group_list(data, res => {
                // console.log("query")
                let offset = (page-1)*this.pageSize
                for(let i=0; i<this.pageSize && i<res.data.list.length; i++) {
                    group.songs[i+offset] = res.data.list[i]
                }
                group.total = res.data.total
                group.page = page

                if(showThisGroup){
                    this.showGroup = this.groups[groupName]
                    this.showGroupName = group
                    this.listLoading = false
                }
                this.listLoading = false
            }, error => {
                this.listLoading = false
                console.error("组内查询失败！", error)
            })

        },
        clearCurrentList(){
            this.$confirm('即将清空播放列表, 是否继续?', '提示', {
                confirmButtonText: '清空',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.current.list = []
                this.current.playing = defaultSong()
                
                console.log('listFolded', this.current)
                console.log(this.$refs.aplayer)

                this.current.listFolded = true
                this.$refs.aplayer.pause()
                this.$message({
                  type: 'success',
                  message: '已清空播放列表!'
                });
              })
        },
        // 分页变化
        pageChange(page) {
            console.log('showPage')
            this.queryGroupSongs(this.showGroupName, page, false)
        },


    }
}