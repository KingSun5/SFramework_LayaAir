import { EventData } from '../event/event-data';
import { DataManager } from './data-manager';

/**
 * @author Sun
 * @time 2019-08-09 16:58
 * @project SFramework_LayaAir
 * @description 数据驱动基类
 */
export class DataBase extends EventData {

    constructor(cmd: string) {
        super(cmd);
        this.data = this;
        DataManager.$.register(this);
    }

    /**
     * 广播自身的变化
     */
    public notify(): void {
        DataManager.$.dispatchEvent(this);
    }

}
