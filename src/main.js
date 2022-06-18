// @ts-check
// const somestring = "Hello";
// const result = Math.log(somestring);
// console.log(result);

const http = require("http");
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end("Hello");
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
});
