<template>
 <div id="app">
<header class="el-header" style="height: 80px; background:rgba(23, 35, 41, 0.39);">
  <img src="../assets/logo.png" alt="element-logo" class="header-logo" /> <span class="headTi">劳动人事科工时测算平台</span>
<ul class="header-operations">
  <li index="1" @click="routerTo('index')"><i class="el-icon-close"></i>退出</li>
  <li index="7" > {{username}}</li>      
  <li index="3" v-show="getAuth()" @click="routerTo('upload')"><i class="el-icon-upload2"></i>信息上传</li>
   <li index="4" @click="changeInfo()"><i class="el-icon-setting"></i>个人设置</li>
    <li index="9"><span @click="routerTo('dataAnalysis')"><i class="el-icon-document" ></i>数据分析</span></li>
  <li index="5"  v-show="getAuth()"><span @click="loadInfoChange()"><i class="el-icon-time" ></i>地勤测算</span></li>
  <li index="6"  v-show="getAuth()"><span @click="routerTo('suiche_cesuan')"><i class="el-icon-success" ></i>定员测算</span></li>

<li>
  <el-dropdown @command="handleCommand">
     <span class="el-dropdown-link" @click="routerTo('indexPage')">
       <i class="el-icon-location"></i>交路信息
      </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item  index="2-1" command='全部' ><i class="el-icon-location" ></i>全部</el-dropdown-item>
    <el-dropdown-item  index="2-1" command='南京南'><i class="el-icon-location" ></i>南京南</el-dropdown-item>
    <el-dropdown-item index="2-2" command='合肥南'><i class="el-icon-location"></i>合肥南</el-dropdown-item>
    <el-dropdown-item  index="2-3" command='南京所' ><i class="el-icon-location" ></i>南京所&nbsp;&nbsp;&nbsp;&nbsp;</el-dropdown-item>
    <el-dropdown-item  index="2-4" command='徐州东' ><i class="el-icon-location"></i>徐州东</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>  
  </li>
  <li index="8"><span @click="routerTo('peopleManage')"><i class="el-icon-info" ></i>人员调整</span></li>
   <li index="7"><span @click="routerTo('jiaoluanpai')"><i class="el-icon-edit" ></i>交路安排</span></li>
          </ul>
</header>

<infoedit :dialogState="dialogState" @closeInfoDialog="closeInfoDialog" :username="username" @submitps="submitps" :departments="department"
@createNewUser='createNewUser'></infoedit>
</div>
</template>
<style scoped>
.headTi{
  color: aliceblue;
  font-size: 30px;
  
   position:fixed;
   top:14px;
   left:220px;
}

#app {
  width:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: right;
  color: #2c3e50;
  margin-top: -60px;
  /* background: url('../img/bg_bl.jpg'); */
}

.header-logo {
    position:fixed;
    display: inline-block;
    vertical-align: middle;
    left:0;
    margin-left:100px;
    top:20px
}
.header-operations{
  display: inline;
}
.header-operations li {
    display: block;
    float: right;
    /* padding-right: 30px; */
    height: 100%;
}
.el-dropdown-link{
  color:#fff;
  font-size:17px;
}
.el-dropdown-link:hover{
  color:slategrey
}


ul, menu, dir {
    display: block;
    list-style-type: disc;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 10px;
    -webkit-padding-end: 10px;
    padding:10px;
}

.el-container.is-vertical {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
}

.header-operations li:hover{
  background: aliceblue;
  color: slategrey
}
.header-operations .header-download {
    opacity: .4;
    cursor: default;
}
.header-operations li {
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    padding: 0 10px;
    margin: 0 10px;
    line-height: 80px;
    cursor: pointer;
}
li {
    display: list-item;
    text-align: -webkit-match-parent;
}
.el-dropdown-item {
  text-align: center;
  margin-left: 10px;
  padding-right:30px;
}
</style>
<script>
import router from '../router'
import  bus from './bus'
import infoedit from './infoedit'
  export default {
    props:['sessionid'],
    data() {
      return {
        dialogState:false,
        depart:['南京南','合肥南','南京所','徐州东'],
        activeIndex: '1',
        activeIndex2: '1',
        username:'',
        loadInfos:'',
        sessionID:'',
        department:''
      };
    },
    methods: {
      createNewUser(form){
        if(form.new_name&&form.new_department&&form.new_password)
        {}
        else{
             this.$notify({//数据接收成功通知
                      title: '失败',
                      message: '不能有空内容',
                      type: 'warning'
                    });
                    return
        }
        this.$http.post('/users',{
          
            sessionID:this.sessionID,
            apiName:'createUser',
            form:form,
            department:this.department
        } 
        ).then((res)=>{
          if(!!res.data.state){
            console.log(res.data.code)
            this.$notify({//数据接收成功通知
                      title: '错误',
                      message: '创建失败：'+res.data.code.name+res.data.code.message,
                      type: 'warning'
                    });
           
               return
          }else{
             this.$notify({//数据接收成功通知
                      title: '成功',
                      message: '创建成功',
                      type: 'success'
                    });
          }
          this.username=form.name;
        })
      },
      submitps(form){
         if(form.name=='登陆人员信息'&&form.password==''){
           this.$notify({//数据接收成功通知
                      title: '失败',
                      message: '请确认数据再操作',
                      type: 'warning'
                    });
                    return
         }
         this.$http.post('/users',{
          
            sessionID:this.sessionID,
            apiName:'updateUser',
            form:form,
            department:this.department
        } 
        ).then((res)=>{
          if(!!res.data.state){
            console.log(res.data.code)
            this.$notify({//数据接收成功通知
                      title: '错误',
                      message: '修改失败：'+res.data.code.name+res.data.code.message,
                      type: 'warning'
                    });
           
               return
          }else{
             this.$notify({//数据接收成功通知
                      title: '成功',
                      message: '修改成功',
                      type: 'success'
                    });
          }
          this.username=form.name;
        })
      },
      closeInfoDialog(){
        this.dialogState=false;
      },
      changeInfo(){
        console.log('tanchu dialog')
        this.dialogState=true;
      },
      getAuth(){
          if(this.department=='劳人'||this.department=='劳人科'||this.department=="管理员"){
            return true;
          }else{
              return false;
            
          }
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      routerTo(path){
        //this.$emit('userroter',this.username)
        console.log(path+'来自myheader routerTo')
        router.push({name:path,params:{username:this.username,sessionID:this.sessionID,department:this.department}});
          
      },
      handleCommand(command) {
        console.log('触发点击事件')
          this.loadInfos=command
          bus.$emit('loadInfo',command)
      },
      loadInfo(param){//点击菜单后加载相应信息
          console.log('触发点击事件')
          this.loadInfos=param
          bus.$emit('loadInfo',param)
      },
      loadInfoChange(){
      //点击 变更信息查询 重新加载数据
      //console.log(loadInfoChange)
          this.routerTo('infochanges');
          bus.$emit('loadInfoChange',this.department)  
      }
    },
    components:{
        infoedit:infoedit
    },
    mounted(){
        this.sessionID=this.$route.params.sessionID
       //进行路由跳转传递姓名以在右上角显示
       this.username=this.$route.params.username
        this.department=this.$route.params.department;
       
    },
    befoerDestroy(){
      //bus.$emit('loadInfo',this.loadInfos)
      console.log('header destroyed')
    }
  }
</script>