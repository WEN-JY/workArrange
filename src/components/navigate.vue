
<template>
<div>
    <img class="logo" src="../assets/logo_big1.png">
   
<div id="show" >
    <div class="item" id="item1" @click="routerTo('indexPage',1)">
       
              <img src="../assets/logo_1.png" class="image"/>
         
       
    </div>
    <div class="item" id="item2" @click="routerTo('check_in_out',2)">
        
              <img src="../assets/logo_2.png" class="image"/>
      
       
    </div>
    <div class="item" id="item3" @click="routerTo('infochanges',3)">
        
              <img src="../assets/logo_3.png" class="image"/>
      
    
    </div>
    <div class="item" id="item4" @click="routerTo('upload',4)">
           
             <img src="../assets/logo_4.png" class="image"/>
             
      
    </div>
    
</div>
<div class="module">
    <img src="../assets/module.png" class="imagem"/>
</div>
</div>
</template>
<style type="text/css" scoped>
h1{
    color: aliceblue
}

.item .image{
    border-radius: 30px;
    width:100%;
	cursor: pointer;
    /* box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(50%, transparent) , to(rgba(250, 250, 250, 0.3))); */

  }
.module{
    height:200px;width:200px;position:fixed;bottom:50px;right:50px
}
.imagem{
    height:100%
}
#show{position:relative;margin:20px auto;width:800px;}
.item{position:absolute;height:300px;width:270px;background:rgba(0,0,0,0);cursor:pointer;
}

</style>
<script>
import router from '../router'
import myheader from './myheader'
import bus from "./bus"
export default {
  name: 'navigate',
  data () {
    return {
		currentDate:new Date(),
		sessionID:'',
		username:'',
		department:'',
		activeindex:''
    }
  },
  methods:{
	  routerTo(a,index){
		  	if(this.activeindex==index){
				  	 router.push({name:a,params:{username:this.username,sessionID:this.sessionID,department:this.department}})
			  }else{
				  this.activeindex=index;
				  return 0;
			  }
		   
	  }
  },
  mounted(){
	  this.sessionID=this.$route.params.sessionID
       //进行路由跳转传递姓名以在右上角显示
       this.username=this.$route.params.username
        this.department=this.$route.params.department;
      var len;
var showerObj;
var listObj;
var showerWidth=800;
var showerHeight=400;
var r;
var cR=0;
var ccR=0;
var timer=0;

	showerObj=document.getElementById("show");
	listObj=showerObj.getElementsByTagName("div");
	len=listObj.length;
	r=Math.PI/180*360/len;
	for(var i=0;i<len;i++){
		var item=listObj[i];
		item.style.top=showerHeight/2+Math.sin(r*i)*showerWidth/2-20+"px";
		item.style.left=showerWidth/2+Math.cos(r*i)*showerWidth/2-30+"px";
		item.rotate=(r*i+2*Math.PI)%(2*Math.PI);
		item.onclick=function(){
			cR=Math.PI/2-this.rotate;
			timer || (timer=setInterval(rotate,10));
			
		}
	
	}
	var rX=showerObj.offsetLeft+showerWidth/2;
	var ry=showerObj.offsetTop+showerHeight/2;
	
	var rotate=function(){
		ccR=(ccR+2*Math.PI)%(2*Math.PI);
		if(cR-ccR<0) cR=cR+2*Math.PI;
		if(cR-ccR<Math.PI){
			ccR=ccR+(cR-ccR)/19;
		}else{
			ccR=ccR-(2*Math.PI+ccR-cR)/19;
		
		}
		
		if(Math.abs((cR+2*Math.PI)%(2*Math.PI)-(ccR+2*Math.PI)%(2*Math.PI))<Math.PI/720){
			ccR=cR;
			clearInterval(timer);
			timer=0;
		}
		
		for(var i=0;i<len;i++){
			var item=listObj[i];
			var w,h;
			var sinR=Math.sin(r*i+ccR);
			var cosR=Math.cos(r*i+ccR);
			w=180+0.6*180*sinR;
			h=(250+0.6*250*sinR);
			item.style.cssText +=";width:"+w+"px;height:"+h+"px;top:"+parseInt(showerHeight/2+sinR*showerWidth/2/3-w/2)+"px;left:"+parseInt(showerWidth/2+cosR*showerWidth/2-h/2)+"px;z-index:"+parseInt(showerHeight/2+sinR*showerWidth/2/3-w/2)+";";
	
		}
	}
	
	
	rotate();}
  
}

</script>
