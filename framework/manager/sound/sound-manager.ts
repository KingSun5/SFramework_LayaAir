import {UtilString} from "../../util/string";
import SoundChannel = Laya.SoundChannel;
import Handler = Laya.Handler;
import {ResManager} from "../res/res-manager";
import { EventNode } from '../event/event-node';
import { IManager } from '../../interface/i-manager';
import { Log } from '../../core/log';
import { Dictionary } from '../../structure/dictionary';
import { ConfigSound } from '../../setting/config';


/**
 * @author Sun
 * @time 2019-08-12 15:08
 * @project SFramework_LayaAir
 * @description 音效管理
 *
 */
export class SoundManager extends EventNode implements IManager {


    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /******************************************属性信息*******************************************/

    /** Des:背景音乐 */
    private m_CurBGSound: SoundChannel = null;
    /**音效名字对应Url */
    private dictSoundUrl:Dictionary<string> = null;


    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /******************************************生命周期*******************************************/

    private static instance: SoundManager = null;

    public static get $(): SoundManager {
        if (!this.instance) this.instance = new SoundManager();
        return this.instance;
    }
 
    setup(): void {
        this.m_CurBGSound = new SoundChannel();
        this.dictSoundUrl = new Dictionary<string>();
        ConfigSound.$.soundResList.forEach(item=>{
            this.dictSoundUrl.add(item.name,item.url);
        });
        if(!UtilString.isEmpty(ConfigSound.$.bgSoundName))
        {
            this.playBGSound(ConfigSound.$.bgSoundName,0);
            this.setAllVolume(ConfigSound.$.volumeVoiceSound);
        }
    }
    update(): void {
    }
    destroy(): void {
    }


    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /****************************************设置整体音量*****************************************/

    /**
     * 设置整体音量
     * @param number
     */
    public setAllVolume(number)
    {
        ConfigSound.$.volumeVoiceSound = number;
        this.m_CurBGSound.volume = number;
    }

    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /*****************************************控制背景音乐*****************************************/

    /**
     * 播放背景声音
     * @param    file_name    资源名字
     * @param    count        播放次数(0为循环)
     */
    public playBGSound(file_name: string, count: number): void {
        if (UtilString.isEmpty(file_name)) {
            Log.error("Sound file error!");
            return;
        }
        this.m_CurBGSound = Laya.SoundManager.playMusic(this.dictSoundUrl.value(file_name),count);
    }

    /**
     * 停止背景音播放
     */
    public stopBGSound(): void {
        if (this.m_CurBGSound) {
            this.m_CurBGSound.stop()
        }
    }

    /**
     * 暂停背景音乐
     */
    public pauseBGSound(): void {
        if (this.m_CurBGSound) {
            this.m_CurBGSound.pause();
        }
    }

    /**
     * 恢复背景音乐播放
     */
    public resumeBGSound(): void {
        if (this.m_CurBGSound) {
            this.m_CurBGSound.resume();
        }
    }

    /**
     * 设置背景音量
     * @param volume
     */
    public setBGSoundVolume(volume: number): void {
        if (this.m_CurBGSound) {
            this.m_CurBGSound.volume = volume;
        }
    }

    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /*****************************************控制音效播放*****************************************/

    /**
     * 播放效果声音
     * @param    file_name    资源
     * @param    count        播放次数
     */
    public playSoundEffect(file_name: string, count: number){
        if (UtilString.isEmpty(file_name)) {
            Log.error("声音文件错误");
            return null;
        }
        let sound: SoundChannel = Laya.Pool.getItemByClass("Sound",SoundChannel);

        sound = Laya.SoundManager.playSound(this.dictSoundUrl.value(file_name),count,Handler.create(this,()=>{
            Laya.Pool.recover("Sound",sound);
        }));
        sound.volume = ConfigSound.$.volumeVoiceSound;
        return sound;
    }

    /**
     * 停止播放
     * @param sound
     */
    public stopSoundEffect(sound: SoundChannel): void {
        if (sound) {
            sound.stop();
        }
    }

    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////

}