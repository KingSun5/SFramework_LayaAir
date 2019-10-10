import { ResGroup } from '../res/res-group';
import { ResManager } from '../res/res-manager';
import { Log } from '../../core/log';
import { TimerManager } from '../timer/timer-manager';
import { EventFunc } from '../event/event-data';

export module CustomScene{

    /**
     * @author Sun
     * @time 2019-08-09 19:12
     * @project SFramework_LayaAir
     * @description  Scene的基类
     *
     */
    export class LyScene extends Laya.Scene {

        /**
         * 内嵌模式空的场景资源，必须实现这个createView，否则有问题
         */
        public static  uiView:any ={"type":"Scene","props":{"width":1334,"height":750},"loadList":[],"loadList3D":[]};


        /**
         * 场景第一个加载的窗口
         */
        protected firstView: any = null;
        /**
         * 场景依赖的资源组
         */
        public needLoadRes: ResGroup;

        private m_param: any;
        private m_loaded = false;

        public sceneTimers: Array<number> = new Array<number>();

        public constructor() {
            super();
            this.needLoadRes = new ResGroup();
        }

        createChildren():void {
            super.createChildren();
            this.createView(LyScene.uiView);
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
        }

        /**
         * 进入场景
         * @param param 参数 
         * @param progressFuc 进度回调 
         * @param completeFuc 完成回调
         */
        public enter(param: any,progressFuc:EventFunc,completeFuc:EventFunc) {

            this.m_loaded = false;
            this.m_param = param;
            this.onInit(param);

            ResManager.$.loadGroup(this.needLoadRes,progressFuc,completeFuc);
        }


        public leave() {
            this.onLeave();
            this.destroy();
        }

        public destroy(): void {
            this.onClean();
            this.sceneTimers.forEach((timer: number) => {
                TimerManager.$.removeTimer(timer);
            })
            super.destroy();
        }


        /**
         * 加载完成
         * @param error 加载错误
         */
        protected loaded(error) {

            if (error != null) {
                Log.error(error)
            } else {
                this.onLoaded();
                this.m_loaded = true;
                this.chechEnter();
            }

        }


        private chechEnter() {
            if (this.m_loaded) {
                if (this.firstView != null) {
                    let cls = this.firstView;
                    let win = new cls();
                    this.addChild(win);
                }
                this.onEnter(this.m_param);
            }
        }


        /**
         * 加载完成
         */
        protected onLoaded() {

        }

        /**
         * 场景初始化
         * @param param 参数
         */
        protected onInit(param: any) {

        }

        /**
         * 进入场景
         */
        protected onEnter(param: any): void {

        }


        /**
         * 逐帧循环
         */
        public update(): void {

        }

        /**
         * 离开场景
         */
        protected onLeave(): void {

        }

        /**
         * 当场景被销毁的时候
         */
        protected onClean(): void {

        }

    }
}