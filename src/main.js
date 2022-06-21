// // // @ts-check
// // const somestring = "Hello";
// // const result = Math.log(somestring);
// // console.log(result);

// // const http = require("http");
// // const server = http.createServer((req, res) => {
// //   res.statusCode = 200;
// //   res.end("Hello");
// // });

// // const PORT = 4000;
// // server.listen(PORT, () => {
// //   console.log(`server is listening at port ${PORT}`);
// // });

// // Prototype
// function Person(name) {
//   this.name = name;
// }
// Person.prototype.greet = function () {
//   return `Hi ${this.name}`;
// };

// function Student(name) {
//   //super(name);
//   this.__proto__.constructor(name);
// }

// Student.prototype.study = function () {
//   return `${this.name} is studying`;
// };

// Object.setPrototypeOf(Student.prototype, Person.prototype);

// const me = new Student("T");
// // console.log(me.greet());
// // console.log(me.study());
// // console.log(me instanceof Student);
// // console.log(me instanceof Person);

// const shoudOverride = true;
// const user = {
//   ...{
//     email: "kim@mail.com",
//     password: "****",
//   },
//   ...{
//     nickname: "t",
//   },
//   ...(shoudOverride ? { email: "lee@mail.com" } : null),
// };

// console.log(user);
