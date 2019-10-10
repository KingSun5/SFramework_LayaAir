 /**
 * @author Sun
 * @time 2019-08-09 16:40
 * @project SFramework_LayaAir
 * @description 管理类声明周期接口
 */
export interface IManager {

    setup():void;
    update():void;
    destroy(): void;

}
