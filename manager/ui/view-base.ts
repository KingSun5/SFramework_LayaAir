import { DataManager } from '../data/data-manager';
import { DataBase } from '../data/data-base';

export module CustomView{

    /**
     * @author Sun
     * @time 2019-08-09 15:51
     * @project SFramework_LayaAir
     * @description  UI组件的基类，继承自Laya.View
     *
     */
    export class ViewBase extends Laya.View {

        /*所有数据观察者*/
        protected dataWatchs: Array<string> = [];

        public data: any = null;

        //override
        createView(view: any): void {
            super.createView(view);
            this.fullScreen();
            this.parseElement();
        }

        onDisable(): void {

            this.dataWatchs.forEach((cmd: string) => {
                DataManager.$.removeEventListener(cmd, this.onData, this);
            });
        }

        /**
         * 背景图适应
         */
        protected parseElement(): void {
            if (this["imgBg"] != null) {
                let imgBg = this["imgBg"] as Laya.Sprite
                this.fullScreen(imgBg);
            }
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
         * 设置大小为全屏
         * @param view Laya.Sprite
         */
        protected fullScreen(view?: Laya.Sprite): void {
            if (view == null) view = this;
            view.width = Laya.stage.width;
            view.height = Laya.stage.height;
        }

        /**
         * 绑定数据监听
         * @param cmd 监听类型
         */
        protected addDataWatch(cmd: string) {
            this.dataWatchs.push(cmd);
            DataManager.$.addEventListener(cmd, this.onData, this);
            DataManager.$.get(cmd).notify();
        }

        /**
         * 当数据刷新是重绘
         */
        protected onData(data: DataBase) {
            // if (data.cmd == DataDefine.CoinInfo){
            //
            // }
        }

        /**
         * 添加到画布
         * @param data 数据 
         */
        add(data: any = null)
        {
            this.data = data;
            Laya.stage.addChild(this);
            this.show();
        }

        /**
         * 显示view
         */
        show(): void {
            this.visible = true;
        }

        /**
         * 隐藏view
         */
        hide():void{
            this.visible = false;
        }

    }
}
