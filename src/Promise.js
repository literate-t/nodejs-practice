// @ts-check

/* eslint-disable no-new */
/* eslint-disable no-console */

// new Promise((resolve, reject) => {
//   console.log('Before timeout');
//   setTimeout(() => {
//     reject(new Error('reject Error'));
//     console.log('After reject');
//     resolve(Math.random());
//     console.log('After resolve');
//   }, 1000);
// })
//   .catch((error) => {
//     console.log('First catch');
//     console.log('error', error);
//   })
//   .then((value) => {
//     console.log('First then 1');
//     console.log('value', value);
//   });

function returnPromiseForTimeout() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random());
    }, 1000);
  });
}

returnPromiseForTimeout()
  .then((value) => {
    console.log(value);
    return returnPromiseForTimeout();
  })
  .then((value) => {
    console.log(value);
    return returnPromiseForTimeout();
  })
  .then((value) => {
    console.log(value);
    return returnPromiseForTimeout();
  })
  .then((value) => {
    console.log(value);
    return returnPromiseForTimeout();
  });
