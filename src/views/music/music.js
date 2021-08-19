import Aplayer from 'vue-aplayer'

export default {
    name: 'Music',
    components: { Aplayer },
    data () {
        return {
            // 被点击的组
            selectedIndex: 0,
            groups: [],
            
            // 展示区域
            listLoading: false,
            showList: [],

            // player
            current: {
                // list: []
                list: [{
                    "title": "Flight Of The Silverbird",
                    "artist": "Two Steps From Hell、Thomas Bergersen",
                    "url": "/coco/static/music/Two Steps From Hell、Thomas Bergersen - Flight Of The Silverbird.mp3"
                }],
            },

        }
    },
    created() {
        this.testData()
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
        
        setSelected(index){
            this.selectedIndex = index

            this.listLoading = true
            if(this.groups[index].songs){
                this.showList = this.groups[index].songs
                this.listLoading = false
            } else {
                // 重新请求数据

            }
        },

    }
}