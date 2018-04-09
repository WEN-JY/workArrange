<template>
<div >

  <el-table
    :data="tableData"
    header-align="center"
    align="center"
    style="width: 100%">
    <el-table-column label="动车所人员定员测算" align='center'>
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    
      <el-table-column
        prop="department"
         align="center"
        label="动车所"
        width="120">
      </el-table-column>
      <el-table-column
        :label="tiaotuEdition"
         align="center"
        width="120">
            <el-table-column
                label="库线规模"
                align="center"
                width="120">
                    <el-table-column
                        label="检修库数"
                        width="80">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.jxks"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="检修线数"
                        width="80">
                         <template slot-scope="scope">
                            <el-input v-model="scope.row.jxxs"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="存车场数"
                        width="80">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.cccs"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="存车线数"
                        width="80">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.ccxs"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="客整所作业点"
                        width="80">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.kzszyd"></el-input>
                        </template>
                    </el-table-column>
            </el-table-column>
            <el-table-column
                label="一级修日均工作量"
                width="80">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.yjxrj"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                label="二级修日均工作量"
                width="80">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.ejxrj"></el-input>
                </template>   
            </el-table-column>
            <el-table-column
                label="动车运用"
                width="80">
                    <el-table-column
                        label="上线"
                        width="80">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.sx"></el-input>
                        </template>  
                    </el-table-column>
                    <el-table-column
                        label="热备"
                        width="80">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.rb"></el-input>
                        </template>  
                    </el-table-column>
            </el-table-column>
            <el-table-column
                label="月均探伤组数"
                width="120">
                <el-table-column
                        label="欧系"
                        width="80">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.ox"></el-input>
                        </template>  
                    </el-table-column>
                    <el-table-column
                        label="日系"
                        width="80">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.rx"></el-input>
                        </template> 
                    </el-table-column>
                    <el-table-column
                        label="轮辋"
                        width="80">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.lw"></el-input>
                        </template> 
                    </el-table-column>
            </el-table-column>
      </el-table-column>
      <el-table-column
                label="使用镟轮机台数"
                width="80">
                <template slot-scope="scope">
                            <el-input v-model="scope.row.xljs"></el-input>
                        </template> 
            </el-table-column>
            <el-table-column
                label="现员"
                width="80">
                <template slot-scope="scope">
                            <el-input v-model="scope.row.xy"></el-input>
                        </template> 
            </el-table-column>
            <el-table-column
                label="管理现员"
                width="80">
                <template slot-scope="scope">
                            <el-input v-model="scope.row.glxy"></el-input>
                        </template> 
            </el-table-column>
            <el-table-column
                label="现员-管理定员"
                width="80">
                <template slot-scope="scope">
                            <el-input v-model="scope.row.xy_gldy"></el-input>
                        </template> 
            </el-table-column>
             <el-table-column
                label="定员测算"
                align="center"
                width="80">
                <el-table-column
                label="合计"
                prop="hj"
                width="80">
                
                </el-table-column>
                <el-table-column
                label="一二级修人员"
                width="80">
                    <el-table-column
                    label="一级修"
                    prop="yjx"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="二级修"
                    prop="ejx"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="临修"
                    prop="lx"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="工长"
                    width="80">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.gz"></el-input>
                        </template> 
                    </el-table-column>
                </el-table-column>
                <el-table-column
                label="随车"
                prop="sc"
                width="80">
                
                </el-table-column>
                <el-table-column
                label="辅助人员"
                width="80">
                    <el-table-column
                    label="质检员"
                    prop="zjy"
                    width="80">
                    
                    </el-table-column>
                    <el-table-column
                    label="调度"
                    prop="dd"
                    width="80">
                    
                    </el-table-column>
                    <el-table-column
                    label="探伤"
                    prop="ts"
                    width="80">
                    
                    </el-table-column>
                    <el-table-column
                    label="镟轮"
                    prop="xl"
                    width="80">
                    
                    </el-table-column>
                    <el-table-column
                    label="网工"
                    prop="wg"
                    width="80">
                    
                    </el-table-column>
                    <el-table-column
                    label="设备"
                    prop="sb"
                    width="80">
                    
                    </el-table-column>
                    <el-table-column
                    label="存车场管理"
                    prop="cccgl"
                    width="80">
                    
                    </el-table-column>
                    <el-table-column
                    label="工具"
                    prop="gj"
                    width="80">
                    
                    </el-table-column>
                    <el-table-column
                    label="检修档案"
                    prop="jxda"
                    width="80">
                    
                    </el-table-column>
                    <el-table-column
                    label="配送"
                    prop="ps"
                    width="80">
                    
                    </el-table-column>
                    <el-table-column
                    label="预备率"
                    prop="ybl"
                    width="80">
                    
                    </el-table-column>
                    <el-table-column
                    label="裙底板作业"
                    prop="qdbzy"
                    width="80">
                         <template slot-scope="scope">
                            <el-input v-model="scope.row.qdbzy"></el-input>
                        </template> 
                    </el-table-column>
                </el-table-column>
                <el-table-column
                label="其余生产"
                width="80">
                 <el-table-column
                label="材料班组"
                prop="clbz"
                width="80">
                
                </el-table-column>
                </el-table-column>
            </el-table-column>
      </el-table-column>
    
  </el-table>
     <el-form :inline="true"  class="demo-form-inline">
      
    <el-form-item label="计算比例" >
    <el-button type='success'  @click="caculateData()"><i class="el-icon-refresh"></i>生成定员测算</el-button>
     <el-button type='primary' @click='outputExcel'><i class="el-icon-sort" ></i>导出表格</el-button>
    </el-form-item>
</el-form>

</div>
</template>
<style scoped>
.main{
  background: aliceblue;
  padding: 20px;
}
.el-tabs--left, .el-tabs--right {
    overflow: hidden;
    background: white;
    border-radius: 5px;
    padding: 20px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: -60px;
}
.nameBtn{
    position: fixed;
    right: 30px;
    top: 10px;
}
.el-form{
  margin-top:10px
}
</style>

<script>


// 引入 ECharts 主模块


  export default {

    data() {
        return {
            
            sessionID:'',
            percent:3.21,
            department:'',
             tableData: [ ],
             loading2:'',
             tiaotuEdition:'',
             tableData:[{
                 department:'南京南',
                 jxks:0,jxxs:0,cccs:0,ccxs:0,kzszyd:0,yjxrj:0,ejxrj:0,sx:0,rb:0,ox:0,rx:0,lw:0,xljs:0,xy:0,
                 glxy:0,xy_gldy:0,qdbzy:0
             },{
                 department:'南京所',
                 jxks:0,jxxs:0,cccs:0,ccxs:0,kzszyd:0,yjxrj:0,ejxrj:0,sx:0,rb:0,ox:0,rx:0,lw:0,xljs:0,xy:0,
                 glxy:0,xy_gldy:0,qdbzy:0
             },{
                 department:'合肥南',
                 jxks:0,jxxs:0,cccs:0,ccxs:0,kzszyd:0,yjxrj:0,ejxrj:0,sx:0,rb:0,ox:0,rx:0,lw:0,xljs:0,xy:0,
                 glxy:0,xy_gldy:0,qdbzy:0
             },{
                 department:'徐州东',
                 jxks:0,jxxs:0,cccs:0,ccxs:0,kzszyd:0,yjxrj:0,ejxrj:0,sx:0,rb:0,ox:0,rx:0,lw:0,xljs:0,xy:0,
                 glxy:0,xy_gldy:0,qdbzy:0
             }]
        
        }},
    methods: {
            caculateData(){
                this.tableData.forEach((obj,index,tableData)=>{
                    obj.xy_gldy=obj.xy-obj.glxy;//现员—管理现员=现员-管理现员
                    obj.yjx=Math.ceil(Math.round(obj.yjxrj/4)*4*2*1.2);//一级修
                    obj.ejx=Math.ceil(obj.ejxrj/44*25);//二级修
                    obj.lx=Math.ceil((obj.yjx+obj.ejx)*0.15);//二级修
                    obj.sc=Math.ceil(obj.sx*3.21);//随车
                    obj.zjy=Math.ceil((obj.yjx+obj.ejx+obj.lx+parseInt(obj.gz))*0.1)//质检员
                    obj.dd=obj.jxxs>=8?12:10;//调度
                    obj.ts=Math.ceil(obj.ox/11*4+obj.rx/11*3+obj.lw/11*3);//探伤
                    obj.xl=4;//镟轮
                    obj.wg=obj.jxks*12;//网工
                    obj.sb=obj.jxxs>4?8:6;//设备
                    obj.cccgl=(obj.cccs>1?6:4)+obj.kzszyd*5;//存车场管理
                    obj.gj=3;
                    obj.jxda=3;
                    obj.ps=obj.jxxs<8?4:6;//配送
                    obj.ybl=Math.ceil((obj.ts+obj.xl+obj.ps+obj.wg)*0.08);//于倍率
                    obj.clbz=7;
                    obj.hj=obj.yjx+obj.ejx+obj.lx+parseInt(obj.gz)+obj.sc+obj.zjy+obj.dd+obj.ts+obj.xl+obj.wg+obj.sb+obj.cccgl+obj.gj+obj.jxda+obj.ps+obj.ybl+obj.qdbzy+obj.clbz;//合计
                    
                 
                })
                function deepClone(obj){
                       console.log(obj)
                       var newobj=obj.prototype===Array?[]:{}
                       for(var index in obj){
                         if(obj.hasOwnProperty(index)){
                           newobj[index]=Number(obj[index])
                         }
                       }
             
                       return newobj;
                     }
                let heji=deepClone(this.tableData[0])
                let dataTemp=this.tableData
                for(let index in dataTemp){
                    for(let attr in dataTemp[0]){
                        console.log(dataTemp[index][attr],'添加值',attr)
                        heji[attr]+=dataTemp[index][attr];
                    }
                }
                heji.department='合计';
                this.tableData.push(heji);
                
            },
          loadTiaotuEdition(){
   
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
                    this.tiaotuEdition=res.data.editions.pop().value+'图工作量';
                      console.log('这里将提示消息')
                      this.$notify({//数据接收成功通知
                      title: '成功',
                      message: '成功加载数据',
                      type: 'success'
                    });
                  })
      
      },

        outputExcel(){
          this.$http.post('/outputExcel',{
                      //Content_Type:'Authorization',  
                      api:'dingyuancesuan',
                      excelData:JSON.stringify(this.tableData),
                      sessionID:this.sessionID,department:this.department
                   }).then((res)=> {

                       this.excelpath=this.$excelPath_custom+res.data.file;
                       window.open(this.excelpath)
                   })
     
        },
 
     
    },

    mounted(){
      //先将会话id保存
            this.user=this.$route.params.user
            this.sessionID=this.$route.params.sessionID
            this.department=this.$route.params.department
           this.loadTiaotuEdition()
    },
    filters:{
      
      getDate(val){
        return new Date(parseInt(data[i].changeTime)).toLocaleString().replace(/:\d{1,2}$/,' ');
      }
    },

      
  }
</script>