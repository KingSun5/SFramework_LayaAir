import { EventFunc } from '../event/event-data';
import { ResItem } from './res-item';

 /**
 * @author Sun
 * @time 2019-08-09 19:31
 * @project SFramework_LayaAir
 * @description 场景管理器所需的资源包定义
 *
 */
export class ResGroup {

    /**加载进度 */
    public progress: number = 0;
    /**加载资源 */
    public needLoad: Array<ResItem> = new Array<ResItem>();
    /**加载时的回调接口,一般用作给加载窗设置进度 */
    public loadItem: EventFunc;
    /**结束时的回调接口 */
    public finish: EventFunc;

    /**
     * 向资源组添加目标
     * @param url 相对路径
     * @param type 类型 
     * @param isKeepMemory 是否常驻内存 
     */
    public add(url: string, type: string, isKeepMemory = false) {

        let index = this.needLoad.findIndex((value: ResItem, index: number, obj: Array<ResItem>) => {
            return value.Url == url
        });
        if (index == -1) {
            let info = new ResItem(url,type,isKeepMemory);
            this.needLoad.push(info);
        }
        return this
    }
}

