/**
 * @author Sun
 * @time 2019-08-11 18:08
 * @project SFramework_LayaAir
 * @description 日期工具类
 *
 */
export class UtilDate {
    /**服务器时间*/
    public static serverTimeDiff: number = 0;

    /**从1970年以来经过的毫秒数*/
    public static get timeSince1970(): number {
        let base_date = new Date(1970, 1, 1, 0, 0, 0, 0);
        return (Date.now() - base_date.getTime());
    }

    /**从2009年以来经过的毫秒数*/
    public static get timeSince2009(): number {
        let base_date = new Date(2009, 1, 1, 0, 0, 0, 0);
        return (Date.now() - base_date.getTime());
    }

    /**获取UNIX时间 */
    public static GetNow(): number {
        let now: number = Math.floor(Date.now() / 1000);
        return now + this.serverTimeDiff;
    }

    public static sameMonth(nTime: number, nSecond: number): boolean {
        let now = UtilDate.GetNow();
        let curTime = now - nSecond;
        let date = new Date(curTime * 1000);
        let defineDate: Date = new Date(date.getFullYear(), date.getMonth(), 1);
        let nextTime = Math.floor(defineDate.getTime() / 1000) + nSecond;
        return nTime >= nextTime;
    }

    public static sameDayByNow(nTime: number, nSecond: number): boolean {
        let date = new Date()
        let offset = date.getTimezoneOffset() * 60;
        let now = UtilDate.GetNow();
        let day1 = (nTime - offset - nSecond) / 86400;
        let day2 = (now - offset - nSecond) / 86400;
        if (Math.floor(day1) === Math.floor(day2)) {
            return true;
        }

        return false;
    }


    public static getFormateDate(): string {
        let date = new Date()
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '  ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }

    /**计算从nTime1到nTime2过去了多少天*/
    public static passedDays(nTime1: number, nTime2: number, nSecondOffset: number = 0): number {
        let date = new Date()
        let offset = date.getTimezoneOffset() * 60;
        let day1 = (nTime1 - offset - nSecondOffset) / 86400;
        let day2 = (nTime2 - offset - nSecondOffset) / 86400;
        return Math.floor(day2) - Math.floor(day1);
    }

    public static num2HMS(ts: number): string {
        // let dd = Math.floor(ts / 1000 / 60 / 60 / 24);
        let hh = Math.floor(ts / 1000 / 60 / 60 % 24);
        let mm = Math.floor(ts / 1000 / 60 % 60);
        let ss = Math.floor(ts / 1000 % 60);
        // let _dd = dd<10?("0" + dd):dd;   //天
        let _hh = hh < 10 ? ("0" + hh) : hh;   //时
        let _mm = mm < 10 ? ("0" + mm) : mm;   //分
        let _ss = ss < 10 ? ("0" + ss) : ss;   //秒

        return _hh + ":" + _mm + ":" + _ss;
    }

    /** 判断时间是不是今天 */
    public static isToday(str) {
        return new Date(str).toDateString() == new Date().toDateString();
    }
}