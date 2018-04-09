<template>
 <div id="app">
<myheader ></myheader>
<!-- <selectpanel></selectpanel> -->
 
<el-upload
  class="upload-demo"
  ref="upload"
  action="https://localhost:3000/upload"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :on-change="handleChange"
  :file-list="fileList" 
  v-show="showState"
  :auto-upload="false" list-type="text" >
  <el-select v-model="loadDepart" size="small" filterable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-button slot="trigger" size="small" type="primary"><i class="el-icon-search
"></i>选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="default" @click="submitUpload"><i class="el-icon-sort-up
"></i>上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">可上传csv,xlsx文件,文件保存时选择utf-8编码</div>
</el-upload>
<a @click="downloadpepleTemplate('people')">下载人员信息模板</a><a @click="downloadpepleTemplate('jiaolu')">下载交路信息模板</a>
</div>
</template>
<style scoped>
a{
  color:aliceblue
}
a:hover{
  cursor: pointer;
  color: aqua
}
.upload-demo{
    height: 100px;
    width: 300px;
    margin:0 auto;
    margin-top: 200px
}
.el-upload__tip{
  color:white;
}
</style>
<script>
import router from '../router'
import myheader from './myheader'
import tableinfo from './tableinfo'
  export default {
    data() {
      return {
        fileList: [],
        file:'',
        tip:'用于测试的一条tip',
        sessionID:'',
        excelpath:'',
        tableData:[],
        loadDepart:'交路信息',
        showState:true,
        options:[{
          value: '人员信息',
          label: '人员信息'
        }, {
          value: '交路信息',
          label: '交路信息'
        },]
       };
    },
    methods: {
      downloadpepleTemplate(item){
        if(item==='people'){
          this.excelpath=this.$excelPath_custom+'template/机械师名单模板.xlsx';
                       
        }else{
          this.excelpath=this.$excelPath_custom+'template/南京动车段调图交路安排（导入版）模板.xlsx';
        }
        window.open(this.excelpath)
      },
      submitUpload() {
        if(this.loadDepart=='交路信息'){
              this.$http({
                url:'/upload',
                method:'post',
                data:this.file,

              } ).then((res)=>{
                this.$notify({//数据接收成功通知
                          title: '成功',
                          message: '成功上传数据',
                          type: 'success'
                        });
                      /// this.showState=false;
                      // this.tableData=res.data
                  console.log(res)
            })

        }else{
          this.$http({
            url:'/upload_machanism',
            method:'post',
            data:this.file,

          } ).then((res)=>{
             this.$notify({//数据接收成功通知
                      title: '成功',
                      message: '成功上传数据',
                      type: 'success'
                    });
                   /// this.showState=false;
                   // this.tableData=res.data
              console.log(res)
        })
        }
        console.log(this.file)
        
        //  router.push({name:'indexPage',params:{username:this.username,sessionID:this.sessionID,department:this.department}})
        //console.log(this.fileList)
      },
      handleChange(){
 
            // 文件元素
            var file = document.querySelector('[type=file]');
           
            // 通过FormData将文件转成二进制数据
            var formData = new FormData();
            // 将文件转二进制
         
            formData.append('file', file.files[0]);
            formData.append('user','wenjiyong')
            formData.append('sessionID',this.sessionID)
            this.fileList=[];
            this.fileList.push({
                name:file.files[0].name,
            })
           this.file=formData
           
         
        
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    },
    components:{
      //selectpanel:selectpanel,
        myheader:myheader,
        tableinfo:tableinfo
    },
    mounted(){
      console.log(this.$route.params)
      this.sessionID=this.$route.params.sessionID;
      this.department=this.$route.params.department;
        if(this.$route.params.username){
            this.username=this.$route.params.username
        }
    },
     beforeDestroy () {
     
        console.log('组件upload已销毁')
      
       //bus.$off('loadInfo', ()=>{})
      }
  }
</script>