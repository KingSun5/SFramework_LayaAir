/**
 * 重要的枚举定义,框架级别
 *
 * @author Tim Wars
 * @date 2019-01-18 16:20
 * @project firebolt
 * @copyright (C) DONOPO
 *
 */

import Stage = Laya.Stage;

/**
 * 舞台的缩放格式
 */
export enum enumScaleType {
    // @ts-ignore
    ScaleNoScale = Stage.SCALE_FULL,
    // @ts-ignore
    ScaleExactFit = Stage.SCALE_EXACTFIT,
    // @ts-ignore
    ScaleShowAll = Stage.SCALE_SHOWALL,
    // @ts-ignore
    ScaleNoBorder = Stage.SCALE_NOBORDER,
    // @ts-ignore
    ScaleFull = Stage.SCALE_FULL,
    // @ts-ignore
    ScaleFixedWidth = Stage.SCALE_FIXED_WIDTH,
    // @ts-ignore
    ScaleFixedHeight = Stage.SCALE_FIXED_HEIGHT,
    // @ts-ignore
    ScaleFixedAuto = Stage.SCALE_FIXED_AUTO,
    // @ts-ignore
    ScaleNoScale = Stage.SCALE_NOSCALE
}

/**
 * 屏幕的自适应方式
 */
export enum enumScreenModel {
    ScreenNone = 'none',
    ScreenHorizontal = 'horizontal',
    ScreenVertical = 'vertical'
}

/**
 * 数组排序方式
 * */
export enum enumArraySortOrder {
    Ascending,	//升序
    Descending,	//降序
}

/**
 * 游戏的运行容器
 */
export enum enumGamePlatform {
    Web,
    Phone,
    Weixin
}

/**
 * 对齐方式
 */
export enum enumAligeType {
    NONE = 0,
    RIGHT,
    RIGHT_BOTTOM,
    BOTTOM,
    LEFT_BOTTOM,
    LEFT,
    LEFT_TOP,
    TOP,
    RIGHT_TOP,
    MID,
}

/**
 * 对齐标注
 */
export enum enumAlige {
    AligeLeft = 'left',
    AligeCenter = 'center',
    AligeRight = 'right',
    AligeTop = 'top',
    AligeMiddle = 'middle',
    AligeBottom = 'bottom'
}

/**
 * 清理资源的次序策略
 */
export enum enumClearStrategy {
    FIFO = 0,   //先进先出
    FILO,       //先进后出
    LRU,		//最近最少使用
    UN_USED,	//未使用
    ALL,		//清理所有
}

/**
 * 游戏是否采用的2D或者3D
 */
export enum enumDimension {
    Dim2 = '2d',
    Dim3 = '3d'
}

/**
 * 游戏的状态
 */
export enum enumGameStatus {
    Start = 'GAME-STATUS-START',
    Stop = 'GAME-STATUS-STOP',
    Restart = 'GAME-STATUS-RESTART',
}

/**
 lbl  --->Label(文本)
 txt  --->Text(文本)
 rtxt  --->RichText(富文本)
 ipt  --->Input(输入框)
 img  --->Image(图片)
 spt  --->Sprite(精灵)
 grh  --->Graph(图形)
 list --->List(列表)
 load --->Load(装载器)
 gup  --->Group(组)
 com  --->Component(组件)
 btn  --->Button(按钮)
 cob  --->ComboBow(下拉框)
 pbar --->ProgressBar(进度条)
 sld  --->Slider(滑动条)
 win  --->Window（窗口）
 ani  --->Movie(动画)
 eft  --->Transition(动效)
 ctl  --->Controller(控制器)
 */

/**
 * 控件前缀
 */
export enum enumElementPrefix {
    Lable = 'lbl_',
    Input = 'ipt_',
    Text = 'txt_',
    RichText = 'rtxt_',
    Image = 'img_',
    Sprite = 'spt_',
    Graph = 'grh_',
    List = 'list_',
    Load = 'load_',
    Group = 'gup_',
    Component = 'com_',
    Button = 'btn_',
    ComboBow = 'cob_',
    ProgressBar = 'pbar_',
    Slider = 'sld_',
    Window = 'win_',
    Movie = 'ani_',
    Transition = 'eft_',
    Controller = 'ctl_'
}

/**
 * 数据表配置
 */
export enum enumJsonDefine {
    invite = "invite",
    level = "level",
    lottery = "lottery",
    offline = "offline",
}

/**
 * 音效标记
 */
export enum enumSoundName{
    bg = "bgSound",
    botton = "btnSound",
}


