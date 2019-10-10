import {UtilMath3D} from "./math3d";

/**
 * @author Sun
 * @time 2019-01-18 16:20
 * @project SFramework_LayaAir
 * @description 算法工具类
 *
 */
export class UtilMath {

    /**字节转换M*/
    public static BYTE_TO_M: number = 1 / (1024 * 1024);
    /**字节转换K*/
    public static BYTE_TO_K: number = 1 / (1024);

    public static Deg2Rad: number = 0.01745329;

    public static Rad2Deg: number = 57.29578;

    public static Sign(f: number): number {
        return ((f < 0) ? -1 : 1);
    }


    /**
     * 限定数字在范围区间并返回
     * @param num
     * @param min
     * @param max
     * @constructor
     */
    public static clamp(num: number, min: number, max: number): number {
        if (num < min) {
            num = min;
        } else if (num > max) {
            num = max;
        }
        return num;
    }

    public static clamp01(value: number): number {
        if (value < 0) return 0;
        if (value > 1) return 1;
        return value;
    }

    public static lerp(from: number, to: number, t: number): number {
        return (from + ((to - from) * UtilMath.clamp01(t)));
    }

    public static lerpAngle(a: number, b: number, t: number): number {
        let num: number = UtilMath.repeat(b - a, 360);
        if (num > 180) num -= 360;
        return (a + (num * UtilMath.clamp01(t)));
    }

    public static repeat(t: number, length: number): number {
        return (t - (Math.floor(t / length) * length));
    }

    /**
     * 产生随机数
     * 结果：x>=param1 && x<param2
     */
    public static randRange(param1: number, param2: number): number {
        let loc: number = Math.random() * (param2 - param1) + param1;
        return loc;
    }

    /**
     * 产生随机数
     * 结果：x>=param1 && x<=param2
     */
    public static randRangeInt(param1: number, param2: number): number {
        let loc: number = Math.random() * (param2 - param1 + 1) + param1;
        return Math.floor(loc);
    }

    /**
     * 从数组中产生随机数[-1,1,2]
     * 结果：-1/1/2中的一个
     */
    public static randRangeArray<T>(arr: Array<T>): T {
        if (arr.length == 0)
            return null;
        let loc: T = arr[UtilMath.randRangeInt(0, arr.length - 1)];
        return loc;
    }

    /**
     * 转换为360度角度
     */
    public static clampDegrees(degrees: number): number {
        while (degrees < 0) degrees = degrees + 360;
        while (degrees >= 360) degrees = degrees - 360;
        return degrees;
    }

    /**
     * 转换为360度弧度
     */
    public static clampRadians(radians: number): number {
        while (radians < 0) radians = radians + 2 * Math.PI;
        while (radians >= 2 * Math.PI) radians = radians - 2 * Math.PI;
        return radians;
    }

    /**
     * 两点间的距离
     */
    public static getDistance(x1: number, y1: number, x2: number, y2: number): number {
        return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
    }

    public static getSquareDistance(x1: number, y1: number, x2: number, y2: number): number {
        return Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2);
    }

    /**
     * 两点间的弧度：x正方形为0，Y轴向下,顺时针为正
     */
    public static getLineRadians(x1: number, y1: number, x2: number, y2: number): number {
        return Math.atan2(y2 - y1, x2 - x1);
    }

    public static getLineDegree(x1: number, y1: number, x2: number, y2: number): number {
        let degree: number = UtilMath.toDegree(UtilMath.getLineRadians(x1, y1, x2, y2));
        return UtilMath.clampDegrees(degree);
    }

    public static getPointRadians(x: number, y: number): number {
        return Math.atan2(y, x);
    }

    public static getPointDegree(x: number, y: number): number {
        let degree: number = UtilMath.toDegree(UtilMath.getPointRadians(x, y));
        return UtilMath.clampDegrees(degree);
    }

    /**
     * 弧度转化为度
     */
    public static toDegree(radian: number): number {
        return radian * (180.0 / Math.PI);
    }

    /**
     * 度转化为弧度
     */
    public static toRadian(degree: number): number {
        return degree * (Math.PI / 180.0);
    }

    public static moveTowards(current: number, target: number, maxDelta: number): number {
        if (Math.abs(target - current) <= maxDelta) {
            return target;
        }
        return (current + (UtilMath.Sign(target - current) * maxDelta));
    }

    /**
     * 获取一定范围内的随机整数
     * @param min 最小值
     * @param max 最大值
     * @constructor
     */
    public static random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * 二维向量归一化
     * @param x
     * @param y
     */
    public static normalize(x:number,y:number):number{
        return Math.sqrt(x*x+y*y);
    }

    /**
     * 返回两向量夹角
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    public static vectorAngle(x1:number,y1:number,x2:number,y2:number):number
    {
        if (x1 == x2 && y1 == y2) {
            return;
        }
        var cosAngle = (x1*x2+y1*y2)/(UtilMath.normalize(x1,y1)*UtilMath.normalize(x2,y2));
        var aCosAngle = Math.acos(cosAngle);
        var angle = UtilMath3D.Rad2Deg(aCosAngle);
        if (x1 / y1 < x2 / y2) angle = - angle;
        return angle;
    }

}

