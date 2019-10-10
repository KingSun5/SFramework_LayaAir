/**
 * @author Sun
 * @time 2019-08-09 19:18
 * @project SFramework_LayaAir
 * @description  时间工具
 *
 */
export class UtilTime {

    private static m_StartTime: number = 0;

    public static start() {
        this.m_StartTime = Laya.timer.currTimer;
    }

    /**两帧之间的时间间隔,单位秒*/
    public static get deltaTime(): number {
        return Laya.timer.delta * 0.001;
    }

    /**固定两帧之间的时间间隔*/
    public static get fixedDeltaTime(): number {
        return 0;
    }

    /**当前时间，相对xxxx年开始经过的毫秒数*/
    public static get time(): number {
        return Laya.timer.currTimer;
    }

    /**游戏启动到现在的时间,单位毫秒*/
    public static get timeSinceStartup(): number {
        return (Laya.timer.currTimer - this.m_StartTime);
    }

    /**游戏启动后，经过的帧数*/
    public static get frameCount(): number {
        return Laya.timer.currFrame;
    }

    public static get timeScale(): number {
        return Laya.timer.scale;
    }

    public static set timeScale(scale: number) {
        Laya.timer.scale = scale;
    }
}
