import { UtilTime } from '../../util/time';

/**
 * @author Sun
 * @time 2019-08-09 19:36
 * @project SFramework_LayaAir
 * @description  加载过得资源信息
 *
 */
export class ResLoaded {

    /**资源路径 */
    public url: string;
    /**创建时间*/
    public ctime: number;
    /**最近使用时间*/
    public utime: number;

    constructor(_url: string) {
        this.url = _url;
        this.ctime = UtilTime.timeSinceStartup;
        this.utime = UtilTime.timeSinceStartup;
    }
}

