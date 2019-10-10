import { EventNode, EventContext, EventCallbackListener } from './event-node';
import { EventData } from './event-data';
import { IManager } from '../../interface/i-manager';


 /**
 * @author Sun
 * @time 2019-01-18 16:20
 * @project SFramework_LayaAir
 * @description 事件管理器
 */
export class EventManager extends EventNode implements IManager {


    private static instance: EventManager = null;
    public static get $():EventManager {
        if (!this.instance) this.instance = new EventManager();
        return this.instance;
    }
 
    public constructor() {
        super();
    }

  

    setup(): void {
        EventContext.eventNodes.clear();
    }

    update(): void {
    }

    destroy(): void {
        EventContext.eventNodes.clear();
    }
    
    /**
     * 移除一个消息监听节点
     * @param node
     */
    remove(node: EventNode): void {
        node.removeEventListenerAll();
        EventContext.eventNodes.delete(node);
    }

    /**
     * 给所有本地消息节点通知消息
     * @param ed
     */
    dispatchEventLocalAll(ed: EventData) {
        EventContext.eventNodes.forEach((en: EventNode) => {
            en.dispatchEvent(ed);
        })
    }

    /**
     * 给所有本地消息节点通知消息
     * @param cmd
     * @param data
     */
    dispatchEventLocalAllByCmd(cmd: string | number, data: any = null) {
        EventContext.eventNodes.forEach((en: EventNode) => {
            en.dispatchEventByCmd(cmd, data);
        })
    }


    /**
     * 添加一个消息监听器
     * @param type 消息类型
     * @param callBack 回调函数
     * @param target 作用对象
     * @param priority 消息的优先级
     * @param once 是否只监听一次
     */
    public addListener(type: string | number, callBack: EventCallbackListener, target: any, priority: number = 0, once: boolean = false) {
        EventNode.addGlobalListener(type,callBack,target,priority,once);
    }

    /**
     * 移除一个消息监听器
     * @param type 消息id
     * @param callBack 回调函数
     * @param target 作用的对象
     */
    public removeListener(type: string | number, callBack: EventCallbackListener, target: any) {
        EventNode.removeGlobalListener(type,callBack,target);
    }

    /**
     * 是否存在这个监听消息
     * @param type 消息类型
     * @param callBack 回调类型
     * @param target 回调对象
     */
    public hasListener(type: string | number, callBack: EventCallbackListener, target: any) {
        EventNode.hasGlobalListener(type,callBack,target);
    }

    /**
     * 派发消息
     * @param cmd 消息id
     * @param data 消息内容
     */
    public dispatchEventByCmd(cmd: string | number, data: any = null) {
        EventNode.dispatchGlobalByCmd(cmd,data);
    }

}
