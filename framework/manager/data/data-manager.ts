import { EventNode } from '../event/event-node';
import { EventData } from '../event/event-data';
import { DataBase } from './data-base';
import { IManager } from '../../interface/i-manager';


/**
 * @author Sun
 * @time 2019-08-09 15:51
 * @project SFramework_LayaAir
 * @description 数据管理类
 */
export class DataManager extends EventNode implements IManager {



    constructor() {
        super();
    }

    private static instance: DataManager = null;

    public static get $():DataManager {
        if (!this.instance) this.instance = new DataManager();
        return this.instance;
    }

    protected datas: Map<string, DataBase> = new Map<string, DataBase>();

    setup(): void {
    }

    update(): void {
    }

    destroy(): void {
        this.datas.clear();
    }
  

    public register(data: DataBase): DataManager {
        this.datas.set(data.cmd, data);
        return this;
    }

    public get(cmd: string): DataBase {
        return this.datas.get(cmd);
    }
}



