<template>
<div  @mouseover="dropContent($event)">
    <myheader></myheader>
    <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="导出日期" >
        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd"  v-model="outPutTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="outPutData"><i class="el-icon-download"></i>生成计划</el-button>
      <el-select v-model="tiaotuEdition" placeholder="请选择交路版本"  @change="loadTiaotuJL">
        <el-option
        v-for="item in optionsTiaotu"
        :key="item.value"
        :label="item.label"
        :value="item.value"
       >
        </el-option>
    </el-select>
      <el-button type="success" @click="saveData"><i class="el-icon-upload"></i>保存数据</el-button>
       <el-button type="success" @click="transformData"><i class="el-icon-refresh"></i>数据转换</el-button>
       <el-button type="success" @click="outPutMonthData()"><i class="el-icon-view"></i>月度汇总</el-button>
      </el-form-item>
  </el-form>
  <div v-show="!transforming">
    <JLselectPanel :JLs="jiaolus" :style="contentStyle"></JLselectPanel>
    <el-table
      :data="tableData"
       stripe
       border
       v-loading="loading2"
        :element-loading-text="loading_text"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        height="690"
        style="width: 100%">
     <el-table-column
      type="index"
      fixed="left"
      width="50">
    </el-table-column>
    <el-table-column
      prop="department"
      label="部门"
      fixed="left"
     >
      </el-table-column>
     <el-table-column
      prop="worknum"
      label="工号"
      fixed="left"
     >
    </el-table-column>
    <el-table-column
      prop="name"
      fixed="left"
      sortable
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="phoneNum"
      label="手机号"
      fixed="left"
      width="150px"
     >
     <template slot-scope="scope">
         <div class='content-rowspan' style="text-align:left"><span style="color:blue"><i class="el-icon-mobile-phone"></i></span>{{scope.row.phoneNum}}</div>
     </template>
    </el-table-column>
    <el-table-column
    fixed="left"
      prop="workTime"
      sortable
      label="总工时" :formatter="formatTime">
    </el-table-column>
     <el-table-column
      label="日期">
    <el-table-column v-for='(date,index) in monthDays'  v-bind:key="index" v-bind:label="date.toString()">
        <template slot-scope="scope">
          <div class="content-rowspan" :style="getStyle(scope.row.jiaolu[date])"  @contextmenu="editJL($event,date,scope.row,scope.$index)" @mouseover="allowDrop(date,scope.row)"  @dblclick="clear(date,scope.row)">         
              <div class="dropdiv"   title="'交路工时:暂未开放此功能'">
                 {{scope.row.jiaolu[date]|measureJl}} </div>
          </div>
        </template>
    </el-table-column>
    
    </el-table-column>
  </el-table>

<pagination :total="totalTableRow"></pagination>
<dialog_edit @info-submit="changedInfo" @dialoghide='hidedialog' :jlInfo="editJLObj" :formVisibal="dialog_edit_show" ></dialog_edit>
</div>
<div v-show="transforming">
    <table_to_jl :Tabledata="JIAOLU_DATA" :monthDays="monthDays"></table_to_jl>
</div>

  
</div>
  
</template>
<script>

import router from '../router'
import myheader from './myheader'
import JLselectPanel from './JLselectPanel'
import bus from './bus'
import dialog_edit from './dialog_edit'
import pagination from './pagination'
import table_to_jl from './jiaoluanpai_components/table_to_jl'
export default {
  data(){
      return {//本组件巧妙利用引用类型的浅复制，实现修改数据
          currentRow:{},
          currentRowDate:'',
          currentRowIndex:'',
          dialog_edit_show:false,
          editJLObj:{},
          department:'南京南',
          sessionID:'',
          loading2:'',
          monthDays:0,
          loading_text:'玩命加载中',
          JLselected:{},
          isdrag:false,
          JLindex:'',
          outPutTime:'',
          tablePageSize:20,
          totalTableRow:0,
          totalData:[],
          pages:'',
          currentPage:1,
          lastPage:'',
          nextPage:'',
          tableData:[],
          contentStyle:{ top:'100px'
                        ,right:'-15px'},
          isContentMove:false,
            jiaolus:[

            ]
            ,JIAOLU_DATA:[],
            transforming:false,
            optionsTiaotu:[
                {
                    label:'5.20调图',
                    value:'5.20调图'
                }
            ],
            tiaotuEdition:''
      }
  },
  methods:{
      
      loadTiaotuJL(){
          if(!!this.tiaotuEdition){
            this.loading2=true;
            console.log('发起getInfo请求--来自交路安排主页面')
            this.$message({
                    message: '正在加载交路信息',
                    type:'warning'
                    });
            // bus.$emit('noticer',{n_type:'',n_content:'正在加载数据'})
                console.log(this.sessionID)
                this.$http.post('/getInfo',{
                        //Content_Type:'Authorization',
                        department:this.department,
                        field:this.department,
                        edition:this.tiaotuEdition,
                        sessionID:this.sessionID
                    }).then((res)=> {
                        
                        this.loading2=false;
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
                        this.jiaolus=res.data;
                        console.log('这里将提示消息')
                        this.$notify({//数据接收成功通知
                        title: '成功',
                        message: '成功加载数据',
                        type: 'success'
                        });
                    })
            }
            console.log(this.tiaotuEdition)
      },
      transformData(){
         
          if(this.transforming){
              this.transforming=!this.transforming; 
              return;
          }else{
              this.transforming=!this.transforming; 
          }
          
        function deepClone(obj){
            let newobj=obj.constructor===Array?[]:{};
            console.time('创建对象成功',typeof newobj);
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
        let dataTransfered=deepClone(this.totalData);
        this.JIAOLU_DATA=deepClone(this.jiaolus);
        let JIAOLU_DATA=this.JIAOLU_DATA;
        for(let index in JIAOLU_DATA){//对每一个交路展开
            JIAOLU_DATA[index].arrange=[];//该交路月度安排情况数组
            for(let i=0;i<dataTransfered.length;i++){//对每一个人展开
                for(let j=0;j<dataTransfered[i].jiaolu.length;j++){//对每一个人的交路展开
                    if(!!dataTransfered[i].jiaolu[j]){
                        dataTransfered[i].jiaolu[j]=dataTransfered[i].jiaolu[j].constructor===Array?dataTransfered[i].jiaolu[j]:[];
                    }else{
                        dataTransfered[i].jiaolu[j]=[]//如果为null,初始化为[];
                    }
                    for(let k=0;k<dataTransfered[i].jiaolu[j].length;k++){//对每一个人的某一天展开
                        if(!!dataTransfered[i].jiaolu[j][k]){
                            if(JIAOLU_DATA[index].checi.indexOf(dataTransfered[i].jiaolu[j][k].checi)>-1){
                                if( JIAOLU_DATA[index].arrange[j]){
                                    JIAOLU_DATA[index].arrange[j]+='\n'+(dataTransfered[i].name);
                                }else{
                                    JIAOLU_DATA[index].arrange[j]=dataTransfered[i].name
                                }
                            }
                        }
                    }  
                }
            }
        }
    
      },
      hidedialog(val){
          this.dialog_edit_show=val
      },
      changedInfo(obj){
          console.log(obj,'--父组件接收到的参数obj')
          obj.totalTime=parseFloat(obj.totalTime).toFixed(2);
        //   if(this.dialog_edit_show)this.tableData[this.currentRowIndex].workTime+=obj.totalTime;
        this.$set(this.currentRow.jiaolu[this.currentRowDate],0,obj);
        this.currentRow.workTime=(()=>{
            let sum=0;
            this.currentRow.jiaolu.forEach((element,index,arr) => {
                console.log(sum)
                if(!!element){
                   element.forEach(ele=>{
                       sum+=parseFloat(ele.totalTime)
                   })
                    
                }
            });
            return sum;
        })()
        this.dialog_edit_show=false;
        console.log(this.totalData[0]);
      },

      editJL(event,date,row,index){
          this.currentRow=row;
          this.currentRowDate=date;
          this.currentRowIndex=index;
          
          event.preventDefault();
          if(!!row.jiaolu[date]){
              this.editJLObj=row.jiaolu[date].constructor===Array?row.jiaolu[date][0]:row.jiaolu[date];
          }else{
              return;
          }
          this.dialog_edit_show=true; 
      },
      dropContent(ev){
           // console.log(ev);
            let e = event || window.event;
            
            if(this.isContentMove){
                this.contentStyle= {'left':e.screenX+'px','top':e.screenY+'px'};
                this.isContentMove=false;
                console.log(this.contentStyle,'执行正常')
            }else{
                return;
            }
      },
      calculateMonthDay(){//计算交路安排时的
        let date=new Date();
        let month=date.getMonth()+1;
        let lastMonth='';
        if(month==1){            
            lastMonth=new Date((date.getFullYear()-1),12,0);
        }else{
            lastMonth=new Date(date.getFullYear(),(month-1),0);
        }
        let data2MonthLength=lastMonth.getDate();
        let tempArray=[];
        console.log(data2MonthLength);
        for(let i=0;i<data2MonthLength-25;i++){

            tempArray.push(26+i)
        }
        for(let j=0;j<25;j++){
             tempArray.push(j+1)
        }
        console.log(tempArray,'测试输出');
        this.monthDays=tempArray;
      },
      formatTime(row){
          //console.info(row.workTime);
          return parseFloat(row.workTime).toFixed(2);
      },
        // formatM(workTime){
        //     return workTime.toFixed(2)
        // },
        getStyle(data){
            
            if(!!data){
                switch(data.length){
                    case 0:
                    return {'background':'aliceblue','color':'#fff'}
                    break;
                    case 1:
                    return {'background':'#67c23a','color':'#fff'}
                    break;
                    case 2:
                    return {'background':'#409eff','color':'#fff'}
                    break;
                    case 3:
                    return {'background':'#f56c6c','color':'#fff'}
                    break;
                    default:
                    return {'background':'#f56c6c','color':'#fff'}
                    break;
                }
                
            }else{
            }
        },
        outPutData(){
                if(!!this.outPutTime){
                    var tableName=this.outPutTime;
                }else{
                    return;
                }
                console.log(this.totalData);
                this.$http.post('/outputExcel',{
                      //Content_Type:'Authorization',  
                      tableName,
                      api:'LJplan',
                      department:this.department,     
                      excelData:JSON.stringify(this.totalData),
                      sessionID:this.sessionID,department:this.department
                   }).then((res)=> {
                       console.log(res.data.file)
                       //正常情况下返回值是excel文件的下载路径
                      
                       this.excelpath=this.$excelPath_custom+res.data.file;
                       window.open(this.excelpath)
                   })
        },
        outPutMonthData(){
                return;
                this.$http.post('/outputExcel',{
               
                      api:'monthData',
                      department:this.department,     
                      excelData:JSON.stringify(this.tableData),
                      sessionID:this.sessionID,
                   }).then((res)=> {
                       console.log(res.data.file)
                       //正常情况下返回值是excel文件的下载路径
                      
                       this.excelpath=this.$excelPath_custom+res.data.file;
                       window.open(this.excelpath)
                   })
        },
        saveData(){
            let data=this.totalData;
            this.loading2=true;
            this.loading_text='正在保存数据，请稍后...'
            let date=new Date();
            let tableName=date.getFullYear()+'-'+(date.getMonth()+1);
            this.$http.post('/JLarrange',{
                      //Content_Type:'Authorization',
                      department:this.department,
                      data,
                      tableName,
                      sessionID:this.sessionID,
                      api:'saveData'
                   }).then((res)=> {
                      this.loading2=false;
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
        clear(date,row){//双击清空数据
            //先取this.monthDays数组中1前面的长度
            row.jiaolu[date]=[];
            console.log('已清空')
            row.workTime=(()=>{
                let sum=0;
                row.jiaolu.forEach((element,index,arr) => {
                    //每一个element是一个数组
                    if(element!==null&&element.constructor===Array){
                        element.forEach(ele=>{
                        if(!!ele){
                        sum+=parseFloat(ele.totalTime)
                        }})
                    }
                })
                    
               
                return sum;
            })()
        },
        allowDrop(date,row){//判断状态，计算数据
            //先取this.monthDays数组中1前面的长度
            // console.log(this.monthDays)
            if(!!row.jiaolu[date]){

            }else{
                row.jiaolu[date]=[];
            }
            row.jiaolu[date]=row.jiaolu[date].constructor===Array?row.jiaolu[date]:[]//已经是数组不做处理，不是数组转换为空数组
            let indexOf_1=this.monthDays.indexOf(1);
            let indexOf_date=this.monthDays.indexOf(date);
            // console.log(indexOf_date,'当前date在数组中的index'); 
            if(this.isdrag){
                // console.log(this.JLselected)  
                row.jiaolu[date].push(this.JLselected)
                row.workTime+=this.JLselected.totalTime;  
                  this.isdrag=false
                  this.JLselected={};
            }else{
               
            }
           
        },
    
      loadPeople(){//加载人员信息
            let date = new Date(); 
            this.loading2=true;
            let tableName=date.getFullYear()+'-'+(date.getMonth()+1);
            this.$http.post('/JLarrange',{
            //Content_Type:'Authorization',
            department:this.department,
            api:'loadinfo',
            tableName,
            sessionID:this.sessionID
            }).then(res=>{
                if(res.data.state=='success'){
                    console.log(res.data.dataInDB);
                    
                    this.totalData=res.data.dataInDB; 
                    this.totalTableRow=this.totalData.length;
                    let totalData=this.totalData;
                    this.tableData=((totalData)=>{
                    let reArray=[];
                    for(let i=(this.currentPage-1)*this.tablePageSize;i<this.currentPage*this.tablePageSize;i++){
                        if(totalData[i])reArray.push(totalData[i]);
                        
                    }
                    return reArray;
                      })(totalData)
                    this.loading2=false;   
                }else{
                    this.loading2=false;
                    this.$notify({//数据接收成功通知
                    title: '出错啦',
                    message: '人员信息加载失败，请稍后重试',
                    type: 'error'
                    });
                }
                
            })
      },
      loadInfo(data){//加载交路数据
            this.loading2=true;
           console.log('发起getInfo请求--来自交路安排主页面')
           this.$message({
                message: '正在加载交路信息',
                type:'warning'
                });
          // bus.$emit('noticer',{n_type:'',n_content:'正在加载数据'})
            console.log(this.sessionID)
            this.$http.post('/getInfo',{
                      //Content_Type:'Authorization',
                     department:this.department,
                      field:data,
                      sessionID:this.sessionID
                   }).then((res)=> {
                    
                      this.loading2=false;
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
                    this.jiaolus=res.data;
                      console.log('这里将提示消息')
                      this.$notify({//数据接收成功通知
                      title: '成功',
                      message: '成功加载数据',
                      type: 'success'
                    });
                  })
      },
      loadTiaotu(){
   
            this.loading2=true;
           console.log('发起getInfo请求--来自交路安排主页面')
    
          // bus.$emit('noticer',{n_type:'',n_content:'正在加载数据'})
            console.log(this.sessionID)
            this.$http.post('/getInfo',{
                      //Content_Type:'Authorization',
                     department:this.department,
                      field:'tiaotuEdition',
                      sessionID:this.sessionID
                   }).then((res)=> {
                    
                      this.loading2=false;
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
                    this.optionsTiaotu=res.data.editions;
                      console.log('这里将提示消息')
                      this.$notify({//数据接收成功通知
                      title: '成功',
                      message: '成功加载数据',
                      type: 'success'
                    });
                  })
      
      }
  },
  filters:{
      formatJL(row,index){
          let result=row.jiaolu[index].map(jiaolu=>{
              return jiaolu.split('-')[0]
          })
          return result.join(',')
      },
      measureJl(jiaolu){
          if(!!jiaolu){
              return jiaolu.constructor===Array?jiaolu.map(jiaolu=>jiaolu.checi.split('-')[0]).join('\n'):' '
          }else{
              return ' ';
          }
         
      },
  },
  mounted(){
      
       this.sessionID=this.$route.params.sessionID
       //进行路由跳转传递姓名以在右上角显示
       this.username=this.$route.params.username
        this.department=this.$route.params.department;
        bus.$on('select_JL',(obj)=>{
            this.JLselected=obj.item;
            this.JLindex=obj.index;
            this.isdrag=true;
           // console.info(item)
        })
        bus.$on('cancelDrop',()=>{
            console.log('已取消')
             this.JLselected={};
            this.isdrag=false;
        })
        bus.$on('isContentMove',(isContentMove)=>{
            this.isContentMove=isContentMove;
            console.log('正确设置状态')
        })
        this.calculateMonthDay();
        this.loadPeople(this.department)
        this.loadInfo(this.department);
      console.log('已加载数据')
      bus.$on('tablePageSize',(val)=>{
          console.log(val)
          this.tablePageSize=val;
          let totalData=this.totalData;
          
          this.tableData=((totalData)=>{
              let reArray=[];
              for(let i=(this.currentPage-1)*this.tablePageSize;i<this.currentPage*this.tablePageSize;i++){
                 if(totalData[i])reArray.push(totalData[i]);
              }
              return reArray;
          })(totalData)
          

        })
         bus.$on('changePage',(val)=>{
         // console.log(this.totalData)
          this.currentPage=val;
          let totalData=this.totalData;
          this.tableData=((totalData)=>{
              let reArray=[];
              for(let i=(this.currentPage-1)*this.tablePageSize;i<this.currentPage*this.tablePageSize;i++){
                  if(totalData[i])reArray.push(totalData[i]);
              }
              return reArray;
          })(totalData)

        })
        this.loadTiaotu()
      
  },
   beforeDestroy () {
       bus.$off('select_JL');
      bus.$off('cancelDrop');
      bus.$off('isContentMove')
      bus.$off('tablePageSize');
      bus.$off('changePage');
   },
  components:{
      myheader:myheader,JLselectPanel:JLselectPanel,dialog_edit,pagination,table_to_jl
  }
}
</script>
<style scoped>
.el-form{
    margin-top:20px
}
.dropdiv{
    cursor: pointer
}
.content-rowspan{
    min-height: 20px;
}
</style>
