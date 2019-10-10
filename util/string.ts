/**
 * @author Sun
 * @time 2019-08-11 18:55
 * @project SFramework_LayaAir
 * @description 字符串工具类
 *
 */
export class UtilString {

    public static get empty(): string {
        return "";
    }

    /**
     * 字符串是否有值
     */
    public static isEmpty(s: string): boolean {
        return (s != null && s.length > 0) ? false : true;
    }

    public static toInt(str: string): number {
        if (!str || str.length == 0) return 0;
        return parseInt(str);
    }

    public static toNumber(str: string): number {
        if (!str || str.length == 0) return 0;
        return parseFloat(str);
    }

    /**
     * 获取字符串真实长度,注：
     * 1.普通数组，字符占1字节；汉子占两个字节
     * 2.如果变成编码，可能计算接口不对
     */
    public static getNumBytes(str: string): number {
        let realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
    }

    /**
     * 补零
     * @param str
     * @param len
     * @param dir 0-后；1-前
     * @return
     */
    public static addZero(str: string, len: number, dir: number = 0): string {
        let _str: string = "";
        let _len: number = str.length;
        let str_pre_zero: string = "";
        let str_end_zero: string = "";
        if (dir == 0)
            str_end_zero = "0";
        else
            str_pre_zero = "0";

        if (_len < len) {
            let i: number = 0;
            while (i < len - _len) {
                _str = str_pre_zero + _str + str_end_zero;
                ++i;
            }

            return _str + str;
        }

        return str;
    }

    /**
     * 去除左右空格
     * @param input
     * @return
     */
    public static trim(input: string): string {
        if (input == null) {
            return "";
        }
        return input.replace(/^\s+|\s+$""^\s+|\s+$/g, "");
    }

    /**
     * 去除左侧空格
     * @param input
     * @return
     */
    public static trimLeft(input: string): string {
        if (input == null) {
            return "";
        }
        return input.replace(/^\s+""^\s+/, "");
    }

    /**
     * 去除右侧空格
     * @param input
     * @return
     */
    public static trimRight(input: string): string {
        if (input == null) {
            return "";
        }
        return input.replace(/\s+$""\s+$/, "");
    }

    /**
     * 分钟与秒格式(如-> 40:15)
     * @param seconds 秒数
     * @return
     */
    public static minuteFormat(seconds: number): string {
        let min: number = Math.floor(seconds / 60);
        let sec: number = Math.floor(seconds % 60);

        let min_str: string = min < 10 ? ("0" + min.toString()) : (min.toString());
        let sec_str: string = sec < 10 ? ("0" + sec.toString()) : (sec.toString());

        return min_str + ":" + sec_str;
    }

    /**
     * 时分秒格式(如-> 05:32:20)
     * @param seconds(秒)
     * @return
     */
    public static hourFormat(seconds: number): string {
        let hour: number = Math.floor(seconds / 3600);
        let hour_str: String = hour < 10 ? ("0" + hour.toString()) : (hour.toString());
        return hour_str + ":" + UtilString.minuteFormat(seconds % 3600);
    }

    /**
     * 格式化字符串
     * @param str 需要格式化的字符串，【"杰卫，这里有{0}个苹果，和{1}个香蕉！", 5,10】
     * @param args 参数列表
     */
    public static format(str: string, ...args): string {
        for (let i = 0; i < args.length; i++) {
            str = str.replace(new RegExp("\\{" + i + "\\}", "gm"), args[i]);
        }
        return str;
    }

    /**
     * 以指定字符开始
     */
    public static beginsWith(input: string, prefix: string): boolean {
        return prefix == input.substring(0, prefix.length);
    }

    /**
     * 以指定字符结束
     */
    public static endsWith(input: string, suffix: string): boolean {
        return suffix == input.substring(input.length - suffix.length);
    }

    /**guid*/
    public static getGUIDString(): string {
        let d = Date.now();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    /**
     * 首字母大学
     */
    public static firstUpperCase(word: string): string {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    /**
     * 格式化下划线的单词
     */
    public static formatDashWord(word: string, capFirst: boolean = false) {
        let first = true;
        let result = "";
        word.split('_').forEach((sec: string) => {
            if (first) {
                if (capFirst) {
                    result = UtilString.firstUpperCase(sec);
                } else {
                    result = sec;
                }
                first = false;
            } else {
                result = result + UtilString.firstUpperCase(sec);
            }
        });
        return result;
    }

    /**
     * 截取字符串
     * @param str 字符串
     * @param start 开始位置
     * @param end 结束位置
     */
    public static substring(str:string,start:number,end:number):string
    {
        return str.substring(start,end);
    }

    /**
     * 截取字符串
     * @param str 字符串
     * @param start 开始位置
     * @param long 截取长度
     */
    public static substr(str:string,start:number,long:number):string
    {
        return str.substr(start,long);
    }

    /**
     * 字符串转对象
     * @param str
     */
    public static strToObject(str:string)
    {
        const strToObj = JSON.parse(str);
        return strToObj;
    }


    /**
     * 对象转字符串
     * @param str
     */
    public static objToStr(obj:Object):string
    {
        const objToStr = JSON.stringify(obj)
        return objToStr;
    }
}
