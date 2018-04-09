function Promise(fn) {
    let promise=this;
    let value=null;
    promise._resolves=[];
    let callback;
    this.then=function (onFullfilled) {
        promise._resolves.push(onFullfilled);
        return this;
    }
    function resolve(value) {
       promise._resolves.forEach(callback => {
          callback(value); 
       });
    }
    fn(resolve());
};
let p1=new Promise(function (params) {
    console.log(2)
    setTimeout(()=>{
        console.log(3)
    },1000)
}).then(res=>{
    console.log(1,res);
});