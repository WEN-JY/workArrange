<template>
  <div id="app">
    <router-view/>
    <div class="footer">
      版权所有 (C) 2018 南京动车段。保留所有权利。
    </div>
  </div>
</template>

<script>
import bus from "./components/bus"
export default {
  name: 'app',
  methods:{

  },mounted(){

  //   var num=Math.floor(Math.random()*(5)+1);
  //   //console.log(num)
  //   var str= "url("+require("./img/bg_"+num+".jpg")+")";
  //   //console.log(document.body)
  //   document.body.style.background=str;
  //   document.body.style.backgroundAttachment='fixed';
  //   document.body.style.backgroundSize='cover';
    
  // }
}}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: '微软雅黑'
}
body{
  background: url('./assets/bg_10.jpg');
  background-attachment: fixed;
  background-size: cover
}

.footer{
  background: #2c3e50;
  height: 50px;
  width:100%;
  line-height: 50px;
  color:aliceblue;
  font-size: 11px;
  position: fixed; /*or前面的是absolute就可以用*/  
  bottom: 0px;  
  z-index: 9999999999;
}
#app {
  font-family: 'Avenir', 'Helvetica', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #35495e;
  margin-top: 60px;
}
.el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  border-radius: 4px;
  border: none;
  border-bottom: 1px solid #ccc;
  }
</style>
