### 一、项目中的问题：

##### 1. 支付实现流程；

> - 1.购物车页面点击立即购买按钮，向后端传递商品信息、金额等参数。
> - 2.后端根据传过来的参数生成订单信息。
> - 3.前端收到订单信息，展示订单页面，让用户确认信息是否正确（总金额，数量），用户选择收货地址、支付方式，点击立即支付，将订单号、支付方式等参数传给后端。
> - 4.后端根据订单号、金额、支付方式等向支付宝或微信接口发预支付请求，同时携带必要参数到相应接口。
> - 5.支付宝收到参数，审核订单，根据订单信息返回支付链接。
> - 6.后端收到支付链接返回前端，前端展示支付二维码或者直接点击打开支付。

##### 2. 小程序授权：用户信息授权和普通授权各自实现方式；

用户信息授权：

```
  <!-- wxml -->
  <view class="userinfo">
    <!-- block: 不会生成额外的代码， 只是包裹一段代码。-->
    <block wx:if="{{!hasUserInfo}}">
      <button bindtap="getUserProfile">新版获取头像昵称 </button>
    </block>
    <block wx:else>
      <image bindtap="bindViewTap" class="userinfo-avatar" src="{{userInfo.avatarUrl}}" mode="cover"></image>
      <text class="userinfo-nickname">{{userInfo.nickName}}</text>
    </block>
  </view>
```

```
<!-- js -->
Page({
  data: {
    userInfo: {}, // 用户信息
    hasUserInfo: false,
  },
  getUserProfile(e) {
    // wx.getUserProfile 它会弹起授权窗口，不管允许还是拒绝，下次点击还会弹。需要根据条件将授权按钮隐藏。
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    })
  },
})
```

普通授权:

```
  <!-- wxml -->
  <!-- 下面是普通权限：录音、定位等 -->
  <view class="authrize">
    <audio src="{{audioSrc}}" controls="true"></audio>
    <button bindtap="startRecord">开始录音</button>
    <button bindtap="startNewRecord">新接口录音</button>
    <button bindtap="startPlayRecord">播放录音</button>
  </view>
```

```
<!-- js -->
Page({
  data: {
    audioSrc: "",
  },
  recordManger: null, // 录音管理器
  audioManger: null, // 音频管理器，替换旧的audio组件
  onLoad(options) {
    // 页面初始加载，创建全局唯一的录音管理器。
    this.recordManger = wx.getRecorderManager();
    this.recordManger.onStop((data) => {
      console.log(data);
      // 录音文件保存音频管理器
      this.audioManger.src = data.tempFilePath;
    });
    this.recordManger.onStart(() => {

    });
    // 创建音频管理器对象
    this.audioManger = wx.createInnerAudioContext();
  },
  startRecord() {
    // 开始录音之前，先判断用户是否授权了(wx.getSetting)，如果没有授权，就调用wxwx.authorize弹起授权窗口进行授权，如果已经授权，直接开始录音。
    const _self = this;
    wx.getSetting({
      success(res) {
        // 默认有四个权限默认授权了，不需要弹窗口让用户进行授权了。
        // scope.address: true
        // scope.invoice: true
        // scope.invoiceTitle: true
        // scope.userInfo: true
        // console.log(res.authSetting)
        if (!res.authSetting["scope.record"]) {
          // 需要授权
          wx.authorize({
            scope: 'scope.record', // 需要授权的权限范围
            success() {
              console.log(1111);
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord({
                success: (result) => {
                  console.log("---", result);
                  _self.setData({
                    audioSrc: result.tempFilePath,
                  })
                }
              });
            }
          })
        } else {
          wx.startRecord({
            success: (result) => {
              console.log("====", result);
              _self.setData({
                audioSrc: result.tempFilePath,
              })
            },
          })
        }
        setTimeout(function () {
          wx.stopRecord() // 结束录音
        }, 3000)

      }
    })
  },
  startNewRecord() {
    const _self = this;
    wx.getSetting({
      success: (result) => {
        console.log("----", result);
        if (result.authSetting["scope.record"] === undefined) {
          // 说明之前没有授权过，是第一次授权
          wx.authorize({
            scope: 'scope.record',
            success: (data) => {
              console.log(data); //{errMsg: "authorize:ok"}
              _self.recordManger.start({
                duration: 10000,
                format: "mp3",
              });
            }
          })
        } else if (result.authSetting["scope.record"] === false) {
          // 之前弹授权窗口时，用户选择的拒绝
          // wx.openSetting 打开授权设置页面，进行二次授权，这里面只会显示小程序曾经向用户获取过授权，但是用户选择了拒绝。
          wx.openSetting({
            success: (res) => {
              console.log(res);
            }
          })
        } else {
          _self.recordManger.start({
            duration: 10000,
            format: "mp3",
          });
        }
      }
    })
  },
  startPlayRecord() {
    this.audioManger.play();
  }
})
```

##### 3. redux 基本使用；什么样的数据需要放在 Redux 中；项目中哪些地方使用了 Redux；

![Redux 原理图](https://img-blog.csdnimg.cn/594712872dde4e528f0957b8f31386d4.png)

(1) src 下建立：

```
-redux
	-store.js
	-reducer.js
	-action.js 专门用于创建action对象
	-type.js    放置容易写错的type值
```

(2) store.js

> - a. 引入 redux 中的 createStore 函数，创建一个 store。`import {createStore} from 'redux'`
> - b. createStore 调用时要传入一个为其服务的 reducer。`import countReducer from './reducer'`
> - c. 暴露 store 对象。`export default createStore(countReducer)`

(3) reducer.js

> - a. reducer 的本质是一个函数，接收：preState,action，返回加工后的状态
> - b. reducer 有两个作用：初始化状态，加工状态
> - c. reducer 被第一次调用时，是 store 自动触发的，
> - 传递的 preState 是 undefined,
> - 传递的 action 是:{type:'@@REDUX/INIT_a.2.b.4}
> - d. 在 index.js 中监测 store 中状态的改变，一旦发生改变重新渲染<App/>
> - 备注：redux 只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写。

```
/*
    该文件你时用于创建一个为Count组件服务的reducer，reducer的本质是一个函数
 */

import { INCREMENT } from "./type"

const initState = 0  // 初始化状态
export default function countReducer(preState=initState, action) {
    // 从action中获取type，data
    const { type, data } = action
    // 根据type决定如何加工数据
    switch (type) {
        case INCREMENT:
            return preState + data
        default:
            return preState
    }
}
```

(4) action.js：

> - 1）作用：专门用于创建 action 对象
> - 2）异步 action：当异步操作不想在组件中处理而要交给 action 时

> - a. yarn add redux-thunk，并配置在 store 中
> - b. 创建 action 的函数不再返回一般对象，而是一个函数，该函数中写异步任务。
> - c. 异步任务有结果后，分发一个同步的 action 去真正操作数据。

```
/*
    该文件专门为Count组件生成action对象
 */

import { INCREMENT } from "./type"

// 同步action，就是指action的值为Object类型的一般对象
export const createIncrementAction = data => ({type: INCREMENT, data})

// 所谓的异步action，就是指action的值为函数,异步action中一般都会调到同步action，异步action不是必须要用到
export const createIncrementAsyncAction = (data,time) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(createIncrementAction(data))
        }, time)
    }
}
```

异步 action 需要在 store.js 中做如下配置：

> - 1、引入 applyMiddleware 和 thunk
> - 2、createStore 的第二个参数传入 applyMiddleware(thunk)

(5) 入口文件即 index 中监听 redux 状态中的改变：

(6) 组件中使用：

应该放到 redux 中的数据：

> - 某个组件的状态，需要共享
> - 某个状态需要在任何地方都可以拿到
> - 一个组件需要改变全局状态
> - 一个组件需要改变另一个组件的状态

项目中用到 redux 的地方：

> - 做商城项目时，购物车的数量共享，实现详情页购物车小角标
> - 做动态路由时，先用 redux 存储菜单，然后存到本地
> - 做一些全局性的组件时，需要在不同组件中修改值。如果业务逻辑太复杂，可以借助 redux 简化

##### 4. token 的使用流程及作用；

使用流程：

作用：

##### 5. 在后端接口没有出来之前，前端写完静态页面之后，如果生成模拟数据？(mock.js 模拟虚拟数据，考察你对 mock 数据的理解)

##### 6. 购物车功能如何实现？

##### 7. 项目中防抖和节流使用哪一种方案？两者的区别

##### 8. 路由组件和普通组件的区别是什么？

##### 9. 路由懒加载和组件懒加载如何实现?好处是什么？

##### 10. 如何解决白屏问题？(骨架屏、全局 loading 加载器)

##### 11. 如何解决首屏加载过慢的问题？

### 二、项目中的问题：

##### 1. 移动端适配方案，说出具体思路；

##### 2. 递归的实现思路；

##### 3. React 中引起页面渲染的几种情况；

##### 4. state 中的数组和对象，如果发生了元素或者属性值的修改，是否会引起页面渲染？为什么？(不会，必须生成新数组或对象，因为 React 对于引用类型的数据对象是浅层对比，只观察对象本身是否变化，无法监测对象内部的数据变化，可以使用展开运算符生成新对象或使用 immutable)
