// @ts-check
// 프레임워크 없이 간단한 토이프로젝르 만들기

/**
 * 블로그 포스팅
 * - 로컬 파일을 데이터베이스로 활용(JSON)
 */

const http = require('http');

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

// /** @type {Post} */
// const examplePost = {
//   id: 'abc',
//   title: 'abc',
// };
// console.log(examplePost);

/** @type {Post[]} */
const posts = [
  {
    id: '1st_post',
    title: '1st post',
    content: 'Hi Hello',
  },
  {
    id: '2nd_post',
    title: '두 번째 포스트',
    content: 'Hello from the planet',
  },
];

/**
 * Post
 *
 * GET /posts
 * GET /posts/:id
 * POST /posts
 */

const server = http.createServer((req, res) => {
  const PostsIdRegex = /^\/posts\/([a-zA-Z0-9-_]+)$/; // 캡처 그룹 사용()
  const postsIdRegexResult =
    (req.url && PostsIdRegex.exec(req.url)) || undefined;

  if (req.url === '/posts' && req.method === 'GET') {
    const result = {
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
      })),
      totalCount: posts.length,
    };
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(result));
  } else if (postsIdRegexResult && req.method === 'GET') {
    // GET /posts/:id
    const postId = postsIdRegexResult[1];
    const result = posts.find((post) => post.id === postId);
    if (result) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(result));
    } else {
      res.statusCode = 404;
      res.end('Post Not found');
    }
  } else if (req.url === '/posts' && req.method === 'POST') {
    req.setEncoding('utf-8');
    req.on('data', (data) => {
      /** @typedef CreatePostBody
       * @property {string} title
       * @property {string} content
       */
      /** @type {CreatePostBody} */
      const body = JSON.parse(data);
      posts.push({
        id: body.title.toLocaleLowerCase().replace(/\s/g, '_'), // replace(' ', '')는 첫 번째 하나만
        title: body.title,
        content: body.content,
      });
    });
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
