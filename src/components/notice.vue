<template>
<div>

  </div>
</template>

<script>
import bus from './bus'//这里的import是重点
  export default {
   
    mounted(){
        bus.$on('noticer',function(obj){
      
                this.$message({
                message: obj.n_content,
                type:obj.n_type
                });
                
    })
  }
  }
</script>