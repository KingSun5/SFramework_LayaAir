import Handler = Laya.Handler;
import {UtilString} from "../../util/string";
import {ResManager} from "../res/res-manager";
import { Singleton } from '../../core/singleton';
import { IManager } from '../../interface/i-manager';
import { Dictionary } from '../../structure/dictionary';
import { JsonTemplate } from './json-template';
import { ConfigData } from '../../setting/config';
import { Log } from '../../core/log';

  /**
 * @author Sun
 * @time 2019-08-12 14:40
 * @project SFramework_LayaAir
 * @description 配置表管理
 *
 */
export class JsonManager extends Singleton implements IManager {

    /**
     * 存放所有配置表模板
     */
    private m_DicTemplate: Dictionary<JsonTemplate> = null;
    /**
     * 存放所有解析过的配置表
     */
    private m_DicData: Dictionary<any> = null;

    public constructor() {
        super();
    }
    private static instance: JsonManager = null;
    public static get $(): JsonManager {
        if (!this.instance) this.instance = new JsonManager();
        return this.instance;
    }

    /**
     * 管理器统一设置方法
     */
    public setup(): void {
        this.m_DicTemplate = new Dictionary<JsonTemplate>();
        this.m_DicData = new Dictionary<any>();
        this.load(ConfigData.$.jsonTemplateList);
    }

    update(): void {
    }

    /**
     * 管理器统一销毁方法
     */
    public destroy(): void {
        this.unloadAll();
        if (this.m_DicTemplate) {
            this.m_DicTemplate.clear();
            this.m_DicTemplate = null;
        }
        if (this.m_DicData) {
            this.m_DicData.clear();
            this.m_DicData = null;
        }
    }

     /**
     * 加载所有的数据模板
     * @param list
     */
    private load(list: JsonTemplate[]): void {
        for (let i = 0; i < list.length; ++i) {
            Log.log("[load]加载配置表:" + list[i].url);
            this.m_DicTemplate.add(list[i].name, list[i]);
        }
    }


    /**
     * 获取一个单一结构的数据
     * @param name
     */
    public getTable(name: string): any {
        
        let data = this.m_DicData.value(name);
        if(data==null){
            data = ResManager.$.getRes(this.m_DicTemplate.value(name).url);
            this.m_DicData.add(name,data);
        }
        return data;
    }

    /**
     * 获取一行复合表的数据
     * @param name
     * @param key
     */
    public getTableRow(name: string, key: string|number): any {
        return this.getTable(name)[key];
    }

   

    /**
     * 卸载指定的模板
     * @param url
     */
    public unload(name: string): void {
        let template = this.m_DicTemplate.value(name);
        if (template) {
            this.m_DicData.remove(name);
        }
        ResManager.$.releaseUrl(template.url);
        this.m_DicTemplate.remove(name);
    }

    /**
     * 卸载所有的模板
     * @constructor
     */
    public unloadAll(): void {
        if (!this.m_DicTemplate) return;

        this.m_DicTemplate.foreach(function (key, value) {
            this.unload(key);
            return true;
        });
        this.m_DicData.clear();
        this.m_DicTemplate.clear();
    }
}
