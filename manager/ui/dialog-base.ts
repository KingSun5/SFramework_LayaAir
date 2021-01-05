

import Sprite = Laya.Sprite;
import Tween = Laya.Tween;
import Ease = Laya.Ease;
import Handler = Laya.Handler;
import { UtilDisplay } from "../../util/display";
import { EventFunc } from '../event/event-data';

export module CustomDialog{

    /**
     * @author Sun
     * @time 2019-08-09 17:41
     * @project SFramework_LayaAir
     * @description  UI组件的基类，继承自Laya.View
     *
     */
    export class DialogBase extends Laya.Dialog {
        
        /**遮罩层 */
        private maskLayer: Sprite = null;
        /**弹窗内物体 */
        private contentPnl: Laya.Node = null;
        /**弹窗数据 */
        public popupData = new PopupData();

        createView(view: any): void {
            super.createView(view);
        }


        constructor() {
            super();
            this.bundleButtons();

            this.contentPnl = this.getChildAt(0);
        }

        /**
         * 添加遮罩层
         */
        crateMaskLayer(): void {
            this.maskLayer = UtilDisplay.createMaskLayer();
            this.maskLayer.mouseEnabled = true;

            let t = this.maskLayer;
            t.x = Math.round(((Laya.stage.width - t.width) >> 1) + t.pivotX);
            t.y = Math.round(((Laya.stage.height - t.height) >> 1) + t.pivotY);

            this.addChild(this.maskLayer);
            this.maskLayer.zOrder = -1;

        }

        /**
         * 在场景中居中组件
         */
        protected center(view?: Laya.Sprite): void {
            if (view == null) view = this;
            view.x = Math.round(((Laya.stage.width - view.width) >> 1) + view.pivotX);
            view.y = Math.round(((Laya.stage.height - view.height) >> 1) + view.pivotY);
        }


        /**
         * 添加默认按钮事件
         */
        bundleButtons(): void {
            if (this["btnClose"] != null) {
                this["btnClose"].on(Laya.Event.CLICK, this, this.close);
            }
        }

        /**
         * 关闭空白处点击关闭事件
         */
        closeOutsieClick(){
            if (this.maskLayer != null) {
                this.maskLayer.off(Laya.Event.CLICK, this, this.close);
            }
        }

        /**
         * 对话框弹出方法
         * @param time 弹出时间
         * @param data 数据
         * @param isMask 是否生成遮罩
         * @param closeOutside 是否点击空白处关闭
         */
        popupDialog(popupData:PopupData = null): void {
            // this.popup(false,false);
            if(popupData==null) {
                popupData = this.popupData;
            }else{
                this.popupData = popupData;
            }
            Laya.stage.addChild(this);
            this.popupInit();
            if (popupData.isMask && this.maskLayer == null) {
                this.crateMaskLayer();
                if (!popupData.closeOutside) this.maskLayer.on(Laya.Event.CLICK, this, this.close);
            }
            this.onShowAnimation(popupData.time,()=>{
                if(popupData.callBack) popupData.callBack.invoke();
            });
        }

        /** Des:弹出调用 */
        popupInit() {
        }


        onShowAnimation(time: number = 300,cb) {
            let target = this.contentPnl;
            this.center();
            
            // @ts-ignore
            target.scale(0, 0);
            Tween.to(target, {
                scaleX: 1,
                scaleY: 1
            }, time, Ease.backOut, Handler.create(this, cb, [this]), 0, false, false);
        }

        close(): void {
            this.removeSelf();
        }


    }
}


    /**
     * @author Sun
     * @time 2019-08-12 17:43
     * @project SFramework_LayaAir
     * @description  窗体弹出数据
     *time: number = 300, data: any = null, isMask: boolean = true, closeOutside: boolean = true,cb?
     */
    export class PopupData{
        public time:number = 300;
        public data:any = null;
        public isMask:boolean = true;
        public closeOutside:boolean = true;
        public callBack:EventFunc = null;

        constructor(time: number = 300, data: any = null, isMask: boolean = true, closeOutside: boolean = true,cb:EventFunc =null)
        {
            if(time!=null) this.time = time;
            if(data!=null) this.data = data;
            if(isMask!=null) this.isMask = isMask;
            if(closeOutside!=null) this.closeOutside = closeOutside;
            if(cb!=null) this.callBack = cb;
        }
    }