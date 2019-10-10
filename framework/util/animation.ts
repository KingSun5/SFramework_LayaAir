import AnimationBase = laya.display.AnimationBase;
import FrameAnimation = laya.display.FrameAnimation;
import Handler = Laya.Handler;

 /**
 * @author Sun
 * @time 2019-03-27 15:08
 * @project SFramework_LayaAir
 * @description 动效工具类
 *
 */
export class UtilAni {

    /**
     * 播放动效
     * @param ani 动效
     * @param isLoop 是否循环
     * @param isBack 是否倒放
     */
    public static playAni(ani, isLoop, isBack,area?,cb?) {
        if (isBack) {
            ani.wrapMode = AnimationBase.WRAP_REVERSE;
        } else {
            ani.wrapMode = AnimationBase.WRAP_POSITIVE;
        }
        ani.play(0, isLoop);

        if (cb) {
            if (!ani.hasListener(Laya.Event.COMPLETE)) {
                ani.on(Laya.Event.COMPLETE,this,()=>{
                    cb.call(area);
                })
            }
        }
    }

    /** Des:结束动画 */
    public static closeAni(ani){
        ani.stop();
    }


    /**
     * 消失禁止触摸
     * @param box
     * @param alpha
     * @param area
     * @param cb
     * @constructor
     */
    public static AniAlpha(box,alpha,area?,cb?)
    {
        box.mouseEnabled = false;
        box.visible = true;
        Laya.Tween.to(box,{alpha:alpha},300,Laya.Ease.linearNone,Laya.Handler.create(this,()=>{
            if (area != null && cb != null)
            {
                cb.call(area);
            }
            box.visible = alpha==1?true:false;
            box.mouseEnabled = true;
        }));
    }

    /**
     * 缩放禁止触摸
     * @param box
     * @param scale
     * @param area
     * @param cb
     * @param time
     * @param disable
     * @constructor
     */
    public static AniScale(box,scale,area?,cb?,time = 500,disable = false)
    {
        if (!disable) {
            box.mouseEnabled = false;
        }
        box.visible = true;
        Laya.Tween.to(box,{scaleX:scale.x,scaleY:scale.y},time,Laya.Ease.backInOut,Laya.Handler.create(this,()=>{
            if (area != null && cb != null)
            {
                cb.call(area);
            }
            box.visible = scale.x!=0;
            if (!disable) {
                box.mouseEnabled = true;
            }
        }));
    }

    /**
     * X +
     * @param box
     * @param x
     * @param time
     * @param ease
     * @param area
     * @param cb
     * @constructor
     */
    public static AniMoveAddX(box,x,time = 500,ease = Laya.Ease.backInOut,area?,cb?)
    {
        Laya.Tween.to(box,{x:x+box.x},time,ease,Laya.Handler.create(this,()=>{
            if (area && cb) cb.call(area);
        }))
    }

    /**
     * Y +
     * @param box
     * @param y
     * @param time
     * @param ease
     * @param area
     * @param cb
     * @constructor
     */
    public static AniMoveAddY(box,y,time = 500,ease = Laya.Ease.backInOut,area?,cb?)
    {
        box.mouseEnabled = false;
        Laya.Tween.to(box,{y:y+box.y},time,ease,Laya.Handler.create(this,()=>{
            if (area && cb) cb.call(area);
            box.mouseEnabled = true;
        }))
    }

    /**
     * 移动X到
     * @param box
     * @param x
     * @param time
     * @param ease
     * @param area
     * @param cb
     * @constructor
     */
    public static AniMoveToX(box,x,time = 200,ease = Laya.Ease.backInOut,area?,cb?)
    {
        Laya.Tween.to(box,{x:x},time,ease,Laya.Handler.create(this,()=>{
            if (area && cb) cb.call(area);
        }))
    }

    /**
     * 移动Y到
     * @param box
     * @param y
     * @param time
     * @param ease
     * @param area
     * @param cb
     * @constructor
     */
    public static AniMoveToY(box,y,time = 200,ease = Laya.Ease.backInOut,area?,cb?)
    {
        Laya.Tween.to(box,{y:y},time,ease,Laya.Handler.create(this,()=>{
            if (area && cb) cb.call(area);
        }))
    }

    /**
     * 移动XY到
     * @param box
     * @param vect
     * @param time
     * @param ease
     * @param area
     * @param cb
     * @constructor
     */
    public static AniMoveTo(box,vect,time = 200,ease = Laya.Ease.backInOut,area?,cb?)
    {
        Laya.Tween.to(box,{x:vect.x,y:vect.y},time,ease,Laya.Handler.create(this,()=>{
            if (area && cb) cb.call(area);
        }))
    }

    public static  playFramesAnilByFile(filename,x,y,frames,name,interval:number=80){
        //创建动画实例
        let roleAni = new Laya.Animation();
        // roleAni.scale(0.9, 0.9)
        // 加载动画图集,加载成功后执行回调方法
        roleAni.loadAtlas(filename, Handler.create(this, () => {
            roleAni.interval = interval;
            roleAni.x = x;
            roleAni.y = y;
            roleAni.play(0, false, name);

            roleAni.addLabel("finish", frames);
            roleAni.on(Laya.Event.LABEL, this, (tag) => {
                if (tag == 'finish') {
                    roleAni.removeSelf();
                }
            });
        }));

        return roleAni;
    }

    /**
     * 旋转
     * @param box
     * @param rot
     * @param time
     * @param ease
     * @param area
     * @param cb
     * @constructor
     */
    public static AniRotation(box,rot,time = 200,ease = Laya.Ease.linearNone,area?,cb?)
    {
        Laya.Tween.to(box,{rotation:rot},time,ease,Laya.Handler.create(this,()=>{
            if (area && cb) cb.call(area);
        }))
    }



}