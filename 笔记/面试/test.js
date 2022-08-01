class MyPromise {
  constructor(executor) {
    this._resolveQueue = []; // then 收集的执行成功的回调队列
    this._rejectQueue = []; // then 收集的执行失败的回调队列

    let _resolve = (val) => {
      while (this._resolveQueue.length) {
        // 从成功队列中取出回调执行
        const callback = this._resolveQueue.shift();
        callback(val);
      }
    };

    // 实现同resolve
    let _reject = (val) => {
      while (this._rejectQueue.length) {
        const callback = this._rejectQueue.shift();
        callback(val);
      }
    };
    // new Promise() 时立即执行 executor，并传入 resolve 和 reject
    executor(_resolve, _reject);
  }

  // 收集回调函数，push 进队列
  then(resolveFn, rejectFn) {
    this._resolveQueue.push(resolveFn);
    this._rejectQueue.push(rejectFn);
  }
}

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("data");
  }, 1000);
});

p1.then((res) => console.log(res)); // 1s 后输出 'data'

setTimeout(() => {
  p1.then((res) => console.log("异步执行", res)); // 没有输出
}, 1000);
