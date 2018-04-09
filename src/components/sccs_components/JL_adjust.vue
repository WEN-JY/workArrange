<template>
<div class="mycontainer">
    <loadingM :loadingc="isloading"></loadingM>
<div class="subcon JLpanel">
    <el-card>
        <div v-for="(item,index) in tableData.sereisData" :key="index" class="allinfo" :style="getStyle(index)">
        <div class="checi"> {{item.checi}}{{item.node}}</div>
        <div class="btnOp">
            <el-button type="default " size="mini" @click="addToArray(item,index)"><i class="el-icon-arrow-right"></i></el-button>
        </div>
        
    </div>
    </el-card>
    
</div>
<div class="subcon subinfo"><infocard :jl="mixArray[0]">
</infocard>
<el-button type="danger" size="mini" @click="removeJL(0)">移除</el-button>
</div>
<div class="subcon subinfo"><infocard :jl="mixArray[1]"></infocard>
<el-button type="danger" size="mini" @click="removeJL(1)">移除</el-button></div>
<div class="subcon subinfo"><infocard :jl="mixArray[2]"></infocard>
<el-button type="danger" size="mini" @click="removeJL(2)">移除</el-button></div>

<div class="subcon JLpanel">
<el-card>
    <div slot="header" class="clearfix">
    <span>已安排<strong style="color:red"> {{arrangedData.length}}</strong>趟交路，这些交路的信息将参与工时测算</span>
    
  </div>
    <div v-for="(item,index) in arrangedData" :key="index" class="allinfo">
        
        <div class="checi">
            <el-button type="danger" size="mini" @click="removeAranged(index)"><i class="el-icon-delete"></i> 移除</el-button>
            <span class="jlname"> {{item.checi}}</span> {{item.node}}：<span class="jltime">{{item.totalTime|timeFilter}} 小时</span>
        
        </div>
    </div>
</el-card>
</div>
<div class="subcon mixinfo">
    <el-form :inline="true"  class="demo-form-inline">
    <el-alert
    title="计算公式"
    type="success"
    description="交路一趟工时 × 交路一计算比例 + 交路二趟工时 × 交路二计算比例 + 交路三趟工时 × 交路三计算比例">
  </el-alert>

  <el-form-item label="交路一比例">
    <el-input v-model="percent[0]" placeholder="请输入计算比例"></el-input>
  </el-form-item>
  <el-form-item label="交路二比例">
    <el-input v-model="percent[1]" placeholder="请输入计算比例"></el-input>
  </el-form-item>
  <el-form-item label="交路三比例">
    <el-input v-model="percent[2]" placeholder="请输入计算比例"></el-input>
  </el-form-item>
  <el-form-item label="当前工时">
    <el-input v-model="totalTime" ></el-input>
  </el-form-item>
      <el-form-item label="组合交路备注">
    <el-input v-model="beizhu" placeholder="请输入备注信息"></el-input>
  </el-form-item>

      <el-form-item label="调图版本">
    <el-input v-model="tiaotuEdition" placeholder="调图版本"></el-input>
  </el-form-item>
  <el-form-item>
      <el-button type="primary" @click="mixArray=[];mixIndex=[]">重置</el-button>
    <el-button type="primary" @click="caculateTime()">生成</el-button>
     <el-button type="success" @click="saveData()">保存数据</el-button>
  </el-form-item>
</el-form>
</div>

</div>
</template>


<script>
// 引入 ECharts 主模块
import infocard from './jl_infocard'
import loadingM from '../loadingModel'
import  bus  from '../bus'//这里的import是重点
  export default {
      
     props:['tableDat'],
     data() {
        return {
          labelPosition: 'LEFT',
            activeName: 'second',
            sessionID:'',
            user:'',
            department:'',
            tableData:{},
            mixArray:[],
            mixIndex:[],//正在参与混合的index
            mixedIndex:[],//已经混合过了的index
            percent:[1,1,1],
            beizhu:'',
            totalTime:0,arrangedData:[],
            isloading:0,
            tiaotuEdition:'',
            dealingWith:''//当前正在处理的数据部门，

        }},
        computed:{
       
        },
    methods: {
          getStyle:function(index){
            return this.mixIndex.indexOf(index)>-1?{background:'#409eff',color:"#fff"}:this.mixedIndex.indexOf(index)>-1?{background:'#ddd'}:{background:'#fff'}
         }, 
         saveData(){
             if(this.tiaotuEdition==''){
                 this.$alert('出错啦', {
                              confirmButtonText: '确定',
                              callback: () => {
                                                this.$message({
                                                type: 'info',
                                                message: '请输入调图版本',
                                                });
                                                }
                                     });
                             return;
             }
            this.isloading='1';
            let data=this.arrangedData;
            this.loading_text='正在保存数据，请稍后...'
            let date=new Date();
            let tableName=date.getFullYear()+'-'+(date.getMonth()+1);
            this.$http.post('/JLarrange',{
                      //Content_Type:'Authorization',
                      department:this.dealingWith,
                      data,
                      tableName,
                      edition:this.tiaotuEdition,
                      sessionID:this.sessionID,
                      api:'saveDataOfJL'
                   }).then((res)=> {
                      this.isloading=false
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
                        if(!!res.data.message){
                            this.loading2=false;
                              this.$notify({//数据接收成功通知
                                                title: '出错啦',
                                                message:res.data.message+'程序自动检测到mongoDB数据库问题，请稍后重试',
                                                type: 'warning'
                                                });
                        }else{
                            this.loading2=false;
                            this.$notify({//数据接收成功通知
                                                title: '保存成功',
                                                message:'数据已成功保存',
                                                type: 'success'
                                                });
                        }
                    
                  }).catch(err=>{
                      console.log(err)
                  })
                  
        },
        removeJL(index){
            this.mixArray.splice(index,1);
            this.mixIndex.splice(index,1);
        },
        caculateTime(){
            if(this.mixArray.length==0){
                return;
            }
            this.totalTime=0;
            for(let index in this.mixArray){
                if(!isNaN(this.mixArray[index].totalTime)){//计算时间
                    this.totalTime+=this.mixArray[index].totalTime*parseFloat(this.percent[index]);
                }
            }
            function deepClone(obj){
            let newobj=obj.constructor===Array?[]:{};
            for(let attr in obj){
                if(!!obj[attr]){
                    if(typeof obj[attr]=='object'){
                    newobj[attr]=deepClone(obj[attr]);
                    }else{
                        newobj[attr]=obj[attr];
                    }
                }
                
            }
            return newobj;
             }
             let arangeedOne=deepClone(this.mixArray[0]);
             arangeedOne.totalTime=this.totalTime;
             arangeedOne.beizhu=[this.beizhu];
            this.arrangedData.unshift(arangeedOne);
            this.mixedIndex=this.mixedIndex.concat(this.mixIndex);
            console.log(this.mixedIndex,this.mixIndex);
            this.mixIndex=[];
            this.mixArray=[];
        },
        removeAranged(index){
            this.arrangedData.splice(index,1);
        },
        addToArray(item,index){
            if(this.mixArray.length<3){
                this.mixIndex.push(index)
                this.mixArray.push(item);
            }else{
                 this.$notify({//数据接收成功通知
                            title: '出错啦',
                            message:'已经选择了数据，请点击按钮生成组合交路',
                            type: 'warning'
                            });
            }
            console.log(this.mixArray)
        },
       loadJLS_OfArranged(data){
           this.isloading=true;
           console.info('load函数被执行了',this.isloading)
           this.$http.post('/getInfo',{
                      //Content_Type:'Authorization',
                     department:this.department,
                      field:data,
                      sessionID:this.sessionID
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
                    console.log(res.data)
                    this.arrangedData=res.data;
                      console.log('这里将提示消息')
                      this.$notify({//数据接收成功通知
                      title: '成功',
                      message: '成功加载数据',
                      type: 'success'
                    });
                  }).then(dd=>{
                       this.isloading=false; 
                        console.info('load函数执行完成了',this.isloading)
                  })
                 
                 
                 
      },
    },
    components:{
        infocard,loadingM
    },
    mounted(){
      //先将会话id保存
            this.user=this.$route.params.user
            this.sessionID=this.$route.params.sessionID
            this.department=this.$route.params.department;
            this.tableData=this.tableDat;
            document.documentElement.style.overflowY = 'hidden';
           bus.$on('childload',department=>{
               console.log('捕获到了shildload')
               this.loadJLS_OfArranged(department);
               this.dealingWith=department
           })
    },
    filters:{
        timeFilter(time){
            if(!!time){
                return parseFloat(time).toFixed(2);
            }else{
                return '解析错误'
            }
        }
    },
     beforeDestroy () {
       bus.$off('childload')
      },
    watch:{
        tableDat(newValue,oldValue){
           this.tableData=newValue;
           this.mixArray=[];
           this.mixedIndex=[];
        }
    }
      
  }
</script>
<style scoped>
.el-form{
    margin-top: 20px
}
.mycontainer{
    display: -webkit-flex;
    width: 100%;
    display: flex;
    flex-wrap: wrap
}

.JLpanel{
    flex:1 1 20%;
    height:460px;
    overflow: auto;
    text-align: left;
    background:aliceblue;
}
.subinfo{
 
    border-radius: 10px;
    height: 460px;
    flex: 1 1 15%;
}

.allinfo{
    border: 1px solid aliceblue;

    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between
}
.mixinfo{
    height: 200px;
     border: 1px solid #cccccc;
    border-radius: 10px;
    height: 260px;
    flex: 1 1 20%;}
.icon{
    text-align: end;
    cursor: pointer;

}
.icon :hover{
    color:#409EFF
}
.checi{
    align-items:center;
    padding-left: 20px
}
.jlname{
    color:royalblue
}
.jltime{
    color: red
}
</style>