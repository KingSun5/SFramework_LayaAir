import {UtilNumber} from "./number";
import Handler = laya.utils.Handler;
import { DobuleList } from '../structure/dobuleList';

/**
 * @author Sun
 * @time 2019-05-24 15:18
 * @project SFramework_LayaAir
 * @description 适用于文本内容的动态变化
 *
 */
export class UtilText {

    /** Des:存放变化进度信息的脸表 */
    private static numDataList: DobuleList<ChangeNumData> = new DobuleList<ChangeNumData>()

    /**
     * 设置数字文本显示
     * @param txt 文本
     * @param cont 内容
     */
    public static setNumText(txt, cont) {
        txt.text = parseFloat(cont).toString();
    }

    /**
     * 设置字符串文本显示
     * @param txt
     * @param cont
     */
    public static setStrText(txt, cont) {
        txt.text = cont.toString();
    }


    /**
     * 设置文本变化 --(只适用于科学计数法)
     * @param targetNum 目标变化值
     * @param nowNum 目标当前值
     * @param time 时间
     * @param area
     * @param cb
     */
    public static setSciTextAni(targetNum, nowNum, text, time = 300, area?, cb?) {
        //获取进度信息
        let numData: ChangeNumData = UtilText.numDataList.header();
        if (numData == null) numData = new ChangeNumData();
        //进度变化幅度
        numData.changeNum = UtilNumber.bigNumberDivDounble(nowNum, targetNum);
        //变化
        Laya.Tween.to(numData, {
            changeNum: 1, update: new Handler(this, () => {
                let cont = UtilNumber.bigNumberFormat(UtilNumber.bigNumberMul(targetNum, numData.changeNum));
                text.text = cont;
            })
        }, time, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
            text.text = UtilNumber.bigNumberFormat(targetNum);
            UtilText.numDataList.add(numData);
            if (cb) {
                cb.call(area);
            }
        }))
    }

    /**
     * 设置文本变化 --(只适用于数字类的变化)
     * @param targetNum 目标变化值
     * @param nowNum 目标当前值
     * @param time 时间
     * @param area
     * @param cb
     */
    public static setNumTextAni(targetNum, nowNum, text, time = 300, area?, cb?) {
        //获取进度信息
        let numData: ChangeNumData = UtilText.numDataList.header();
        if (numData == null) numData = new ChangeNumData();
        //进度变化幅度
        numData.changeNum = nowNum / targetNum;
        //变化
        Laya.Tween.to(numData, {
            changeNum: 1, update: new Handler(this, () => {
                let cont = Math.floor(targetNum * numData.changeNum);
                text.text = cont.toLocaleString();
            })
        }, time, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
            text.text = targetNum.toLocaleString();
            UtilText.numDataList.add(numData);
            if (cb) {
                cb.call(area);
            }
        }))
    }

}


/** Des:用于变化的进度信息 */
export class ChangeNumData {

    //变化进度
    changeNum: number = 0;

}