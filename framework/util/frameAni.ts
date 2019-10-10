/**
 * @author Sun
 * @time 2019-06-06 18:08
 * @project SFramework_LayaAir
 * @description 帧动画
 *
 */
export class UtilFrameAni {

    /**
     * 创建帧动画
     * @param path 路径
     * @param area
     * @param cb
     */
    public static creat(path:string,area?,cb?):Laya.Animation
    {
        let ani = new Laya.Animation();
        ani = ani.loadAtlas(path,Laya.Handler.create(this,()=>{
           if (area && cb) cb.call(area);
        }));
        return ani;
    }

    /**
     * 播放帧动画
     * @param ani
     * @param index
     * @param parent
     * @param loop
     */
    public static play(ani:Laya.Animation,parent?,index:number = 1,loop:boolean = false)
    {
        ani.visible = true;
        ani.play(index,loop)
        Laya.stage.addChild(parent);
    }

    /**
     * 结束帧动画
     * @param ani
     * @param parent
     */
    public static stop(ani:Laya.Animation,parent?)
    {
        ani.visible = false;
        ani.stop();
        Laya.stage.removeChild(parent);
    }


}