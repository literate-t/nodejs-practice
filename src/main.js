// @ts-check
// 프레임워크 없이 간단한 토이프로젝르 만들기

/**
 * 블로그 포스팅
 * - 로컬 파일을 데이터베이스로 활용(JSON)
 */

const http = require('http');

/**
 * Post
 *
 * GET /posts
 * GET /posts/:id
 * POST /posts
 */

const server = http.createServer((req, res) => {
  if (req.url === '/posts' && req.method === 'GET') {
    res.statusCode = 200;
    res.end('List of post');
  } else if (req.url && /^\/posts\/[a-zA-Z0-9-_]+$/.test(req.url)) {
    res.statusCode = 200;
    res.end('A content of posts');
  } else if (req.url === '/posts' && req.method === 'POST') {
    res.statusCode = 200;
    res.end('Created a posts');
  } else {
    res.statusCode = 400;
    res.end('Not found');
  }
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`The server is listening at port ${PORT}`);
});
