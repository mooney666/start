# Javascript 高级笔记（ES）

## 一、JavaScript 面向对象
### 1. 面向对象编程介绍
> 面向过程：将问题分解成步骤，一步一步实现。(C 语言是对位/管脚进行操作)买菜，切菜，做菜。
>
> 面向对象：某个人，做个某件事件。厨师可以做饭。
1. 面向对象的优点:
    - 每个对象是一个功能模块，明确分工。
    - 灵活，容易维护，复用度高，适合大项目的开发。
2. 特性：
    - 封装:
    - 继承：
    - 多态:  
### 2. ES6中的类和面向对象
    类是泛指，抽象的。对象是具体的。
    对象：一个具体的事物。如我的手机。对象是一组无序相关属性的集合。如，数组，字符串。
        对象的成员：
            属性：事物特征，在对象中用属性来表示。常用名词
            方法：事物的行为，在对象中用方法表示。常用动词。
           
    类： class 关键字声明。可以实例化对象。
- 类抽象了对象的公共部分，泛指一大类。
- 对象特指某一个，通过类实例化一个具体的对象。(对象也称实例)

---
    ES6:
	    ES 的全称是 ECMAScript ,它是由ECMA国际标准组织，指定的一套脚本语言的标准化规范。 
	    JavaScrip 是 Netscape(网景:做浏览器的公司)公司根据ES标准实现的一种具体语言。
	    JScript是微软对根据ES标准实现的一种具体语言。
	    类比：USB 接口的标准，长宽高、4个管脚、电压。具体的产品有键盘、鼠标、充电、优盘。
	ES6 泛指 2015年，及其之后的版本。
			
	为何学习ES6:
		1. 语言向着易学、健壮的方向发展。比如变量必须声明、箭头函数、类的继承、块级作用域。
		2. 借鉴其它语言的新语法，同时使 js 更加严谨。

---

    创建类(用 class 声明)
            语法结构：
                class 类名 {
                    constructor(){

                    }
                }

            类是对事物的抽象，如下特点：   
                1. 有两个成员，属性、方法。
                2. 构造函数，给对象动态添加属性。并返回该对象。   
            
            创建对象
            var 对象名 = new 类名();

```
class Hero {
            constructor(name, skill, level) {
                this.name = name;  
                this.skill = skill;
                this.level = level;
            }

            play(game) {
                console.log(`我喜欢玩${game}`);
            }
            gank() {
                console.log(`一起去抓人`);
            }
        }

        let lvbu = new Hero('吕布','天崩地裂','18');
        console.log(typeof lvbu);
        console.log(lvbu);
        console.log(lvbu.name);
        lvbu.gank();
        lvbu.play('吃鸡');
```
> 1. 通过 class 关键字声明类。大驼峰的命名规范。
> 2. constructor() 是构造函数，接收参数，并对属性进行初始化，然后返回这个对象。
> 3. new 关键字，创建对象。new 的本质是申请内存空间。
> 4. 方法的声明，省略 function
> 5. 多个函数不需要 逗号切割。
### 3. 类的继承

```
        class Person {
            constructor(name, age) {
                this.age = age;
                this.name = name;
            }

            play() {
                console.log('今晚吃鸡');
            }
        }
        class Student extends Person {

        }

        let eason = new Student('eason',22);
        // 子类继承了父类的构造函数
        console.log(eason.name);
        // 子类继承了父类的方法
        eason.play();
        /* 
            继承: extends 关键字
                语法:
                     class 子类名 extends 父类名 {

                    }
            继承：子类继承了父类成员(属性和方法);        
        */
```
- Object 是所有类的父类，根类，超类。
- 默认所有的类都继承了 Objcet
- Object 都有一个无参构造函数。
```
        class Phone extends Object {
            call() {
                console.log('我要打电话');
            }
        }

        let hw = new Phone();
        hw.call();
```
###### ==super关键字继承调用父类属性方法==

```
        class Father {
            // 1. 把父类的无参构造函数继续了重新。

            // 2. 一个类里面只能有一个构造函数
            //    函数的实参和形参的个数可以不一致，
            //    此时编译器无法判断调用的是哪一个构造函数
            // constructor(sex) {
            //     this.sex = sex;
            // }
            constructor(age, sex) {
                this.age = age;
                this.sex = sex;
            }
            play() {
                console.log('father 在赚钱');
                return 100;
            }
        }
        class Son extends Father {
            /* 
                Must call super constructor in derived class 
                before accessing 'this' or returning from 
                derived constructor
                子类的构造函数添加属性时，必须通过 super 调用父类的构造函数
            */
            constructor(age, sex, school) {
                // 4. 子类继承父类后，构造函数中，必须先调用父类的构造函数
                super(age, sex);
                this.school = school;
                // this.age = 22;
                // 5. 构造函数中必选先调用父类的构造函数，再执行自己的逻辑
                //    防止代码冲突，违反了就近原则
                // super(age, sex);
            }
            game() {
                // this.play();
                // 3. 调用父类的方法 super
                let money = super.play();
                if (money > 10) {
                    console.log('我要买装备');
                }
                console.log('son 打电脑游戏');
            }
        }

        let eason = new Son(22, '男', '郑州大学');
        console.log(eason);
        eason.game();
```

```
Son {age: 22, sex: '男', school: '郑州大学'}
father 在赚钱
我要买装备
son 打电脑游戏
```
> 使用类注意点：
> 1. 类没有变量提升。只能先声明后使用
> 2. 类中的方法调用对象的属性，需要加 this
> 3. this指向问题（一般在类中是实例化的调用者）
## 二、构造函数和原型
### 1. 构造函数
> 构造函数是一种特殊的函数，主要作用是初始化对象，即为对象动态地添加属性
> 
> 和 ==new== 关键字一起使用 创建对象
>
> 语法糖：两种方法可以实现同一种功能，简单、便捷、清晰那种写法，称为语法糖
### 2. 静态成员和实例成员

```
        function Star(name, age) {
            this.name = name;
            this.age = age;
            // 函数已经封装好了，不建议再次修改
            // this.country = '中国';
            this.sing = function () {
                console.log('我要开演唱会');
            }
        }

        let jay = new Star('周杰伦', 22);
        let eason = new Star('陈奕迅', 18);
        let sun = new Star('孙红雷', 21);

        // js 动态给对象添加属性
        // jay.country = '中国';
        // eason.country = '中国';
        // sun.country = '中国';
        // 问题：如果有100对象，怎么办？如果中国改为 china 怎么办？

        // console.log(eason.country);

        Star.country = '中国';
        console.log(Star.country);
        console.log(eason.country);
        // 通过对象查找构造函数。

        // country 是静态成员，所有对象都可以通过构造函数共享
        // age name 是普通成员，每个对象私有的属性。
```
### 3. 原型
###### 1. 原型对象 prototype
    js 规定：
        1. 构造函数(对象/实例)，有一个prototype 属性，prototype 也是一个对象
        2. prototype 这个对象的所有属性和方法都是构造函数的实例化的对象
    总结:
        1. 原型是什么:
            原型是一个对象.每一个构造函数都有这个属性.
        2. 原型的作用:
            构造函数的实例, 共享属性和方法.

```
        function Star(name, age) {
            this.name = name;
            this.age = age;
            this.play = function () {
                console.log('我要开演唱会-----');
            }
        }
        let eason = new Star('eason', 22);
        let jay = new Star('jay', 20);
        console.log(Star instanceof Function); // true
        eason.play();
        jay.play();

        console.log(eason.play === jay.play); // false
        //每个对象都有一个独立的 play 函数
        // 如果有100个对象，则有100个play 函数，就造成了内存空间的极大浪费

        console.log('-----------------------');
        console.dir(Star);
        console.dir(Star.prototype);

        Star.prototype.country = '中国';
        Star.prototype.game = function () {
            console.log('今晚吃鸡---');
        }
        console.dir(eason);
        console.log(eason.country); // 中国
        eason.game();

        console.log(jay.country);
        jay.game();

        console.log(jay.game === eason.game);
```

###### 2. 对象原型 __proto__
    1.每个对象都会有一个属性 __proto__,
    2.指向了构造函数的 prototype (显式原型)
    
    注意：
        对象执行方法时，先查看自己是否有这个方法，没有则查看隐式原型

```
        function Star(name, age) {
            this.age = age;
            this.name = name;
            this.sing = function () {
                console.log('这瓜保熟吗？');
            }
        }

        Star.prototype.game = function () {
            console.log('今晚吃鸡');
        }

        let eason = new Star('eason', 22);
        eason.sing();
        eason.game();

        console.log(eason);

        console.log(eason.__proto__);
        console.log(eason.__proto__ === Star.prototype);
```
###### 3. constructor 构造函数
    对象原型(__proto__)和构造函数原型对象都有一个属性 constructor 属性，
    我们称为构造函数，因为它指向构造函数本身。==说明对象是如何被创建的==。
    如果修改了原型对象，则constructor被清空了。需要手动指回原有的构造函数

```
        function Star(name, age) {
            this.name = name;
            this.age = age;
        }

        console.log(Star.prototype);
        
        // 对象的等效写法
        // 赋值，进行了覆盖
        Star.prototype = {
            // 由于赋值的写法，把 constuctor 给清空了
            // 需要手动的添加这个属性，指向原来的构造函数
            
            constructor: Star,
            sing: function () {
                console.log('sing');
            },
            game: function () {
                console.log('game');
            }
        }
        let eason = new Star("eason",22);

        console.log(Star.prototype);

        console.log(eason.__proto__);
```
###### 4. 构造函数、实例、原型对象之间的关系
```
graph LR
id1(Star构造函数)
id2(Star原型对象prototype)
id3(jay对象实例)
id1-->|jay.__proto__.prototype|id3
id3-->|jay.__proto__|id2
id1-->|Star.prototype|id2
id2-->|Star.prototype.constructor|id1
```
###### 5. 原型链
```
graph LR
id1(Star构造函数)
id2(Star原型对象prototype)
id3(jay对象实例)
id4(Object原型对象prototype)
id5(Object构造函数)
id6(null)
id1-->|jay.__proto__.prototype|id3
id3-->|jay.__proto__|id2
id1-->|Star.prototype|id2
id2-->|Star.prototype.constructor|id1
id2-->|Star原型对象.prototype.__proto__|id4
id5-->|Object.prototype|id4
id4-->|Object原型对象.prototype.__proto__|id6
```
###### 6. 原型链成员查找规则
>- 就近原则

```
        // 原型链：类的继承关系。
        //     当前对象如果没有这个方法，则查找父类的方法。
        //     就近原则

        function Star(name, age) {
            this.name = name;
            this.age = age;
        }
        let eason = new Star('eason', 22);

        // eason.sex = "男";
        // Star.prototype.sex = '女';
        // Object.prototype.sex = "male";

        console.log(eason.sex);

        console.log('-----------toString()-----------------------');

        console.log(Object.prototype);  // 有一个 toString()
        console.log(Star.prototype);    // 没有 toString()
        console.log(eason);             // 没有 toString()

        console.log('--------------------------');
        console.log(eason.toString());
        // Object 是所有类的超类，把常见的方法写好了，子类重写即可。
```
###### 7. 原型对象 this 指向
>- 原型对象的 this 指向当前实例对象。

```
        function Star(name, age) {
            this.name = name;
            this.age = age;
            // 构造函数的 this 指向当前实例对象
            console.log(this);
        }
        let eason = new Star('eason', 22);

        let that;
        // 原型对象的 this 指向当前实例对象。
        Star.prototype.sing = function (){
            console.log("原型对象的 sing ");
            console.log(this);
            that = this;
        };

        eason.sing();
        console.log(eason === that);
```
###### 8. 扩展内置对象
>- 利用 prototype 自定义对象方法

```
        // prototype 的属性和方法是实例对象共享的
        // 原型对象的应用,扩展内置对象方法
        console.log(Array.prototype);

        let arr = [1, 3, 5, 7, 9];
        // arr.sum();

        Array.prototype.sum = function () {
            let result = 0;
            for (let i = 0; i < this.length; i++) {
                result = result + this[i];
            }
            return result;
        }

        console.log(arr.sum());

        // 这样写会把之前的方法覆盖掉
        // Array.prototype = {
        //     constructor: Array,
        //     sum: function () {
        //         let result = 0;
        //         for (let i = 0; i < this.length; i++) {
        //             result = result + this[i];
        //         }
        //         return result;
        //     }
        // }
```
## 二、继承
>- ES6之前并没有为我们提供 extends 继承，通过<html><span style="color:red;font-style:italic;">构造函数+原型对象</span></html>模拟实现继承，称为组合继承
### 1. call()
>- 调用函数
>- 修改函数的 this 指向

```
        function fn(x, y) {
            console.log("我想喝咖啡");
            console.log(this);
            console.log(x + y);
        }
        var obj = {
            name: 'coco'
        }
        fn(3, 5);
        // 1. call() 可以调用函数
        // fn.call();
        
        // 2. call() 可以改变这个函数的 this 指向,
        fn.call(obj, 3, 5);
```
> fn(3, 5) 输出结果：
```
我想喝咖啡
Window {window: Window, self: Window, document: document, name: '', location: Location, …}
8
```
> fn.call(obj, 3, 5) 输出结果：
```
我想喝咖啡
{name: 'coco'}
8
```
### 2. 组合继承
>- 借用构造函数继承父类型属性和方法
>- 核心原理：
>   通过 call() 把父类型的 this 指向子类型的 this。

```
        // 1.1 父构造函数
        function Father(uname, age) {
            // this 指向父构造函数的对象实例
            this.uname = uname;
            this.age = age;
        }
        // 父构造函数的共有方法
        Father.prototype.money = function () {
            console.log('打工赚钱');
        }

        // 1.2 子构造函数
        function Son(uname, age, score) {
            // this 指向子构造函数的对象实例
            Father.call(this, uname, age);
            this.score = score;
        }

        // 2.1 子构造函数的原型对象指向父构造函数的一个实例
        Son.prototype = new Father();
        // 2.2 赋值就会覆盖，因此需要 constructor 指向原来的构造函数
        Son.prototype.constructor = Son;

        let son = new Son('son', 22, 99);
        let father = new Father('father', 22);

        son.money();
        console.log('--------------------');
        Son.prototype.game = function (){
            console.log('我要打游戏');
        }

        son.game();
        // 只是给 Father 的一个实例对象添加了方法。
        // 不影响 Father 的其它实例对象
        father.game();
```
## 三、ES5 中的新增方法
### 1. 数组方法
###### 1. 数组遍历 forEach

```
        let arr = [11, 8, 4, 12, 5];

        let sum = 0;
        arr.forEach((value, index, array) => {
            console.log(value, index, array);
            sum = sum + value;
        });

        console.log(sum);
```

```
11 0 (5) [11, 8, 4, 12, 5]
8 1 (5) [11, 8, 4, 12, 5]
4 2 (5) [11, 8, 4, 12, 5]
12 3 (5) [11, 8, 4, 12, 5]
5 4 (5) [11, 8, 4, 12, 5]
40
```
###### 2. 遍历数组 map
>- 返回新数组

```
        var array1 = [1, 4, 9, 16];
        const map1 = array1.map((x) => {
            // return 的意思是，将元素加工后，放入新的数组
            return x * 2;
        }
        );
        console.log(map1);
```

```
(4) [2, 8, 18, 32]
```

###### 3. 筛选数组 filter
>- 返回新数组
```
        let arr = [11, 8, 4, 12, 5];
        
        let arr1 = arr.filter((value, index, array) => {
            console.log(value, index, array);
            return value > 10;
        });

        console.log(arr1);
```
```
11 0 (5) [11, 8, 4, 12, 5]
8 1 (5) [11, 8, 4, 12, 5]
4 2 (5) [11, 8, 4, 12, 5]
12 3 (5) [11, 8, 4, 12, 5]
5 4 (5) [11, 8, 4, 12, 5]
(2) [11, 12]
```
###### 4. 查找是否存在满足条件 some
>- 返回布尔值
>- 如果找到第一个满足条件的元素,则终止循环.不再继续寻找 
```
        var arr = [10, 30, 15, 22];
        // 需求：数组中是否有大于 20 的 数
        let flag = arr.some(function (value) {
            console.log(value);
            if (value > 20) {
                return true;
            }
        });
        console.log(flag);
```
```
10
30
true
```
###### 5. 判断是否所有值满足条件 every
>- 返回布尔值
>- 如果找到第一个不满足条件的元素,则终止循环.不再继续寻找 
```
        var arr2 = [1, 3, 5, 17, 9, 10];
        var b = arr2.every(function (val, index, arr) {
            console.log(val);
            // return true,代表某个元素符合了条件。
            return val <= 10;
        })
        console.log(b)
```

```
1
3
5
17
false
```
### 2. 字符串方法
###### 去除字符串两侧空格 trim

```
        var str = '    andy  coco  ';
        console.log(str.trim());
```

```
andy  coco
```
### 3. 对象方法
###### 1. 获取对象自身所有属性 Object.keys()

```
        let phone = {
            id: 1,
            pname: '小米',
            num: 200,
            price: 199
        }
        // 1. 传统方法遍历对象
        for (var k in phone) {
            console.log(k + "--" + phone[k]);
        }

        // 2. for  in 遍历数组
        let arr = ['张飞', '张辽', '关羽', '吕布', '曹操'];
        for (var i in arr) {
            console.log(i, arr[i]);
        }

        // 3. Object.keys(obj); 获取对象属性名,返回是一个数组.即所有的属性保存到该数组 
        let result = Object.keys(phone);
        console.log(result);
        for (let index in result) {
            console.log(result[index], phone[result[index]]);
        }

        result.forEach(value =>{
            console.log(value,phone[value]);
        });
```
###### 2. 定义新属性或修改原有属性 Object.defineProperty(obj, prop, descriptor)
>Object.defineProperty(obj, prop, descriptor) : 属性操作配置
>- obj : 目标对象 必填
>- prop: 属性名 必填
>- descriptor: 目标属性的特性，对象的形式存在 必填
>
>descriptor  参数说明
>- value: 该属性,有则修改,无则新增. 设置属性的值,默认 undefined
>- writable: 值是否可以修改. 默认 false
>- enumerable: 是否允许遍历. 默认是true(新增的默认是 false)
>- configurable: 是否可以通过 Object.defineProperty 对实例再次配置.true| false, 默认是false 

```
        // 新增属性
        Object.defineProperty(obj, "price", {
            value: 9999,
        });

        // 修改属性
        Object.defineProperty(obj, "color", {
            value: "red",
        });
        console.log(obj);

        // 如果是 false 不允许修改这个属性值,默认 false
        //  true 可以修改， false 不能修改
        Object.defineProperty(obj, "id", {
            writable: true
        });
        obj.id = 123;


        // 是否允许遍历, true 不允许遍历 false 允许遍历
        //   (新增的默认是 false)
        Object.defineProperty(obj, "pname", {
            enumerable: false
        });

        console.log(Object.keys(obj));

        // 是否可以通过 Object.defineProperty 对实例再次配置(删除或者修改特性)
        // true 允许再次配置， false 不允许再次配置
        Object.defineProperty(obj, "price", {
            configurable: false
        });

        // delete obj.price;
        Object.defineProperty(obj, "price", {
            value: 7777,
            writable: true,
            enumerable: false,
            configurable: true
        });

        console.log(obj);
```
## 四、函数进阶
### 1. 函数定义和调用
#### 1. 函数的定义方式
> 1. 函数声明方式 function 关键字(命名函数)
> 2. 函数表达式(匿名函数)
> 3. 利用 new Function('参数1', '参数2', ...'参数n', '函数体');
>- 所有的函数都是 Function 的实例(对象)
>- Object 是所有类的根类

```
    // 1. 自定义函数(命名函数)
    function fn() { }

    // 2. 函数表达式(匿名函数)
    let fn1 = function () { };

    // 3. 利用 new Function('参数1', '参数2', ...'参数n', '函数体');
    // 参数都是字符串
    let fn2 = new Function("a", "b", "c", "console.log(a + b+c)");
    fn2(2, 6, 1);

    // 4. 所有的函数都是 Function 的实例(对象).
    // 函数的本质也是对象(万物皆对象)
    console.log(fn2 instanceof Function); // 都是 Function 的实例对象

    // 5. Object 是所有类的根类
    console.dir(fn2); // 也有原型对象  也有属性和方法
    console.log(fn2 instanceof Object);
```
#### 2. 函数的调用方式

```
    // 1. 普通函数
    function fn() {
      console.log("普通函数");
    }
    fn(); // window 默认省略

    // 2. 对象的方法
    let obj = {
      sayHi: function () {
        console.log("对象的方法");
      }
    };
    obj.sayHi();

    // 3. 构造函数
    function Star() {
      this.sing = function () {
        console.log("sing");
      };
    }
    let jay = new Star();
    jay.sing();

    // 4. 绑定事件函数
    // let btn = document.querySelector('button');
    // 系统给 btn 添加一个 onclick 属性，值是 null
    // console.dir(btn);

    // 本质就是给 onclick 属性赋值
    $("button").on("click", () => {
      console.log("明天去看德云社");
    });
    // 4.1 主动调用
    $("button").click();
    // 4.2 点击按钮调用

    // 5. 定时器函数
    setInterval(function () {
      console.log("定时器");
    }, 1000);

    // 6. 立即执行函数
    (function () {
      console.log("立即执行函数");
    })();
```
### 2. this 的指向
>-  普通函数 —— window
>-  构造函数 —— 实例对象
>-  对象方法 —— 该方法所属的对象
>-  绑定事件函数 —— 绑定事件对象
>-  定时器函数 —— window
>-  立即执行函数 —— window
##### 1. 改变函数内 this 指向
###### 1. call()
>- 调用函数
>- 修改函数的 this 指向

```
        function fn(x, y) {
            console.log("我想喝咖啡");
            console.log(this);
            console.log(x + y);
        }
        var obj = {
            name: 'coco'
        }
        fn(3, 5);
        // 1. call() 可以调用函数
        // fn.call();
        
        // 2. call() 可以改变这个函数的 this 指向,
        fn.call(obj, 3, 5);
```
> fn(3, 5) 输出结果：
```
我想喝咖啡
Window {window: Window, self: Window, document: document, name: '', location: Location, …}
8
```
> fn.call(obj, 3, 5) 输出结果：
```
我想喝咖啡
{name: 'coco'}
8
```
###### 2. apply()
>- 调用函数
>- 修改函数的 this 指向
>- 参数必须是数组(伪数组)，数组解构为函数的形参

```
    let hero = {
      name: "吕布",
      age: 22
    };
    function sum(a, b, c) {
      console.log(a, b, c);
      console.log(a + b + c); // 数组的形式传递参数
      console.log(this); // 修改this 指向
    }

    sum(2, 4, 6);
    sum.call(hero, 2, 4, 6);
    sum.apply(hero, [2, 4, 6]);

    console.log('--------------------');
    console.log(Math.max(11, 22, 12, 1));
    let arr = [11, 22, 12, 1];
    console.log(Math.max(arr));

    // 原函数要求传递多个 number 类型的参数，
    // 使用 apply() 之后，传递的参数是一个数组
    console.log(Math.max.apply(Math, arr));
```

###### 3. bind()
>- 不调用函数
>- 修改函数的 this 指向

```
      let hero = {
        name: "吕布",
        age:22
      };
      function sum(a, b) {
        console.log(a + b);
        console.log(this);
      }
      let result = sum.bind(hero, 2, 5);
      result();
```

```
7
{name: '吕布', age: 22}
```
### 3. 严格模式
>- 消除语法中不合理的地方,为 ES 后期发展做铺垫
>- "use strict"; 开启严格模式

```
<body>
  <script>
    // 严格模式:消除语法中不合理的地方,为 ES 后期发展做铺垫

    // 1.1 整个脚本开启严格模式
    "use strict";

    // num = 10;
  </script>

  <script>
    // 1.2 立即执行函数，作为独立的作用域，开启严格模式
    age = 10;
    (function (a, b) {
      "use strict";
      console.log(a + b);
      // score = 100;
    })(1, 2);
  </script>

  <script>
    // 1.3 函数作为局部作用域开启严格模式

    function sum() {
      "use strict";
      // score = 12;
    }

    function sum1() {
      score = 12;
    }

    sum();
    sum1();
  </script>
</body>
```
>- 注意：严格模式下发生的变化（`this`指向问题）

```
  <script>
    "use strict";
    // 1. 变量声明，不能省略 var
    // num = 10;

    // 2. 我们不能随意删除已声明的变量
    var age = 20;
    // delete age;
    console.log(age);

    // 3. 严格模式下，函数里面的参数不允许重名
    // function sum(a, a) {
    //   console.log(a + a);
    // }

    // sum(1,3);

    // 4. 不允许直接在 if for 的代码块里声明函数
    if (true) {
      function cook() {
        console.log('烤鱼');
      }
      cook();
    }
    // ES5 没有块级作用域
    // cook();

    // 5. 严格模式下,全局作用域中函数的 this 是 undefined
    function game() {
      console.log(this);
    }
    game();
  </script>
```
### 4. 高阶函数
> 高阶函数 ：
>- 对其它函数进行操作的函数，
>- 它接收函数作为参数，或把函数作为返回值输出
>
> 注意：
>- 1. 函数(实例)作为参数
>- 2. 函数(实例)作为返回值
>- 3. 回调函数多是高阶函数
### 5. 闭包
>- 闭包 closure 的定义 ：指有权访问另一个函数作用域中变量的函数

```
    一个作用域可以访问另一个函数内部的局部变量,局部变量所在函数就是闭包函数
```

```
      function outer() {
        let counter = 0;
        function inner() {
          counter++;
          return counter;
        }
        return inner;
      }

      let add = outer();

      console.log(add());
```
### 6. 递归
    递归(recursion)函数：
        1. 函数内部，自己调用自己
        2. 防止死循环
        3. 函数在栈里面执行，防止栈溢出
    循环的四要素：初始化条件；变化条件；判断条件；执行逻辑

```
    let number = 1;
    function fn() {
      number++;
      console.log("富士山下");
      if (number == 6) {
        return;
      }
      fn();
    }
    fn();

      // 递归每次调用函数，都会开辟新的内存空间，容易栈溢出
```

```
      // 利用递归函数求1~n的阶乘 1 * 2 * 3 * 4 * ..n
      var result = 1;
      function fn(n) {
        if (n == 1) {
          return 1;
        }

        return n * fn(n - 1);
      }
      console.log(fn(5));
```

```
      // 利用递归函数求斐波那契数列(兔子序列)  1、1、2、3、5、8、13、21...
      // 用户输入一个数字 n 就可以求出 这个数字对应的兔子序列值
      // 我们只需要知道用户输入的n 的前面两项(n-1 n-2)就可以计算出n 对应的序列值
      function fn(n) {
        if (n == 1 || n == 2) {
          return 1;
        }

        return fn(n - 1) + fn(n - 2);
      }
      console.log(fn(7));
```
### 7. 浅拷贝和深拷贝
>- 浅拷贝只是拷贝一层, 更深层次对象级别的只拷贝引用.
>- 深拷贝拷贝多层, 每一级别的数据都会拷贝.

```
      var obj = {
        id: 1,
        name: "andy",
        msg: {
          age: 18,
        },
      };
      var o = {};

      // 浅拷贝
      Object.assign(o, obj);

      console.log(o);
      o.msg.age = 22;
      console.log(obj);
```
```
    // 深拷贝拷贝多层, 每一级别的数据都会拷贝.
    let obj = {
      id: 1,
      name: "andy",
      msg: {
        age: 24,
      },
      color: ["red", "purple"]
    };
    let target = {};

    // 封装函数
    function deepCopy(target, obj) {
      for (let k in obj) {
        // console.log(k);
        // 1. 获取了属性值
        let item = obj[k];

        // 2. 判断数据类型
        if (item instanceof Array) {
          // 数组
          target[k] = [];
          // target.color = ["red", "purple"];
          deepCopy(target[k], item);
        } else if (item instanceof Object) {
          // 对象
          target[k] = {};
          // target[msg] = {
          //   age: 24,
          // }
          deepCopy(target[k], item);
        } else {
          // 基本数据类型
          target[k] = item;
        }
      }
    }

    deepCopy(target, obj);
    console.log(target);
    target.msg.age = 99;
    console.log(obj);
    console.log('-----------------------');
    // 只适用于纯 json 对象的深度拷贝
    let result = JSON.stringify(obj);
    result = JSON.parse(result);
    console.log(result);
```
## 五、正则表达式
### 1. 正则表达式概述
正则表达式(`Regular Expression`)：js中一个对象，用于匹配字符串中字符的组合模式。

```
作用:
    1. 校验字符串合法性。(读取不合法/特定的字符串)         
    2. 替换敏感词。(读取的字符串进行写)
场景：多用于表单的验证。
```
### 2. 正则表达式在JavaScript中的使用

```
        // 1. 利用 RegExp 对象来创建正则表达式
        let regExp = new RegExp(/123456/);
        console.log(regExp);

        // 2. 利用字面量创建正则表达式
        let rg = /123/;

        // 3. test 方法来检测字符串是否符合正则表达式的要求规范
        console.log(rg.test(123)); // true
        console.log(rg.test(1234)); // true
        console.log(rg.test(456)); // false
```
### 3. 正则表达式中的特殊字符
###### 1. 边界符
>- 边界符： ^  匹配行首的文本(以谁开始)
>- 边界符： $  匹配行尾的文本(以谁结尾) 

```
        // 1. 只要包含 abc 即可
        let rg = /abc/;
        console.log(rg.test('abc'));
        console.log(rg.test('abcabc'));
        console.log(rg.test('abcd'));

        // 2. 123 开始即可
        let rg2 = /^123/;
        console.log(rg2.test('123'));
        console.log(rg2.test('123456'));
        console.log(rg2.test('0123'));

        // 3. 精确匹配，必须为 abc 开头，abc 结尾。
        let rg3 = /^abc$/;
        console.log(rg3.test('abc'));
        console.log(rg3.test('abcabc'));
        console.log(rg3.test('abcd'));
```
```
true
true
true
true
true
false
true
false
false
```
###### 2. 字符类
```
        // var re = /abc/; // 包含 abc 即可
        // 1. 字符串：[] 表示有一系列字符可供选择，只要匹配到任意一个即可。
        let rg1 = /[abc]/;
        console.log(rg1.test('a'));
        console.log(rg1.test('b'));
        console.log(rg1.test('c'));
        console.log(rg1.test('d'));
        console.log(rg1.test('coco'));
        console.log(rg1.test('red'));

        console.log('--------字符串：----------------');
        // 2. 三选一: 只能是 a 或 b 或 c
        let rg2 = /^[abc]$/;
        console.log(rg2.test('a'));
        console.log(rg2.test('ab'));

        console.log("*********三选一****************");

        // 3. 26 个小写字母选一
        let rg3 = /^[a-z]$/;
        console.log(rg3.test('a'));
        console.log(rg3.test('b'));
        console.log(rg3.test('ab'));
        console.log(rg3.test('0'));

        console.log("--------小写字母------------");
```
```
true
true
true
false
true
false
--------字符串：----------------
true
false
*********三选一****************
true
true
false
false
--------小写字母------------
```
```
        // 4. 26 个大小写字母，数字 _ - 均可
        let reg2 = /^[a-zA-Z0-9_-]/;

        console.log(reg2.test('a'));
        console.log(reg2.test('Z1'));
        console.log(reg2.test('A'));
        console.log(reg2.test('0'));
        console.log(reg2.test('_'));
        console.log(reg2.test('-'));
        console.log(reg2.test('!'));

        console.log("--------------^ 表示取反------------------------");
        // 5. [] 里面的 ^ 表示取反，不能包含
        let rg5 = /[^a-z]/;
        console.log(rg5.test('a'));
        console.log(rg5.test('ab'));
        console.log(rg5.test('A'));
```

```
true
true
true
true
true
true
false
--------------^ 表示取反------------------------
false
false
true
```
###### 3. 量词符
>- 量词符：用来设定某个模式出现的次数。限制密码长度
```
      // 1. * 重复次数  >= 0 即可
      let rg1 = /^a*$/;
      console.log(rg1.test('a'));
      console.log(rg1.test('aa'));
      console.log(rg1.test('bb'));

      console.log('---------+ 重复次数  >= 1 即可----------');
      // 2. + 重复次数  >= 1 即可
      let rg2 = /^a+$/;
      console.log(rg2.test(''));
      console.log(rg2.test('a'));
      console.log(rg2.test('aa'));

      console.log('-------------? 出现 0 或 1 次--------------------');
      // 3. ? 出现 0 或 1 次
      let rg3 = /^a?$/;
      console.log(rg3.test(''));
      console.log(rg3.test('a'));
      console.log(rg3.test('aa'));

      console.log('-------- {3} 重复出现固定次数----------');
      // 4.  {3} 重复出现固定次数
      let rg4 = /^a{3}$/;
      console.log(rg4.test('a'));
      console.log(rg4.test('aa'));
      console.log(rg4.test('aaa'));
      console.log(rg4.test('aaaa'));

      console.log('-------- {2, } 次数 >= 2----------');
      // 5. {2,} 次数 >= 2
      let rg5 = /^a{2,}$/;
      console.log(rg5.test('a'));
      console.log(rg5.test('aa'));
      console.log(rg5.test('aaa'));
      console.log(rg5.test('aaaa'));

      console.log('-------- {2,4} 中间不能有空格，次数 >=2，且 <=4----------');
      // 6. {2,4} 中间不能有空格，次数 >=2，且 <=4
      let rg6 = /^a{2,4}$/;
      console.log(rg6.test('a'));
      console.log(rg6.test('aa'));
      console.log(rg6.test('aaa'));
      console.log(rg6.test('aaaa'));
      console.log(rg6.test('aaaaa'));
```
```
true
true
false
---------+ 重复次数  >= 1 即可----------
false
true
true
-------------? 出现 0 或 1 次--------------------
true
true
false
-------- {3} 重复出现固定次数----------
false
false
true
false
-------- {2, } 次数 >= 2----------
false
true
true
true
-------- {2,4} 中间不能有空格，次数 >=2，且 <=4----------
false
true
true
true
false
```
###### 4. 预定义类
>- 某些常见模式的简写方式
```
        // \d 匹配0 -9 相当于  [0-9]
        // \D 不匹配 0-9 ，相当于 [^0-9]
        // \w 匹配任意的字母、数字、下划线 [A-Za-z0-9]
        // \W 不匹配任意字母、数字、下划线 [^A-Za-z0-9]
        // \s 匹配空格，包括换行符、制表符、空格等,相当于 [\t\r\n\v\f]
        // \S 匹配非空格，相当于 [^\t\r\n\v\f]

        // 座机号验证： 010-12345678   0123-1234567
        // 正则里面的或者符合 |
        let reg = /^\d{3}-\d{8}|\d{4}-\d{7}$/;
        let reg1 = /^\d{3,4}-\d{7,8}$/;
        console.log(reg1.test('010-12345678'));
        console.log(reg1.test('1010-1234567'));
```
###### 5. 正则表达式中的替换
1. replace替换

> `stringObject.replace(regexp/substr, replacement)`
>- 第一个参数：被替换的字符串或正则表达式
>- 第二个参数：替换为的字符串
>- 返回值是一个替换完毕的新字符串
```
      let str = "aabbcc";
      // let newstr = str.replace("aa", "bb");
      let newstr = str.replace(/aa/, "bb");
      console.log(newstr);
```
```
bbbbcc
```
2. 正则表达式中的参数
```
/表达式/[switch]
```
>- switch也称为修饰符，按照什么样的模式来匹配。有三种值：
> 1. g： 全局匹配
> 2. i：  忽略大小写
> 3. gi：全局匹配 + 忽略大小写

## 六、ES6中的新增语法
### 1. let
>- 变量名不能重复
>- 只在所处的块级有效
>- 没有变量提升，必须先声明，后使用（暂时性死区）
>- 代码块使用变量，就近原则
```
		// 3. 没有变量提升
		// console.log(color);

		let color = 'red';
		// 1. 变量名不能重复。
		// let color = 'red';

		let num = 22;
		if (true) {
			let num = 10;
			// 4. 代码块使用变量，就近原则
			console.log(num);
		}

		// 2. 有块级作用域
		// console.log(num);
```
```
// 经典面试题 1
		let arr = [];
		for (var i = 0; i < 2; i++) {
			arr[i] = function () {
				console.log(i);
			}
		}
		arr[0]();
		arr[1]();
		
// 经典面试题 2
		let arr = [];
		for (let i = 0; i < 2; i++) {
			arr[i] = function () {
				console.log(i);
			}
		}
		arr[0]();
		arr[1]();
```
```
2 // 不满足循环条件的值
0
1
```
### 2. const
>- 声明常量，内存地址不能变化
>- 具有块级作用域
>- 声明常量时必须赋值
>- 常量赋值后，不能修改（引用类型可以更改）
### 3. let，const，var 的区别
>- 1. 使用 var 声明的变量，其作用域为该语句所在的函数内，且存在变量提升现象
>- 2. 使用 let 声明的变量，其作用域为该语句所在的代码块内，不存在变量提升
>- 3. 使用const 声明的是常量，在后面出现的代码中不能再修改该常量的值

```
graph LR
id1(var)
id2(let)
id3(const)
id4(函数作用域)
id5(块级作用域)
id6(块级作用域)
id7(变量提升)
id8(不存在变量提升)
id9(不存在变量提升)
id10(值可更改)
id11(值可更改)
id12(值不可更改)
id1-->id2
id2-->id3
id4-->id5
id5-->id6
id7-->id8
id8-->id9
id10-->id11
id11-->id12
```
### 4. 解构赋值
###### 1. 数组解构
> ES6中允许从数组中提取值，按照对应位置，对变量赋值
```
		let arr = [1, 2, 3];

		let a = arr[0];
		let b = arr[1];
		let c = arr[2];
		console.log(a, b, c);

		// 等价写法
		let [x, y, z, w] = arr;
		console.log(x, y, z, w);
```
```
1 2 3
1 2 3 undefined
```
###### 2. 对象解构
>-	1. 变量的名字匹配对象的属性
>-	2. 匹配成功将属性值赋值给变量
>-	3. 解构变量顺序和对象属性无关
>-	4. { : }  冒号左边匹配属性，成功后给右边的变量 
```
		let person = { address: '郑州', age: 30, sex: '男' };

		// address1 是别名. address 和对象的属性匹配，成功后给别名变量。
		let { address: address1, sex, age } = person;
		console.log(address1, sex, age);
```
```
郑州 男 30
```
### 5. 箭头函数
```
() => {}
const fn = () => {}
```
> 1. 如果形参只有一个，小括弧可以省略
> 2. 如果逻辑体只有一行代码， return 配合表达式，那么大括弧和 return 可以省略
> 3. 箭头函数不绑定 this 关键字，箭头函数中 this 表示定义位置的上下文 this
### 6. 剩余参数
>- 剩余参数：形参的个数少于实参的个数. 多余的参数。 前面加 ... ,表示为不定数量的参数用一个数组来接收.
```
      const sum = (a, ...args) => {
        let total = 0;
        args.forEach((item) => (total += item));
        return total + a;
      };

      console.log(sum(1, 3, 5, 7, 9));
```
```
25
```
## 七、ES6的内置对象扩展
### 1. Array的扩展方法
###### 1. 扩展运算符（展开语法）
```
    let arr = ["a", "b", "c"];

    // 1. 把数组转化为参数序列
    console.log(...arr); // 可以传入多个参数，此时逗号作为参数的分隔符，不做输出
    console.log("a", "b", "c");

    // 2. 伪数组转化为参数序列
    let lis = document.querySelectorAll('li');
    console.log(lis);
    // lis.push('张飞'); // 报错了
    console.log(...lis);

    // 3. 参数序列转化为数组
    lis = [...lis];
    lis.push('张飞');
    console.log(lis);

    console.log("-------------push----------------");
    // 4. push 多个元素
    arr.push("吕布", '白龙马');
    console.log(arr);
    arr.push(...lis);
    console.log(arr);
```
###### 2. 构造函数方法



###### 递归改变children字段名
```
  function childrenToSubs(data, newarr) {
    data.forEach((item) => {
      let newObj = {};
      for (const key in item) {
        if (key === "children") {
          newObj["subs"] = [];
          childrenToSubs(item[key], newObj["subs"]);
        } else {
          newObj[key] = item[key];
        }
      }
      newarr.push(newObj);
    });
    return newarr;
  }
```


