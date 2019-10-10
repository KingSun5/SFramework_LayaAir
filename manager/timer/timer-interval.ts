/**
 * @author Sun
 * @time 2019-08-10 20:02
 * @project SFramework_LayaAir
 * @description  定时执行
 *
 */
export class TimerInterval {

    private m_interval_time: number;//毫秒
    private m_now_time: number;

    constructor() {
        this.m_now_time = 0;
    }

    /**
     * 初始化定时器
     * @param    interval    触发间隔
     * @param    first_frame    是否第一帧开始执行
     */
    public init(interval: number, first_frame: boolean): void {
        this.m_interval_time = interval;
        if (first_frame) this.m_now_time = this.m_interval_time;
    }

    public reset(): void {
        this.m_now_time = 0;
    }

    public update(elapse_time: number): boolean {
        this.m_now_time += elapse_time;
        if (this.m_now_time >= this.m_interval_time) {
            this.m_now_time -= this.m_interval_time;
            return true;
        }
        return false;
    }
}
