import Handler = Laya.Handler;
import { EventNode } from '../event/event-node';
import { IManager } from '../../interface/i-manager';
import { Dictionary } from '../../structure/dictionary';
import { Log } from '../../core/log';
import { ResItem } from './res-item';
import { UtilTime } from '../../util/time';
import { ResGroup } from './res-group';
import { ResLoaded } from './res-loaded';
import { enumClearStrategy, enumArraySortOrder } from '../../setting/enum';
import { UtilArray } from '../../util/array';
import { EventFunc } from '../event/event-data';


/**
 * @author Sun
 * @time 2019-08-12 13:33
 * @project SFramework_LayaAir
 * @description  资源管理  （所有资源均通过ResGroup的形式来加载）
 *
 */
export class ResManager extends EventNode implements IManager {


    private static instance: ResManager = null;
    public static get $(): ResManager {
        if (this.instance == null) this.instance = new ResManager();
        return this.instance;
    }
   
    constructor() {
        super();
    }

    //存放所有已加载的资源
    private m_dictResItem: Map<string, ResItem> = new Map<string, ResItem>();

 

    public setup(): void {
    }

    update(): void {
    }

    public destroy(): void {
    }


    /**
     * 通过URL获取资源
     * @param url
     */
    public getRes(url: string) {
        return Laya.loader.getRes(url);
    }

    /**
     * 加载单个资源
     * @param resItem 资源信息
     * @param progressFuc 加载进度回调
     * @param completeFuc 加载完成回调
     */
    public loadRes(resItem:ResItem,progressFuc:EventFunc,completeFuc:EventFunc) {


        Laya.loader.load(resItem.Url, Handler.create(this, (success: boolean) => {

            if (success) {
                //完成回调
                if(completeFuc!=null) completeFuc.invoke();
                //标记资源
                if (!this.m_dictResItem.has(resItem.Url)) {
                    this.m_dictResItem.set(resItem.Url, resItem);
                }
            } else {
                Log.error("Load Resource Error：");
                Log.debug(resItem.Url);
            }

        }), Handler.create(this, (progress: number) => {
            //进度回调
            if(progressFuc!=null) progressFuc.invoke(progress);

        }, null, false));
    }

    /**
     * 加载资源组
     * @param loads 资源信息 
     * @param progressFuc 加载进度回调
     * @param completeFuc 加载完成回调
     */
    public loadGroup(loads: ResGroup,progressFuc:EventFunc,completeFuc:EventFunc) {
        let urls: Array<any> = new Array<any>();
        loads.needLoad.forEach(element => {
            urls.push({url: element.Url, type: element.Type})
        });

        Laya.loader.load(urls, Handler.create(this, (success: boolean) => {

            if (success) {
                //完成回调
                if(completeFuc!=null) completeFuc.invoke();
                //标记资源
                for (let index = 0; index < loads.needLoad.length; index++) {
                    let info = loads.needLoad[index];
                    if (!this.m_dictResItem.has(info.Url)) {
                        this.m_dictResItem.set(info.Url, info);
                    }
                }
            } else {
                Log.error("Load Resource Error：");
                Log.debug(urls);
            }

        }), Handler.create(this, (progress: number) => {
            //进度回调
            if(progressFuc!=null) progressFuc.invoke(progress);
            
        }, null, false));

    }

    /**
     * 加载预设物
     * @param filePath
     * @param complete
     */
    public loadPrefab(filePath:String,complete:EventFunc)
    {
        Laya.loader.load(filePath,Laya.Handler.create(this,function (pre: Laya.Prefab) {
            var playPre:Laya.Prefab = new Laya.Prefab();
            playPre.json = pre;
            if (complete) complete.invoke(playPre);
        }));
    }


    /**
     * 释放资源组
     * @param loads 资源组 
     */
    public releaseGroup(loads:ResGroup)
    {
        let urls = new Array<string>();
        loads.needLoad.forEach(element => {
            urls.push(element.Url)
        });
        
        for(let i=0;i<urls.length;i++){
            Laya.loader.clearRes(urls[i]);
            this.m_dictResItem.forEach((v: ResItem, key: string) => {
               if(key==urls[i]){
                    this.m_dictResItem.delete(key);
               }
            });
        }
    }

    /**
     * 释放指定资源
     * @param url 
     */
    public releaseUrl(url:string)
    {
         let isActive:boolean = false;
         this.m_dictResItem.forEach((v: ResItem, key: string) => {
            if(key==url){
                isActive = true;
            }
         });

         if(isActive){
            Laya.loader.clearRes(url);
         }else{
            Log.error("加载资源组内不存在该资源");
         }
    }
}

