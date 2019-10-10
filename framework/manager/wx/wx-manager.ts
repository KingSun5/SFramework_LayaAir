
// import Browser = Laya.Browser;
// import { EventNode } from '../event/event-node';
// import { IManager } from '../../interface/i-manager';

// export class WXManager extends EventNode implements IManager {

//     update(): void {
//         throw new Error("Method not implemented.");
//     }
//     private static instance: WXManager = null;

//     public videoAd: wx.RewardedVideoAd = null;
//     /*微信启动带入参数*/
//     public showData = null;
//     public adSuccessFun = null;
//     public adFailedFun = null;
//     //从连接中判断的信息
//     public linkData = null;

//     public static get $(): WXManager {
//         if (!this.instance) this.instance = new WXManager();
//         return this.instance;
//     }

//     isWechat() {
//         return Browser.onWeiXin || Browser.onMiniGame;
//     }

//     /**
//      * 微信登录，成功后拿session
//      * https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/login.html
//      */
//     login(success: any, failed: any) {
//         assert(Browser.onWeiXin, "do not support platform");

//         wx.login({
//             success(result) {
//                 if (result.code) {
//                     Log.log("微信 登录成功" + result.code);
//                     success(result.code);
//                 } else {
//                     console.log("微信 登录失败");
//                     failed(result);
//                 }
//             },

//             fail() {
//             },

//             complete() {
//             }
//         });

//     }


//     /**
//      * 判断是否有权限
//      * https://developers.weixin.qq.com/minigame/dev/api/wx.getSetting.html
//      */
//     getSetting(scope) {
//         wx.getSetting({
//             success: function (res) {
//                 var authSetting = res.authSetting
//                 if (authSetting[scope] === true) {

//                 } else if (authSetting[scope] === false) {

//                 } else {

//                 }
//             },
//             fail() {
//             },

//             complete() {
//             }
//         });
//     }


//     /**
//      * 获取用户信息，需要提前判断是否有权限
//      * https://developers.weixin.qq.com/minigame/dev/api/wx.getUserInfo.html
//      */
//     getUserInfo() {
//         wx.getUserInfo({
//             withCredentials: true,
//             lang: "zh_CN",
//             success: function (res) {
//                 console.log("getUsetInfo");
//                 console.log(res);
//             },
//             fail() {
//             },

//             complete() {
//             }
//         });
//     }

//     /**
//      * 检查用户权限，如果没有授权创建授权按钮
//      *
//      */
//     checkUserInfo(xx, yy, bw, bh, callback): void {
//         if (!this.isWechat()) return;
//         this.createLoginBtn(xx, yy, bw, bh, callback);
//     }


//     /**
//      * 创建授权登录按钮
//      * https://developers.weixin.qq.com/minigame/dev/api/wx.createUserInfoButton.html
//      */
//     createLoginBtn(xx, yy, bw, bh, callback): void {
//         // if (!this.isWechat()) return;

//         let sysInfo = wx.getSystemInfoSync();
//         //获取微信界面大小
//         let width = sysInfo.screenWidth;
//         let height = sysInfo.screenHeight;

//         let sdkVersion = sysInfo.SDKVersion;
//         if (sdkVersion >= "2.0.1") {
//             //微信SDK大于2.0.1需要使用createUserInfoButton获取用户信息
//         }

//         let w = bw * (width / Laya.stage.width);
//         let h = bh * (height / Laya.stage.height);
//         let x = xx * (width / Laya.stage.width) - w / 2;
//         let y = yy * (height / Laya.stage.height) - h / 2;


//         const wxloginBtn = wx.createUserInfoButton({
//             withCredentials: true,
//             type: 'text',
//             text: '',
//             style: {
//                 left: x,
//                 top: y,
//                 width: w,
//                 height: h,
//                 backgroundColor: '',
//                 textAlign: 'center',
//                 fontSize: 18,
//                 borderRadius: 4,
//                 borderColor: "#000000",
//                 borderWidth: 0,
//                 lineHeight: 40
//             }
//         });

//         wxloginBtn.onTap((uinfo) => {
//             if (uinfo.userInfo) {
//                 wxloginBtn.destroy();//隐藏按钮
//                 console.log("wxLogin auth success");
//                 callback(uinfo.userInfo);
//                 this.showToast('授权成功', 'none');
//             } else {
//                 console.log("wxLogin auth fail");
//                 this.showToast('授权失败', 'none');
//             }

//         });

//     }


//     /**
//      * 播放视频广告
//      */
//     showVideo(success: any, failed: any): void {

//         if (Browser.onWeiXin && ConfWechat.$.adUnitId != null) {
//             this.adSuccessFun = success;
//             this.adFailedFun = failed;
//             this.videoAd.show()
//                 .catch(err => {
//                     this.videoAd.load()
//                         .then(() => this.videoAd.show())
//                 });
//         } else {
//             let self = this;
//             // 正常播放结束，可以下发游戏奖励
//             NetLogicUser.reqVideoNumberUpdate(new Func(self, function (err, msg, res) {
//                 Log.info("请求视频次数奖励：返回：" + msg + "res: " + res);
//                 if (msg == 200) {
//                     let user: UserInfo = DataManager.$.get(DataDefine.UserInfo) as UserInfo;
//                     user.adShowLastTime = parseInt(res);
//                     user.adShowTimes = user.adShowTimes + 1;
//                     console.log("adShowTimes" + user.adShowTimes);

//                     success();
//                 }
//             }));
//         }
//     }


//     /**
//      * 初始化视频广告
//      */
//     private initVideoAd(): void {
//         this.videoAd = wx.createRewardedVideoAd({adUnitId: ConfWechat.$.adUnitId});

//         this.videoAd.onLoad(() => {
//             console.log('激励视频 广告加载成功')
//         });

//         this.videoAd.onError(err => {
//             if (this.adFailedFun) {
//                 this.adFailedFun();
//                 this.adFailedFun = null;
//             }
//         });


//         let self = this;
//         this.videoAd.onClose(res => {
//             // 用户点击了【关闭广告】按钮
//             // 小于 2.1.0 的基础库版本，res 是一个 undefined
//             if (res && res.isEnded || res === undefined) {
//                 // 正常播放结束，可以下发游戏奖励
//                 NetLogicUser.reqVideoNumberUpdate(new Func(self, function (err, msg, res) {
//                     Log.info("请求视频次数奖励：返回：" + res);
//                     if (msg == 200) {
//                         let user: UserInfo = DataManager.$.get(DataDefine.UserInfo) as UserInfo;
//                         user.adShowLastTime = parseInt(res);
//                         user.adShowTimes = user.adShowTimes + 1;

//                         if (this.adSuccessFun) {
//                             this.adSuccessFun();
//                             this.adSuccessFun = null;
//                         }
//                     }
//                 }));

//             } else {
//                 // 播放中途退出，不下发游戏奖励
//                 if (this.adFailedFun) {
//                     this.adFailedFun();
//                     this.adFailedFun = null;
//                 }
//             }
//         })
//     }

//     /**
//      * 监听右上角的分享接口
//      * */

//     private onShareAppMessage(): void {
//         let user: UserInfo = DataManager.$.get(DataDefine.UserInfo) as UserInfo;
//         let gid = user.gid;
//         let timestamp = new Date().getTime();

//         wx.aldOnShareAppMessage(function () {
//             return {
//                 imageUrl: 'https://mmocgame.qpic.cn/wechatgame/WnbcwPRX9cicjFQbUzlRxCnRx6aGLicw734OZjJyUBVxKY34BDODca1Nic9mjFAaxoU/0', //转发显示图片的链接
//                 imageUrlId: "f5lsNIIMRnm4QNhQwy23qg",
//                 title: '知足者长肉,贪婪者挨饿，快来养肥你的猫咪吧！', //转发标题
//                 ald_desc: '右上角分享',
//                 query: 'gid=' + gid + '&timestamp=' + timestamp
//                 // query: 'id=89&select=2'//查询字符串，必须是 key1=val1&key2=val2 的格式。从这条转发消息进入后，可通过 wx.getLaunchOptionSync() 或 wx.onShow() 获取启动参数中的 query。
//             }
//         })
//     }


//     /**
//      *  分享
//      *  @param query '&timestamp=121'
//      */
//     public shareAppMessage(query: string = ''): void {
//         let user: UserInfo = DataManager.$.get(DataDefine.UserInfo) as UserInfo;
//         let gid = user.gid;
//         let timestamp = new Date().getTime();

//         let array = query.split('-');
//         let customTitle = '与天斗其乐无穷，与人斗其乐无穷，来和猫斗吧！';
//         let customQuery = 'gid=' + gid + "&timestamp=" + timestamp + query;
//         if (array.length > 0 && array[0] == "&pkType=pk") {
//             customTitle = '来和我PK，输的人要'+array[1];
//             customQuery = 'gid=' + gid + "&timestamp=" + timestamp + array[0];
//         }
//         wx.aldShareAppMessage({
//             imageUrl: 'https://mmocgame.qpic.cn/wechatgame/WnbcwPRX9cicjFQbUzlRxCnRx6aGLicw734OZjJyUBVxKY34BDODca1Nic9mjFAaxoU/0', //转发显示图片的链接
//             imageUrlId: "f5lsNIIMRnm4QNhQwy23qg",
//             ald_desc: '右上角分享',
//             title: customTitle, //转发标题
//             query: customQuery,
//         })
//     }


//     /**
//      * 右上角显示转发按钮
//      */
//     private showShareMene(): void {
//         wx.showShareMenu({
//             withShareTicket: true,
//             success: function () {
//                 console.log("showShareMenu");
//             },
//             fail() {
//             },

//             complete() {
//             }
//         });
//     }


//     /**
//      * 监听微信返回前台
//      */
//     private onWechatShow(): void {

//         wx.onShow((res) => {
//             console.log("/////////////////后台返回//////////////////");
//             //后台返回事件（贪心猫）
//             // MainView.$.onBackReturn(res.query);
//             //Todo 后台返回
//         });
//     }

//     /**
//      * 监听微信启动
//      */
//     private onWechatLaunch(): void {
//         //scene == 1104 我的小程序  1089 最近使用
//         console.log("/////////////////启动小游戏//////////////////");
//         let res = wx.getLaunchOptionsSync();
//         this.showData = res.query;
//         var isInvite = false;
//         var matchGid = "";
//         var isMyGame = false;
//         var isNearUse = false;
//         //我的小程序进入
//         isMyGame = res.scene == 1104;
//         //最新使用
//         isNearUse = res.scene == 1089;
//         //判断信息
//         this.linkData = {
//             isInvite:isInvite,
//             matchGid:matchGid,
//             isMyGame:isMyGame,
//             isNearUse:isNearUse,
//         }
//     }


//     showLoading(title: string): void {
//         if (Browser.onWeiXin) {
//             wx.showLoading({
//                 title: title,
//                 mask: false,
//                 success() {
//                 },
//                 fail() {
//                 },
//                 complete() {
//                 }
//             });
//         }
//         ;
//     }

//     hideLoading(): void {
//         if (Browser.onWeiXin) {
//             wx.hideLoading();
//         }
//     }

//     showToast(title: string, icon: string): void {
//         if (Browser.onWeiXin) {
//             wx.showToast({
//                 title: title,
//                 icon: 'none',
//                 image: null,
//                 duration: 1500,
//                 mask: false,
//                 success() {
//                 },

//                 fail() {
//                 },
//                 complete() {
//                 }
//             });
//         }
//     }

//     hideToast(): void {
//         if (Browser.onWeiXin) {
//             wx.hideToast();
//         }
//     }


//     /**
//      * 显示微信对话框
//      */
//     showAlert(title, content, btns, okfun = null, canfun = null): void {
//         if (!Browser.onWeiXin) {
//             return;
//         }
//         wx.showModal({
//             title: title,
//             content: content,
//             showCancel: true,
//             confirmText: '确定',
//             success(res) {
//                 if (res.confirm) {
//                     console.log('用户点击确定');
//                     if (okfun != null) {
//                         okfun();
//                     }
//                 } else if (res.cancel) {
//                     console.log('用户点击取消');
//                     if (canfun != null) {
//                         canfun();
//                     }
//                 }
//             }

//         })
//     };

//     /**
//      * 提交用户云端数据
//      */
//     setUserCloudStorage(rankId, value) {
//         //rankoo1
//         var kvDataList = [];
//         var obj: any = {};
//         obj.wxgame = {};
//         obj.wxgame.value1 = value;
//         obj.wxgame.update_time = Laya.Browser.now();
//         kvDataList.push({"key": rankId, "value": JSON.stringify(obj)});
//         wx.setUserCloudStorage({
//             KVDataList: kvDataList,
//             success: function (e): void {
//                 console.log('-----success:' + JSON.stringify(e));
//             },
//             fail: function (e): void {
//                 console.log('-----fail:' + JSON.stringify(e));
//             },
//             complete: function (e): void {
//                 console.log('-----complete:' + JSON.stringify(e));
//             }
//         });

//     }

//     /**
//      * 震动
//      */
//     vibrateLong(): void {
//         if (!Browser.onWeiXin) {
//             return;
//         }

//         if (!CommonData.switch_shake) {
//             return;
//         }

//         wx.vibrateLong({
//             success() {

//             },
//             fail() {

//             },
//             complete() {

//             }
//         });
//     }


//     /**
//      *  截屏分享
//      */
//     shareScreen(): void {
//         let canvas = Browser.window.canvas;
//         var tempFilePath = canvas.toTempFilePathSync({
//             x: 0,
//             y: Laya.stage.height / 2,
//             width: Laya.stage.width,
//             height: Laya.stage.height,
//             destWidth: Laya.stage.width,
//             destHeight: Laya.stage.height,
//             fileType: 'png',
//             quality: 1.0
//         });

//         wx.aldShareAppMessage({
//             imageUrl: tempFilePath,//转发标题
//             // imageUrl: 'https://favicon.yandex.net/favicon/aldwx.com',//转发标题
//             title: '快来加入喵～',//转发标题
//             ald_desc: "截图分享",//分享功能描述
//             query: 'id=89&select=2'//查询字符串，必须是 key1=val1&key2=val2 的格式。从这条转发消息进入后，可通过 wx.getLaunchOptionSync() 或 wx.onShow() 获取启动参数中的 query。
//         })

//     }

//     /**
//      *  阿拉丁日志打点
//      *  args:
//      *  {
//      *  "关卡" : "56关",
//      *  "耗时" : startTime -  Date.now()
//      *  }
//      */
//     sendEvent(event: string, args?: any) {
//         if (Browser.userAgent) return;
//         wx.aldSendEvent(event, args)
//     }

//     destroy(): void {
//     }

//     setup(): void {
//         if (!this.isWechat()) return;
//         this.initVideoAd();
//         this.onShareAppMessage();
//         this.showShareMene();
//         this.onWechatShow();
//         this.onWechatLaunch();
//     }
// }