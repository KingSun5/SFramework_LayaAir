import { EventData } from './event-data';
import { Log } from '../../core/log';
import { Singleton } from '../../core/singleton';


 /**
 * @author Sun
 * @time 2019-01-18 16:20
 * @project SFramework_LayaAir
 * @description 所有需要监控事件节点的基类
 */
export class EventNode extends Singleton {

    constructor() {
        super();
        EventContext.eventNodes.set(this, this);
    }

    // ==================================================
    // ==============  Local Event Section ==============
    // ==================================================

    private static m_globalEventData: Array<EventData> = new Array<EventData>();
    private static m_globalEventDict: EventListenerClassDict = {};

    private static createGlobalData(cmd, data): EventData {
        let ed: EventData;
        if (EventNode.m_globalEventData.length > 0) {
            ed = EventNode.m_globalEventData.pop();
            ed.cmd = cmd;
            ed.data = data;
            ed.isStop = false;
        } else {
            ed = new EventData(cmd, data);
        }
        return ed;
    }

    private static returnGlobalEventData(ed: EventData) {
        ed.data = null;
        ed.cmd = null;
        ed.isStop = false;
        EventNode.m_globalEventData.push(ed)
    }

    /**
     * 添加一个消息监听器
     * @param type 消息类型
     * @param callBack 回调函数
     * @param target 作用对象
     * @param priority 消息的优先级
     * @param once 是否只监听一次
     */
    public static addGlobalListener(type: string | number, callBack: EventCallbackListener, target: any, priority: number = 0, once: boolean = false) {
        type = type.toString();
        let info: EventListenerInfoData = {
            type: type,
            callBack: callBack,
            target: target,
            priority: priority,
            once: once
        };

        let array = EventNode.m_globalEventDict[type];
        let has = false;
        let pos = 0;
        if (array != null) {
            array.forEach(element => {
                if (element.target == target && element.callBack == callBack) {
                    has = true;
                }
                if (element.priority > info.priority) {
                    pos++;
                }
            });
        } else {
            array = new Array<EventListenerInfoData>();
            EventNode.m_globalEventDict[type] = array;
        }
        if (has) {
            // console.error("重复注册消息：type=" + type);
            Log.error("重复注册消息：type=" + type)
        } else {
            array.splice(pos, 0, info);
        }
    }

    /**
     * 移除一个消息监听器
     * @param type 消息id
     * @param callBack 回调函数
     * @param target 作用的对象
     */
    public static removeGlobalListener(type: string | number, callBack: EventCallbackListener, target: any) {
        type = type.toString();
        let info: EventListenerInfoData = null;
        let array = EventNode.m_globalEventDict[type];
        if (array != null) {
            let infoIndex = -1;
            array.every((value: EventListenerInfoData, index: number, array: EventListenerInfoData[]) => {
                if (value.target == target && value.callBack == callBack) {
                    infoIndex = index;
                    info = value;
                    return false;
                }
                return true;
            });

            if (infoIndex != -1) {
                array.splice(infoIndex, 1);
            }
        }
    }

    /**
     * 是否存在这个监听消息
     * @param type 消息类型
     * @param callBack 回调类型
     * @param target 回调对象
     */
    public static hasGlobalListener(type: string | number, callBack: EventCallbackListener, target: any) {
        let flag = false;
        let array = EventNode.m_globalEventDict[type];
        if (array) {
            // @ts-ignore
            let index = array.findIndex((obj, index, any) => {
                return obj.target == target && obj.callBack == callBack;
            });
            flag = index != -1;
        }
        return flag;
    }

    /**
     * 派发消息
     * @param ed 派发的消息内容
     */
    public static dispatchGlobal(ed: EventData) {
        EventNode._dispatchGlobal(ed);
    }

    /**
     * 派发消息
     * @param cmd 消息id
     * @param data 消息内容
     */
    public static dispatchGlobalByCmd(cmd: string | number, data: any = null) {
        let ed = EventNode.createGlobalData(cmd, data);
        EventNode._dispatchGlobal(ed);
        if (ed != null) {
            EventNode.returnGlobalEventData(ed);
        }
    }

    private static _dispatchGlobal(ed: EventData) {
        let array = EventNode.m_globalEventDict[ed.cmd];
        if (array != null) {

            for (let i = 0; i < array.length; i++) {
                let info = array[i];
                if (info.callBack != null) {
                    info.callBack.call(info.target, ed);
                }
                if (info.once) {
                    array.splice(i--, 1);
                }
                if (ed.isStop) {
                    break;
                }
            }
        }
    }

    // ==================================================
    // ==============  Local Event Section ==============
    // ==================================================

    private m_eventData: Array<EventData> = new Array<EventData>();
    private m_eventDict: EventListenerClassDict = {};

    private createEventData(cmd, data): EventData {
        let ed: EventData;
        if (this.m_eventData.length > 0) {
            ed = this.m_eventData.pop();
            ed.cmd = cmd;
            ed.data = data;
            ed.isStop = false;
        } else {
            ed = new EventData(cmd, data);
        }
        return ed;
    }

    private returnEventData(ed: EventData) {
        ed.data = null;
        ed.cmd = null;
        ed.isStop = false;
        this.m_eventData.push(ed)
    }

    /**
     * 添加一个消息监听器
     * @param type 消息类型
     * @param callBack 回调函数
     * @param target 作用对象
     * @param priority 消息的优先级
     * @param once 是否只监听一次
     */
    public addEventListener(type: string | number, callBack: EventCallbackListener, target: any, priority: number = 0, once: boolean = false):EventListenerInfoData   {
        type = type.toString();
        let info: EventListenerInfoData = {
            type: type,
            callBack: callBack,
            target: target,
            priority: priority,
            once: once
        };

        let array = this.m_eventDict[type];
        let has = false;
        let pos = 0;
        if (array != null) {
            array.forEach(element => {
                if (element.target == target && element.callBack == callBack) {
                    has = true;
                }
                if (element.priority > info.priority) {
                    pos++;
                }
            });
        } else {
            array = new Array<EventListenerInfoData>();
            this.m_eventDict[type] = array;
        }
        if (has) {
            // console.error("重复注册消息：type=" + type);
            Log.error("重复注册消息：type=" + type)
            return null;
        } else {
            array.splice(pos, 0, info);
            return info;
        }
    }

    /**
     * 移除一个消息监听器
     * @param type 消息id
     * @param callBack 回调函数
     * @param target 作用的对象
     */
    public removeEventListener(type: string | number, callBack: EventCallbackListener, target: any) {
        type = type.toString();
        let info: EventListenerInfoData = null;
        let array = this.m_eventDict[type];
        if (array != null) {
            let infoIndex = -1;
            array.every((value: EventListenerInfoData, index: number, array: EventListenerInfoData[]) => {
                if (value.target == target && value.callBack == callBack) {
                    infoIndex = index;
                    info = value;
                    return false;
                }
                return true;
            });

            if (infoIndex != -1) {
                array.splice(infoIndex, 1);
            }
        }
    }

    public removeEventListenerAll() {
        this.m_eventData = new Array<EventData>();
        this.m_eventDict = {};
    }

    /**
     * 是否存在这个监听消息
     * @param type 消息类型
     * @param callBack 回调类型
     * @param target 回调对象
     */
    public hasEventListener(type: string | number, callBack: EventCallbackListener, target: any) {
        let flag = false;
        let array = this.m_eventDict[type];
        if (array) {
            // @ts-ignore
            let index = array.findIndex((obj, index, any) => {
                return obj.target == target && obj.callBack == callBack;
            });
            flag = index != -1;
        }
        return flag;
    }

    /**
     * 派发消息
     * @param ed 派发的消息内容
     */
    public dispatchEvent(ed: EventData) {
        this._dispatchEvent(ed);
    }

    /**
     * 派发消息
     * @param cmd 消息id
     * @param data 消息内容
     */
    public dispatchEventByCmd(cmd: string | number, data: any = null) {
        let ed = this.createEventData(cmd, data);
        this._dispatchEvent(ed);
        if (ed != null) {
            this.returnEventData(ed);
        }
    }

    private _dispatchEvent(ed: EventData) {
        let array = this.m_eventDict[ed.cmd];
        if (array != null) {

            for (let i = 0; i < array.length; i++) {
                let info = array[i];
                if (info.callBack != null) {
                    info.callBack.call(info.target, ed);
                }
                if (info.once) {
                    array.splice(i--, 1);
                }
                if (ed.isStop) {
                    break;
                }
            }
        }
    }


}

export type EventListenerInfoData =
    {
        type: string,
        callBack: EventCallbackListener,
        target: any,
        priority: number,
        once: boolean
    }

export type EventListenerClassDict = {
    [key: string]: Array<EventListenerInfoData>
}


export type EventCallbackListener = ((ed: EventData) => void);

export class EventContext {

    public static eventNodes: Map<EventNode, EventNode> = new Map<EventNode, EventNode>();

}

