let allTags=[];
function getTag(el){
   let tempTags=[];
    let element=el||window.document;
    let childNode=element.childNode;
    for(let i=0;i<childNode,length;i++){
        if(childNode[i].childNode){
            getTag(childNode[i].childNode)    
        }else{
            allTags.push(childNode[i].tagName)

            }
    }
    allTags.concat(tempTags);
    let result=[];
    allTags.forEach((val,index,allTags)=>{
      if(result.indexOf(val)==-1){
          result.push(val);
      }else{

      }
    })
    return result;
}