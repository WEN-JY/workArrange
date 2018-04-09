<template>
<div >
<myheader ></myheader>
<el-row >
  <el-col :span="2">
 &nbsp;
  </el-col>
  <el-col :span="20" class="main">

   <el-tabs v-model="activeName" >
      <el-tab-pane label="定员测算" name="first">
     <span slot="label"  label="定员测算" name="first"  @click="showCesuan()">定员测算</span>
      <dingyuan_table ></dingyuan_table>
    </el-tab-pane>
      <el-tab-pane >
     <span slot="label"  label="随车工时测算" name="second"  @click="showCesuan()">随车测算</span>
      <cesuan_table ></cesuan_table>
    </el-tab-pane>
   <el-tab-pane v-for="(item,index) in options5" :key="index" :name="item.name">
    <span slot="label"  :label="item.value" :name="index" @click="loadJLS_Of(item.value)" >{{item.value}}
      <i class="el-icon-date"></i> </span>
      
  </el-tab-pane>
<JL_adjust :tableDat="tableData" v-show="JLarrangeState"></JL_adjust>
  
   
  </el-tabs>

  </el-col>
  <el-col :span="2">
  </el-col>
</el-row>

</div>
</template>
<style scoped>

.el-form{
  margin-top:10px
}
.main{
  background: aliceblue;
  padding: 20px
}
</style>

<script>
import router from '../router'
import myheader from './myheader'
import  bus  from './bus'//这里的import是重点
import cesuan_table from './sccs_components/cesuan_table'
import dingyuan_table from './sccs_components/dingyuan_table'
import JL_adjust from './sccs_components/JL_adjust'
// 引入 ECharts 主模块


  export default {
     data() {
        return {
          labelPosition: 'LEFT',
            activeName: 'first',
            sessionID:'',
            user:'',
            tableData:[],
            department:'',
            options5: [ {
              value: '南京南',
              label: '南京南',
              name:'third'
            }, {
              value: '南京所',
              label: '南京所',
              name:'second'
            },{
              value: '徐州东',
              label: '徐州东',name:'forth'
            },{
              value: '合肥南',
              label: '合肥南',
              name:'fifth'
            }],
            JLarrangeState:false,
            
        }},
    methods: {
      showCesuan(){
        this.JLarrangeState=false;
        console.log('执行了')
      },
      loadJLS_Of(item){
          this.JLarrangeState=true;
         this.$http.post('/JLarrange',{
            //Content_Type:'Authorization',
            department:this.department,
            api:'loadinfo_manage',
            item,
            sessionID:this.sessionID
            }).then(res=>{
                if(res.data.state=='success'){
     
                    this.tableData=res.data.dataInDB; 
     
                }else{
                    this.$notify({//数据接收成功通知
                    title: '出错啦',
                    message: '数据库连接失败，请稍后重试',
                    type: 'error'
                    });
                }
            });
            bus.$emit('childload',item)
      },
       handleClick(tab, event) {
        console.log(tab, event);
      },
  
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        this.isEdit=true;
        this.currentPerson=row;
        this.currentPersonIndex=index;
        //console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
 
     
    },
    components:{
        myheader:myheader,cesuan_table,JL_adjust,dingyuan_table
      
    },
    mounted(){
      //先将会话id保存
            this.user=this.$route.params.user
            this.sessionID=this.$route.params.sessionID
            this.department=this.$route.params.department
     

    },
    filters:{
      
      getDate(val){
        return new Date(parseInt(data[i].changeTime)).toLocaleString().replace(/:\d{1,2}$/,' ');
      }
    },
    beforeDestroy () {
       
      }
      
  }
</script>