/**
 * 队列：先入先出
 *
 * @author Tim Wars
 * @date
 * @project
 * @copyright (C) DONOPO
 *
 */
export class Queue<T> {
    private m_List: Array<T> = [];

    /**添加到队列尾*/
    public push(item: T): void {
        this.m_List.push(item);
    }

    /**获取队列头，并删除*/
    public pop(): T {
        return this.m_List.shift();
    }

    /**获取队列头，并不删除*/
    public peek(): T {
        if (this.m_List.length == 0) return null;
        return this.m_List[0];
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
                break
        }
    }

    public foreach(compareFn: (a: T) => boolean): void {
        for (let item of this.m_List) {
            compareFn.call(null, item);
        }
    }
}
