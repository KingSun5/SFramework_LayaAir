import Handler = Laya.Handler;
import {UtilArray} from "../../util/array";
import { EventNode } from '../event/event-node';
import { IManager } from '../../interface/i-manager';
import { TimeDelay } from '../../core/time-delay';
import { ObjectPool } from '../../core/object-pool';
import { TimerEntity } from './timer-entity';

/**
 * @author Sun
 * @time 2019-08-09 23:22
 * @project SFramework_LayaAir
 * @description  定时管理器
 *
 */
export class TimerManager extends EventNode implements IManager {
  
    private m_idCounter: number = 0;
    private m_RemovalPending: Array<number> = [];
    private m_Timers: Array<TimerEntity> = [];

    private static instance: TimerManager = null;

    public static get $(): TimerManager {
        if (!this.instance) this.instance = new TimerManager();
        return this.instance;
    }

    public setup(): void {
        this.m_idCounter = 0;
        TimeDelay.$.add(0.1, 0, this.remove, this);
        TimeDelay.$.addUpdate(this.tick, this);
    }

    update(): void {
    }

    public destroy(): void {
        UtilArray.clear(this.m_RemovalPending);
        UtilArray.clear(this.m_Timers);
        TimeDelay.$.remove(this.remove, this);
        TimeDelay.$.remove(this.tick, this);
    }

    private tick(): void {
        for (let i = 0; i < this.m_Timers.length; i++) {
            this.m_Timers[i].update(this.removeTimer);
        }
    }

    /**
     * 定时重复执行
     * @param    rate    间隔时间(单位毫秒)。
     * @param    ticks    执行次数
     * @param    caller    执行域(this)。
     * @param    method    定时器回调函数：注意，返回函数第一个参数为定时器id，后面参数依次时传入的参数。例OnTime(timer_id:number, args1:any, args2:any,...):void
     * @param    args    回调参数。
     */
    public addLoop(rate: number, ticks: number, caller: any, method: Function, args: Array<any> = null): number {
        if (ticks <= 0) ticks = 0;
        let newTimer: TimerEntity = ObjectPool.get(TimerEntity);
        ++this.m_idCounter;
        if (args != null) UtilArray.insert(args, this.m_idCounter, 0);
        newTimer.set(this.m_idCounter, rate, ticks, Handler.create(caller, method, args, false));
        this.m_Timers.push(newTimer);
        return newTimer.id;
    }

    /**
     * 单次执行
     */
    public addOnce(rate: number, caller: any, method: Function, args: Array<any> = null): number {
        let newTimer: TimerEntity = ObjectPool.get(TimerEntity);
        ++this.m_idCounter;
        if (args != null) UtilArray.insert(args, this.m_idCounter, 0);
        newTimer.set(this.m_idCounter, rate, 1, Handler.create(caller, method, args, false));
        this.m_Timers.push(newTimer);
        return newTimer.id;
    }

    /**
     * 移除定时器
     * @param    timerId    定时器id
     */
    public removeTimer(timerId: number): void {
        this.m_RemovalPending.push(timerId);
    }

    /**
     * 移除过期定时器
     */
    private remove(): void {
        let timer: TimerEntity;
        if (this.m_RemovalPending.length > 0) {
            for (let id of this.m_RemovalPending) {
                for (let i = 0; i < this.m_Timers.length; i++) {
                    timer = this.m_Timers[i];
                    if (timer.id == id) {
                        timer.clear();
                        ObjectPool.recover(timer);
                        this.m_Timers.splice(i, 1);
                        break;
                    }
                }
            }

            UtilArray.clear(this.m_RemovalPending);
        }
    }
}

