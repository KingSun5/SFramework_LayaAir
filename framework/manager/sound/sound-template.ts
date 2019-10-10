

 /**
 * @author Sun
 * @time 2019-08-12 15:11
 * @project SFramework_LayaAir
 * @description 音效模板项
 *
 */
export class SoundTemplate {

    public url: string;	//资源url
    public name: string; //名称：用于查找该音效

    constructor(url: string, name: string, key: string = null) {
        this.url = url;
        this.name = name;
    }
}
