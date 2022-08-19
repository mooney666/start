## 一、基础一

### 1, React 中有哪些生命周期函数?

> - static getDerivedStateFromProps(props,state) 渲染前
> - render 必须 return jsx|string|number|null，不会直接于浏览器交互：不要操作 DOM ｜和数据
> - componentDidMount 挂载完成后执行
> - getSnapshortBeforeUpdate(prevProps,prevState)

```
组件能在发生更改之前从DOM中捕获一些信息(dom渲染前的状态)
返回 值｜null 会给componentDidUpdate
prevProps、prevState 更新前this.props、this.state更新后
```

> - shouldComponentUpdate(nextProps,nextState) 控制组件是否更新
> - componentDidUpdate() 组件已经更新
> - componentWillUnmont 组件即将卸载执行

### 2, React 组件中的 state 和 props 有何区别?

> - State 是一种数据结构，在组件构造器中定义, 是可读可写的, 用于组件内部数据的初始化和更新。 state 中一般只放纯数据
> - Props 则是组件的配置。props 由父组件传递给子组件，就子组件而言，props 是只读的。组件不能改变自身的 props，但可以修改传递给子组件的 props。props 也可以传递回调函数

### 3, React 中 keys 是什么,有什么作用?

> - Keys 是列表通过 map 循环时给循环标签添加的属性,用于标记每一个循环的元素
> - 在循环中要保证每一个循环标签 keys 属性值都不相同
> - 在列表数据更新时, 通过 keys 可以快速高效的区分哪些元素是新的,然后确保视图更新的正确和高效

### 4, React 组件之间通讯有哪些方式?

> - 父组件向子组件传值: 父组件通过自定义属性向子组件传值,子组件 props 参数接收并处理
> - 子组件向父组件传值: 父组件通过自定义属性向子组件传函数,子组件 props 接收函数并调用
> - 非父子组件传值: 在全局作用域下定义变量, 通过在不同组件中对全局变量的赋值与取值来实现组件传值

### 5, react 的优缺点

优点：

> - 可以通过构造函数或类结构描述视图组件,
> - 集成虚拟 DOM（渲染性能好）
> - 单向数据流（好处是更容易追踪数据变化排查问题)
> - 一切都是 component：代码更加模块化，重用代码更容易，可维护性高
> - 大量使用 es6 新特性

缺点：

> - jsx 的一个问题是，渲染函数 render()常常包含大量逻辑，最终看着更像是程序片段，而不是视觉呈现。后期如果发生需求更改，维护起来比较麻烦
> - 功能强大而全面，比 vue 更难上手

### 6, react 使用单向数据流有什么好处?

> - 单向数据流是对数据传递的一种约束, 他保证了组件的数据传递结构稳定且不易耦合.
> - 数据只能从父组件向下流动到子组件中，反过来则不行。这样会防止从子组件意外改变父级组件的状态 , 极大的降低了我们组件间通信的代码耦合
> - 数据流动单一, 便于追踪, 追查问题比较便捷

### 7,使用 jsx 时有哪些注意事项?

> - Jsx 渲染的时候 for 和 class 不能使用，必须通过 htmlfor 和 classname 替代
> - 组件模板外部使用 js 不能用“{}“包裹，但模板内部必须使用“{}“包裹起来
> - jsx 中不支持单标签写法, html 中的单标签必须写成双标签或末尾加/
> - 如果标签有多层嵌套结构, 建议在根标签外层加() 而且()必须跟 return 在一行

### 8, 类组件和函数式组件有何不同?

> - 函数式组件通过 ES5 的构造函数结构创建, 一般以数据的展示为主, 功能简单, 组件中的逻辑代码较少
> - 类组件通过 ES6 的类结构创建, 允许使用更多功能,如组件状态数据,生命周期钩子, 访问 redux 仓库等

### 9, refs 的作用是什么?

Refs 是 React 提供给我们安全的访问 DOM 元素或者某个组件实例的句柄, 它是组件对象 this 的一个属性, 可以在组件模板中的标签添加 ref 属性, 然后组件中使用 this.refs 即可访问对应的 DOM 元素

### 10,shouldComponentUpdate 函数有什么作用?

shouldComponentUpdate 这个函数是用来判断是否需要调用 render 函数重新描绘 DOM, 因为 DOM 的绘制非常消耗性能, 如果我能能在这个函数中写一些优化算法逻辑,控制 DOM 绘制的频率和次数, 则能极大的提高网页渲染效率, 优化性能

### 11, react 路由跳转时如何传递数据?

路由传值一共有 4 中方式:

> - (1)使用 url 添加?拼接字符串形式传值, 目标组件使用 this.props.location.search 接收
> - (2)使用友好 url 动态传值, 目标组件使用 this.props.match.params 接收
> - (3)使用 query 对象传值, 目标组件使用 this.props.location.query 接收
> - (4)使用 state 对象传值, 目标组件使用 this.props.location.state 接收
>   此外还可以使用编程式导航跳转路由并传值 this.props.history.push()
>   注意：使用对象传值以及编程式导航传值时如果页面刷新，那么传递的值就会消失；

### 12,什么是 Redux?

Redux 是一款热门的前端开发库, 它是 javascript 程序的可预测状态容器,可用于 react 项目的状态管理, 使用 Redux 开发的应用易于测试,可以在不同环境中运行,并显示相同行为.

### 13,Redux 有哪三大原则?

> - 1）唯一数据源(整个应用的 state 状态数据被储存在一个状态树(对象)中，单一状态树更容易跟踪数据的变化, 方便调试检查应用程序)
> - 2）State 状态是只读的, 想要更改数据必须经过派发 action 事件,通过接收 action 参数修改
> - 3）reducer 必须是纯函数（一个输入必须对应着唯一的输出, 返回值取决于参数）

### 14,什么情况下建议使用 redux?

> - 某个组件的状态，需要共享
> - 某个状态需要在任何地方都可以拿到
> - 一个组件需要改变全局状态
> - 一个组件需要改变另一个组件的状态

### 15,React 组件之间传递数据有哪些方式?

> - 组件传值: 包括父传子, 子传父, 兄弟组件
> - 路由传值: 包括 url 拼接传值, 友好 url 传值和对象传值
> - Redux 传值: 把需要传递的数据放入状态管理中,各组件共享

### 16, 说一下你对高阶组件的理解

高阶组件: 是 React 中用于重用组件逻辑的高级技术, 它本身不是 react 中的组件, 而是一个函数, 这个函数接受一个 react 组件作为参数,并返回一个新组件, 实现了对原有组件的增强和优化, 可以对原有组件中的 state, props 和逻辑执行增删改操作, 一般用于代码重用和组件增强优化

### 17, 高阶组件有哪些实现方式?

> - 属性代理。高阶组件通过被包裹的 React 组件来操作 props, 可以增强组件模板和 props
> - 反向继承。高阶组件继承于被包裹的 React 组件 可以 state

### 18, 说说你对 Hooks 组件的理解

> - hooks 组件即使用了 hooks 语法构建的函数式组件
> - hooks 是 react 中的一项新功能, 它可以在不使用 class 类的情况下实现 state 组件状态和生命周期等功能, 通过 useState 函数实现组件状态,通过 useEffect 函数实现生命周期
> - hooks 语法是向下兼容的, 在旧版本的 react 项目中可用.
> - hooks 可以很好的替代高阶组件实现组件的抽象和复用
> - hooks 只能在函数式组件中使用, 不能在普通函数或 class 类组件中使用, 也不建议在循环或判断逻辑中使用

### 19, Hooks 与 React 生命周期的关系

Hooks 可以模拟实现 react 组件的生命周期,通过 API 函数 useEffect 并控制其第二个参数的传入可以模拟组件不同时期的生命周期钩子

### 20, Hooks 与 高阶组件有何区别?

它们之间最大的不同在于，高阶组件仅仅是一种开发模式，它本身是 js 函数结构, 而 hooks 是 react 提供的 API 模式，它既能更加自然的融入到 react 的渲染过程也更加符合 react 的函数编程理念。

### 21,什么是渲染劫持?

渲染劫持指对一个组件渲染内容的装饰或修改, 一般通过高阶组件来实现, 把一个组件传入高阶组件, 可以对这个组件的模板进行修改后执行渲染, 也可以阻止组件渲染,并修改组件中的数据和逻辑

### 22,react 严格模式有什么作用?

StrictMode 严格模式是一个用来突出显示应用程序中潜在问题的工具, 它可以识别不安全的生命周期调用, 警告过时或已弃用的 API, 并检测意外的副作用

### 23,react 有状态组件和无状态组件有什么区别?

> - 有状态组件通过 class 类结构定义,也叫类组件,主要用于处理业务逻辑和做数据交互
> - 无状态组件通过函数结构定义, 也叫函数式组件, 主要用于定义模板,用于数据的展示

### 24,函数式组件有没有生命周期?

函数时组件默认是没有生命周期的,因为函数式组件的主要功能是展示数据, 如果需要做很多业务逻辑的情况下可以选用类组件,使用类组件的生命周期, 也可以使用 hooks 提供的 useEffect 函数模拟实现组件的生命周期

### 25,什么是受控组件和非受控组件?

> - 受控组件和非受控组件是针对表单组件处理数据时的不同概念
> - 受控组件指组件的状态数据根据用户输入,实时更新,显示在视图中, 例如 input 标签使用 onChange 绑定输入事件并通过 setSatate 函数更新 state 数据, 此时组件中的数据是可控的
> - 非受控组件指组件状态数据与表单标签没有直接关联, 用户输入与视图更新不同步, 例如 input 标签没有绑定 onChange 事件或者 value 属性, 而使用 refs 的 DOM 查找操作表单数据, 并用作逻辑处理, 此时组件中的数据是不可控的
>   总之一句话: 受控组件就是内部表单通过了 value 和 onChange 绑定的组件

### 26, 说一说你对 react 虚拟 DOM 的理解

虚拟 DOM 是对 DOM 的抽象，本质上是 JavaScript 对象, 即通过 js 对象模拟 DOM 中的节点,由于 react 使用 jsx 语法构建页面,浏览器无法直接运行 jsx, 所以会把 jsx 结构解析成 js 对象结构, 然后通过 js 对象渲染 DOM 树, 当数据更新时虚拟 DOM 会通过内部的 diff 算法,得到节点的变化,从而局部更新变化的 DOM 节点, 避免了不必要的 DOM 操作, 提高性能

### 27, 说一下 react 虚拟 DOM 优化性能的实现步骤

> - 用 JavaScript 对象结构表示 DOM 树的结构(虚拟 DOM)；然后用这个 js 对象构建一个真实 DOM 树，插到文档当中
> - 当状态变更的时候，重新构造一棵新的虚拟 DOM 树。然后通过 diff 算法比较新的树和旧的树，记录两棵树差异
> - 把 diff 算法比较的差异更新到步骤 1 所构建的真正的 DOM 树上，视图就更新了

### 28, 说一说虚拟 DOM 中 diff 的原理

diff 算法就是进行虚拟节点对比，并返回一个 patch 对象，用来存储两个节点不同的地方，然后用 patch 记录的不同点去局部更新 DOM, 相当于给真实 DOM 打补丁更新

### 29.HashRouter 和 BrowserRouter 的区别。

> - 1.HashRouter 在路径中包含了#，相当于 HTML 的锚点定位。（# 符号的英文叫 hash，所以叫 HashRouter）BrowserRouter 使用的是 HTML5 的新特性 History，没有 HashRouter(锚点定位)那样通用，低版本浏览器可能不支持。

> - 2.BrowserRouter 进行组件跳转时可以传递任意参数实现组件间的通信；HashRouter 不能(除非手动拼接 URL 字符串)，因此一般配合 Redux 使用，实现组件间的数据通信。

## 二、基础二

### 1. React 渲染 DOM 的整体流程。从初始加载和后续更新的两个角度进行阐述。

初始加载：

> - 1.使用 JSX 声明 React 元素结构，这个结构就是 React 生成真实 DOM 的模板；
> - 2.这些 JSX 模板被 babel 编译成 React.createElemet()；
> - 3.由 React.createElemet()将这些 React 元素渲染为虚拟 DOM；
> - 4.render()函数，将这些虚拟 DOM 渲染为真实 DOM，将虚拟 DOM 节点插入 body

JSX 代码经过 babel 编译之后变成 React.createElement 的表达式，这个表达式在 render 函数被调用的时候执行生成一个 element。在首次渲染的时候，先去按照规则初始化 element，接着 ReactComponentComponentWrapper 通过递归，最终调用 ReactDOMComponent 的 mountComponent 方法来帮助生成真实 DOM 节点。

后续更新：

> - props/state 改变 -> render 函数重新执行 -> 产生新的 DOM 树(虚拟 DOM) -> 新旧 DOM 树进行 diff -> 计算出差异进行更新 -> 更新到真实的 DOM

### 2. 什么是 JSX。JSX 的特点。

是 JavaScript 的一种扩展，JSX 可以生成 React “元素”，可以更加简洁的构建 UI 结构。

> - 1.本质上，它只是 React.createElement(component, props, ...children) 函数的语法糖，写代码更加方便快捷。
> - 2.JSX 所描述的代码结构，最终还是会被编译成 React.createElement(component, props, ...children)的形式.
> - 3.因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 camelCase（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。

### 3. 函数组件的特点及使用场景。

> - 函数组件使用函数定义组件，写法简洁清晰，不能声明自己的私有数据。接收外部传入 props 值，返回对应 UI 的 DOM 描述。

> - 使用场景：一般用函数组件适合封装静态组件(没有动态数据), 不需要私有数据. 比如: 导航条, footer, 侧边导航;

### 4. 类组件的特点。

> - 1.类组件可以声明自己的私有数据，当然也可以通过 props 接收外部传递的数据
> - 2.类组件有组件生命周期(创建 - 运行 - 销毁)；函数组件是没有生命周期的

### 5. props 和 state 的区别。

> - 1.props 是组件对外的接口，state 是组件对内的接口。
> - 2.props 是传递给组件的（类似于函数的形参），而 state 是在组件内被组件自己管理的（类似于在一个函数内声明的变量）。
> - 3.props 是不可修改的，所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。 由于 props 是传入的，并且它们不能更改，因此我们可以将任何仅使用 props 的 React 组件视为 pureComponent（纯组件），也就是说，在相同的输入下，它将始终呈现相同的输出。
> - 4.state 是在组件中创建的，一般在 constructor 中初始化 state
> - 5.state 是多变的、可以修改，每次 setState 都异步更新的。

### 6. 类组件中的数据的声明方式及各自的使用场景。

1.声明需要更新渲染的数据：在 constructor 里 this.state={} 以对象方式声明（注意调用 super()）或者直接在组件内 state={}声明，最终会合并到 constructor 中。

> - 使用场景：动态改变的 ajax 请求参数。

2.声明无需动态更新渲染的数据：在 constructor 中直接`this.a=1`声明或者直接在组件内`a=1`声明。

> - 使用场景：无需在数据更新后重新渲染页面。

### 7. state 中的数据能够不使用 this.setState 修改？为什么。

> - 可以直接 `this.state.xx = xx` 修改，数据更新，但是数据不会渲染。
> - 因为它只是改变了这个组件当前的状态，并没有调用 render()。

### 8. setState 是同步还是异步的?

> - setState 本身并不是异步，只是因为 react 的性能优化机制体现为异步。在 react 的生命周期函数或者作用域下为异步，在原生的环境下为同步。

### 9. setState 中如何获取最新修改的值。

> - 通过第二个参数的回调函数获取最新值。

### 10. forceUpdate 的作用。

> - 强制渲染页面，一般应用于页面无法正常渲染的情况。

### 11. react 条件渲染有几种方式？

```
class App extends React.Component {
        // state = {
        //   comName: "regist", // 记录当前组件名称：是登陆还是注册
        // };
        comName = "login";
        clickEvent(name) {
          //   this.setState({
          //     comName: name,
          //   });
          this.comName = name;
          this.forceUpdate();
        }
        render() {
          const comName = this.comName;
          console.log(comName);

          {/* 条件渲染方式三：if语句实现。 */}
          let curCom;
          if (comName === "login") curCom = <Login />;
          else curCom = <Regist />;
          return (
            <div className="app">
              <button onClick={() => this.clickEvent("login")}>登录</button>
              <button onClick={() => this.clickEvent("regist")}>注册</button>
              <hr />
              {/* 条件渲染方式一：逻辑与 && 运算实现。 */}
              {comName === "login" && <Login />}
              {comName === "regist" && <Regist />}
              {/* 条件渲染方式二：三目运算符实现。 */}
              {comName === "login" ? <Login /> : <Regist />}
              {/* 条件渲染方式三：if语句实现。 */}
              {curCom}
            </div>
          );
        }
      }
```

### 12. 渲染列表时 key 的作用。能否使用数组索引作为 key 值。

key 的作用：

主要是对 DOM 渲染进行性能优化。当列表元素顺序发生改变时，如果不加 key，不管数据是否发生改变，所有列表元素都会重新渲染。当列表元素顺序没有发生改变时，只是在末尾产生新的元素，这时可以不加 key，React 只会渲染最后一个元素。

> - 1.不要使用索引作为 key 值，索引是会动态变化的，所有列表元素都会重新渲染。
> - 2.key 值要求唯一且不会变化。

### 13. 受控组件和非受控组件的区别。使用场景。

> - 1.受控组件：受控制的组件，组件的状态全程响应外部数据。

> - 使用场景：给 input 的 value 赋一个可改变的 state 值，此时 input 标签是一个可读的状态。当我们在输入框输入内容时，输入内容无法显示，必须调用 onChange 事件更新 state 值。

```
class TestComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = { username: 'lindaidai' };
  }
  render () {
    return <input name="username" value={this.state.username} />
  }
}
```

> - 2.非受控组件：不受控制的组件。一般情况是在初始化的时候接受外部数据，然后自己在内部存储其自身状态。当需要时，可以使用 ref 查询 DOM 并查找其当前值

```
import React, { Component } from 'react';

export class UnControll extends Component {
  constructor (props) {
    super(props);
    this.inputRef = React.createRef();
  }
  handleSubmit = (e) => {
    console.log('我们可以获得input内的值为', this.inputRef.current.value);
    e.preventDefault();
  }
  render () {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <input defaultValue="lindaidai" ref={this.inputRef} />
        <input type="submit" value="提交" />
      </form>
    )
  }
}
```

### 14. react 中的传值方式有哪些。

> - 1.父组件向子组件传值。(props)
> - 2.子组件向父组件传值。(props 传函数改变父组件中的值，一般父子组件都需声明 state)
> - 3.兄弟组件传值。(利用共同父组件过渡数据)
> - 4.非父子、兄弟组件传值。(发布订阅模式；redux)
> - 5.路由传值。

### 15. 发布订阅模式的原理。在 react 中如何运用。

原理：

```
      // 1. 准备事件中心：主要负责协调发布者和订阅者。它内部主要是存储订阅者注册的各种事件，而发布者则会通过事件中心调用这些事件，从而让订阅者收到消息。
      let events = []; // 存储订阅者事件的数组
      let eventsCenter = {
        sunscribe(func) {
          events.push(func);
        }, // subscribe 它是让订阅者注册事件的方法。
        publish(info) {
          // info 就是发布者提供的信息
          events.forEach((event) => event(info));
        }, // publish 让发布者调用的
      };

      // 2.创建订阅者：订阅者一定先往事件中心注册事件，然后再发布。
      eventsCenter.sunscribe((data) => {
        console.log("订阅者1", data);
      });
      eventsCenter.sunscribe((data) => {
        console.log("订阅者2", data);
      });
      eventsCenter.sunscribe((data) => {
        console.log("订阅者3", data);
      });

      // 3.发布消息
      eventsCenter.publish("下课了");
```

React 中运用：

```
      // 定义事件中心，让所有组件都能访问到事件中心。
      let events = [];
      let eventCenter = {
        subscribe(func) {
          events.push(func);
        },
        publish(data) {
          events.forEach(event => event(data));
        },
      };

      class App extends React.Component {
        render() {
          return (
            <div className="app">
              <One />
              <hr />
              <Two />
              <hr />
              <Three />
            </div>
          );
        }
      }
      class One extends React.Component {
        state = {
          name: "小明",
        };
        sendData() {
          eventCenter.publish(this.state.name);
        }
        render() {
          return (
            <div className="one">
              <p>one组件: {this.state.name}</p>
              <button onClick={() => this.sendData()}>发送</button>
              <button
                onClick={() => {
                  this.setState(
                    {
                      name: Date.now(),
                    },
                    () => {
                      eventCenter.publish(this.state.name);
                    }
                  );
                }}
              >
                修改
              </button>
            </div>
          );
        }
        componentDidMount() {
          console.log("one渲染完毕");
          eventCenter.publish(this.state.name);
        }
      }
      class Two extends React.Component {
        constructor() {
          console.log("开始初始化two");
          super();
          this.state = {
            recName: "",
          };
          eventCenter.subscribe(data => {
            console.log("Two收到数据:", data);
            this.setState({ recName: data });
          });
        }
        render() {
          return (
            <div className="two">
              <p>two组件</p>
              <p>收到数据: {this.state.recName}</p>
            </div>
          );
        }
      }
      class Three extends React.Component {
        constructor() {
          console.log("开始初始化three");
          super();
          this.state = {
            recName: "",
          };
          eventCenter.subscribe(data => {
            console.log("Three收到数据:", data);
            this.setState({ recName: data });
          });
        }
        render() {
          return (
            <div className="three">
              <p>three组件</p>
              <p>收到数据: {this.state.recName}</p>
            </div>
          );
        }
      }
      ReactDOM.render(<App />, document.getElementById("app"));
```

### 16. 虚拟 DOM 的优点是什么？diff 算法的优势是什么？什么是 diff 算法。

> - 虚拟 DOM 的优点：速度快，减小了页面渲染的次数。
> - diff 算法的优势：React 通过大胆的假设，制定对应的 diff 策略，将 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题。
> - a. 通过分层对比策略，对 tree diff 进行算法优化
> - b. 通过相同类生成相似树形结构，不同类生成不同树形结构以及 shouldComponentUpdate 策略，对 component diff 进行算法优化
> - c. 通过设置唯一 key 策略，对 element diff 进行算法优化
> - 综上，tree diff 和 component diff 是从顶层设计上降低了算法复杂度，而 element diff 则在在更加细节上做了进一步优化。
> - diff 算法：diff 算法的本质是找出两个对象之间的差异，目的是尽可能复用节点。算法的核心是子节点数组对比，思路是通过首尾两端对比 key 的作用 主要是决定节点是否可以复用建立 key-index 的索引,主要是替代遍历，提升性能

```
特点：同层对比：分为三种类型对比(虚拟DOM树的对比、组建的对比、列表元素的对比)

a. 虚拟DOM树的diff算法对比
  - 同层对比标签名称、标签属性、标签内容是否一致：不会跨层级对比。
  - 如果虚拟DOM出现跨层级移动，React直接将旧层级删除，在新的节点下创建新的层级元素。不会复用旧的DOM层级。

b. 组件的diff算法对比（结合动态组件）
  - 如果在重复render()生成虚拟DOM时，组建没有发生变化，此时组件就相当于固定的虚拟DOM树了，只是封装了一个组件而已。参照 虚拟DOM树的diff算法对比 规则。
  - 如果组件是动态切换的，React直接放弃对比，哪怕两个组件结构是一样的，直接将消失的组件DOM移除，出现的组件再创建新的DOM节点。（谁出现就创建谁，谁消失就销毁谁）。

c. 列表元素的diff算法对比（结合key）
  - 没有key属性的时候，React对比新旧虚拟DOM时，会按照元素的顺序对比元素内容是否发生变化，变化了就重新生成DOM。
  - 有key属性的时候，React对此新旧虚拟DOM时，会将两个key值相同的元素进行对比，看看元素内容是否变化，变化了就重新生成DOM。
```

### 17. shouldComponentUpdate 的作用。在项目中如何使用。

> - 它是 React 中唯一的一个性能优化钩子函数，如果项目性能没有问题，页面加载速度也比较快，这个钩子就不用使用了。

> - 它这个钩子要求返回布尔值，返回 true，就会调用当前组件的 render()，生成虚拟 DOM；返回 false，就不会调用当前组件的 render()，减少一些 JS 的计算过程。

### 18. react 对于引用类型的数据如何进行渲染优化。

> - 1. 如果引用数据类型的结构比较简单，可以借助于 {...this.state.user} 生成新对象；也可以借助于 JSON.parse(JSON.stringify(this.state.user)) 生成新对象； PureComponent 和 shouldComponentUpdate 都会正确识别对象是否发生变化。
> - 2. 这种展开运算符或者 JSON 的方式，对于修改后的数据和初始数据一致的情况，无法优化，也会 render。毕竟是通过生成新对象的方式解决组件不渲染的问题的。
> - 3. 如果是嵌套比较复杂，可以借助于 Immutable 不可变对象优化组件渲染。

### 19. Immutable 是什么。在 react 中的作用。

> - Immutable.js 出自 Facebook，是最流行的不可变数据结构的实现之一。它实现了完全的持久化数据结构，使用结构共享。所有的更新操作都会返回新的值，但是在内部结构是共享的，来减少内存占用(和垃圾回收的失效)。

在 react 中的作用：

> - 将 state 设为不可变对象，表示原始对象不可修改变化，一旦你对原始不可变对象产生了修改了行为，它会返回一个新的经过深拷贝之后的对象。一方面它会基于旧对象生成新对象；同时会对没有发生变化的节点数据进行内存共享，减少重复性的节点复制操作，减少内存浪费和 CPU 计算的消耗；

### 20. 组件树之间如何传值。具体代码实现思路。

### 21. Fragments 的作用。

> - `<React.Fragment>` 把它作为空标签使用，既不会额外的生成标签，又可以作为组件的根元素使用，起到包裹的作用。简写：`<></>`

### 22. PureComponent 类的作用。

> - 它是默认实现了 shouldComponentUpdate()钩子，内部会根据 props 和 state 是否发生变化，做出浅层对比，从而让当前组件或子组件进行渲染优化，提升性能。

### 23. 常用的生命周期钩子有哪些，以及各自的使用场景是什么。

constructor

> - 用于初始化内部状态，唯一可以直接修改 state 的地方

getDerivedStateFromProps

> - 1.当 state 需要从 props 初始化使用

> - 2.尽量不要使用：维护两者状态一致性会增加复杂度

> - 3.每次 render 都会调用

> - 4.典型场景：表单控件获取默认值

componentDidMount

> - 1.UI 渲染完成后调用

> - 2.只执行一次

> - 3.典型场景：获取外部资源

componentWillUnmount

> - 1.组件移除时被调用

> - 2.典型场景：资源

getSnapshotBeeforeUpdate

> - 1.在页面 render 之前调用，state 已更新

> - 2.典型场景：获取 render 之前的 Dom

componentDidUpdate

> - 1.每次 UI 更新时被调用

> - 2.典型场景：页面需要根据 props 变化重新获取

shouldComponentUpdate

> - 1.决定 VIrtual Dom 是否要重绘

> - 2.一般可以由 PureComponent 自动实现

> - 3.典型场景：性能提升

### 24. React-router 路由传值的方法有哪些。组件如何获取这些传递的参数。

> - 1.props.params（推荐）

```
//定义路由
<Route path='/user/:data' component={UserPage}></Route>
//设置参数
var data = {id:3,name:sam,age:36};
data = JSON.stringify(data);
var path = `/user/${data}`;
//传值
<Link to={path}>用户</Link>
//或
hashHistory.push(path);
//获取参数
var data = JSON.parse(this.props.params.data);
var {id,name,age} = data;
```

> - 2.query（类似 get，不推荐:刷新页面参数丢失）

```
//定义路由
<Route path='/user' component={UserPage}></Route>
//设置参数
var data = {id:3,name:sam,age:36};
var path = {
  pathname:'/user',
  query:data,
}
//传值
<Link to={path}>用户</Link>
//或
hashHistory.push(path);
//获取参数
var data = this.props.location.query;
var {id,name,age} = data;
```

> - 3.state（类似 post，不推荐，刷新页面参数丢失）

```
//设置路由
<Route path='/user' component={UserPage}></Route>
//设置参数
var data = {id:3,name:sam,age:36};
var path = {
  pathname:'/user',
  state:data,
}
//传值
<Link to={path}>用户</Link>
//或
hashHistory.push(path);
//获取参数
var data = this.props.location.state;
var {id,name,age} = data;
```

> 注意：
>
> - 1，获取参数时要用 this.props.match.params.name
> - 2，如果在子组件里打印要记得传 this.props，如下：

```
class Todolist extends Component {
    render() {
       return (
           <DocumentTitle title="todolist">
           <div id="home-container">
           <section>
              <TodolistList {...this.props}/> //不传的话this.props为空对象
           </section>
           </div>
           </DocumentTitle>
       );
    }
 }
export default Todolist;
```

### 25. 组件懒加载如何使用？优势是什么。

> 1.  import React, { lazy, Suspense } from "react";
> 2.  const Login = lazy(() => import("@views/Login/Login"));

> - 优势：优化用户体验。这样修改的组件是假定用户访问的可能性不高的页面，用户访问的可能性越低，使用懒惰加载的价值就越大。

### 26. React 中如何配置环境变量。

> - 在项目根目录创建 `.env` 文件。使用通过 %环境变量名%。例如：`REACT_APP_DEV_NAME = 开发测试`

### 27. React 中如何对路由进行登录权限控制。

1. 封装高阶组件，判断是否登录。如果 token 存在，则说明已登录，直接返回原来的页面组件，如果不存在利用 Navigate 重定向到登录页面，同时路径传参 `redirect`（登录成功后要返回的原来的页面路由）

```
import { Navigate } from "react-router-dom";

function AuthConfig(props) {
  let token = localStorage.getItem("token") || "";
  if (token) {
    // 登录了，给一级路由的element属性，传递目标组件
    return props.target;
  } else {
    // 没有登录，给一级路由的element属性，传递Navigate
    return (
      <Navigate
        to={`/login?redirect=${props.targetURL}`}
        replace={true}
      ></Navigate>
    );
  }
}
export default AuthConfig;
```

2. 路由配置时判断，需要判断的组件设置 element 时判断权限引入定义的高阶组件。

```
element={
  route.meta.auth ? (
    <AuthConfig
      target={route.component}
      targetURL={route.path}
    ></AuthConfig>
  ) : (
    route.component
  )
}
```

3. 登录组件处理登录成功要跳转的组件（获取之前传入的`redirect`，直接使用 navigate 跳转至所传路由）

```
localStorage.setItem("token", "123");
this.props.navigate(this.props.searchParams.get("redirect"), {
  replace: true,
});
```

### 28. React 高阶组件的概念。使用场景是什么。

高阶组件就是一个没有副作用的纯函数，且该函数接受一个组件作为参数，并返回一个新的组件。对组件的二次封装。

使用场景：

> - 1.react-redux 也是使用 HOC， connect 将应用 store 的值传递到“已连接” 的组件。
> - 2.自定义高阶组件，封装返回所需要的组件。如需要封装 react-router 方法 useNavigate，useLocation，useSearchParams，useParams 等，自己封装 withRouter 高阶组件。

### 29. 路由组件和普通子组件的使用场景区别。

1. 写法不同。 一般组件：`<Header />`，路由组件：`<Route path="/about" exact={false} element={<About />} />`

2. 存放位置不同。普通组件一般写在 components 文件下，路由组件一般写在 pages 文件下。

3. 接收到的 props 不同。路由组件会收到路由传递过来的三个固定的 props（path，element，exact），而普通组件则父组件传递什么，则收到什么 props。

### 30. HashRouter 和 BrowserRouter 的区别。

1. 底层原理不一样

> - BrowserRouter 使用的是 H5 的 history API，不兼容 IE9 及以下版本
> - HashRouter 使用的是 URL 的哈希值

2. url 表现形式不一样

> - BrowserRouter 的路径中没有#，例如 localhost:3000/demo/test
> - HashRouter 的路径包含#，例如 localhost:3000/#/demo/test

3. 刷新后对路由 state 参数的影响

> - BrowserRouter 没有任何影响，因为 state 保存在 history 对象中
> - HashRouter 的刷新后会导致路由 state 参数的丢失

注意：HashRouter 可以用于解决一些路径错误相关问题

### 31. Redux 的工作流程。

https://blog.csdn.net/weixin_46116626/article/details/124693939

![redux工作流程](https://img-blog.csdnimg.cn/75e02503f8374e88a1678083336f0d71.png)

> - 1）首先我们要确定我们要做什么
> - 2）让 Action Creators 创建 action（也就是你要做的事情）
> - 3）通过 dispatch 将 action 分发出去
> - 4）store 对要使用的 reducer 进行绑定，然后将 action 分发到对应的 reducer 上
> - 5）在 reducer 上进行相应的 action 操作并返回结果给 store
> - 6）组件就可以通过 store 的 API 像 store 进行获取操作返回的结果

### 32. Redux 如何处理异步 Action。

1. redux 默认是处理不了异步 action，对于异步的 action 来说，我们需要借助 redux 中间件 `redux-thunk` 来处理。

```
import reducers from "./reducer";
// 1. store负责串联React组件和Redux之间的工作，当用户在组件中要修改Redux的公共数据，需要触发action，store对象就会将这个action转发给reducer，让reducer根据用户触发的action，修改对应的state，store再将这个最新的state渲染到组件中。
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = createStore(reducers,applyMiddleware(thunk));

export default store;
```

2. 创建 action 函数不再返回一般对象，而是一个函数，在函数中写异步任务

```
function ipLocation(url) {
  return (dispatch) => {
    console.log("异步任务", dispatch, url);
    dispatch(setList([{ a: 1 }, { a: 2 }, { a: 3 }]));
  };
}
```

3. 在组件中使用

```
<button
  onClick={() => {
    // 此时dispatch(函数)分发的不再是对象，而是一个函数，此时需要借助于 redux-thunk 这个包处理这种方法。默认，dispatch(对象)只能分发action同步任务，里面只能是对象。
    dispatch(ipLocation("xxx"));
  }}
>
  异步 action
</button>
```

### 33. 组件中如何获取 Redux 中的数据以及如何修改数据。

1. `<Provider store={store}>` 包裹根组件，那么根组件内部的子组件，都可以访问 redux。类似于 Context 组件树传值。

2. 如果只获取单个数据，借助 combineReducers，在需要接收数据的组件中 通过 store.getState().reducer1 来获取 reducer1 中数据

### 34. React 中如何解决类名作用域冲突的问题。

> - 1. 采用 es6 模块化
> - 2. 采用立即执行函数，创建函数作用域

### 35. 列举一些 Less 和 Sass 语法的不同之处。

1、Less 在 JS 上运行，Sass 在 Ruby 上使用；

> - Sass 基于 Ruby，需要安装 Ruby。Less 和 Sass 在 Ruby 中构建相似，但它已被移植到 JavaScript 中。为了使用 LESS，我们可以将适用的 JavaScript 文件上载到服务器或通过脱机编译器编译 CSS 表。

2、两者编写变量的方式不同；

> - Sass 使用$，而 Less 使用@。

3、在 Less 中仅允许循环数值，而在 Sass 中可以遍历任何类型的数据；

> - 在 Sass 中，我们可以遍历任何类型的数据。但在 Less 中，我们只能使用递归函数循环数值。

4、Sass 有 Compass，Less 有 Preboot。

> - Sass 和 LESS 有可用于集成 mixins 的扩展（在整个站点中存储和共享 CSS 声明的能力）。

> - Sass 有适用于 mixins 的 Compass，其中包括所有可用的选项以及未来支持的更新。

> - LESS 有 Preboot.less，LESS Mixins，LESS Elements，gs 和 Frameless。LESS 的软件支持比 Sass 更加分散，导致许多不同的扩展选项可能不会以相同的方式运行。对于项目，我们可能需要所有列出的扩展以获得与 Compass 类似的性能。

### 36. React 如何解决跨域问题。

1. 在 src 目录下创建 setupProxy.js，配置 proxy

```
/* 此文件手动配置代理服务，默认名字路径，放在src目录下面----仅开发模式有效*/
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  console.log("手动注册代理服务");
  app.use(
    "/lqb",
    createProxyMiddleware({
      target: "https://www.lanqb.com",
      changeOrigin: true,
      pathRewrite: {
        "^/lqb": "",
      },
    })
  );
  app.use(
    "/baidu",
    createProxyMiddleware({
      target: "https://dev.baidu.com",
      changeOrigin: true,
      pathRewrite: {
        "^/baidu": "",
      },
    })
  );
};
```

2. cors 第三方包

### 37. Git 分支的使用。Git 冲突有哪几种情况？如何解决。

使用：

> - （1）git branch 分支名 ：创建分支；
> - （2）git branch -v ：查看分支；
> - （3）git checkout 分支名 ：切换分支；
> - （4）git merge 分支名 ：把指定分支名合并到当前分支上。

Git 冲突产生原因

> - 合并分支时，两个分支在同一文件的同一位置有着不同的修改，这时 git 无法替代我们保留哪一个，需要我们手动介入修改。

Git 冲突有以下几种情况：

简单来说就是本地修改的文件和目标远程库的同一个文件都有修改。这时无论是 pull 丶 push 丶 merge 时都会产生冲突。

1.不同分支下的 merge

> - 比如在不同分支下进行分支合并时，我们在本地修改了 a 文件并把 a 文件的修改 push 到了 test 分支下，接着我们切换到 master 分支下将 test 分支上的修改合并到当前 master 分支下时，如果 master 分支下的 a 文件也有修改的话，这时在进行 merge 也会产生冲突。（因为这个两个分支是不同步的，两个分支下的同一个文件都有修改）

2.同一个分支下的 pull 或 push

> - 比如在同一个分支下，对本地的 a 文件做出了修改，此时我们在进行 pull 或 push 时如果远程分支下下的 a 文件也有修改，那么代表本地和远程分支的代码是不同步的，此时也会引起冲突。

解决办法：

> - 1.Git 自动合并的情况：在执行 push 之前先进行 pull 操作。（多个成员修改不同的文件；多个成员修改相同文件不同区域；同时修改文件名和文件内容）
> - 2.用户手动合并：借助 mergetool 工具，`git mergetool`。（修改了同一文件的同一区域；不同成员对同一文件重命名）
> - 3.多人合并开发：提交代码执行顺序`commit → pull → push`

## 三、Hooks

### 1.useState 相关知识点

① useState 返回的更新数据函数被调用后，不会立刻拿到最新的结果。

```
const DemoState = (props) => {
/_ number 为此时 state 读取值 ，setNumber 为派发更新的函数 _/
let [number, setNumber] = useState(0) /_ 0 为初始值 _/
return (<div>
<span>{ number }</span>
<button onClick={ ()=> {
setNumber(number+1)
console.log(number) /_ 这里的 number 是不能够即使改变的 _/
} } ></button>

   </div>)
}
```

② 在函数组件中一次执行上下文中，state 的值是固定不变的。

```
function Index(){
    const [ number, setNumber ] = React.useState(0)
    const handleClick = () => setInterval(()=>{
        // 此时 number 一直都是 0
        setNumber(number + 1 )
    },1000)
    return <button onClick={ handleClick } > 点击 { number }</button>
}
function Index(){
    const [ number, setNumber ] = React.useState(0)
    const handleClick = () => setInterval(()=>{
        // 此时 number 一直都是 0
        setNumber(number + 1 )
    },1000)
    return <button onClick={ handleClick } > 点击 { number }</button>
}
```

③ 当使用 useState 返回的函数修改引用数据类型时，如何保证页面渲染？

> - 使用展开运算符来合并更新对象
> - JSON.parse(JSON.stringify(‘引用类型变量’ )) 进行数据的深拷贝

④ 当使用 useState 返回的函数修改基本数据类型时，如果值相同，页面是否会重新渲染？

> - 不会重新渲染，但是如果是事件中修改了值，前后不一样， 事件执行两次以上会执行 render 两次 。

⑤ 如何获取最新修改后的数据。

> - 作为参数传递出去
> - 使用 useEffect() 监听 state 变化
> - 自定义 hook（回调函数）

### 2.useEffect 如何保证首次加载组件时执行，后续加载组件不执行回调函数。

> - 添加空依赖项

### 3.useEffect 如何实现组件数据更新时的调用。

> - 将需要更新的数据添加到依赖项中

### 4.useEffect 如何实现组件卸载时的清理工作。

> - 添加 return 方法，并添加空依赖项

### 5.如果 useEffect 内部使用了外部的函数或者数据 state，但是没有在依赖项里做出设置，会出现什么情况。如何解决。

> - ① 尽可能将函数声明放在 useEffect 的内部，这样就不会构成闭包，从而解决控制台的警告，此时依赖项是无需操作的。
> - ② 如果一些公共的函数确实需要在其他的函数中使用，比如公共的请求，公共的工具性函数，此时可以将函数声明继续放在 useEffect 的内部，同时使用 useRef 的 current 属性保存这个函数，那么其它函数中就可以使用 current 来获取这个公共的内容进行调用。
> - ③ 如果公共函数确实需要放在 useEffect 外部，那此时在 useEffect 内部就会形成闭包环境，控制台会发出警告，让去设置依赖项，但是不能设置依赖项，可能会造成外部函数死循环调用，可以使用 useCallback 对公共函数进行缓存，将缓存后的函数放在依赖项中，从而解决警告，又可以避免外部函数形成死循环调用。

### 6.说一下 useContext 的作用，和工作方式。

useContext 可以帮助我们跨越组件层级直接传递变量，实现共享

> - 1.第一步父组件使用 React.createContext() 创建 Context 对象：
>   `const myContext = React.createContext(null);`
> - 2.使用 Context 对象.Provider 包裹子组件，使用 value 属性传值：
>   `<myContext.Provider value={{ setNum, num }}> <Child></Child> </myContext.Provider>`
> - 3.子组件使用 useContext 获取传入的值：
>   `const { setNum, num } = useContext(myContext);`

### 7.Hooks 中的组件渲染优化相关

(1)React.memo 的特性

> - ① 它类似于类组件中的 PureComponent，可以对父组件传递过来的 prop 数据是否发生改变进行浅层比较，如果 prop 发生了改变就渲染子组件，prop 没有发生改变，子组件就不会渲染。
> - ② 它只对比 prop，不会对当前组件的 state 进行对比。

(2)useCallback 的特性

> - ① 它会对函数进行缓存，返回缓存后的函数。
> - ② 当父组件的函数需要传递给子组件进行子组件向父组件传值时，由于传递的是普通函数，当父组件渲染时，会重新生成一个新函数，此时子组件的 React.memo 就不起作用了，需要使用 useCallback 将缓存后的函数传递过去，React.memo 才能发挥作用。
> - ③ 当组件内的某个函数必须要作为依赖项时，需使用 useCallback 进行缓存。

### 8.useMemo 的作用。

> - 它的第一个参数是函数，这个函数的返回值就是 useMemo() 要缓存的结果，一旦结果被缓存，后续组件中有连续使用这个结果的时候，直接读取缓存的值，不会重新计算。

### 9.useRef 的作用。

> - (1)用于操作 DOM。
> - (2)充当全局的公共变量，保存任意数据至 current 中。且 useRef 每次返回的都是上一次修改的最新数据，不管组件如何渲染，current 里面的数据都不会重新初始化。

### 10.useReducer 的作用。

> - 以 redux 工作流的形式，来维护当前组件的数据声明及修改功能。是 useState 的替代方案。

### 11.是否使用过 useReducer 搭配 useContext 来自己封装一个类似于 Redux 的公共状态管理的工具。

1.使用 createContext 创建 context，其中初始化了 state 的类型 和 actions 的种类。

```
export const initState = {
  color: "blue"
};

export const ColorContext = createContext({
  state: initState,
  actions: {
    updateColor: (color: string): void => {}
  }
});
```

2.创建 reducer 去处理不同类型的 action。

```
export enum ColorActionTypes {
  UPDATE_COLOR = "UPDATE_COLOR"
}

export const reducer = (state, action) => {
  switch (action.type) {
    case ColorActionTypes.UPDATE_COLOR:
      return {
        ...state,
        color: action.color
      };
    default:
      return state;
  }
};
```

3.构建一个高阶的 Provider 组件，使用 useReducer 去构建初始状态并获取到 dispatch 函数，使用 dispatch 函数去发送不同的 action 到 reducer 对状态进行自动处理。

```
import { FC, useReducer } from "react";

import { ColorContext, reducer, initState, ColorActionTypes } from "./utils";

const ColorProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const updateColor = (color: string) =>
    dispatch({
      type: ColorActionTypes.UPDATE_COLOR,
      color
    });
  const actions = {
    updateColor
  };
  return (
    <ColorContext.Provider value={{ state, actions }}>
      {children}
    </ColorContext.Provider>
  );
};

export default ColorProvider;
```

4.自定义一个 hook，里面使用 useContext 获取到 state 和 actions，根据场景抛出某些 state 和 某些 actions。

```
export const useColorContext = () => {
  const { state, actions } = useContext(ColorContext);
  const updateColor = (color) => actions.updateColor(color);
  return {
    color: state.color,
    updateColor
  };
};
```

5.在项目主入口文件使用高阶的 Provider 组件进行包裹，另外在需要使用 state 和 actions 的地方调用自定义的 hook 即可。

```
export default function App() {
  return (
    <div className="App">
      <ColorProvider>
        <Text />
        <Button />
      </ColorProvider>
    </div>
  );
}
```

Button 组件导入 useColorContext 使用 updateColor action 去更新状态

```
import React from "react";

import { useColorContext } from "./utils";

const Button = (props) => {
  const { updateColor } = useColorContext();
  return (
    <div>
      <button
        style={{ color: "red" }}
        onClick={() => {
          updateColor("red");
        }}
      >
        Red
      </button>
      <button
        style={{ color: "blue" }}
        onClick={() => {
          updateColor("blue");
        }}
      >
        Blue
      </button>
    </div>
  );
};

export default Button;
```

Text 组件导入 useColorContext, 使用 color 状态

```
import React from "react";
import { useColorContext } from "./utils";

const Text = (props) => {
  const { color } = useColorContext();
  return <div style={{ color: color }}>字体颜色为：{color}</div>;
};

export default Text;
```

### 12.useImperativeHandle 的作用。

> - useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。
> - useImperativeHandle 应当与 forwardRef 一起使用：可以实现子组件向父组件暴露方法和属性，让父组件可以直接使用子组件的属性和方法。

### 13.React.forwardRef 是什么？使用场景？

React.forwardRef 会创建一个 React 组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中。React.forwardRef 接受渲染函数作为参数。React 将使用 props 和 ref 作为参数来调用此函数。此函数应返回 React 节点（组件）。

使用场景：

> - 转发 refs 到 DOM 组件
> - 在高阶组件中转发 refs

### 14.useLayoutEffect 是什么？与 useEffect 的区别？

其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。

> - useEffect 是异步执行的，而 useLayoutEffect 是同步执行的。
> - useEffect 的执行时机是浏览器完成渲染之后，而 useLayoutEffect 的执行时机是浏览器把内容真正渲染到界面之前，和 componentDidMount 等价。

### 15.react 路由中都提供了哪些 hooks 的用法。各自的作用是什么。如何使用。

> - useNavigate：可以重定向
> - useLocation：获取 location 对象
> - useSearchParams：设置 url 中的查询参数
> - useParams：获取动态路由参数值

### 16.redux 中提供了哪些 hooks 的用法。各自的作用是什么。如何使用。

> - useSelector()：从 Redux 存储状态中提取数据
> - useDispatch()：从 Redux 存储中返回对函数的引用，使用它来调度操作

## 四、扩展

### 1.面试官：为什么说 Vue 的响应式更新比 React 快？

[（原理深度解析） | 码农家园 (codenong.com)](https://www.codenong.com/j5e854a5e51882573954/)

### 2.前端页面渲染 100000 条数据如何进行优化？

[知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/505873741)

### 3.LocalStorage 扩容

[\_东方的 csdn 的博客-CSDN 博客\_localstorage 扩容](https://blog.csdn.net/qq_22930381/article/details/104830957)

### 4.localStorage 存满了怎么办？

[\_weixin_30905133 的博客-CSDN 博客](https://blog.csdn.net/weixin_30905133/article/details/99648550?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2~default~CTRLIST~default-1-99648550-blog-120114688.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2~default~CTRLIST~default-1-99648550-blog-120114688.pc_relevant_default&utm_relevant_index=1)

### 5.前端大容量缓存方案

[IndexedDB - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/104536473)

### 6.前端性能优化小结（面试干货）

[知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/115047733)

### 7.双 token 校验机制

[*Markov Zheng 的博客-CSDN 博客*双 token 机制](https://blog.csdn.net/marko_zheng/article/details/121339402)

### 8.react 中使用 pubsub-js 实现消息的发布订阅

[知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/89015701)

### 9.使用 customize-cra 修改 webpack 配置

[\_杏子\_1024 的博客-CSDN 博客](https://blog.csdn.net/weixin_44135121/article/details/109850564)

### 10.(Redux Toolkit)

[入门 Redux | Redux 中文官网](http://cn.redux.js.org/introduction/getting-started/)

### 11.flux 和 redu 区别。

1. Redux 只有一个 store

> - Flux 里面会有多个 store 存储应用数据，并在 store 里面执行更新逻辑，当 store 变化的时候再通知 controller-view 更新自己的数据，Redux 将各个 store 整合成一个完整的 store，并且可以根据这个 store 推导出应用完整的 state。同时 Redux 中更新的逻辑也不在 store 中执行而是放在 reducer 中。

2. Redux 没有 Dispatcher

> - Redux 中没有 Dispatcher 的概念，它使用 reducer 来进行事件的处理，reducer 是一个纯函数。它根据应用的状态和当前的 action 推导出新的 state。Redux 中有多个 reducer，每个 reducer 负责维护应用整体 state 树中的某一部分，多个 reducer 可以通过 combineReducers 方法合成一个根 reducer，这个根 reducer 负责维护完整的 state，当一个 action 被发出，store 会调用 dispatch 方法向某个特定的 reducer 传递该 action，reducer 收到 action 之后执行对应的更新逻辑然后返回一个新的 state，state 的更新最终会传递到根 reducer 处，返回一个全新的完整的 state，然后传递给 view。

Redux 和 Flux 之间最大的区别就是对 store/reducer 的抽象，Flux 中 store 是各自为战的，每个 store 只对对应的 controller-view 负责，每次更新都只通知对应的 controller-view；而 Redux 中各子 reducer 都是由根 reducer 统一管理的，每个子 reducer 的变化都要经过根 reducer 的整合。用图表示的话可以像这样：

Flux 中的 store：

![Flux 中的 store](https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3789610282,2506778842&fm=173&s=70B6A8725EC48619DB3E7E100300D0E8&w=640&h=331&img.PNG)

Redux 中的 store：

![Redux 中的 store](https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=130914051,2215190264&fm=173&s=78A4A8525C00961BDA367A10030010EC&w=639&h=305&img.PNG)

### 12.直播推拉流。

[参考网址](https://www.cnblogs.com/yangchin9/p/14930995.html)

![推拉流](https://img2020.cnblogs.com/blog/1460021/202106/1460021-20210625150320546-397345546.png)

### 13.React Router v5 和 v6 的比较。

[参考：React Router 以及版本 6 与版本 5 的区别](https://blog.csdn.net/m0_59129742/article/details/123969030?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-123969030-blog-122785925.pc_relevant_multi_platform_featuressortv2dupreplace&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-123969030-blog-122785925.pc_relevant_multi_platform_featuressortv2dupreplace&utm_relevant_index=1)

> - 1. v6 中 `Switch` 名称变为 Routes。
> - 2. v6 `<Route>` 不再支持子组件，改为使用 `element` 属性。
> - 3. v6 中， `exact` 属性不再需要。
> - 4. v6 中，`Route` 先后顺序不再重要，`React Router` 能够自动找出最优匹配路径。
> - 5. v6 保留 `Link`， `NavLink`， 但是 `NavLink` 的 `activeClassName` 属性被移除。
> - 6. v6 移除 `Redirect`组件，改为使用 `Navigate`重定向。
> - 7. v6 嵌套路由改为相对匹配。
> - 8. v6 用 `useNavigate` 实现编程式导航，`useHistory` 被移除。
> - 9. 缺点： v6 目前没有 `Prompt` 组件阻止不期望的导航。

### 14.js 中的副作用？

> - 副作用让函数变得不纯。如果依赖于外部状态就无法保证输出相同，就会带来副作用。
> - 副作用的来源：配置文件、用户的输入、数据库等等
> - 所有的外部交互都有可能产生副作用，副作用会给程序带来安全隐患和不确定性，要尽可能的控制副作用在可控制的范围内发生。

### 15.数据劫持？作用？如何使用？

在使用或者设置某的对象的属性的时候，通过一系列的代码拦截此次的行为。即可以在赋值过程中添加一些操作或者修改返回的结果。

双向绑定

比较典型的是 `Object.defineProperty()` 和 ES2015 中新增的 `Proxy` 对象。

五、Hooks 补充面试题

### 1.为什么 useState 要使用数组而不是对象？

因为 useState 使用的是 es6 的解构赋值。

数组和对象解构赋值的区别：

> - 数组的元素是按次序排列的,数组解构时变量的取值由数组元素的位置决定,变量名可以任意命名。
> - 数组的元素是按次序排列的,数组解构时变量的取值由元素的位置决定,变量名可以任意命名。
> - 对象的属性则没有次序,解构时变量名必须与属性同名才能取到正确的值
> - 因此使用数组会更灵活,可以任意命名 state 和修改 state 的方法

### 2.为什么 React hook 判断语句内不能使用 useEffect？

> - hooks 渲染是从上到下依次执行，在 if 语句内使用的话，由于第一次未执行到 useEffect，后面 render 时却又突然检测到了，就会导致控制台报错（可以理解成渲染时突然发现一个未知的 useEffect，老版本不会报错，但是新版本将这个问题修复了所以控制台会报错）。
> - 即使在 if 语句后面添加 else，由于第一次执行了 else 语句内的 useEffect，且无依赖只能执行一次，所以即使后面渲染时执行了第一个 useEffect（if 内的），但实际上并不会去执行他，因此虽然不会报错但是代码的执行不符合我们想要的。
