

 /**
 * @author Sun
 * @time 2019-08-12 10:59
 * @project SFramework_LayaAir
 * @description 配置表模板项
 *
 */
export class JsonTemplate {

    public url: string;	//资源url
    public name: string; //名称：用于查找该数据结构

    constructor(url: string, name: string) {
        this.url = url;
        this.name = name;
    }
}
