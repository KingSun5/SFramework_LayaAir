/**
 * 栈：后入先出
 *
 * @author Tim Wars
 * @date 2019-01-18 16:20
 * @project firebolt
 * @copyright (C) DONOPO
 *
 */
export class Stack<T> {
    private m_List: Array<T> = [];

    /**添加数据*/
    public push(item: T): void {
        this.m_List.push(item);
    }

    /**获取栈顶元素，并删除*/
    public pop(): T {
        return this.m_List.pop();
    }

    /**获取栈顶元素，并不删除*/
    public peek(): T {
        if (this.m_List.length == 0) return null;
        return this.m_List[this.m_List.length - 1];
    }

    /**转换成标准数组*/
    public array(): Array<T> {
        return this.m_List.slice(0, this.m_List.length);
    }

    /**是否包含指定元素*/
    public contain(item: T): boolean {
        return (this.m_List.indexOf(item, 0) != -1);
    }

    /**清空*/
    public clear(): void {
        this.m_List.length = 0;
    }

    public get length(): number {
        return this.m_List.length;
    }

    /** 循环遇false退出 **/
    public foreachBreak(compareFn: (a: T) => boolean): void {
        for (let item of this.m_List) {
            if (!compareFn.call(null, item))
                break;
        }
    }

    public foreach(compareFn: (a: T) => boolean): void {
        for (let item of this.m_List) {
            compareFn.call(null, item);
        }
    }
}
