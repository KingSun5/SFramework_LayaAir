import {UtilTime} from "../../util/time";
import Handler = Laya.Handler;
import { IPoolObject } from '../../core/object-pool';
import { TimerInterval } from './timer-interval';

/**
 * @author Sun
 * @time 2019-08-10 20:06
 * @project SFramework_LayaAir
 * @description  计时器基类
 *
 */
export class TimerEntity implements IPoolObject {
    public id: number;
    public isActive: boolean;

    public mRate: number;
    public mTicks: number;
    public mTicksElapsed: number;
    public handle: Handler;

    public mTime: TimerInterval;

    constructor() {
        this.mTime = new TimerInterval();
    }

    public init(): void {
    }

    public close() {
    }


    public clear(): void {
        if (this.handle != null) {
            this.handle.recover();
            this.handle = null;
        }
    }

    public set(id: number, rate: number, ticks: number, handle: Handler) {
        this.id = id;
        this.mRate = rate < 0 ? 0 : rate;
        this.mTicks = ticks < 0 ? 0 : ticks;
        this.handle = handle;
        this.mTicksElapsed = 0;
        this.isActive = true;
        this.mTime.init(this.mRate, false);
    }

    public update(removeTimer: any): void {
        if (this.isActive && this.mTime.update(UtilTime.deltaTime)) {
            if (this.handle != null) this.handle.run();

            this.mTicksElapsed++;
            if (this.mTicks > 0 && this.mTicks == this.mTicksElapsed) {
                this.isActive = false;
                removeTimer(this.id);
            }
        }
    }
}
