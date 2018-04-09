<template>
  <div class="hello">
  
    
   
         <img class="logo" src="../assets/logo_big2.png">
         <div class='login'>
      
        <h2>&nbsp;</h2>
          <el-input type="text" placeholder="请输入用户名" :focused="true"  v-model="user" @change="checkBtn()"></el-input>

        <h2>&nbsp;</h2>
        <el-input type="password" placeholder="请输入密码" v-model="password" @change="checkBtn()"></el-input>
        <div class="el-state">
          <el-button type="defailt" v-show="showButton=='login'?true:false" @click="user_login()">登陆</el-button>

          <el-button type="success"  v-show="showButton=='login-success'?true:false">登陆成功</el-button>
          <el-button type="info"  v-show="showButton=='please-fill'?true:false">请输入用户名或密码</el-button>
          <el-button type="warning" v-show="showButton=='input-error'?true:false">密码错误</el-button>
          <el-button type="danger" v-show="showButton=='user-fail'?true:false">用户不存在</el-button>
        </div>
        </div>
  </div>

</template>

<script>
import router from '../router'
export default {
  name: 'index',
  data () {
    return {
      msg: '欢迎使用工时测算平台',
      user:'',
      radio3:'',
      password:'',
      el_state:"login_input",
      showButton:'login',
      
      
    }
  },
  methods:{

      user_login(){
          console.log('下面将发起请求')//
        if(this.user==''||this.password==""){
            this.showButton='please-fill'
        }else{
          //this.$http.headers= {'Content_Type':'Authorization'};
          this.$http.post('/users',{
                      //Content_Type:'Authorization',
                      name:this.user,
                      password:this.password
                   }).then((res)=> {
                      console.log(res.data)
                      this.showButton = res.data.login_state;        
                      if(res.data.login_state=='login-success'){
                        router.push({name:'jiaoluanpai',params:{username:this.user,sessionID:res.data.session_id,department:res.data.userDepart}})
                      }else{//登陆失败
                       // router.push('HelloWorld')
                      
                      }
                  })
        
        }
      },
      checkBtn(){
        if(this.user!=''&&this.password!=''){
           this.showButton = 'login'
        }
      },
  
    },
   mounted(){
    //  let inputelement=document.getElementById('user')
    //  inputelement.focus()
   }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.el-card{
  width:500px;
  margin:0 auto
}
.el-input{
  width:300px;
}
.el-state{
  margin-top: 20px
}
h1, h2 {
  color:#606266;
  font-weight: normal;
}
h1{
  font-family: '微软雅黑';
  font-size:30px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.hello{
  /* background: rgba(255, 255, 255, 0.9); */
  /* width:300px; */
  margin: 0 auto;
  margin-top:150px;
  padding: 100px;
  padding-top: 20px;
  color: #1b1b1b;
  border-radius: 20px;
  /* box-shadow: 10px 10px 90px 5px #fff */
}
.login{
  width: 300px;
  background: #fff;
  border-radius: 15px;
  padding: 50px;
  margin: 0 auto;
}

</style>
