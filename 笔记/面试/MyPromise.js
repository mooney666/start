/* 三个状态，状态只能修改一次，then内的回调函数异步执行 */
class MyPromise {
  constructor(executor) {
    this.promiseState = "pending";
    this.promiseResult = undefined;
    this.callbacks = [];

    // 修改对象状态；修改对象结果值
    let resolve = (value) => {
      if (this.promiseState !== "pending") return;
      this.promiseState = "fulfilled";
      this.promiseResult = value;
      // 调用成功回调函数
      this.callbacks.forEach((item) => {
        item.onResolved(value);
      });
    };
    let reject = (reason) => {
      if (this.promiseState !== "pending") return;
      this.promiseState = "rejected";
      this.promiseResult = reason;
      this.callbacks.forEach((item) => {
        item.onRejected(reason);
      });
    };

    // 同步调用执行器函数
    try {
      executor(resolve, reject);
    } catch (error) {
      // 修改promise状态为失败
      reject(error);
    }
  }

  then(resolveFn, rejectFn) {
    resolveFn = typeof resolveFn === "function" ? resolveFn : (v) => v;
    //因为错误的值要让后面访问到，所以这里也要跑出个错误，不然会在之后 then 的 resolve 中捕获
    rejectFn =
      typeof rejectFn === "function"
        ? rejectFn
        : (err) => {
            throw err;
          };
    let promise = new MyPromise((resolve, reject) => {
      // 封装函数
      const calBack = (type) => {
        setTimeout(() => {
          try {
            let result = type(this.promiseResult);

            const resolvePromise = (res) => {
              if (promise === res) {
                return reject(
                  new TypeError(
                    "Chaining cycle detected for promise #<Promise>"
                  )
                );
              }
              let called;
              if (
                (typeof res === "object" && res != null) ||
                typeof res === "function"
              ) {
                try {
                  let t = res.then;
                  if (typeof t === "function") {
                    t.call(
                      res,
                      (y) => {
                        if (called) return;
                        called = true;
                        resolvePromise(y);
                      },
                      (r) => {
                        if (called) return;
                        called = true;
                        reject(r);
                      }
                    );
                  } else {
                    resolve(res);
                  }
                } catch (e) {
                  if (called) return;
                  called = true;
                  reject(e);
                }
              } else {
                resolve(res);
              }
            };
            resolvePromise(result);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };

      switch (this.promiseState) {
        case "pending":
          // 保存回调函数
          this.callbacks.push({
            onResolved: () => {
              calBack(resolveFn);
            },
            onRejected: () => {
              calBack(rejectFn);
            },
          });
          break;
        case "fulfilled":
          calBack(resolveFn);
          break;
        case "rejected":
          calBack(rejectFn);
        default:
          break;
      }
    });

    return promise;
  }

  catch(rejectFn) {
    return this.then(undefined, rejectFn);
  }

  static all(args) {
    return new MyPromise((resolve, reject) => {
      // 声明计数变量 count
      let count = 0;
      let arr = []; // 声明存储成功结果数组
      args.forEach((item, i) => {
        item.then(
          (v) => {
            count++;
            arr[i] = v;
            if (count === args.length) {
              resolve(arr);
            }
          },
          (r) => {
            reject(r);
          }
        );
      });
    });
  }
}

// 测试是否符合标准
// MyPromise.defer = MyPromise.deferred = function () {
//   let dfd = {};
//   dfd.promise = new MyPromise((resolve, reject) => {
//     dfd.resolve = resolve;
//     dfd.reject = reject;
//   });
//   return dfd;
// };
// module.exports = MyPromise;
