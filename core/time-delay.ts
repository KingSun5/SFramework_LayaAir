
 
/**
 * @author Sun
 * @time 2019-08-09 23:31
 * @project SFramework_LayaAir
 * @description  事件任务属性
 *
 */
export class TimeDelayData {

    /**重复次数 */
    public repeat: number;
    /**间隔 */
    public interval: number;
    /**参数 */
    public param: any;
    /**回调 */
    public callback: TimerCallback;
    /**作用域 */
    public thisObj: any;
    /**是否已删除 */
    public deleted: boolean;
    /**运行事件 */
    public elapsed: number;

    public set(interval: number, repeat: number, callback: TimerCallback, thisObj: any, param: any): void {
        this.interval = interval;
        this.repeat = repeat;
        this.callback = callback;
        this.param = param;
        this.thisObj = thisObj;
    }
}

export type TimerCallback = (param: any) => void

 /**
 * @author Sun
 * @time 2019-08-09 23:25
 * @project SFramework_LayaAir
 * @description  时间控制核心类
 *
 */
import {Singleton} from "./singleton";

export class TimeDelay extends Singleton {

    constructor() {
        super();
        Laya.timer.frameLoop(0.01, this, this.update);
    }

    /**当前事件执行的次数 */
    public repeat: number = 0
    private items: Array<TimeDelayData> = new Array<TimeDelayData>();
    private toAdd: Array<TimeDelayData> = new Array<TimeDelayData>();
    private toRemove: Array<TimeDelayData> = new Array<TimeDelayData>();
    private pool: Array<TimeDelayData> = new Array<TimeDelayData>();

    
    private static mInstance: TimeDelay = null;
    public static get $() {
        if (this.mInstance == null) {
            this.mInstance = new TimeDelay();
        }
        return this.mInstance
    }

    /**
     * 从池子中获取data类
     */
    private getFromPool(): TimeDelayData {
        let t: TimeDelayData;
        if (this.pool.length > 0) {
            t = this.pool.pop()
        } else
            t = new TimeDelayData();
        return t;
    }

    /**
     * data类放回池子
     * @param t 
     */
    private returnToPool(t: TimeDelayData) {
        t.set(0, 0, null, null, null)
        t.elapsed = 0
        t.deleted = false
        this.pool.push(t)
    }

    public exists(callback: TimerCallback, thisObj: any) {
        let t = this.toAdd.find((value: TimeDelayData, index: number, obj: Array<TimeDelayData>) => {
            return value.callback == callback && value.thisObj == thisObj
        })

        if (t != null) {
            return true
        }
        t = this.items.find((value: TimeDelayData, index: number, obj: Array<TimeDelayData>) => {
            return value.callback == callback && value.thisObj == thisObj
        })
        if (t != null && !t.deleted) {
            return true
        }
        return false
    }

    public add(interval: number, repeat: number, callback: TimerCallback, thisObj: any, callbackParam: any = null) {
        let t: TimeDelayData;
        t = this.items.find((value: TimeDelayData, index: number, obj: Array<TimeDelayData>) => {
            return value.callback == callback && value.thisObj == thisObj
        });

        if (t == null) {
            t = this.toAdd.find((value: TimeDelayData, index: number, obj: Array<TimeDelayData>) => {
                return value.callback == callback && value.thisObj == thisObj
            })
        }

        if (t == null) {
            t = this.getFromPool();
            this.toAdd.push(t);
        }

        t.set(interval, repeat, callback, thisObj, callbackParam);
        t.deleted = false;
        t.elapsed = 0;
    }

    public addUpdate(callback: TimerCallback, thisObj: any, callbackParam: any = null) {
        this.add(0.001, 0, callback, thisObj, callbackParam);
    }

    public remove(callback: TimerCallback, thisObj: any) {
        let findindex = -1
        let t = this.toAdd.find((value: TimeDelayData, index: number, obj: Array<TimeDelayData>) => {
            if (value.callback == callback && value.thisObj == thisObj) {
                findindex = index;
                return true;
            } else {
                return false;
            }
        });
        if (t != null) {
            this.toAdd.splice(findindex, 1);
            this.returnToPool(t);
        }

        t = this.items.find((value: TimeDelayData, index: number, obj: Array<TimeDelayData>) => {
            return value.callback == callback && value.thisObj == thisObj;
        });
        if (t != null)
            t.deleted = true;
    }

    private lastTime: number = 0;
    private deltaTime: number = 0;

    start() {
        this.lastTime = Laya.timer.currTimer;
    }

    update() {
        this.deltaTime = (Laya.timer.currTimer - this.lastTime) / 1000;
        this.lastTime = Laya.timer.currTimer;

        for (let index = 0; index < this.items.length; index++) {
            let t = this.items[index];
            if (t.deleted) {
                this.toRemove.push(t);
                continue;
            }

            t.elapsed += this.deltaTime;
            if (t.elapsed < t.interval) {
                continue;
            }

            t.elapsed = 0;

            if (t.repeat > 0) {
                t.repeat--;
                if (t.repeat == 0) {
                    t.deleted = true;
                    this.toRemove.push(t);
                }
            }
            this.repeat = t.repeat;
            if (t.callback != null) {
                try {
                    t.callback.call(t.thisObj, t.param);
                } catch (error) {
                    t.deleted = true;
                }
            }
        }
        let len = this.toRemove.length;
        while (len) {
            let t = this.toRemove.pop();
            let index = this.items.indexOf(t);
            if (t.deleted && index != -1) {
                this.items.splice(index, 1);
                this.returnToPool(t);
            }
            len--;
        }
        len = this.toAdd.length;
        while (len) {
            let t = this.toAdd.pop();
            this.items.push(t);
            len--;
        }
    }
}



