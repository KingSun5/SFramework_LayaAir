
 /**
 * @author Sun
 * @time 2019-08-09 19:18
 * @project SFramework_LayaAir
 * @description 加载进度类接口
 *
 */
export interface ILoadView {
    /**
     * 打开
     */
    onOpen(total: number): void;

    /**
     * 加载进度
     * @param    cur        当前加载数量
     * @param    total    总共需要加载的数量
     */
    setProgress(cur: number, total: number): void;

    /**
     * 关闭
     */
    onClose(): void;
}
