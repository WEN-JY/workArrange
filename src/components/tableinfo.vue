<template>
  <el-table
    :data="tableData"
    border
    show-summary
    max-height="850"
    style="width: 100%">
     <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="dongchesuo"
      label="动车所"
     >
    </el-table-column>
    <el-table-column
      prop="checi"
      label="列车车次">
    </el-table-column>
    <el-table-column
      prop="qujian"
      label="列车区间">
    </el-table-column>
    <el-table-column
      prop="chedi"
      label="使用车底数">
    </el-table-column>
    <el-table-column
      prop="chexing"
      sortable
      label="车型">
    </el-table-column>
    <el-table-column
      prop="bianzu"
      label="编组">
    </el-table-column>
    <el-table-column
      prop="leaveTime"
      label="开点">
    </el-table-column>
    <el-table-column
      prop="arriveTime"
      sortable
      label="到点">
    </el-table-column>
    <el-table-column
      prop="time"
      label="运行时分">
    </el-table-column>
    <el-table-column
      prop="kouchu"
      label="扣除" title="停留时间超60分时扣除时分">
    </el-table-column>
    <el-table-column
      prop="chengwuTime"
      sortable
      label="乘务时间">
    </el-table-column>
    <el-table-column
      prop="prepareTime"
      label="到发准备作业时间">
    </el-table-column>
     <el-table-column
      prop="totalTime"
      label="趟工时" >
    </el-table-column>
    <el-table-column
      prop="zushucesuan"
      sortable
      label="乘务组数测算">
    </el-table-column>
    <el-table-column
      prop="dingyuan"
      label="定员小计">
    </el-table-column>
    <el-table-column
      prop="zhengbandingyuan"
      sortable
      label="正班定员">
    </el-table-column>
    <el-table-column
      prop="yubeidingyuan"
      label="预备定员">
    </el-table-column>
     <el-table-column
      prop="monthTimes"
      label="每月趟数" >
    </el-table-column>
    <el-table-column
      prop="monthHours"
      sortable
      label="月人均工时">
    </el-table-column>
  
  </el-table>
  
</template>

<script>
  export default {
      props:['tableData'],
    data() {
      return {
      
      };
    },
    methods: {
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      }
    }
  };
</script>