import { UtilAni } from '../../util/animation';

 /**
 * @author Sun
 * @time 2019-04-13 15:08
 * @project SFramework_LayaAir
 * @description 新手引导
 *
 */
export class GuideManager {
    /*
    引导步骤数据格式
    {x:,y:,weigh:,heigh:,tipX:,tipY:,ani:,txt:}
    x:显示区域的X
    y:显示区域的Y
    weigh:显示区域的宽
    heigh:显示区域的高
    tipX:提示框的X
    tipY:提示框的Y
    ani:需要播放的动效
    txt:文本框的内容

    新手引导步骤：1、initGuide   2、startGuide
     */

    private static instance: GuideManager

    public static get $(): GuideManager {
        if (!this.instance) this.instance = new GuideManager();
        return this.instance;
    }

    /** Des:新手引导数据 */
    private guideSteps = [];
    /** Des:新手引导遮罩容器 */
    private guideContainer:Laya.Sprite;
    /** Des:交互区域 */
    private interactionArea:Laya.Sprite;
    /** Des:点击区域 */
    private hitArea:Laya.HitArea;
    /** Des:提示框 */
    private signBox:Laya.Sprite;
    /** Des:提示文字框 */
    private signText:Laya.Text;
    /** Des:遮罩 */
    private maskArea:Laya.Sprite;
    /** Des:当前步骤 */
    private guideStep:number = 0;
    /** Des:上一个动效 */
    private oldAni:Laya.FrameAnimation;


    //初始化新手引导数据
    public initGuide(steps,signBox?,signText?)
    {
        // 引导所在容器
        this.guideContainer = new Laya.Sprite();
        // 设置容器为画布缓存
        this.guideContainer.cacheAs = "bitmap";
        // 新手引导层次
        this.guideContainer.zOrder = 10000;
        // 绘制遮罩区域
        this.maskArea = new Laya.Sprite();
        this.maskArea.alpha = 0.5;
        this.maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        //可交互区
        this.interactionArea = new Laya.Sprite();
        //设置叠加模式
        this.interactionArea.blendMode = "destination-out";
        //设置可点击区域
        this.hitArea = new Laya.HitArea();
        this.hitArea.hit.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        this.guideContainer.hitArea = this.hitArea;
        this.guideContainer.mouseEnabled = true;

        //新手引导步骤数据
        this.guideSteps = steps;
        if (signBox != null) this.signBox = signBox;
        if (signText != null) this.signText = signText;

        //添加页面点击事件
        this.guideContainer.on(Laya.Event.CLICK, this, this.nextStep)

    }

    /** Des:开始新手教程 */
    public startGudie()
    {
        Laya.stage.addChild(this.guideContainer);
        this.guideContainer.addChild(this.maskArea);
        this.guideContainer.addChild(this.interactionArea);
        Laya.stage.removeChild(this.signBox);
        Laya.stage.addChild(this.signBox);
    }

    /** Des:下一步 */
    private nextStep()
    {
        //结束新手教程
        if (this.guideStep == this.guideSteps.length)
        {
            Laya.stage.removeChild(this.guideContainer);
            return;
        }
        var step:any = this.guideSteps[this.guideStep++];
        //设置遮罩位置大小
        if (step.x != null) {
            this.hitArea.unHit.clear();
            this.hitArea.unHit.drawRect(step.x, step.y, step.width, step.height,"#000000");
            this.interactionArea.graphics.clear();
            this.interactionArea.graphics.drawRect(step.x, step.y, step.width, step.height,"#000000");
            this.interactionArea.pivotX = step.width/2;
            this.interactionArea.pivotY = step.height/2;
        }
        if (this.oldAni != null&&this.oldAni!=step.ani) {
            UtilAni.closeAni(this.oldAni);
        }
        //设置动效
        if (step.ani != null&&step.ani!=this.oldAni) {
            this.oldAni = step.ani;
            UtilAni.playAni(step.ani,true,false);
        }
        //设置提示框位置
        if (step.tipx != null) {
            this.signBox.pos(step.tipx, step.tipy);
        }
        //设置提示框内容
        if (step.txt != null) {
            this.signText.text = step.txt;
        }
    }


}