/**
 * @author Sun
 * @time 2019-08-12 15:46
 * @project SFramework_LayaAir
 * @description LocalStorage信息
 *
 */
export class StoreLocal {

    private static m_GlobalKey: string = "";

    /**
     * 设置全局id，用于区分同一个设备的不同玩家
     * @param    key    唯一键，可以使用玩家id
     */
    public static setGlobalKey(key: string): void {
        this.m_GlobalKey = key;
    }

    public static get(key: string): string {
        return Laya.LocalStorage.getItem(this.getFullKey(key));
    }

    public static set(key: string, value: string): void {
        Laya.LocalStorage.setItem(this.getFullKey(key), value);
    }

    public static remove(key: string) {
        Laya.LocalStorage.removeItem(this.getFullKey(key));
    }

    public static clear(): void {
        Laya.LocalStorage.clear();
    }

    private static getFullKey(key: string): string {
        return this.m_GlobalKey + "_" + key;
    }
}