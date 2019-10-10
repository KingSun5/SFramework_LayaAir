import { Log } from '../core/log';

 /**
 * @author Sun
 * @time 2018-12-18 15:25
 * @project SFramework_LayaAir
 * @description 3D缓动类
 *
 */
export class UtilTween3D{

    /** 变化倍率 */
    private mult:number;
    /** 缓动目标 */
    private target: any;
    /** pos缓动数据 */
    private targetVect3:Laya.Vector3;
    /** 缓动类型 */
    private tweenType:string;
    /** 缓动动画 */
    private tween:Laya.Tween;
    /** 目标初始位移 */
    private posX:number;
    private posY:number;
    private posZ:number;
    /** 目标初始scale */
    private scaleX:number;
    private scaleY:number;
    private scaleZ:number;
    /** 目标初始euler */
    private eulerX:number;
    private eulerY:number;
    private eulerZ:number;
    /** 完成回调 */
    private completeHandler:Laya.Handler;

    public static _Tween3DData:{[key:string]:UtilTween3D} = {};


    constructor(target:Laya.Sprite3D,vect3:Laya.Vector3,type: string) {
        this.mult = 0;
        this.target = target;
        this.tweenType = type;

        if (this.tweenType=="position")
        {
            this.targetVect3 = new Laya.Vector3(
                vect3.x - target.transform.position.x,
                vect3.y - target.transform.position.y,
                vect3.z - target.transform.position.z);
        }
        else if (this.tweenType == "scale") {
            this.targetVect3 = new Laya.Vector3(
                vect3.x - target.transform.localScale.x,
                vect3.y - target.transform.localScale.y,
                vect3.z - target.transform.localScale.z);
        }
        else if(this.tweenType=="euler"){
            this.targetVect3 = new Laya.Vector3(
                vect3.x - target.transform.localRotationEuler.x,
                vect3.y - target.transform.localRotationEuler.y,
                vect3.z - target.transform.localRotationEuler.z);
        }


        this.posX = target.transform.position.x;
        this.posY = target.transform.position.y;
        this.posZ = target.transform.position.z;

        this.scaleX = target.transform.localScale.x;
        this.scaleY = target.transform.localScale.y;
        this.scaleZ = target.transform.localScale.z;

        this.eulerX = target.transform.localRotationEuler.x;
        this.eulerY = target.transform.localRotationEuler.y;
        this.eulerZ = target.transform.localRotationEuler.z;

    }


    /**
     *
     * @param target 缓动对象
     * @param date 缓动数据
     * @param duration 缓动时间
     * @param ease 欢动方式
     * @param complete 完成回调
     * @param delay 延迟
     * @param type 类型
     */
    public static to(target,vect,type = "position",duration = 1000, ease = Laya.Ease.linearNone, complete?,update?,delay?):UtilTween3D
    {
        if(target){
            let tween3D : UtilTween3D = new UtilTween3D(target,vect,type);
            tween3D._to(duration,ease,complete,update,delay);

            UtilTween3D._Tween3DData[target.id+type] = tween3D;
            return tween3D;
        }
    }

    private _to(duration, ease,complete:Laya.Handler,update:Laya.Handler,delay:number):void{

        this.completeHandler = complete;

        this.tween = Laya.Tween.to(this,{mult:1,update:update},duration,ease,Laya.Handler.create(this,this.onComplete),delay);

        Laya.timer.frameLoop(1,this,this.onUpdate);
    }

    private onUpdate()
    {
        if(this.tweenType=="position"){
            this.target.transform.position = new Laya.Vector3(this.posX+this.targetVect3.x*this.mult,
                this.posY+this.targetVect3.y*this.mult,this.posZ+this.targetVect3.z*this.mult);
        }
        else if(this.tweenType=="scale"){
            this.target.transform.localScale =new Laya.Vector3(this.scaleX+this.targetVect3.x*this.mult,
                this.scaleY+this.targetVect3.y*this.mult,this.scaleZ+this.targetVect3.z*this.mult);
        }
        else if(this.tweenType=="euler"){
            this.target.transform.localRotationEuler = new Laya.Vector3(this.eulerX+this.targetVect3.x*this.mult,
                this.eulerY+this.targetVect3.y*this.mult,this.eulerZ+this.targetVect3.z*this.mult);
        }
    }

    /**
     * 停止欢动
     * @param target 缓动目标
     * @param type 停止类型
     */
    public static clear(target:Laya.Sprite3D,type:string){

        var tween3D = UtilTween3D._Tween3DData[target.id+type];
        if (tween3D!=null)
        {
            tween3D._clear();

            delete UtilTween3D._Tween3DData[target.id+type]
        }
        else{
            // console.log(">>>>>>当前目标不存在该缓动类型");
            Log.debug(">>>>>>当前目标不存在该缓动类型");
        }
    }

    private _clear(){
        Laya.timer.clear(this,this.onUpdate);
        if(this.tween){
            Laya.Tween.clear(this.tween);
            this.tween = null;
        }
    }

    /**
     * Description:完成回调
     */
    onComplete()
    {
        Laya.timer.clear(this,this.onUpdate);
        Laya.Tween.clear(this.tween);
        delete UtilTween3D._Tween3DData[this.target.id+this.tweenType];
        if (this.completeHandler != null) {
            this.completeHandler.run();
        }
    }

}