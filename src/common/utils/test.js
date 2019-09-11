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

let formVal = new formClass(form,rule);
formVal.formValor().then(console.log);



