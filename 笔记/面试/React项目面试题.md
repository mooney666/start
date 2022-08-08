## 一、项目中的问题：

### 1. 支付实现流程；

> - 1.购物车页面点击立即购买按钮，向后端传递商品信息、金额等参数。
> - 2.后端根据传过来的参数生成订单信息。
> - 3.前端收到订单信息，展示订单页面，让用户确认信息是否正确（总金额，数量），用户选择收货地址、支付方式，点击立即支付，将订单号、支付方式等参数传给后端。
> - 4.后端根据订单号、金额、支付方式等向支付宝或微信接口发预支付请求，同时携带必要参数到相应接口。
> - 5.支付宝收到参数，审核订单，根据订单信息返回支付链接。
> - 6.后端收到支付链接返回前端，前端展示支付二维码或者直接点击打开支付。

### 2. 小程序授权：用户信息授权和普通授权各自实现方式；

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

### 3. redux 基本使用；什么样的数据需要放在 Redux 中；项目中哪些地方使用了 Redux；

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

### 4. token 的使用流程及作用；

使用流程：

> - 用户使用用户名密码来请求服务器
> - 服务器进行验证用户信息
> - 服务器通过验证，加密用户信息生成一个 token ，发给用户
> - 客户端(localStorage/sessionStorage)存储 token，并在每次访问时加上这个 token 值
> - http 的请求头 Authroization 字段，保存 token 的值
> - 服务器解密，验证 token 值，获取对应的数据，并返回给服务器

作用：

> - 减轻服务器的压力，减少频繁的查询数据库，使服务器更加健壮

用途：

> - ①：防止表单重复提交(防止表单重复提交一般还是使用前后端都限制的方式，比如：在前端点击提交之后，将按钮置为灰色，不可再次点击，然后客户端和服务端的 token 各自独立存储，客户端存储在 Cookie 或者 Form 的隐藏域（放在 Form 隐藏域中的时候，需要每个表单）中，服务端存储在 Session（单机系统中可以使用）或者其他缓存系统（分布式系统可以使用）中。)
> - ②：用来作身份验证

### 5. 在后端接口没有出来之前，前端写完静态页面之后，如果生成模拟数据？(mock.js 模拟虚拟数据，考察你对 mock 数据的理解)

[前端开发没拿到接口该如何模拟数据呢？(安装 mockjs)](https://blog.csdn.net/qq_56126374/article/details/120867767)

> - yarn add mockjs -d

### 6. 购物车功能如何实现？

1.首先在前端那边设置一个加入购物车的按钮

2.点击按钮之后会通过 ajax 请求后台接口

3.后台接口会先判断用户是否登录

4.如果没登录，则提示登陆

5.如果登录了，则先查出购物车，看该商品是否已经存在购物车

6.如果在则数量+1，如果不在则新增进购物车。

### 7. 项目中防抖和节流使用哪一种方案？两者的区别

### 8. 路由组件和普通组件的区别是什么？

### 9. 路由懒加载和组件懒加载如何实现?好处是什么？

### 10. 如何解决白屏问题？(骨架屏、全局 loading 加载器)

### 11. 如何解决首屏加载过慢的问题？

## 二、项目中的问题：

### 1. 移动端适配方案，说出具体思路；

### 2. 递归的实现思路；

### 3. React 中引起页面渲染的几种情况；

##### 4. state 中的数组和对象，如果发生了元素或者属性值的修改，是否会引起页面渲染？为什么？(不会，必须生成新数组或对象，因为 React 对于引用类型的数据对象是浅层对比，只观察对象本身是否变化，无法监测对象内部的数据变化，可以使用展开运算符生成新对象或使用 immutable)

## 三、面试补充：

### 1. link 和@import 区别

1. link 是 html 提供的，@import 是 css 提供的。
2. link 会在页面加载时同步加载，@import 在页面加载结束后才加载，link 权重更高
3. 兼容性问题，es5 以上才支持@import

### 2. 改变 promise 状态的三种方式：resolve(fulfilled)、reject(rejected)、throw 抛出异常(rejected)

### 3. 为什么 js 是弱类型语言，与 ts 有什么区别？

相对于强类型来说的，声明变量不用规定类型，可以通过隐式转化或强制转化为其他类型的。

区别：

> - ts 是 js 的超集，即你可以在 ts 中使用原生 js 语法。
> - ts 需要静态编译，它提供了强类型与更多面向对象的内容。
> - ts 最终仍要编译为弱类型，基于对象的原生的 js，再运行。故 ts 相较 java/C#这样天生面向对象语言是有区别和局限的
> - ts 是由微软牵头主导的，其语法风格与概念主要来自 C#

ts 是 js 的超集，这意味着你在 ts 中写 js 是完全兼容的，这降低了 ts 的学习和使用门槛，保留了灵活性，但同时，ts 的纯洁性无法保证。所以需要 eslink 进行规范约束。

### 4. websokect 是什么？应用场景。

websocket 是 HTML5 的一个新协议，它允许服务端向客户端传递信息，实现浏览器和客户端双工通信。websocket 弥补了 HTTP 不支持长连接的特点。双向

即时通讯，大文件下载，实时监控

### 5. 客服功能实现：

公司之前封装有这个库

我之前使用过 layui 中的 layim 实现过。利用 Websokect 内置对象。

常用的函数有：WebSocket.onmessage（当接收到消息），WebSocket.send（消息发送），WebSocket.close（关闭连接），WebSocket.onopen（当连接建立）。

### 6. js 脚本延迟加载的方式？

1.defer 属性

> - 给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成之后，再执行这个脚本文件。

2.async 属性

> - 给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程。只有同步消息队列执行完毕，才会继续执行脚本

3.使用 setTimeout 延迟方法

> - 设置一个定时器来延迟加载 js 脚本文件

4.添加监听事件

> - 为页面添加 onload 事件监听，只有页面加载完毕，才继续执行 js 脚本

5.在框架中利用生命周期控制

> - 在使用框架时，可以利用框架的生命周期，如在 create()，mounted()等地方写入 js

### 7. FOUC？如何避免？

使用 import 引入 css 文件时，导致某些页面在 windows 下出现无法显示页面内容瞬间闪烁，这种现象简称为页面样式短暂失效，简称 FOUC。

写在 body 上面，不用 import 导入。脚手架搭建中一般不存在

### 8. CDN 有什么好处, 原理是什么？

> - 1、提高安全性
> - 2、提升网站的访问速度
> - 3、网站不容易挂机

原理：

> - CDN 加速的工作原理，就是将源站的各类资源像复制粘贴一样，缓存到全国各地甚至全球各地的 CDN 节点上，当用户对源站发起访问时，用户就可以获取到离自己最近的数据信息，不必到源站进行访问。这样，避免访问源站时的线路拥堵，也减轻了源站的访问压力，同时，让用户得到更快的访问体验。

### 9. 什么是 SEO？

[参考网址：前端面试 SEO](https://blog.csdn.net/qq_41453653/article/details/115338290)

SEO（Search Engine Optimization）：汉译为搜索引擎优化。前端 SEO：通过`网站的结构布局设计`和`网页代码`优化，使前端页面既能让浏览器用户能够看懂，也能让“蜘蛛”看懂。

> - (1)网站结构布局优化：尽量简单、开门见山，提倡扁平化结构。
> - (2)网页代码优化。网页描述、代码语义化、alt 属性、少使用 iframe、精简代码
