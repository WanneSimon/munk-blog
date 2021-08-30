<template>
    <div>
    <el-dialog :visible.sync="visible.addOrEdit" style="margin-top:-5vh"
            :title=" isAdd ? '添加': '更新'">
        <el-form label-width="80px" class="form" v-model="formdata">
            <el-form-item v-if="!isAdd" prop="id" label="ID">
                {{formdata.id}}
            </el-form-item>
            <el-form-item prop="name" label="曲名" >
                <el-input v-model="formdata.name"></el-input>
            </el-form-item>
            <el-form-item prop="artis" label="艺术家">
                <el-input v-model="formdata.artis"></el-input>
            </el-form-item>
            <el-form-item prop="tags" label="标签">
                <el-tag :key="index" v-for="tag,index in formdata.tags"
                    closable  :disable-transitions="false" effect="plain"
                    @close="closeTag(tag)">
                      {{tag}} 
                </el-tag>
                <el-input class="input-new-tag" v-if="tagInputVisible" style="width:60px"
                    v-model="tagInputValue"  ref="saveTagInput" size="small" 
                    @keyup.enter.native="handleInputConfirm"  @blur="tagInputConfirm" >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showTagInput"> + </el-button>
            </el-form-item>
            <el-form-item v-if="isAdd" prop="artis" label="添加到组">
                <el-input v-model="formdata.artis"></el-input>
            </el-form-item>
            <el-form-item prop="path" label="文件路径">
                <el-input v-model="formdata.path"></el-input>
            </el-form-item>
            <el-form-item prop="lrcPath" label="lrc路径">
                <el-input v-model="formdata.lrcPath"></el-input>
            </el-form-item>
            <el-form-item prop="publishDate" label="发布日期">
                <el-input v-model="formdata.publishDate"></el-input>
            </el-form-item>
            <el-form-item prop="introduction" label="说明">
                <el-input type="textarea" v-model="formdata.introduction"></el-input>
            </el-form-item>

            <!--
            <el-form-item v-model="formdata" label="时长">
                <el-input v-model="formdata.time"></el-input>
            </el-form-item>
            -->
            <el-form-item style="text-align:right;">
                <el-button v-if="isAdd" @click="add()" type="primary"> 添 加 </el-button>
                <el-button v-else @click="update()" type="primary"> 更 新 </el-button>
                <el-button @click="cancel()" type="warning"> 取 消 </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog :visible.sync="visible.show" style="margin-top:-5vh">
        <el-form label-width="8rem" class="form" v-model="formdata">
            <el-form-item prop="id" label="ID">
                {{formdata.id}}
            </el-form-item>
            <el-form-item prop="name" label="曲名" >
                {{formdata.name}}
            </el-form-item>
            <el-form-item prop="artis" label="艺术家">
                {{formdata.artis}}
            </el-form-item>
            <el-form-item prop="tags" label="标签">
                <el-tag :key="index" v-for="tag,index in formdata.tags"
                  :disable-transitions="false" effect="plain" >
                      {{tag}} 
                </el-tag>
            </el-form-item>
            <!-- <el-form-item v-if="isAdd" prop="artis" label="添加到组">
                {{formdata.artis}}
            </el-form-item> -->
            <el-form-item prop="path" label="文件路径">
                {{formdata.path}}
            </el-form-item>
            <el-form-item prop="lrcPath" label="lrc路径">
                {{formdata.lrcPath}}
            </el-form-item>
            <el-form-item prop="publishDate" label="发布日期">
                {{formdata.publishDate}}
            </el-form-item>
            <el-form-item prop="introduction" label="说明">
                {{formdata.introduction}}
            </el-form-item>
        </el-form>
    </el-dialog>

    </div>
</template>

<script >

export default {
    name: 'AddOrEditMusic',
    data () {
        return {
            visible: {
                addOrEdit: true,
                show: false
            },
            
            tagInputVisible: false, // 标签输入框
            tagInputValue: '', // 标签输入框
            
            formdata: {
                id: null,
                name: null,
                artis: null,
                publishDate: null,
                time: null, // 时长
                path: null, // 文件路径
                lrcPath: null, // lrc文件路径
                introduction: null,
                tags: [], // 标签
                group: null, // 添加时，归入组 
            },

            groups: [], 
        }
    },
    created () {
        
    },
    computed:{
        // 是否是添加
        isAdd(){
            return !this.formdata.id
        },
    },
    methods: {
        show(type, data){
            // this.visible['type'] = val

            for(let attr in this.visible){
                if(attr==type){
                    this.visible[attr] = true
                } else {
                    this.visible[attr] = false
                }
            }

            console.log(JSON.stringify(this.visible))
            console.log("data", data)
            this.clear()
            if(data){
                this.formdata = data
            }
        },
        clear(){
            this.formdata = {
                id: null,
                name: null,
                artis: null,
                publishDate: null,
                time: null, // 时长
                path: null, // 文件路径
                lrcPath: null, // lrc文件路径
                introduction: null,
                tags: [], // 标签
                group: null, // 添加时，归入组 
            }
        },
        
        // 删除标签
        closeTag(tag) {
            this.formdata.tags.splice(this.formdata.tags.indexOf(tag), 1);
        },
        // 显示添加标签
        showTagInput() {
            this.tagInputVisible = true;
            this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        // 添加标签
        tagInputConfirm() {
            let inputValue = this.tagInputValue;
            if (inputValue) {
                this.formdata.tags.push(inputValue);
            }
            this.tagInputVisible = false;
            this.tagInputValue = '';
        },

        // 取消输入
        cancel(){
            this.visible = false
            this.clear()
        },
        add(){

        },
        update(){

        }
    }
}

</script>

<style scoped>
.form{
    text-align: left;
}
.el-form-item{
    margin-right: 2rem;
}
</style>
