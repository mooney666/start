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
}, 2);
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
