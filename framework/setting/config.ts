import Browser = laya.utils.Browser;
import { enumDimension, enumScaleType, enumJsonDefine, enumSoundName } from './enum';
import { Singleton } from '../core/singleton';
import { MainScene } from '../../client/scene/main-scene';
import { ResGroup } from '../manager/res/res-group';
import { LoadingView } from '../../client/view/layer-view/loading-view';
import { JsonTemplate } from '../manager/json/json-template';
import { SoundTemplate } from '../manager/sound/sound-template';
 /**
 * @author Sun
 * @time 2019-08-09 14:01
 * @project SFramework_LayaAir
 * @description 游戏配置信息
 */


/**
 * 界面配置
 */
export class ConfigUI extends Singleton {

    /**默认字体 */
    public defaultFontName: string = '黑体';
    /**默认字体大小 */
    public defaultFontSize: number = 16;
    /**默认加载场景 */
    public defaultMainScene: any = MainScene;
    /**默认加载的Loading页面 */
    public defaultLoadView: any = LoadingView;
   

    private static instance: ConfigUI = null;
    public static get $():ConfigUI {
        if (!this.instance) this.instance = new ConfigUI();
        return this.instance;
    }
   
}

/**
 * 资源配置
 */
export class ConfigRes extends Singleton{

    /**默认Loading页面的资源信息 */
    public defaultLoadRes: ResGroup = null;
    /**默认的基础页面资源信息 */
    public defaultMainRes:ResGroup = null;

    private static instance: ConfigRes = null;
    public static get $():ConfigRes {
        if (!this.instance) this.instance = new ConfigRes();
        return this.instance;
    }

    constructor(){
        super();

        //手动配置loading资源
        this.defaultLoadRes = new ResGroup();
        this.defaultLoadRes
        .add("res/loading/img_loading_bg.png",Laya.Loader.IMAGE)
        .add("res/loading/progress_loading.png",Laya.Loader.IMAGE)
        .add("res/loading/img_8r.png",Laya.Loader.IMAGE);
        //手动配置主页资源
        this.defaultMainRes = new ResGroup();
        this.defaultMainRes
        .add("res/atlas/res/main/effect.atlas", Laya.Loader.ATLAS)
        .add("res/atlas/res/com.atlas", Laya.Loader.ATLAS)
        .add("res/com/img_lottery_border.png", Laya.Loader.IMAGE)
        .add("res/com/img_lottery_content.png", Laya.Loader.IMAGE)
        .add("res/main/bg/bg.png", Laya.Loader.IMAGE)
        //加载Json配置文件
        ConfigData.$.jsonTemplateList.forEach(item=>{
            this.defaultMainRes
            .add(item.url, Laya.Loader.JSON);
        });
        //加载音效资源
        ConfigSound.$.soundResList.forEach(item=>{
            this.defaultMainRes
            .add(item.url, Laya.Loader.SOUND);
        });
    }
}

/**
 * 声音配置
 */
export class ConfigSound extends Singleton {

    /**背景音乐名字 */
    public bgSoundName = "";
    /**背景音开关 */
    public isCloseBGSound = false;
    /**效果音开关 */
    public isCloseEffectSound = false;
    /**所有音效开关 */
    public isCloseVoiceSound = false;
    /**总音量 */
    public volumeVoiceSound = 1;
    /**音效资源 */
    public soundResList:Array<SoundTemplate> = null;
  
    private static instance: ConfigSound = null;
    public static get $():ConfigSound {
        if (!this.instance) this.instance = new ConfigSound();
        return this.instance;
    }

    constructor()
    {
        super();
        this.soundResList = new Array<SoundTemplate>();
        // this.soundResList.push(new SoundTemplate("res/sound/bg.mp3",enumSoundName.bg));
    }
}

/**
 * 数据表配置
 */
export class ConfigData extends Singleton{

    /**json配置表信息 */
    public jsonTemplateList:Array<JsonTemplate>;

    constructor()
    {
        super();
        this.jsonTemplateList = new Array<JsonTemplate>();
        this.jsonTemplateList = [
            new JsonTemplate("res/data/InviteData.json", enumJsonDefine.invite),
            new JsonTemplate("res/data/LevelData.json", enumJsonDefine.level),
            new JsonTemplate("res/data/OfflineData.json", enumJsonDefine.offline),
            new JsonTemplate("res/data/TurntableData.json", enumJsonDefine.lottery),
        ];
    }

    private static instance: ConfigData = null;
    public static get $():ConfigData {
        if (!this.instance) this.instance = new ConfigData();
        return this.instance;
    }
}

/**
 * 游戏配置
 */
export class ConfigGame extends Singleton {
 
    /**默认模式信息 2D/3D */
    public dimension: enumDimension = enumDimension.Dim3;
    /**物理开关 */
    public physics:boolean = false;
  
    
    private static instance: ConfigGame = null;
    public static get $():ConfigGame {
        if (!this.instance) this.instance = new ConfigGame();
        return this.instance;
    }
}

/**
 * 版本配置
 */
export class ConfigVersion extends Singleton {
 
    /**版本控制开关 */
    public isOpenVersion:boolean = false;
    /**版本号 */
    public versionNum:number = 0;
    /**版本控制文件名 */
    public versionFloder:string = "Version"+this.versionNum;
    
    private static instance: ConfigVersion = null;
    public static get $():ConfigVersion {
        if (!this.instance) this.instance = new ConfigVersion();
        return this.instance;
    }
}


/**
 * 布局配置
 */
export class ConfigLayout extends Singleton {

    /**设计分辨率X */
    public designWidth: number = 750;
    /**设计分辨率Y */
    public designHeight: number = 1334;
    /**缩放模式 */
    public scaleMode: enumScaleType = enumScaleType.ScaleFixedAuto;

    private static instance: ConfigLayout = null;
    public static get $():ConfigLayout {
        if (!this.instance) this.instance = new ConfigLayout();
        return this.instance;
    }

}


/**
 * Debug配置
 */
export class ConfigDebug extends Singleton {

    /**调试信息开关 */
    public isDebug: boolean = true;
    /**物理辅助线开关 */
    public isPhysicsDebug: boolean = false; 
    /**调试面板 */
    public isEnableDebugPanel:boolean = false;
    /**性能面板开关 */
    public isStat: boolean = true;
    /**性能统计面板X */
    public panelX:number = 0;
    /**性能统计面板Y */
    public panelY:number = 100;

    private static instance: ConfigDebug = null;
    public static get $():ConfigDebug {
        if (!this.instance) this.instance = new ConfigDebug();
        return this.instance;
    }
}

/**
 * 3D配置
 */
export class Config3D extends Singleton{

    /**场景资源路径 */
    public scenePath:string = "res/u3d/LayaScene_Main/Conventional/Main.ls";

    private static instance: Config3D = null;
    public static get $():Config3D {
        if (!this.instance) this.instance = new Config3D();
        return this.instance;
    }
}



// /**
//  * Network配置
//  */
// export class ConfigNet extends Singleton {

//     public httpUrl: string = "http://127.0.0.1:34568";
//     public wsUrl: string = "wss://wx.donopo.com/ws/ws";
//     public resUrl: string = "ws://127.0.0.1:16669";
//     public timeOut: number = 10;
//     public heartBeat: number = 10;
//     public serverHeartBeat: number = 3;

//     private static instance: ConfigNet = null;

//     public static get $():ConfigNet {
//         if (!this.instance) this.instance = new ConfigNet();
//         return this.instance;
//     }

// }

// /**
//  * 微信配置
//  */
// export class ConfWechat extends Singleton {

//     public appid: string = "";
//     public secret: string = "";
//     public adUnitId: string = "";
//     public code2sessionUrl = "https://api.weixin.qq.com/sns/jscode2session?appid={0}&secret={1}&js_code={2}&grant_type=authorization_code";


//     private static instance: ConfWechat = null;

//     public static get $():ConfWechat {
//         if (!this.instance) this.instance = new ConfWechat();
//         return this.instance;
//     }
// }
