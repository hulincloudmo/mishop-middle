module.exports = class formVal {
    constructor(form={},rules=[]) {
        this.form = form;
        this.rules = rules;
    }
    async formValor() {
        // console.log(this)
        var msg = "";
        for(let item of this.rules) {
            let key = item.name;
            let ruleArr = item.rule;
            let isOptional = item.isOptional;
            let msgArr = item.msg;
            if (!key || ruleArr.length === 0 || msgArr.length === 0 ) {
                continue;
            }
            if (ruleArr.length !== msgArr.length) {
                throw new Error('你的验证规则和错误返回信息没填对哦，要一一对应')
            }
            if (isOptional) {
                 msg = await this.multVal(ruleArr,msgArr,key);
                 if (typeof(msg) === 'string') {
                     return  msg
                 }

            } else {
                try {
                    msg = await this.singleVal(ruleArr, msgArr, key);
                } catch (e) {
                    return e
                }
                 if (typeof(msg) === 'string') {
                    return msg
                 }

            }
        }
        return msg
    }
    singleVal(ruleArr,msgArr,key) {
        for (let i = 0; i < ruleArr.length; i++) {
            let ruleItem = ruleArr[i];
            let isError = false;
            switch (ruleItem) {
                case "required":
                    isError = this._isNullOrEmpty(this.form[key]);
                    break;
                case "isMobile":
                    isError = !this._isMobile(this.form[key]);
                    break;
                case "isEmail":
                    isError = !this._isEmail(this.form[key]);
                    break;
                case "isCarNo":
                    isError = !this._isCarNo(this.form[key]);
                    break;
                case "isIdCard":
                    isError = !this._isIdCard(this.form[key]);
                    break;
                case "isAmount":
                    isError = !this._isAmount(this.form[key]);
                    break;
                case "isNum":
                    isError = !this._isNum(this.form[key]);
                    break;
                case "isChinese":
                    isError = !this._isChinese(this.form[key]);
                    break;
                case "isEnglish":
                    isError = !this._isEnglish(this.form[key]);
                    break;
                case "isEnAndNo":
                    isError = !this._isEnAndNo(this.form[key]);
                    break;
                case "isSpecial":
                    isError = !this._isSpecial(this.form[key]);
                    break;
                case "isEmoji":
                    isError = !this._isEmoji(this.form[key]);
                    break;
                case "isDate":
                    isError = !this._isDate(this.form[key]);
                    break;
                case "isUrl":
                    isError = !this._isUrl(this.form[key]);
                    break;
                case "isSame":
                    isError = !this._isSame(this.form[key], this.form[value]);
                    break;
                case "range":
                    let range = null;
                    try {
                        range = JSON.parse(value);
                        if (range.length <= 1) {
                            throw new Error("range值传入有误！")
                        }
                    } catch (e) {
                        return "range值传入有误！"
                    }
                    isError = !this._isRange(this.form[key], range[0], range[1])
                    break;
                case "minLength":
                    isError = !this._minLength(this.form[key], value)
                    break;
                case "maxLength":
                    isError = !this._maxLength(this.form[key], value)
                    break;
                default:
                    break;
            }
            if (isError) {
                // 一旦一条校验规则不通过，则立即终止这个字段的验证
                return msgArr[i]
            }
        }
        return true
    }
    multVal(ruleArr,msgArr,key) {
        for (let i = 0; i < ruleArr.length; i++) {
            let ruleItem = ruleArr[i];
            let isError = false;
            switch (ruleItem) {
                case "required":
                    isError = this._isNullOrEmpty(this.form[key]);
                    break;
                case "isMobile":
                    isError = !this._isMobile(this.form[key]);
                    break;
                case "isEmail":
                    isError = !this._isEmail(this.form[key]);
                    break;
                case "isCarNo":
                    isError = !this._isCarNo(this.form[key]);
                    break;
                case "isIdCard":
                    isError = !this._isIdCard(this.form[key]);
                    break;
                case "isAmount":
                    isError = !this._isAmount(this.form[key]);
                    break;
                case "isNum":
                    isError = !this._isNum(this.form[key]);
                    break;
                case "isChinese":
                    isError = !this._isChinese(this.form[key]);
                    break;
                case "isEnglish":
                    isError = !this._isEnglish(this.form[key]);
                    break;
                case "isEnAndNo":
                    isError = !this._isEnAndNo(this.form[key]);
                    break;
                case "isSpecial":
                    isError = !this._isSpecial(this.form[key]);
                    break;
                case "isEmoji":
                    isError = !this._isEmoji(this.form[key]);
                    break;
                case "isDate":
                    isError = !this._isDate(this.form[key]);
                    break;
                case "isUrl":
                    isError = !this._isUrl(this.form[key]);
                    break;
                case "isSame":
                    isError = !this._isSame(this.form[key], this.form[value]);
                    break;
                case "range":
                    let range = null;
                    try {
                        range = JSON.parse(value);
                        if (range.length <= 1) {
                            throw new Error("range值传入有误！")
                        }
                    } catch (e) {
                        return "range值传入有误！"
                    }
                    isError = !this._isRange(this.form[key], range[0], range[1])
                    break;
                case "minLength":
                    isError = !this._minLength(this.form[key], value)
                    break;
                case "maxLength":
                    isError = !this._maxLength(this.form[key], value)
                    break;
                default:
                    break;
            }
            if (!isError) {
                return  true
            }
        }
    }
    _maxLength(value, max) {
        return value.length <= Number(max)
    }

    _minLength(value, min) {
        return value.length >= Number(min)
    }

    _isRange(value, range1, range2) {
        if ((!range1 && range1 != 0) && (!range2 && range2 != 0)) {
            return true;
        } else if (!range1 && range1 != 0) {
            return value <= range2
        } else if (!range2 && range2 != 0) {
            return value >= range1
        } else {
            return value >= range1 && value <= range2
        }
    }

    _isSame(value1, value2) {
        return value1 === value2
    }

    _isUrl(value) {
        return /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(value);
    }

    _isDate(value) {
        const reg =
            /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
        return reg.test(value);
    }

    _isEmoji(value) {
        //是否包含表情
        return /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g.test(value);
    }

    _isSpecial(value) {
        //是否包含特殊字符
        let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
            regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        if (regEn.test(value) || regCn.test(value)) {
            return true;
        }
        return false;
    }

    _isEnAndNo(value) {
        //8~20位数字和字母组合 按需修改
        return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value);
    }

    _isNullOrEmpty(value) {
        return (value === null || value === '' || value === undefined) ? true : false;
    }
    _isMobile(value) {
        return /^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/.test(value);
    }
    _isEmail(value) {
        return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value);
    }
    _isCarNo(value) {
        // 新能源车牌
        const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
        // 旧车牌
        const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
        if (value.length === 7) {
            return creg.test(value);
        } else if (value.length === 8) {
            return xreg.test(value);
        } else {
            return false;
        }
    }
    _isIdCard(value) {
        let idCard = value;
        if (idCard.length == 15) {
            return this.__isValidityBrithBy15IdCard;
        } else if (idCard.length == 18) {
            let arrIdCard = idCard.split("");
            if (this.__isTrueValidateCodeBy18IdCard(idCard) && this.__isTrueValidateCodeBy18IdCard(arrIdCard)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    __isTrueValidateCodeBy18IdCard(arrIdCard) {
        let sum = 0;
        let Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
        let ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
        if (arrIdCard[17].toLowerCase() == 'x') {
            arrIdCard[17] = 10;
        }
        for (let i = 0; i < 17; i++) {
            sum += Wi[i] * arrIdCard[i];
        }
        let valCodePosition = sum % 11;
        if (arrIdCard[17] == ValideCode[valCodePosition]) {
            return true;
        } else {
            return false;
        }
    }
    __isValidityBrithBy18IdCard(idCard18) {
        let year = idCard18.substring(6, 10);
        let month = idCard18.substring(10, 12);
        let day = idCard18.substring(12, 14);
        let temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
        if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() !=
            parseFloat(day)) {
            return false;
        } else {
            return true;
        }
    }
    __isValidityBrithBy15IdCard(idCard15) {
        let year = idCard15.substring(6, 8);
        let month = idCard15.substring(8, 10);
        let day = idCard15.substring(10, 12);
        let temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));

        if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() !=
            parseFloat(day)) {
            return false;
        } else {
            return true;
        }
    }
    _isAmount(value) {
        //金额，只允许保留两位小数
        return /^([0-9]*[.]?[0-9])[0-9]{0,1}$/.test(value);
    }
    _isNum(value) {
        //只能为数字
        return /^[0-9]+$/.test(value);
    }
    _isChinese(value) {
        let reg = /^[\u0391-\uFFE5]+$/;
        return value !== "" && reg.test(value) && !form._isSpecial(value) && !form._isEmoji(value)
    }
    _isEnglish(value) {
        return /^[a-zA-Z]*$/.test(value)
    }
};


