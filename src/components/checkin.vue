<template>

 <el-row >
  <el-col :span="8">
      <el-form-item label="职工工号" >
    <el-input v-model="form.worknum" @change="handleChange"></el-input>
  </el-form-item>
  <el-form-item label="职工姓名">
    <el-input v-model="form.name" @change="onDraw"></el-input>
  </el-form-item>
  <el-form-item label="性别">
    <el-input v-model="form.sex" @change="onDraw"></el-input>
  </el-form-item>
  <el-form-item label="学历">
    <el-input v-model="form.education" @change="onDraw"></el-input>
  </el-form-item>
  <br/>
  <el-form-item label="车间科室">
   <el-input v-model="form.department" @change="onDraw"></el-input>
  </el-form-item>
  <el-form-item label="职务职称">
   <el-input v-model="form.job" @change="onDraw"></el-input>
  </el-form-item>
  <el-form-item label="联系方式">
   <el-input v-model="form.contact" @change="onDraw"></el-input>
  </el-form-item>
  <el-form-item label="身份证号">
   <el-input v-model="form.IDnum" @change="onDraw"></el-input>
  </el-form-item>
  <el-form-item label="户籍所在地">
   <el-input v-model="form.birth_place" @change="onDraw"></el-input>
  </el-form-item>
  <el-form-item label="申请理由">
   <el-input v-model="form.appReason" type="textarea" @change="onDraw"></el-input>
  </el-form-item>
  
  <el-form-item label="申请时间" @change="onDraw">
   <el-date-picker type="date" placeholder="选择日期"  value-format="yyyy-MM-dd" v-model="form.appTime" style="width: 100%;"></el-date-picker>
  </el-form-item>
  <!-- <el-form-item label="申请入住宾馆">
   <el-input v-model="form.dormitory" ></el-input>
  </el-form-item> -->
  <el-form-item label="所在车间部门意见" >
     <el-select v-model="form.departmentOpinion" clearable placeholder="请选择" @change="onDraw">
    <el-option
      v-for="item in opinion"
      :key="item.value"
      :label="item.label"
      :title="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    
  </el-form-item>
  <el-form-item>
     <el-button type="primary" @click="onDrawImage"><i class="el-icon-printer"></i>打印申请表</el-button>
    <el-button type="primary" @click="onSubmit">提交申请</el-button>
  </el-form-item>
  </el-col>
  <el-col :span="16">
   <img :src="imagsrc"  class='print'/> 
  <canvas id="canvas" width="794" v-show="false" height="1123"></canvas>
  </el-col>
  
  
 </el-row>
</template>
<style scoped>
#canvas{
  overflow: scroll
}
</style>
<script>
 export default {
   props:['sessionID','department'],
    data() {
      return {
        imagsrc:'',
        
         opinion:[{
            label:'同意',
            value:'同意'
          },],
        form: {
          appTime:'',
         
          
        }
      }
    },
    methods: {
      onDrawImage(){
   
        var image = new Image();
        var canvas = document.getElementById("canvas");
        this.imagsrc = canvas.toDataURL("image/png");
        var w=window.open();
        w.document.open("text/html","replace");
      
     
        var txt="<html><body><img src='"+this.imagsrc+"'<button onclick='window.print()'></button></body></html>";
        w.document.write(txt);
        w.window.print()
        w.document.close();
      },
      onDraw(){

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,794,1123);  
ctx.lineWidth=2;
// ctx.rect(0,0,794,1123);
// ctx.stroke();
         
ctx.font = "bold 22px '微软雅黑'";
ctx.textAlign = "left";
//shadowBlur:模式级数
// ctx.shadowBlur = 10;
// ctx.shadowOffsetX = 5;
// ctx.shadowOffsetY = 5;
// ctx.shadowColor = "black";
//fillText("要添加的文字",x0坐标，y0坐标)
// ctx.strokeText("附件5",50,100);
ctx.fillText("附件5",100,100);
// ctx.strokeText("南京动车段异地职工住宿申请表",150,150);
ctx.fillText("南京动车段异地职工住宿申请表",270,150);
ctx.font = " 14px '宋体'";
ctx.fillText("编号________",100,170);
ctx.rect(100,190,594,700);//表格外边框
ctx.stroke();
ctx.lineWidth=1;
ctx.moveTo(100,230) ;
ctx.fillText("姓  名",130,215);
ctx.fillText("性  别",315,215);
ctx.fillText("学 历",450,215);
ctx.fillText(this.form.sex?this.form.sex:'',400,215);
ctx.fillText(this.form.education?this.form.education:'',550,215);
ctx.fillText(this.form.name?this.form.name:'',220,215);
ctx.fillText("车间（科室）",115,255);
ctx.fillText("职务(职称)",310,255);
ctx.fillText("学 历",450,215);
ctx.fillText(this.form.department?this.form.department:'',213,255);
ctx.fillText(this.form.job?this.form.job:'',400,255);
ctx.fillText('联系方式',510,255);
ctx.fillText(this.form.contact?this.form.contact:'',590,255);
ctx.lineTo(693,230);//表内第一条横线
ctx.fillText("身份证号",115,305);
ctx.fillText("户籍所在地",410,305);
ctx.fillText(this.form.IDnum?this.form.IDnum:'',235,305);
ctx.fillText(this.form.birth_place?this.form.birth_place:'',530,305);
ctx.moveTo(380,270) ;
ctx.lineTo(380,330); 
ctx.moveTo(500,270) ;
ctx.lineTo(500,330); 
ctx.moveTo(580,230) ;
ctx.lineTo(580,270);
ctx.moveTo(300,190) ;
ctx.lineTo(300,270);
ctx.moveTo(390,190) ;
ctx.lineTo(390,270);
ctx.moveTo(440,190) ;
ctx.lineTo(440,230);
ctx.moveTo(500,190) ;
ctx.lineTo(500,270);
ctx.moveTo(210,190) ;
ctx.lineTo(210,330); 
ctx.moveTo(100,270) ;
ctx.lineTo(693,270);  

ctx.moveTo(400,330) ;
ctx.lineTo(400,630);
ctx.fillText("申请理由：",115,355);
ctx.fillText(this.form.appReason?this.form.appReason:"",145,475);
ctx.fillText("所在车间部门意见：",415,355);
ctx.fillText(this.form.departmentOpinion?this.form.departmentOpinion:'',495,475);
ctx.fillText("申请人：",185,615);
ctx.fillText("年    月    日",295,615);

ctx.fillText("（盖章）",455,585);
ctx.fillText("负责人：",485,615);
ctx.fillText("年    月    日",585,615);
ctx.moveTo(100,330) ;
ctx.lineTo(693,330); //表内第2条横线  
ctx.fillText("管理部门意见:",115,655);
ctx.fillText("（盖章）",415,695);
ctx.fillText("年    月    日",555,745);
ctx.fillText("宿舍意见:",115,785);
ctx.fillText("年    月    日",555,875);

ctx.fillText('注: 1．符合入住单身宿舍的异地职工，据实填写本表。',115,920)
ctx.fillText('2．所在车间（科室）严格把关，办公室签署意见并盖章。',145,940)
ctx.fillText('3．宿舍管理部门依据单位意见为职工安排宿舍床位，并做好台帐登记。',145,960)
ctx.fillText('4．住宿职工须遵守宿舍纪律，听从安排，不得随意调剂床位；若退休、跨地区工作调动、',145,980)
ctx.fillText('购（租）房或离职等有不符合住宿条件的，须及时办理退宿手续。',160,1000)
ctx.fillText('5．本表一式二份，车间、宿舍管理部门各存一份。',145,1020)
ctx.moveTo(100,630) ;
ctx.lineTo(693,630);
ctx.moveTo(100,760) ;
ctx.lineTo(693,760);//表内第3条横线    
ctx.stroke(); 
var image = new Image();
        var canvas = document.getElementById("canvas");
        this.imagsrc = canvas.toDataURL("image/png");
      },
      onSubmit() {
        console.log(this.form)
        this.form.nextVarify='行政办公室';
       // console.log(this.form.appTime);
        if(this.form.worknum&&this.form.birth_place&&this.form.appReason&&this.form.departmentOpinion){
          
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
     
        this.$http.post('/check_in_out',{
            apiName:'createUserinfo',
            formData:this.form,
            sessionID:this.sessionID,
            department:this.department
        }).then((res)=>{
           this.$alert('提交成功', {
                              confirmButtonText: '确定',
                              callback: () => {
                                this.$message({
                                  type: 'success',
                                  message: '成功提交申请，请等待审核',
                                });
                              }
                            });
          console.log(res.data)
        })
        this.form={};
        console.log('submit!');
      },
      handleChange(){
        
         console.log('change detected!');
       
        this.$http.post('/check_in_out',{
            worknum:this.form.worknum,
            sessionID:this.sessionID,
            apiName:'getUserinfo',
            department:this.department
        } 
        ).then((res)=>{
          if(!!res.data.checkLogin){
                        this.loading2=false;
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

          this.form=res.data;
          console.log(res.data)
        })
        this.onDraw()
      }
    },
    mounted(){
     this.onDraw()
       
    }
  };
</script>