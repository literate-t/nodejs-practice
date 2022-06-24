// @ts-check
// 프레임워크 없이 간단한 토이프로젝르 만들기

/**
 * 블로그 포스팅
 * - 로컬 파일을 데이터베이스로 활용(JSON)
 */

const http = require('http');
const { routes } = require('./api');

const server = http.createServer((req, res) => {
  async function main() {
    const route = routes.find(
      (_route) =>
        req.url &&
        req.method &&
        _route.url.test(req.url) &&
        _route.method === req.method
    );

    if (!req.url || !route) {
      res.statusCode = 404;
      res.end('Not found');

      return;
    }

    const regexResult = route.url.exec(req.url);

    if (!regexResult) {
      res.statusCode = 404;
      res.end('Not found');

      return;
    }

    /** @type {Object.<string, *> | undefined} */
    const reqBody =
      (req.method === 'POST' &&
        req.headers['content-type'] === 'application/json' &&
        (await new Promise((resolve, reject) => {
          req.setEncoding('utf-8');
          req.on('data', (data) => {
            try {
              resolve(JSON.parse(data));
            } catch {
              reject(new Error('Wrong formed json'));
            }
          });
        }))) ||
      undefined;

    const result = await route.callback(regexResult, reqBody);
    res.statusCode = result.statusCode;
    if (typeof result.body === 'string') {
      res.end(result.body);
    } else {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(result.body));
    }
  }

  main();
});

// const server = http.createServer((req, res) => {
//   const PostsIdRegex = /^\/posts\/([a-zA-Z0-9-_]+)$/; // 캡처 그룹 사용()
//   const postsIdRegexResult =
//     (req.url && PostsIdRegex.exec(req.url)) || undefined;

//   if (req.url === '/posts' && req.method === 'GET') {
//     const result = {
//       posts: posts.map((post) => ({
//         id: post.id,
//         title: post.title,
//         content: post.content,
//       })),
//       totalCount: posts.length,
//     };
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json; charset=utf-8');
//     res.end(JSON.stringify(result));
//   } else if (postsIdRegexResult && req.method === 'GET') {
//     // GET /posts/:id
//     const postId = postsIdRegexResult[1];
//     const result = posts.find((post) => post.id === postId);
//     if (result) {
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'application/json; charset=utf-8');
//       res.end(JSON.stringify(result));
//     } else {
//       res.statusCode = 404;
//       res.end('Post Not found');
//     }
//   } else if (req.url === '/posts' && req.method === 'POST') {
//     req.setEncoding('utf-8');
//     req.on('data', (data) => {
//       /** @typedef CreatePostBody
//        * @property {string} title
//        * @property {string} content
//        */
//       /** @type {CreatePostBody} */
//       const body = JSON.parse(data);
//       posts.push({
//         id: body.title.toLocaleLowerCase().replace(/\s/g, '_'), // replace(' ', '')는 첫 번째 하나만
//         title: body.title,
//         content: body.content,
//       });
//     });
//     res.statusCode = 200;
//     res.end('Created a posts');
//   } else {
//     res.statusCode = 400;
//     res.end('Not found');
//   }
// });

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`The server is listening at port ${PORT}`);
});
