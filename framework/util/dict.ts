
 /**
 * @author Sun
 * @time 2019-08-10 20:22
 * @project SFramework_LayaAir
 * @description  字典工具类
 *
 */
export class UtilDict {
    /**
     * 键列表
     */
    public static keys(d: Object): any[] {
        let a: any[] = [];
        for (let key in d) {
            a.push(key);
        }

        return a;
    }

    /**
     * 值列表
     */
    public static values(d: Object): any[] {
        let a: any[] = [];

        for (let key in d) {
            a.push(d[key]);
        }

        return a;
    }
 
    /**
     * 清空字典
     */
    public static clear(dic: Object): void {
        let v: any;
        for (let key in dic) {
            v = dic[key];
            if (v instanceof Object) {
                UtilDict.clear(v);
            }
            delete dic[key];
        }
    }

    /**
     * 全部应用
     */
    public static foreach(dic: Object, compareFn: (key: any, value: any) => boolean): void {
        for (let key in dic) {
            if (!compareFn.call(null, key, dic[key]))
                break;
        }
    }

    public static isEmpty(dic: Object): Boolean {
        if (dic == null) return true;
        // @ts-ignore
        for (let key in dic) {
            return false;
        }
        return true;
    }

    public static size(dic: Object): number {
        if (dic == null) return 0;

        let count: number = 0;

        for (let key in dic) {
            ++count;
        }
        return count;
    }
}
