import { Log } from './log';

 /**
 * @author Sun
 * @time 2019-08-09 15:57
 * @project SFramework_LayaAir
 * @description 单例工具类
 */
export class Singleton {

    private static classKeys: Function[] = [];
    private static classValues: any[] = [];

    constructor() {
        let clazz: any = this["constructor"];
        if (!clazz) {
            console.warn("Not support constructor!");
            Log.warn("Not support constructor!");
            return;
        }
        // 防止重复实例化
        if (Singleton.classKeys.indexOf(clazz) != -1)
            throw new Error(this + "Only instance once!");
        else {
            Singleton.classKeys.push(clazz);
            Singleton.classValues.push(this);
        }
    }

}
