#陌上青夏-表单验证器


###表单验证器使用了promise封装，因node无法使用ES6的import语法，故在未安装babel环境时，只能使用node语法引入

使用实例（test.js）
```javascript
const formClass = require("./formVal");
let form = []
let rule = []
let formVal = new formClass(form,rule);
formVal.formValor().then(e=>{
    console.log(e)
});
```
###参数说明
form:要验证的表单

rule:    
        

             name: "验证字段",
             rule: ['条件，可在formVal中的_函数中查看，下一版本将会分离'],
             isMult: "是否开启多条件匹配，满足一个条件就会验证成功",
             msg: ['错误返回信息']


###注意：
rule的长度要和msg的长度一致，实际正确使用就是一样的，不然会发生奇怪的现象！
