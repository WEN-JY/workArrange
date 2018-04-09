<template>
  <div class='modal' v-show="loadingb">
      <div class='modal-content'>{{loading_text}}</div>
  </div>
  
</template>
<script>
// 
export default {
  props:['loadingc'],
  data(){
      return {
          loadingb:true,
          loading_text:'正在加载...请稍等'
      }
  },
  mounted(){
      this.loadingb=this.loadingc;
      console.log(this.loadingc)
  },
  watch:{
      loadingc(newval,oldval){
         this.loadingb=newval;
         console.log('检测到状态改变新的状态是',newval,oldval)
      }
  }
}
</script>
<style scoped>
.modal{
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height:100%;
    position: absolute;
    top: 0px;
    left: 0;
    z-index: 9999;
    display:-webkit-box;
    display:-webkit-flex;
    display:flex;
    align-items:center
}
.modal-content{
    width: 200px;
    margin: 0 auto;
    color: aliceblue;
    vertical-align: middle
}
</style>
