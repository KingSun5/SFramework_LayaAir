import { UtilString } from './string';

/**
 * @author Sun
 * @time 2019-08-11 18:54
 * @project SFramework_LayaAir
 * @description 数值工具类
 *
 */
export class UtilNumber {
    /**
     * 保留小数点后几位
     */
    public static toFixed(value: number, p: number): number {
        return UtilString.toNumber(value.toFixed(p));
    }

    public static toInt(value: number): number {
        return Math.floor(value);
    }

    public static isInt(value: number): boolean {
        return Math.ceil(value) == value;
    }

    /**
     * 保留有效数值
     */
    public static reserveNumber(num: number, size: number): number {
        let str = String(num);
        let l = str.length;
        let p_index: number = str.indexOf(".");
        if (p_index < 0) {
            return num;
        }
        let ret: string = str.slice(0, p_index + 1);

        let lastNum = l - p_index;
        if (lastNum > size) {
            lastNum = size;
        }
        let lastStr: string = str.slice(p_index + 1, p_index + 1 + lastNum);
        return UtilString.toNumber(ret + lastStr);
    }

    /**
     * 保留有效数值，不够补0；注意返回的是字符串
     */
    public static reserveNumberWithZero(num: number, size: number): string {
        let str = String(num);
        let l = str.length;
        let p_index: number = str.indexOf(".");
        if (p_index < 0) {//是整数
            str += '.';
            for (let i = 0; i < size; ++i) str += '0';
            return str;
        }
        let ret: string = str.slice(0, p_index + 1);

        let lastNum = l - p_index - 1;
        if (lastNum > size) {//超过
            lastNum = size;
            let lastStr: string = str.slice(p_index + 1, p_index + 1 + lastNum);
            return ret + lastStr;
        } else if (lastNum < size) {//不足补0
            let diff: number = size - lastNum;
            for (let i = 0; i < diff; ++i) str += '0';
            return str;
        } else
            return str;
    }


    /**
     *
     */
    public static formatThousandsNumber(num: number) {
        if (num < 1000000) {
            return num.toLocaleString();
        } else if (num < 1000000000) {
            let t = Math.floor(num / 1000)
            return t.toLocaleString() + "K";
        } else {
            let t = Math.floor(num / 1000000)
            return t.toLocaleString() + "M";
        }
    }

    /**
     *
     */
    public static formatNumberShort(num, fixed: number = 0) {

        if (num < 1000) {
            return num;
        } else if (num < 1000000) {
            let t = Math.floor(num / 1000).toFixed(fixed);
            return t + "K";
        } else if (num < 1000000000) {
            let t = Math.floor(num / 1000000).toFixed(fixed);
            return t + "M";
        } else {
            let t = Math.floor(num / 1000000000).toFixed(fixed);
            return t.toLocaleString() + "G";
        }

    }


    /**
     * 科学计数法显示
     * @param num1
     */
    public static bigNumberFormat(num: string,fixed:number = 2) {
        let exts = [
            '', 'K', "M", "G", "T", "P", "E", "Z", "Y", "AA",
            "BB", "CC", 'DD', 'EE', "FF", "GG", "HH", "II",
            "JJ", "KK", 'LL', 'MM', "NN", "OO", "PP", "QQ",
            "RR", "SS", 'TT', 'UU', "VV", "WW", "XX", "YY",
            "ZZ", "aa", 'bb', 'cc', "dd", "ee", "ff", "gg",
            "hh", "ii", 'gg', 'kk', "ll", "mm", "nn", "oo",
            "pp", "qq", 'rr', 'ss', "tt", "uu", "vv", "ww"
        ];

        let t1, t2;
        let n1 = num.indexOf("e+");
        if (n1 == -1) n1 = num.indexOf("E");
        if (n1 && n1 != -1) {
            t1 = parseFloat(num.substr(0, n1));
            t2 = parseInt(num.substr(n1 + 2));

            let ext = Math.floor(t2 / 3);
            let m = t2 % 3;

            return (t1 * Math.pow(10,m)).toFixed(fixed) + exts[ext];
        }


        return num;
    }

    /**
     * 数字相加
     */
    public static bigNumberAdd(num1: string, num2: string) {
        let b = Number(num1) + Number(num2);
        return b.toExponential(4);
    }

    /**
     * 数字相减
     */
    public static bigNumberSub(num1: string, num2: string) {
        let n1 = Number(num1);
        let n2 = Number(num2);
        if (n1 < n2) {
            return null;
        }

        return (n1 - n2).toExponential(4);
    }

    /**
     * 数字相乘法
     */
    public static bigNumberMul(num1: string, num2: number) {
        return (Number(num1) * num2).toExponential(4);
    }

    /**
     * 数字相除
     */
    public static bigNumberDiv(num1: string, num2: number) {
        return (Number(num1) / num2).toExponential(4);
    }

    /**
     * 两个科学计数相除
     */
    public static bigNumberDivDounble(num1: string, num2: string) {
        return (Number(num1) / Number(num2));
    }

}
