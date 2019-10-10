
/**
 * @author Sun
 * @time 2019-08-09 19:18
 * @project SFramework_LayaAir
 * @description 资源属性
 *
 */
export class ResItem {
    public url: string;
    public type: string;
    public isKeepMemory = false;

    public get fullUrl() {
        return this.url
    }
}


