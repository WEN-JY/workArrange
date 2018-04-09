
function MF () {//myFunction
  interface deepClone{
    (obj:Object):Object;
  }
let deepClone:deepClone;  
deepClone=(obj:Object)=>{
    let newobj=obj instanceof Array?[]:{}
    for(let index in obj){
      if(obj.hasOwnProperty(index)){
        newobj[index]=obj[index];
      }
    }
    return newobj;
  }
  interface lengthWise{
    length:number;
  }
  function summation<T extends lengthWise>(arg:T){//合计时，项目中一般传入[Object,Object,Obejct],对其属性进行统计求和
    for(let index=0;index<arg.length;index++){

    }
  }  
}

export default MF();