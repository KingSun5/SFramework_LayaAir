import Node = Laya.Node;
import Sprite = Laya.Sprite;
import Rectangle = Laya.Rectangle;
import Label = Laya.Label;

export class UtilDisplay {

    /**
     * 移除全部子对象
     * @param container 
     */
    public static removeAllChild(container: Laya.Sprite): void {
        if (!container) return;
        if (container.numChildren <= 0) return;

        while (container.numChildren > 0) {
            container.removeChildAt(0)
        }
    }

    /**
     * 
     * @param node 销毁UI节点
     */
    public static destroyUINode(node: Node): void {
        if (node) {
            node.removeSelf();
            node.destroy();
            node = null;
        }
    }

    /**
     * 通过名字获得子节点
     * @param parent 
     * @param name 
     */
    public static getChildByName(parent: Node, name: string): Node {
        if (!parent) return null;
        if (parent.name === name) return parent;
        let child: Node = null;
        let num: number = parent.numChildren;
        for (let i = 0; i < num; ++i) {
            child = UtilDisplay.getChildByName(parent.getChildAt(i), name);
            if (child) return child;
        }
        return null;
    }

    // /**
    //  * 设置对齐方式
    //  * @param alige 对齐方式
    //  */
    // public static setAlige(node: Sprite, alige: enumAligeType, w: number = 0, h: number = 0) {
    //     if (!node) return;
    //     let rect: Rectangle;
    //     if (w <= 0 || h <= 0) rect = node.getBounds();
    //     let width: number = w > 0 ? w : rect.width;
    //     let heigth: number = h > 0 ? h : rect.height;
    //     switch (alige) {
    //         case enumAligeType.LEFT_TOP:
    //             node.pivot(0, 0);
    //             break;
    //         case enumAligeType.LEFT:
    //             node.pivot(0, heigth * 0.5);
    //             break;
    //         case enumAligeType.LEFT_BOTTOM:
    //             node.pivot(0, heigth);
    //             break;
    //         case enumAligeType.TOP:
    //             node.pivot(width * 0.5, 0);
    //             break;
    //         case enumAligeType.MID:
    //             node.pivot(width * 0.5, heigth * 0.5);
    //             break;
    //         case enumAligeType.BOTTOM:
    //             node.pivot(width * 0.5, heigth);
    //             break;
    //         case enumAligeType.RIGHT_TOP:
    //             node.pivot(width, 0);
    //             break;
    //         case enumAligeType.RIGHT:
    //             node.pivot(width, heigth * 0.5);
    //             break;
    //         case enumAligeType.RIGHT_BOTTOM:
    //             node.pivot(width, heigth);
    //             break;
    //     }
    // }

    /**
     * 创建透明遮罩
     */
    public static createMaskLayer(): Sprite {
        let layer = new Sprite();
        layer.mouseEnabled = true;

        let width = layer.width = Laya.stage.width + 200;
        var height = layer.height = Laya.stage.height + 400;
        layer.graphics.clear(true);
        layer.graphics.drawRect(0, 0, width, height, UIConfig.popupBgColor);
        layer.alpha = UIConfig.popupBgAlpha;

        return layer;
    }
}