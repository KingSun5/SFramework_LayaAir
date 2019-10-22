
/**
 * @author Sun
 * @time 2019-08-09 19:18
 * @project SFramework_LayaAir
 * @description 资源属性
 *
 */
export class ResItem {
    private url: string;
    private type: string;
    private isKeepMemory = false;

    constructor(url,type,iskeepMemory)
    {
        this.url = url;
        this.type = type;
        this.isKeepMemory = iskeepMemory;
    }

    public get Url() {
        return this.url
    }

    public get Type()
    {
        return this.type
    }

    public get IsKeepMemory()
    {
        return this.isKeepMemory
    }
}


