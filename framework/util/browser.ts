import { Dictionary } from '../structure/dictionary';

/**
 * @author Sun
 * @time 2019-08-11 18:08
 * @project SFramework_LayaAir
 * @description 过去网页相关
 *
 */
export class UtilBrowser {

    /**打开外部链接，如https://ask.layabox.com/xxx*/
    public static openURL(url: string): void {
        Laya.Browser.window.location.href = url;
    }

    /**获取当前地址栏参数*/
    public static getLocationParams(): Dictionary<string> {
        let url = window.location.href;

        let dic = new Dictionary<string>();
        let num = url.indexOf("?");
        if (num >= 0) {
            url = url.substr(num + 1);
            let key, value;
            let arr = url.split("&");
            for (let i in arr) {
                let str = arr[i];
                num = str.indexOf('=');
                key = str.substr(0, num);
                value = str.substr(num + 1);
                dic.add(key, value);
            }
        }
        return dic;
    }

}