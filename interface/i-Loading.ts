
 /**
 * @author Sun
 * @time 2019-08-09 23:15
 * @project SFramework_LayaAir
 * @description 管理类声明周期接口
 */
export interface ILoaing {

    onCompleted(success: boolean): void;

    onProgress(progress: number): void;

    onStart(): void;
}

