import { Log } from './log';

/**
 * @author Sun
 * @time 2019-08-09 23:25
 * @project SFramework_LayaAir
 * @description  对象池
 *
 */
export class ObjectPool {
    
    /**
     * 获取一个对象，不存在则创建
     * @param classDef  类名
     */
    public static get(classDef: any): any {
        let sign: string = "dc." + classDef.name;
        let obj: any = Laya.Pool.getItem(sign);
        if (!obj) {
            if (!Laya.ClassUtils.getRegClass(sign)) {
                Log.debug("[pools]注册对象池:" + sign);
                Laya.ClassUtils.regClass(sign, classDef);
            }
            obj = Laya.ClassUtils.getInstance(sign);
        }
        if (obj && obj["init"]) obj.init();
        return obj;
    }

    /**
     * 回收对象
     * @param obj  对象实例
     */
    public static recover(obj: any): void {
        if (!obj) return;

        let proto: any = Object.getPrototypeOf(obj);
        let clazz: any = proto["constructor"];
        let sign: string = "dc." + clazz.name;
        obj.close();
        Laya.Pool.recover(sign, obj);
    }
}

/**对象池基类*/
export interface IPoolObject {
    // 初始化
    init();
    // 关闭
    close();
}
