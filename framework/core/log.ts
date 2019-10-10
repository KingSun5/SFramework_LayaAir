import { ConfigDebug } from '../setting/config';

 /**
 * @author Sun
 * @time 2019-08-09 15:59
 * @project SFramework_LayaAir
 * @description 输出信息管理
 */
export class Log {

    public static debug(...args: any[]) {
        if (ConfigDebug.$.isDebug) console.debug("[debug]", args.toString());
    }

    public static info(...args: any[]) {
        if (ConfigDebug.$.isDebug) console.info("[info]", args.toString());
    }

    public static warn(...args: any[]) {
        if (ConfigDebug.$.isDebug) console.warn("[warn]", args.toString());
    }

    public static error(...args: any[]) {
        if (ConfigDebug.$.isDebug) console.error("[error]", args.toString());
    }

    public static exception(...args: any[]) {
        if (ConfigDebug.$.isDebug) console.exception("[exce]", args.toString());
    }

    public static log(...args: any[]) {
        if (ConfigDebug.$.isDebug) console.log("[log]", args.toString());
    }


    /**打印设备信息*/
    public static printDeviceInfo() {
        if (ConfigDebug.$.isDebug && navigator) {
            let agentStr = navigator.userAgent;

            let start = agentStr.indexOf("(");
            let end = agentStr.indexOf(")");

            if (start < 0 || end < 0 || end < start) {
                return;
            }

            let infoStr = agentStr.substring(start + 1, end);

            let device: string, system: string, version: string;
            let infos = infoStr.split(";");
            if (infos.length == 3) {
                //如果是三个的话， 可能是android的， 那么第三个是设备号
                device = infos[2];
                //第二个是系统号和版本
                let system_info = infos[1].split(" ");
                if (system_info.length >= 2) {
                    system = system_info[1];
                    version = system_info[2];
                }
            } else if (infos.length == 2) {
                system = infos[0];
                device = infos[0];
                version = infos[1];
            } else {
                system = navigator.platform;
                device = navigator.platform;
                version = infoStr;
            }
            Log.info(system, device, version);
        }
    }

}

