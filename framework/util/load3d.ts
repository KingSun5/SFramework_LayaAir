import { Log } from '../core/log';
import { EventFunc } from '../manager/event/event-data';

 /**
 * @author Sun
 * @time 2019-02-25 17:22
 * @project SFramework_LayaAir
 * @description  3D模型加载工具类
 *
 */
export class UtilLoad3D {

    /**
     * 加载U3D场景
     * @param area 作用域
     * @param path 场景文件路径
     * @param cb   加载完成回调
     */
    public static loadScene(path,area,cb):any
    {
        Laya.loader.create(path,Laya.Handler.create(this,()=>{
            Laya.stage.addChild(Laya.loader.getRes(path));
            if (cb) {
                cb.call(area);
            }
        }));
    }

    /**
     * 获取场景内物体
     * @param scene3d 场景
     * @param childName 子物体名字
     */
    public static getScene3DChild<T>(scene3d,childName):T
    {
        let ms = scene3d.getChildByName(childName) as T;
        if (ms) {
            return ms;
        }
        Log.error("Error:获取场景物体失败");
        return null;
    }

    /**
     * 获取模型的子物体模型
     * @param fatSP 父方
     * @param childName 子方名字
     */
    public static getModelChildByName<T>(fatSP,childName):T
    {
        let child = fatSP.getChildByName(childName) as T;
        if (child) {
            return child;
        }
        Log.error("Error:获取模型子物体信息错误");
        return null;
    }

    /**
     * 替换模型
     * @param targetSP 被替换模型
     * @param mianSP   替换模型
     */
    public static replaceModel(targetSP,mainSP)
    {
        if (!targetSP || !mainSP) {
            Log.error("Error:替换或被替换模型信息错误");
            return null;
        }
        if (targetSP.parent) {
            targetSP.parent.addChild(mainSP);
        }
        mainSP.transform.position = new Laya.Vector3(targetSP.transform.position.x,targetSP.transform.position.y,targetSP.transform.position.z);
        mainSP.transform.scale = new Laya.Vector3(targetSP.transform.scale.x,targetSP.transform.scale.y,targetSP.transform.scale.y);
    }

    /**
     * 替换Mesh模型材质
     * @param targetSP 目标模型
     * @param targetMat 目标材质
     */
    public static replaceModelMeshMat(targetSP,targetMat)
    {
        if (!targetSP || !targetMat) {
            Log.error("Error:模型或材质信息错误");
            return null;
        }
        targetSP as Laya.MeshSprite3D;
        targetSP.meshRenderer.material = targetMat;
    }

    /**
     * 替换SkinMesh模型材质
     * @param targetSP 目标模型
     * @param targetMat 目标材质
     */
    public static replaceModelSkinMeshMat(targetSP,targetMat)
    {
        if (!targetSP || !targetMat) {
            Log.error("Error:模型或材质信息错误");
            return null;
        }
        targetSP as Laya.SkinnedMeshSprite3D;
        targetSP.skinnedMeshRenderer.material = targetMat;
    }

    /**
     * 获取容器上的材质并存入哈希表
     * @param targetObj 承载材质的容器
     */
    public static getMaterials(scene3d):any
    {
        /**Unity场景存贮一个空物体，附带MeshRender用来存储材质**/
        var container = UtilLoad3D.getScene3DChild<Laya.MeshSprite3D>(scene3d,"MatContainer");
        if (!container) {
            Log.error("Error:材质容器错误或不存在");
            return null;
        }
        var userInfo: {[index:string]: Laya.BlinnPhongMaterial} = {}
        var matArrary = container.meshRenderer.materials;
        for (var i = 0;i<matArrary.length;i++)
        {
            var name = matArrary[i].name.slice(0,matArrary[i].name.length-10);
            userInfo[name] = matArrary[i] as Laya.BlinnPhongMaterial;
        }
        return userInfo;
    }

    /**
     * 返回指定名字的材质
     * @param matArraty 存放材质的哈希表
     * @param matName   材质名字
     */
    public static getMaterialByName(matArrary,matName):Laya.BlinnPhongMaterial
    {
        if (!matArrary) {
            Log.error("Error:材质哈希表信息错误");
            return null;
        }
        if (!matArrary[matName])
        {
            Log.error("Error:指定哈希表内不存在["+matName+"]材质");
            return null;
        }
        return matArrary[matName];
    }

    /**
     * 播放模型动画
     * @param targetSp 播放物体
     * @param aniName  动画名字
     * @param isCross  是否过度
     * 通过this.animator.getCurrentAnimatorPlayState(0).normalizedTime>=1去判断当前动画是否播放完成
     */
    public static playAnimatorByName(targetSp,aniName,isCross?):Laya.Animator
    {
        var animator:Laya.Animator = targetSp.getComponent(Laya.Animator);
        if (!animator)
        {
            Log.error("Error:动画机信息错误");
            return;
        }
        if (isCross != null && isCross == false) {
            animator.play(aniName);
            return;
        }
        animator.crossFade(aniName,0.2);
        return animator;
    }

    /**
     * 控制动画速度
     * @param targetSp 目标物体
     * @param speed 播放速度
     */
    public static controlAnimatorSpeed(targetSp,speed)
    {
        var animator:Laya.Animator = targetSp.getComponent(Laya.Animator);
        if (!animator)
        {
            Log.error("Error:动画机信息错误");
            return;
        }
        if (speed) {
            animator.speed = speed;
        }else {
            animator.speed = 1;
        }
    }

    /**
     * 判断动画是否完成
     * @param animator
     */
    public static confirmAniComplete(animator:Laya.Animator):boolean
    {
        var bool = false;
        let index = animator.getCurrentAnimatorPlayState(0).normalizedTime;
        if (index >= 1) {
            bool = true;
        }
        return bool;
    }

}