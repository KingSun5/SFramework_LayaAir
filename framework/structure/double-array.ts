import { UtilArray } from '../util/array';

/**
 * 二维数组
 *
 * @author Tim Wars
 * @date 2019-01-18 16:20
 * @project firebolt
 * @copyright (C) DONOPO
 *
 */
export class DoubleArray {

    private m_Array: any[] = [];

    constructor(rows: number, cols: number, value: any) {
        if (rows > 0 && cols > 0) {
            for (let row = 0; row < rows; ++row) {
                for (let col = 0; col < cols; ++col) {
                    this.set(row, col, value);
                }
            }
        }
    }

    public set(row: number, col: number, value: any): void {
        if (!this.m_Array[row])
            this.m_Array[row] = [];
        this.m_Array[row][col] = value;
    }

    public get(row: number, col: number): any {
        if (!this.m_Array[row])
            return null;
        return this.m_Array[row][col];
    }

    public clear(): void {
        UtilArray.clear(this.m_Array);
    }
}
