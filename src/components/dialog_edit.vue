<!-- Table -->
<template>
<el-dialog title="修改交路信息" :visible.sync="dialogformVisibal " width='30%'>
  <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="车次">
    <el-input v-model="formLabelAlign.checi"></el-input>
  </el-form-item>
  <el-form-item label="车型">
    <el-input v-model="formLabelAlign.chexing"></el-input>
  </el-form-item>
  <el-form-item label="出发时间">
    <el-input v-model="formLabelAlign.leaveTime"></el-input>
  </el-form-item>
  <el-form-item label="到达时间">
    <el-input v-model="formLabelAlign.arriveTime"></el-input>
  </el-form-item>

  <el-form-item label="趟工时">
    <el-input v-model="formLabelAlign.totalTime"></el-input>
  </el-form-item>
  <el-form-item label="区间">
    <el-input v-model="formLabelAlign.qujian"></el-input>
  </el-form-item>
 
</el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogformVisibal=!dialogformVisibal">取 消</el-button>
    <el-button type="primary" @click="submitToParent">确 定</el-button>
  </div>
</el-dialog>
  
</template>

<script>
  export default {
      props:['formVisibal','jlInfo'],
    data() {
      return {
        dialogformVisibal:false,
        labelPosition: 'left',
        formLabelAlign: {
            checi:'',
            chexing:'',
            qujian:'',totalTime:'',leaveTime:'',arriveTime:''
        },
        formLabelWidth: '140px'
      };
    },
    methods:{
     
      inTimeChange(date){
        console.log(date)
      },
     outTimeChange(date){
       console.log(date)
      
        //console.log(val)
      },
      submitToParent(){
        this.dialogformVisibal = false;
        this.$emit('info-submit',this.formLabelAlign)
      }
    },
    mounted(){
      this.formLabelAlign=this.jlInfo
     // console.log(this.personinfo)
    },
    watch:{
      dialogformVisibal(newv,oldv){
        this.$emit('dialoghide',newv);
        console.info(newv,'dialogformVisibal changed')
      },
      jlInfo(obj,oldobj){
        console.log(obj,'---jlInfo changed')
        if(!!obj){
          this.formLabelAlign=obj;
        }     
      },
      formVisibal(newv,oldv){
        
          this.dialogformVisibal=newv
        
      },
    }
  };
</script>
<style scoped>
.el-dialog{
  border-radius: 10px;
}
</style>
