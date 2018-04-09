<template>
  <el-dialog  :visible.sync="dialogFormVisible" width="400px">
    <span >修改用户信息</span>
  <el-form :model="form" label-position="left">
    <el-form-item label="账号" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="form.password" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitPs">确 定</el-button>
    <el-button type="warning"  v-show="getAuth" @click="createNewUser">创建新用户</el-button>
  </div>
  <el-card class="box-card" v-show="getAuth">
  <div slot="header" class="clearfix">
    <span>添加新用户</span>
 
  </div>
  <el-form :model="form" label-position="left">
    <el-form-item label="账号" :label-width="formLabelWidth">
      <el-input v-model="form.new_name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="form.new_password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="部门" :label-width="formLabelWidth">
      <el-input v-model="form.new_department" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
</el-card>
</el-dialog>

</template>
<style scoped>
    .el-dialog{
     background: red
    }
</style>

<script>
import  bus from './bus'
  export default {
    props:['dialogState','username','departments'],
    data() {
      return {
        dialogFormVisible: false,
        department:'',
        form: {
          name: '',
          password:''
        },
        formLabelWidth: '50px',
        getAuth:false
      };
    },
    mounted(){

        this.dialogFormVisible=this.dialogState
        this.form.name=this.username
        this.department=this.departments
        if(this.department=='劳动人事科'||this.department=='劳人'||this.department=="admin"){
            this.getAuth= true;
          }else{
          
              this.getAuth= false;
          }
    },
    watch:{
        departments(newval,oldval){
           console.log(newval,"接收到了department")
          this.department=newval;
         if(this.department=='劳动人事科'||this.department=='劳人'||this.department=="admin"){
            this.getAuth= true;
          }else{
          
              this.getAuth= false;
          }
        },
        username(newVal,oldVal){
          this.form.name=newVal;
        },
        password(newVal,oldVal){
          this.form.password=newVal
        },
        dialogState(){
       
            this.dialogFormVisible=this.dialogState;
             this.department=this.departments
           console.log('change detected'+this.department)
        },
        dialogFormVisible(){
         this.department=this.departments
                if(this.dialogFormVisible==false){
                      this.$emit('closeInfoDialog','')
                }
         console.log('change detected'+this.department)   
        }
    },
    methods:{

        submitPs(){
            this.dialogFormVisible = false,
            console.log('正在提交')
            this.$emit('submitps',this.form)
        },
        createNewUser(){
          this.dialogFormVisible = false,
            console.log('正在提交')
            this.$emit('createNewUser',this.form)
        }
    }
  };
</script>