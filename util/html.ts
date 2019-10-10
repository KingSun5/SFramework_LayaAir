import HTMLDivElement = Laya.HTMLDivElement;
import Box = Laya.Box;
import {UtilString} from "./string";
import { ConfigUI } from '../setting/config';

/**
 * @author Sun
 * @time 2019-01-08 18:08
 * @project SFramework_LayaAir
 * @description HTML工具类
 *
 */
export class UtilHtml {

    public static CreateHTML(fontSize: number, fontColor: string, width: number, height: number, x: number = 0, y: number = 0): HTMLDivElement {
        let html = new HTMLDivElement();
        html.y = y;
        html.x = x;
        html.size(width, height);
        html.style.family = ConfigUI.$.defaultFontName;
        html.style.fontSize = fontSize;
        html.style.color = fontColor;
        html.style.bold = true;

        return html;
    }

    public static centerHtmlX(html: HTMLDivElement) {
        let parent = <Box>html.parent;
        html.x = (parent.width - html.contextWidth) / 2;
    }

    public static centerHtmlY(html: HTMLDivElement) {
        let parent = <Box>html.parent;
        html.y = (parent.height - html.contextHeight) / 2;
    }

    public static centerHtml(html: HTMLDivElement) {
        let parent = <Box>html.parent;
        html.x = (parent.width - html.width) / 2;
        html.y = (parent.height - html.height) / 2;
    }

    /**获取文件扩展名*/
    public static getFileExte(url: string): string {
        if (UtilString.isEmpty(url)) return UtilString.empty;

        let idx: number = url.lastIndexOf(".");
        if (idx >= 0) {
            return url.substr(idx + 1);
        }
        return UtilString.empty;
    }

    /**获取不含扩展名的路径*/
    public static getPathWithNoExtend(url: string): string {
        if (UtilString.isEmpty(url)) return UtilString.empty;

        let idx: number = url.lastIndexOf(".");
        if (idx >= 0) {
            return url.substr(0, idx);
        }
        return UtilString.empty;
    }
}