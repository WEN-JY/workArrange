<template>
<div >

  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column label="动车组随车机械师工时测算" align='center'>
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    
      <el-table-column
        prop="department"
        label="动车所"
        width="120">
      </el-table-column>
      <el-table-column
        prop="chedi"
        label="上线列数"
        width="120">
      </el-table-column>
      <el-table-column
          prop="totalTime"
          label="趟工时/天"
          :formatter="ceshi"
          width="120">
        </el-table-column>
        <el-table-column
          prop="totalMonthTime"
          :formatter="ceshi"
          label="月工时"
          width="120">
        </el-table-column>
      <el-table-column label="按乘务工时定员（含备率）">
        <el-table-column
          prop="dingyuan"
          :formatter="ceshi"
          label=" "
          width="120">
        </el-table-column>
     
        <el-table-column
          prop="zhengbandingyuan"
          :formatter="ceshi"
          label="正班定员"
          width="120">
        </el-table-column>
        <el-table-column
          prop="yubeidingyuan"
          :formatter="ceshi"
          label="预备定员"
          width="120">
        </el-table-column>
        </el-table-column>
        <el-table-column label="热备车">
        <el-table-column
          prop="relieshu"
          label="列数"
          width="120">
          <template slot-scope="scope">
          <div class="content-rowspan">         
              <div><el-input v-model="scope.row.relieshu" placeholder="请输入内容" @change="caculate(scope.row)"></el-input></div>
          </div>
          </template>
   
        </el-table-column>
         <el-table-column
          prop="redingyuan"
          label="定员"
          width="120">
          <template slot-scope="scope">
          <div class="content-rowspan">         
              <div><el-input v-model="scope.row.redingyuan" placeholder="请输入内容" @change="caculate(scope.row)"></el-input></div>
          </div>
          </template>
        </el-table-column>
        </el-table-column>
        <el-table-column label="总公司检测车">
        <el-table-column
          prop="zonglieshu"
          label="列数"
          width="120">
          <template slot-scope="scope">
          <div class="content-rowspan">         
              <div><el-input v-model="scope.row.zonglieshu" placeholder="请输入内容" @change="caculate(scope.row)"></el-input></div>
          </div>
          </template>
        </el-table-column>
         <el-table-column
          prop="zongdingyuan"
          label="定员"
          width="120">
          <template slot-scope="scope">
          <div class="content-rowspan">         
              <div><el-input v-model="scope.row.zongdingyuan" placeholder="请输入内容" @change="caculate(scope.row)"></el-input></div>
          </div>
          </template>
        </el-table-column>
        </el-table-column>
        <el-table-column label="按乘务工时定员小计" prop="chengwudingyuan">
        </el-table-column>
          <el-table-column label="按照3.21人/列定员" prop="percentdingyuan">
          </el-table-column>
    </el-table-column>
  </el-table>
     <el-form :inline="true"  class="demo-form-inline">
      
    <el-form-item label="计算比例" >
     <el-input placeholder="请输入计算比例，默认为3.21" v-model="percent" @change='recaculate()'></el-input>
     <el-button type='default' @click='outputExcel'><i class="el-icon-sort" ></i>导出表格</el-button>
    </el-form-item>
</el-form>

</div>
</template>
<style scoped>
.main{
  background: aliceblue;
  padding: 20px;
}
.el-tabs--left, .el-tabs--right {
    overflow: hidden;
    background: white;
    border-radius: 5px;
    padding: 20px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: -60px;
}
.nameBtn{
    position: fixed;
    right: 30px;
    top: 10px;
}
.el-form{
  margin-top:10px
}
</style>

<script>


// 引入 ECharts 主模块

  export default {

    data() {
        return {
            
            sessionID:'',
            percent:3.21,
            department:'',
             tableData: [ ]
        
        }},
    methods: {
        outputExcel(){
          this.$http.post('/outputExcel',{
                      //Content_Type:'Authorization',  
                      api:'suichecesuan',
                      excelData:JSON.stringify(this.tableData),
                      sessionID:this.sessionID,department:this.department
                   }).then((res)=> {

                       this.excelpath=this.$excelPath_custom+res.data.file;
                       window.open(this.excelpath)
                   })
     
        },
      getTotal(){
        function deepClone(obj){
                       var newobj=obj.prototype==Array?[]:{}
                       for(var index in obj){
                         if(obj.hasOwnProperty(index)){
                           newobj[index]=Number(obj[index])
                         }
                       }
                       console.log(newobj)
                       return newobj;
                     }
                    var heji=deepClone(this.tableData[0])
                     heji.department='合计';

                     for(var index in this.tableData[0]){
                      
                       for(var k=1;k<this.tableData.length-1;k++){
                         if(index!=='department'){
                          // console.log('jiale',this.tableData[k][index],heji[index])
                           heji[index]+=parseFloat(this.tableData[k][index])
                         }
                       }

                     }
                    // console.log(heji)
                     this.tableData[this.tableData.length-1]=heji
      },
      recaculate(){
        for(var i=0;i<this.tableData.length;i++){
          this.tableData[i].percentdingyuan=Math.round(this.percent*this.tableData[i].chedi)
        } 
        this.getTotal()           
      },
      caculate(row){
        row.chengwudingyuan=Math.round(Number(row.dingyuan)+Number(row.redingyuan)+Number(row.zongdingyuan),0)
        console.log(row)
        this.getTotal();
      },
      ceshi(row, column, cellValue){
        //console.log(row)
        return Number(cellValue).toFixed(1)
        //console.log(cellValue)
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

    mounted(){
      //先将会话id保存
            this.user=this.$route.params.user
            this.sessionID=this.$route.params.sessionID
            this.department=this.$route.params.department
            console.log(this.$route.params)
                 this.$http.post('/getJiaolu',{
                      sessionID:this.sessionID,
                      department:this.department
                   }).then((res)=> {
                     var dd=res.data;
                     for(var i=0;i<dd.length;i++){
                       dd[i].totalMonthTime=(dd[i].dingyuan/1.08*174).toFixed(2)
                         dd[i].relieshu=0;
                         dd[i].redingyuan=0;
                         dd[i].zonglieshu=0;
                         dd[i].zongdingyuan=0;
                         dd[i].chengwudingyuan=0;
                         dd[i].percentdingyuan=Math.round(dd[i].chedi*this.percent,0);
                         
                     }
                
                     var heji=MF.__deepClone(dd[0])
                  
                     heji.department='合计';

                     for(var index in dd[i-1]){
                    
                       for(var k=1;k<dd.length;k++){
                         if(index!=='department'){
                           //console.log('jiale',dd[k][index],heji[index])
                           heji[index]+=parseFloat(dd[k][index])
                         }
                       }

                     }
                     dd.push(heji)
                     this.tableData=dd
                     console.log(res.data)
                   })
     


    },
    filters:{
      
      getDate(val){
        return new Date(parseInt(data[i].changeTime)).toLocaleString().replace(/:\d{1,2}$/,' ');
      }
    },

      
  }
</script>