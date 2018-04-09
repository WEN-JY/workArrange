<template>

  <div class="hello"><myheader></myheader>
     <video id="video" width="640" height="480" autoplay></video>
     <el-button  @click="cc">进行识别</el-button>
        <canvas id="canvas" width="640" height="480"></canvas>
  </div>

</template>

<script>
import router from '../router'
import myheader from './myheader'
export default {
  name: 'camera',
  data () {
    return {
      msg: "欢迎登陆--人脸识别",
      user:'',
     canvas:'',
     context:'',
     video:''
    }
  },
  methods:{
       errBack:function(error) {
                    console.log("Video capture error: ", error.code);
                },
      cc(){
         this.context.drawImage(this.video, 0, 0, 640, 480);
         var data=this.canvas.toDataURL();

          // dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
          data=data.split(',')[1];
          data=window.atob(data);
          var ia = new Uint8Array(data.length);
          for (var i = 0; i < data.length; i++) {
              ia[i] = data.charCodeAt(i);
          };

          // canvas.toDataURL 返回的默认格式就是 image/png
          var blob=new Blob([ia], {type:"image/png"});
          var fd=new FormData();
          fd.append('file',blob);
           this.$http({
            url:'http://localhost:3000/faceValidate',
            method:'post',
            data:fd,

          } ).then((res)=>{
              console.log(res)
        })
      }
  },
  mounted(){
               this. canvas = document.getElementById("canvas");
                this.context = canvas.getContext("2d");//getContext唯一合法值2d
                var video = document.getElementById("video");
                var videoObj = {
                    "video": true,
                    "audio": true
                }
                navigator.mediaDevices.getUserMedia(videoObj)
                .then(function(mediaStream) { 
                   video.src = window.URL.createObjectURL(mediaStream);
                   video.onloadedmetadata = function(e) {
                   video.play()
                    // Do something with the video here.
                   
                  };
                }).catch(function(error) { 
                  
                 })
                  this.video=video
  },
  components:{
    myheader:myheader
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-input{
  width:300px;
}
.el-state{
  margin-top: 20px
}
h1, h2 {
  font-weight: normal;
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
</style>
