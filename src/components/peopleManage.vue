<template>
    <div>
     <myheader></myheader>
     <el-form :inline="true"  class="demo-form-inline">

  <el-form-item>
    <el-button type="primary" @click="createPerson()"> <i class="el-icon-circle-plus"></i> 新增人员</el-button>
    <el-button type="success"  @click="outputExcel()"><i class="el-icon-download"></i>导出xlsx</el-button>
    <el-button type="primary" size="mini" @click="saveData()"> <i class="el-icon-upload2"></i> 保存</el-button>
  </el-form-item>
</el-form>
<el-row>
  <el-col :span='4'>&nbsp;</el-col>
  <el-col :span="16">
     <el-table
      :data="tableData"
       stripe
       border
       v-loading="loading2"
        :element-loading-text="loading_text"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    height="750"
    style="width: 100%">
     <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="department"
      label="部门"
     >
     <template slot-scope="scope" >
       <div v-if="getAuth()">
          <el-select  v-model="scope.row.department" placeholder="请选择">
          <el-option
            v-for="item in departmentOp"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
       </div>
       <div v-else>
         {{scope.row.department}}
       </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="banzu"
      label="班组"
     >
      <template slot-scope="scope">
        <el-select v-model="scope.row.banzu" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            height="780"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名">
      <template slot-scope="scope">
        <el-input v-model="scope.row.name" placeholder="输入姓名">
        </el-input>
      </template>
    </el-table-column>
    <el-table-column
      prop="job"
      label="职务">
      <template slot-scope="scope">
      <el-select v-model="scope.row.job" placeholder="请选择">
          <el-option
            v-for="item in jobOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>  
    </el-table-column>
    <el-table-column
      prop="worknum"
      label="工号">
      <template slot-scope="scope">
        <el-input v-model="scope.row.worknum" placeholder="输入工号">
        </el-input>
      </template>
    </el-table-column>
    <el-table-column
      prop="phoneNum"
      label="手机号"
    >
    <template slot-scope="scope">
        <el-input v-model="scope.row.phoneNum" placeholder="手机号">
        </el-input>
      </template>
    </el-table-column>
    <el-table-column
      prop="phoneNum"
      label="操作"
    >
    <template slot-scope="scope">
        
        <el-button type="danger" size="mini" @click="deleteData(scope.row,scope.$index)">删除</el-button>  
      </template>
    </el-table-column>
  </el-table>

  </el-col>
  <el-col :span="4"></el-col>
</el-row>
   
    </div> 
</template>
<style scoped>
.el-form{
    margin-top:20px
}
</style>

<script>
import router from '../router'
import myheader from './myheader'
export default {
  data(){
      return {
          department:'',
          tableData:[],
          loading2:false,
          loading_text:'正在加载人员信息..请稍等',
          departmentOp: [{
          value: '南京所',
          label: '南京所'
        },{
          value: '南京南',
          label: '南京南'
        },
        {
          value: '合肥南',
          label: '合肥南'
        },
        {
          value: '徐州东',
          label: '徐州东'
        },],
          jobOptions: [{
          value: '地勤机械师',
          label: '地勤机械师'
        },{
          value: '随车机械师',
          label: '随车机械师'
        },],
          options: [{
          value: '乘务一班',
          label: '乘务一班'
        }, {
          value: '乘务二班',
          label: '乘务二班'
        }, {
          value: '乘务三班',
          label: '乘务三班'
        }, {
          value: '乘务四班',
          label: '乘务四班'
        }, {
          value: '乘务五班',
          label: '乘务五班'
        }],
      }
  },
  methods:{
    deleteData(row,index){
      console.log(row,index);
       this.$confirm('此操作将删除该职工信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index,1);
          this.saveData();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    saveData(){
            let data=this.tableData;
            this.loading2=true;
            this.loading_text='正在保存数据，请稍后...'
            let date=new Date();
            let tableName=date.getFullYear()+'-'+(date.getMonth()+1);
            this.$http.post('/JLarrange',{
                      //Content_Type:'Authorization',
                      department:this.department,
                      data,
                      tableName,
                      sessionID:this.sessionID,
                      api:'saveData'
                   }).then((res)=> {
                      this.loading2=false;
                      if(!!res.data.checkLogin){
                        this.$alert('尚未登陆', '出错啦', {
                              confirmButtonText: '确定',
                              callback: () => {
                                                this.$message({
                                                type: 'info',
                                                message: '请返回首页登陆后再使用',
                                                });
                                                }
                                     });
                             return;
                          }
                        if(!!res.data.message){
                            this.loading2=false;
                              this.$notify({//数据接收成功通知
                                                title: '出错啦',
                                                message:res.data.message+'程序自动检测到mongoDB数据库问题，请稍后重试',
                                                type: 'warning'
                                                });
                        }else{
                            this.loading2=false;
                            this.$notify({//数据接收成功通知
                                                title: '保存成功',
                                                message:'数据已成功保存',
                                                type: 'success'
                                                });
                        }
                    
                  }).catch(err=>{
                      console.log(err)
                  })
        },
    getAuth(){
          if(this.department=='劳人'||this.department=='劳动人事科'||this.department=="劳人科"){
            return true;
          }else{
              return false;
           
          }
      },
    createPerson(){
      this.tableData.unshift({
        department:this.department,jiaolu:[],workTime:0,
      })
      
        return 0;
    },
    loadPeople(){//加载人员信息
            let date = new Date(); 
            this.loading2=true;
            let tableName=date.getFullYear()+'-'+(date.getMonth()+1);
            this.$http.post('/JLarrange',{
            //Content_Type:'Authorization',
            department:this.department,
            api:'loadinfo',
            tableName,
            sessionID:this.sessionID
            }).then(res=>{
                if(res.data.state=='success'){
                    console.log(res.data.dataInDB);
                    this.tableData=res.data.dataInDB; 
                    this.loading2=false;   
                }else{
                    this.loading2=false;
                    this.$notify({//数据接收成功通知
                    title: '出错啦',
                    message: '人员信息加载失败，请稍后重试',
                    type: 'error'
                    });
                }
                
            })
      },
    outputExcel(){
          this.$http.post('/outputExcel',{
                      //Content_Type:'Authorization',  
                      api:'peopleAll',
                    
                      excelData:JSON.stringify(this.tableData),
                      sessionID:this.sessionID,department:this.department
                   }).then((res)=> {
                       console.log(res.data.file)
                       //正常情况下返回值是excel文件的下载路径
                      
                       this.excelpath=this.$excelPath_custom+res.data.file;
                       window.open(this.excelpath)
                   })
        },
  },
  mounted(){
       this.sessionID=this.$route.params.sessionID
       //进行路由跳转传递姓名以在右上角显示
       this.username=this.$route.params.username
        this.department=this.$route.params.department;
        this.loadPeople();
  },
  components:{
      myheader
  }  
}
</script>
