import { UtilDict } from '../util/dict';

/**
 * @author Sun
 * @time 2019-05-21 19:22
 * @project SFramework_LayaAir
 * @description  字典
 *
 */
export class Dictionary<T> {

    private m_dict: Object = {};

    public add(key: any, value: T): boolean {
        if (this.hasKey(key)) return false;
        this.m_dict[key] = value;
        return true;
    }

    public remove(key: any): void {
        delete this.m_dict[key];
    }

    public hasKey(key: any): boolean {
        return (this.m_dict[key] != null);
    }

    public value(key: any): T {
        if (!this.hasKey(key)) return null;
        return this.m_dict[key];
    }

    public keys(): Array<any> {
        let list: Array<string | number> = [];
        for (let key in this.m_dict) {
            list.push(key);
        }
        return list;
    }

    public values(): Array<T> {
        let list: Array<T> = [];
        for (let key in this.m_dict) {
            list.push(this.m_dict[key]);
        }
        return list;
    }

    public clear(): void {
        for (let key in this.m_dict) {
            delete this.m_dict[key];
        }
    }

    public foreach(compareFn: (key: any, value: T)=>void): void {
        for (let key in this.m_dict) {
            compareFn.call(null, key, this.m_dict[key]);
        }
    }

    public foreachBreak(compareFn: (key:any, value: T) => boolean): void {
        for (let key in this.m_dict) {
            if (!compareFn.call(null, key, this.m_dict[key]))
                break;
        }
    }

    public get length(): number {
        return UtilDict.size(this.m_dict);
    }
}
