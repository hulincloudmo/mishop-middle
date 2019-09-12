const formClass = require("./formVal");
let form = {
    username: "test",
    password: "123"
};

let rule = [
    {
        name: "username",
        rule: ['required','isEnAndNo'],
        isMult: true,
        msg: ['账号不能为空','账号不合法']
    },
    {
        name: "password",
        rule: ['required','isEnAndNo'],
        isMult: false,
        msg: ['密码不能为空','密码不合法']
    }
];

// swapArray(arr, index1, index2) {
//     arr[index1] = arr.splice(index2, 1, arr[index1])[0];
//     return arr;
// }
//
// moveUp(arr, index) {
//     this.swapArray(arr, index, index - 1);
// }

let formVal = new formClass(form,rule);
// formVal.formValor().then(console.log);
let arr = ["test1","test2","test3"];

// let ["test1",...arr] = arr
console.log(...arr);


