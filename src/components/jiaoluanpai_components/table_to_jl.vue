<template>
   <el-table
      :data="tableData"
       stripe
       border
        max-height="780"
        style="width: 100%">
     <el-table-column
      type="index"
      fixed="left"
      width="50">
    </el-table-column>
    <el-table-column
      prop="checi"
      label="车次"
      fixed="left"
      :formatter="formatCC"
     >
      </el-table-column>
     <el-table-column
      prop="qujian"
      label="区间"
      fixed="left"
     >
    </el-table-column>
    <el-table-column
      prop="bianzu"
      fixed="left"
      sortable
      label="编组">
    </el-table-column>
    <el-table-column
      prop="leaveTime"
      label="出发时间"
      fixed="left"
     >
    
    </el-table-column>
    <el-table-column
      prop="arriveTime"
      label="到达时间"
      fixed="left"
     >
    
    </el-table-column>
    <el-table-column
    fixed="left"
      prop="totalTime"
      sortable
      label="总工时" >
    </el-table-column>
     <el-table-column
      label="日期">
    <el-table-column v-for='(date,index) in monthDays'  v-bind:key="index" v-bind:label="date.toString()">
        <template slot-scope="scope">
          <div class="content-rowspan" :style="getStyle(scope.row.arrange[date])">         
              <div class="dropdiv"> {{( scope.row.arrange[date]?scope.row.arrange[date]:'&nbsp;')}}</div>
          </div>
        </template>
    </el-table-column>
    
    </el-table-column>
  </el-table>
</template>
<script>
export default {
    props:['Tabledata','monthDays'],
  data(){
      return {
          tableData:[],
      
      }
  },
  methods:{
      getStyle(data){
            
            if(!!data){
                return {'background':'green','color':'#fff'}
            }else{
            }
        },
        formatCC(row){
            
            if(!!row){
                return row.checi.replace(/\（\）/g,'');
            }else{
                return ''
            }
            
        }
  },
  mounted(){
      this.tableData=this.Tabledata;
      this.loading2=true;
  },
  watch:{
      Tabledata(newval,oldval){
          this.tableData=newval
        
      },
  }
}
</script>
