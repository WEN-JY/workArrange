<template>

  <div><myheader></myheader>
  <loadingM  :loadingc="loadinga"></loadingM>
  <div class='container'>   
    <div id="mycanvas"></div>
    <div id="njncanvas" class="flexItem"></div>
    <div id="njcanvas"  class="flexItem"></div>
    <div id="hfncanvas"  class="flexItem"></div>
    <div id="xzdcanvas"  class="flexItem"></div>
  </div>
  </div>
</template>
<script>
import myheader from './myheader'
import loadingM from './loadingModel'
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
// // 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
class CanvasOfData{
    constructor({seriesData,department,timeLine}){
        this.data=seriesData;
        this.department=department;
        this.timeLine=timeLine;
        let elementID='';
        switch(department){
            case '南京南':
            elementID='njncanvas';
            break;
            case '南京所':
            elementID='njcanvas';
            break;
            case '合肥南':
            elementID='hfncanvas';
            break;
            case '徐州东':
            elementID='xzdcanvas';
            break;
            default:
            elementID='mycanvas'
            break;
        }
        this.element=document.getElementById(elementID)
    }
     drawCanvas(type){
         let chart=echarts.init(this.element);
        
         let option={
                title: {
                    text: this.department
                },
                tooltip: {},
                xAxis: {
                    data: this.timeLine 
                     },
                yAxis: {
                    type:'value'
                },
                series: [{
                    name: '月度工时',
                    type: 'line',
                    data: this.data
                }],
                legend:{
                    show:true,
                }
            }
            chart.setOption(option)
     }
}
class CanvasOfDataAll{
    constructor({seriesData,department,timeLine}){
     
        this.data=seriesData;
 
        this.timeLine=timeLine;
    
        this.chartTitle='工时测算对比图';
        this.element=document.getElementById('mycanvas');
    }
    drawCanvas(type){
        let chart=echarts.init(this.element);
        let seriesData=this.data.map((element,index,arr)=>{
            return {
                type:type,
                name:element.department,
                data:element.seriesData
            }
        });
         let option={
                title: {
                    text:this.chartTitle
                },
                tooltip: {},
                xAxis: {
                    data: this.timeLine 
                     },
                yAxis: {
                    type:'value'
                },
                series:seriesData,
                legend:{
                    show:true,
                }
            }
            chart.setOption(option)
     }
}
export default {

  data(){
      return {
         timeLine:[],
         department:'',
         loadinga:true,
         sessionID:'',
         DATA:[],
      
      }
  },
  components:{
          myheader,loadingM
  },
  methods:{
      loadData(timeLine){
          this.loadinga=true
           this.$http.post('/JLarrange',{
                      //Content_Type:'Authorization',
                      department:this.department,
                      timeLine:this.timeLine,
                      sessionID:this.sessionID,
                      api:'loadData_ansis'
                   }).then((res)=> {
           
                      if(!!res.data.checkLogin){
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
                           this.loadinga=false
                        if(!!res.data.message){

                              this.$notify({//数据接收成功通知
                                                title: '出错啦',
                                                message:res.data.message+'程序自动检测到mongoDB数据库问题，请稍后重试',
                                                type: 'warning'
                                                });
                        }else{

                            this.$notify({//数据接收成功通知
                                                title: '加载成功',
                                                message:'数据已成功加载',
                                                type: 'success'
                                                });
                        }
                    let data_get=res.data;
                    for(let index in data_get){
                        data_get[index].seriesData=[];
                        
                        for(let attr in data_get[index].data){
                            var arrIndex=data_get[index].data[attr].month.split('-')[1];
                            data_get[index].seriesData[arrIndex-1]=data_get[index].data[attr].value;
                            data_get[index].timeLine=this.timeLine;
                        }
                    
                    }
                    this.DATA=data_get;
                    this.DATA.forEach((element,index,arr)=>{
                        let tpcan=new CanvasOfData(element).drawCanvas('line')
                    })
                    new CanvasOfDataAll({seriesData:data_get,department:'all',timeLine:this.timeLine}).drawCanvas('line')
                    console.log(this.DATA)
                  })
                 
      },
      drawCanvas(objOP){
         
      }
     

  },
  mounted(){
      this.sessionID=this.$route.params.sessionID
    //进行路由跳转传递姓名以在右上角显示
      this.username=this.$route.params.username
      this.department=this.$route.params.department;
      let date =new Date();
      let Year=date.getFullYear();
      let timeLine=[];
      for(let i=1;i<=12;i++){
          timeLine.push(Year+'-'+i);
      }
      this.timeLine=timeLine;
      this.loadData(timeLine)
      
     this.drawCanvas()
      
  }

}
</script>
<style scoped>
.container{
     display: -webkit-flex; /* Safari */
     display: flex;
     width:100%;
     min-height: 100%;
     padding-top:80px;
     background: aliceblue;
     -webkit-flex-wrap: wrap; /* Safari */
    flex-wrap: wrap;
}
#mycanvas{
    height:500px;
    width:100%;
    display: -webkit-inline-flex; /* Safari */
    display: inline-flex;
    flex: 0 0 1;
   
}
.flexItem{
    width:25%;
    height:300px;
    display: -webkit-inline-flex; /* Safari */
    display: inline-flex;
    flex:auto;
    background: aliceblue;
}
</style>
