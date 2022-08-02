const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    this._state = PENDING; // promise 状态
    this._value = undefined; // 保存异步任务的结果
    this._resolveQueue = []; // then 收集的执行成功的回调队列
    this._rejectQueue = []; // then 收集的执行失败的回调队列

    let _resolve = (val) => {
      // 兼容同步代码，把执行回调的操作放进 setTimeout 里，变成异步
      setTimeout(() => {
        if (this._state !== PENDING) return;
        this._state = FULFILLED; // 变更状态
        this._value = val; // 保存结果

        while (this._resolveQueue.length) {
          // 从成功队列中取出回调执行
          const callback = this._resolveQueue.shift();
          callback(val);
        }
      });
    };

    // 实现同resolve
    let _reject = (val) => {
      setTimeout(() => {
        if (this._state !== PENDING) return;
        this._state = REJECTED; // 变更状态
        this._value = val; // 保存结果

        while (this._rejectQueue.length) {
          const callback = this._rejectQueue.shift();
          callback(val);
        }
      });
    };
    // new Promise() 时立即执行 executor，并传入 resolve 和 reject
    try {
      executor(_resolve, _reject);
    } catch (e) {
      _reject(e);
    }
  }

  // 收集回调函数
  then(resolveFn, rejectFn) {
    // 重新封装 resolveFn 和 rejectFn 参数
    if (typeof resolveFn !== "function") resolveFn = (value) => value;
    if (typeof rejectFn !== "function")
      throw new Error(reason instanceof Error ? reason.message : reason);

    // 返回一个新的 Promise
    return new MyPromise((resolve, reject) => {
      // 对 resolveFn 进行包装
      const fulfilledFn = (value) => {
        try {
          // 存储传入回调的返回值
          let x = resolveFn(value);
          /*
                        如果传入的回调返回值是 Promise，把这个 Promise 称为 x
                        把当前 then 返回的 Promise 称为 p
                        x.then 的参数 resolve 是 p 的参数 resolve
                        x.then 的 resolve 在 x 的异步任务结束后被触发，同时结果作为参数被传入
                        于是 p 的异步任务也完成
                    */
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch (e) {
          reject(e);
        }
      };

      // 对 rejectFn 包装，与 resolveFn 同理
      const rejectedFn = (value) => {
        try {
          let x = rejectFn(value);
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch (e) {
          reject(e);
        }
      };

      switch (this._state) {
        case PENDING:
          this._resolveQueue.push(fulfilledFn);
          this._rejectQueue.push(rejectedFn);
          break;
        case FULFILLED:
          rejectedFn(this._value);
          break;
        case REJECTED:
          rejectedFn(this._value);
          break;
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  static resolve(value) {
    // 如果参数是 MyPromise 示例，直接返回这个实例
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(value) {
    return new MyPromise((resolve, reject) => reject(value));
  }

  static all(list) {
    return new MyPromise((resolve, reject) => {
      let values = []; // 返回值的集合
      let count = 0;
      for (let [i, p] of list.entries()) {
        // 数组参数如果不是 MyPromise 实例，先调用 Mypromise.resolve
        this.resolve(p).then(
          (res) => {
            values[i] = res;
            count++;
            // 所有状态都变成 fulfilled 时返回的 MyPromise 状态就变成 fulfilled
            if (count === list.length) resolve(values);
          },
          (err) => {
            // 有一个被 rejected 返回的 MyPromise 状态就变成 rejected
            reject(err);
          }
        );
      }
    });
  }

  static race(list) {
    return new MyPromise((resolve, reject) => {
      for (let p of list) {
        // 只要有一个实例率先改变状态，新的 MyPromise 的状态就跟着改变
        this.resolve(p).then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }

  finally(cb) {
    return this.then(
      (value) => MyPromise.resolve(cb()).then(() => value),
      (reason) => MyPromise.resolve(cb()).then(() => reason)
    );
  }
}

// const p1 = new Promise((resolve, reject) => {
//   resolve(2);
// });

// p1.then().then((res) => console.log(res)); // 输出 2

let a = { name: "sfs", sex: 1, desc: { n: 1, keuy: { m: 1, n: 2 } } };

let b = { ...a };
b.sex = 0;
console.log(a, b);

setTimeout(() => {
  console.log(1);
  let aaa = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("aaa");
      console.log(2);
    });
  });
  aaa.then(() => {
    console.log(3);
  });
},2);
console.log(4);
setTimeout(() => {
  console.log(5);
  let aaa = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("aaa");
      console.log(6);
    });
  });
  setTimeout(() => {
    console.log(7);
  });
  aaa.then(() => {
    console.log(8);
  });
});
