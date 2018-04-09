<template>
<div >
<myheader ></myheader>
<el-row >
  <el-col :span="2">
   &nbsp;
  </el-col>
  <el-col :span="20">
<el-form :inline="true"  class="demo-form-inline">

 
  <el-form-item>
 
    <el-button type="success" @click="outputExcel()"><i class="el-icon-download"></i>导出xlsx</el-button>
  </el-form-item>
</el-form>
    <el-table
      :data="tableData"
       stripe
       border
      style="width: 100%"
      >
       <el-table-column label="二级修工作量测算" align='center'>
         <el-table-column
        prop="department"
        align='center'
        label="车间">
      </el-table-column>
       <el-table-column label="配属（标准组）" align='center'>
      
      <el-table-column
       
         align='center'  
        label="CRH1">
        <template slot-scope="scope">
          <div class="content-rowspan">         
              <div><el-input v-model="scope.row.crh1" placeholder="" @change="caculate(scope.row)"></el-input></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column

        align='center'
        label="CRH380D">
        <template slot-scope="scope">
          <div class="content-rowspan">         
              <div><el-input v-model="scope.row.crh380d" placeholder="" @change="caculate(scope.row)"></el-input></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
  
        align='center'                
        label="CRH2">
        <template slot-scope="scope">
          <div class="content-rowspan">         
              <div><el-input v-model="scope.row.crh2" placeholder="" @change="caculate(scope.row)"></el-input></div>
          </div>
        </template>
         </el-table-column>
         <el-table-column
        align='center'                
        label="CRH2CII">
        <template slot-scope="scope">
          <div class="content-rowspan">         
              <div><el-input v-model="scope.row.crh2c2" placeholder="" @change="caculate(scope.row)"></el-input></div>
          </div>
        </template>
         </el-table-column>
         <el-table-column
         align='center'    
        label="CRH3">
        <template slot-scope="scope">
          <div class="content-rowspan">         
              <div><el-input v-model="scope.row.crh3" placeholder="" @change="caculate(scope.row)"></el-input></div>
          </div>
        </template>
      </el-table-column>
      </el-table-column>
      
      <el-table-column
        prop="zhuanxiangxiuNum"
        align='center'    
        label="专项修数量">
      
      </el-table-column>
       <el-table-column
     
         align='center' 
         
        label="空心轴">
        <el-table-column
        prop="kongxinzhou.Japan"
         align='center' 
       
        label="日系">
      </el-table-column>
      <el-table-column
        prop="kongxinzhou.Europe"
         align='center' 
        label="欧系">
      </el-table-column>
      </el-table-column>
      <el-table-column
        prop="LU"
         align='center'    
        label="LU">
      </el-table-column>
      <el-table-column
        prop="xuanlun"
         align='center'    
        label="镟轮">
      </el-table-column>
       </el-table-column>
    </el-table>
    <el-collapse v-model="activeName" accordion >
  <el-collapse-item title="CRH1计算参数" name="1">
   
    <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="占用天数（折算标准包）">
      <el-input v-model="CRH1Rate"></el-input>
    </el-form-item>
    <el-form-item label="空心轴">
      <el-input v-model="CRH1_K"></el-input>
    </el-form-item>
    <el-form-item label="LU">
      <el-input v-model="CRH1_L"></el-input>
    </el-form-item>
    <el-form-item label="镟轮">
      <el-input v-model="CRH1_X"></el-input>
    </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="caculateAll()">重新计算</el-button>
      </el-form-item>
  </el-form>
   
  </el-collapse-item>
  <el-collapse-item title="CRH2计算参数" name="2">
    <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="占用天数（折算标准包）">
      <el-input v-model="CRH2Rate"></el-input>
    </el-form-item>
    <el-form-item label="空心轴">
      <el-input v-model="CRH2_K"></el-input>
    </el-form-item>
    <el-form-item label="空心轴2">
      <el-input v-model="CRH2_K2"></el-input>
    </el-form-item>
    <el-form-item label="LU">
      <el-input v-model="CRH2_L"></el-input>
    </el-form-item>
    <el-form-item label="镟轮">
      <el-input v-model="CRH2_X"></el-input>
    </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="caculateAll()">重新计算</el-button>
      </el-form-item>
  </el-form>
  </el-collapse-item>
  <el-collapse-item title="CRH3计算参数" name="3">
       <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="占用天数（折算标准包）">
      <el-input v-model="CRH3Rate"></el-input>
    </el-form-item>
    <el-form-item label="空心轴">
      <el-input v-model="CRH3_K"></el-input>
    </el-form-item>
 
    <el-form-item label="LU">
      <el-input v-model="CRH3_L"></el-input>
    </el-form-item>
    <el-form-item label="镟轮">
      <el-input v-model="CRH3_X"></el-input>
    </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="caculateAll()">重新计算</el-button>
      </el-form-item>
  </el-form>
  </el-collapse-item>
  <el-collapse-item title="CRH380D" name="4">
    <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="占用天数（折算标准包）">
      <el-input v-model="CRH380DRate"></el-input>
    </el-form-item>
    <el-form-item label="空心轴">
      <el-input v-model="CRH380D_K"></el-input>
    </el-form-item>
 
    <el-form-item label="LU">
      <el-input v-model="CRH380D_L"></el-input>
    </el-form-item>
    <el-form-item label="镟轮">
      <el-input v-model="CRH380D_X"></el-input>
    </el-form-item>
     <el-form-item>
      <el-button type="primary" @click="caculateAll()">重新计算</el-button>
      </el-form-item>
  </el-form>
  </el-collapse-item>
</el-collapse>
  </el-col>
  <el-col :span='2'></el-col>
</el-row>
</div>
</template>
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: -60px;
}

</style>
<script>
import router from '../router'
import myheader from './myheader'
import  bus  from './bus'//这里的import是重点
import noticer from './notice'
import pagination from './pagination'
import dialog_edit from './dialog_edit'
  export default {
     data() {
        return {
          activeName:0,
          sessionID:'',
          CRH1Rate:1.69,
          CRH1_K:0.1125,
          CRH1_L:0.1875,
          CRH1_X:0.1875,
          CRH2Rate:1.6667,
          CRH2_K:0.83335,
          CRH2_K2:0.5555667,
          CRH2_L:0.16667,
          CRH2_X:0.16667,
          CRH3Rate:0.975,
          CRH3_K:0.6,
          CRH3_L:0.25,
          CRH3_X:0.25,
          CRH380DRate:0.4,
          CRH380D_K:0.4,
          CRH380D_L:0.25,
          CRH380D_X:0.25,
          tableData: [{
            department:'南京南',crh1:0,crh380d:0,crh2:0,crh2c2:0,crh3:0,kongxinzhou:{Japan:0,Europe:0}
          },{
            department:'南京所', crh1:0,crh380d:0,crh2:0,crh2c2:0,crh3:0,kongxinzhou:{Japan:0,Europe:0}
          },{
            department:'合肥南', crh1:0,crh380d:0,crh2:0,crh2c2:0,crh3:0,kongxinzhou:{Japan:0,Europe:0}
          },{
            department:'徐州东', crh1:0,crh380d:0,crh2:0,crh2c2:0,crh3:0,kongxinzhou:{Japan:0,Europe:0}
          }],//分页展示后当前页面的数据
         
        }
      },
    methods: {
      caculateAll(){
        for(var i=0;i<this.tableData.length;i++){
          this.caculate(this.tableData[i])
        }
      },
     caculate(row){
           
              row.zhuanxiangxiuNum=(row.crh1*this.CRH1Rate
              +(Number(row.crh2)+Number(row.crh2c2))*this.CRH2Rate
              +row.crh3*this.CRH3Rate
              +row.crh380d*this.CRH380DRate).toFixed(0);
              row.kongxinzhou.Japan=(row.crh2*this.CRH2_K+row.crh2c2*this.CRH2_K2).toFixed(0)
              row.kongxinzhou.Europe=(row.crh1*this.CRH1_K+row.crh3*this.CRH3_K+row.crh380d*this.CRH380D_K).toFixed(0)
              row.LU=(row.crh1*this.CRH1_L+row.crh2c2*this.CRH2_L+row.crh2*this.CRH2_L+row.crh3*this.CRH3_L+row.crh380d*this.CRH380D_L).toFixed(0)
              row.xuanlun=(row.crh1*this.CRH1_X+row.crh2c2*this.CRH2_X+row.crh2*this.CRH2_X+row.crh3*this.CRH3_X+row.crh380d*this.CRH380D_X).toFixed(0)
     },

      getAuth(cc){
          if(this.department=='办公室'||this.department=='行政办公室'||this.department=="管理员"||this.department==cc){
            return true;
          }else{
              return false;
           
          }
      },
     
      outputExcel(){
          this.$http.post('/outputExcel',{
                      //Content_Type:'Authorization',        
                      excelData:JSON.stringify(this.tableData),
                      department:this.department,
                      sessionID:this.sessionID
                   }).then((res)=> {
                       console.log(res.data.file)
                       //正常情况下返回值是excel文件的下载路径
                       this.excelpath=this.$excelPath_custom+res.data.file;
                       window.open(this.excelpath)
                   })
        },

    
     
    },
    components:{
        myheader:myheader,
        pagination:pagination,
       dialog_edit:dialog_edit
    },
    mounted(){
      //先将会话id保存
            this.sessionID=this.$route.params.sessionID;
            this.department=this.$route.params.department;
             
    },
    filters:{
     
    },
     beforeDestroy () {

       //bus.$off('loadInfo', ()=>{})
      },

      
  }
</script>