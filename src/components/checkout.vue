<template>
<div id="container">
  <el-row >
  <el-col :span="12">   
  <el-form-item label="职工工号">
    <el-input v-model="form.worknum"  @change="handleChange"></el-input>
  </el-form-item>
  <el-form-item label="职工姓名">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="车间科室">
   <el-input v-model="form.department"></el-input>
  </el-form-item>
  <el-form-item label="职务职称">
   <el-input v-model="form.job"></el-input>
  </el-form-item>
  <el-form-item label="联系方式">
   <el-input v-model="form.contact"></el-input>
  </el-form-item>
  <el-form-item label="申请理由">
   <el-input v-model="form.appReason" type="textarea"></el-input>
  </el-form-item>
  <el-form-item label="申请退宿宾馆">
   <el-input v-model="form.dormitory" ></el-input>
  </el-form-item>
  <el-form-item label="申请时间">
   <el-date-picker type="date" placeholder="选择日期"  value-format="yyyy-MM-dd" v-model="form.appTime" style="width: 100%;"></el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
    <el-button @click="form={}">取消</el-button>
  </el-form-item>
  </el-col>
  <el-col :span='8'>

    <span style="color:red">左侧数据为服务器自动生成，请仔细核对，如有错误请更改后提交</span>

  </el-col>
  <el-col :span='4'></el-col>
  </el-row>
</div>
</template>
<style scoped>

</style>
<script>
 export default {
    props:['sessionID','department'],
    data() {
      return {
        form: {
          appTime:''
        }
      }
    },
 
    methods: {
    onSubmit() {
      console.log(66666666666)
        this.form.nextVarify='行政办公室';
        if(this.form.worknum&&this.form.appReason){
          
        }else{//
          this.$notify({
            title: '提示',
            message: '请填写全部内容',
            duration: 0,
            type:'error',
            offset: 100
             });
          return;
        }
        this.$http.post('http://localhost:3000/check_in_out',{
            apiName:'createUserinfo_out',
            formData:this.form,
            sessionID:this.sessionID,
            department:this.department
        }).then((res)=>{
           this.$alert('提交成功', {
                              confirmButtonText: '确定',
                              callback: () => {
                                this.$message({
                                  type: 'success',
                                  message: '成功提交申请，请等待审核,勿重复提交',
                                });
                              }
                            });
          console.log(res.data)
          this.form={};
        })
        console.log('submit!');
      },
    handleChange(){
        console.log('change detected!');
       
        this.$http.post('/check_in_out',{
            worknum:this.form.worknum,
            sessionID:this.sessionID,
            apiName:'getUserinfo_out',
            department:this.department
        } 
        ).then((res)=>{
          if(!!res.data.authErr){
            this.$alert('权限错误', {
                              confirmButtonText: '确定',
                              callback: () => {
                                this.$message({
                                  type: 'warning',
                                  message:res.data.authErr,
                                });
                              }
                            });
                            return
          }
          this.form=res.data;
          console.log(res.data)
        })
       
      },
 
    mounted(){
     
    }
  }}
</script>