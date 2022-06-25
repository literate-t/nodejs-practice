// @ts-check

// CommonJS: require
// -node standard library에 있는 모듈은 절대 경로를 지정해 가져온다
// - 현재 프로젝트 내의 다른 파일은 상대 경로를 지정해 가져온다
// - 절대 경로를 지정하면 module.paths의 경로를 순차적으로 검사해 해당하는 첫 번째 파일을 가져온다
/*
paths는 아래처럼 현재 위치에서부터 node_modules 폴더를 검사
[
  'D:\\source codes\\nodejs\\practice\\src\\node_modules',
  'D:\\source codes\\nodejs\\practice\\node_modules',
  'D:\\source codes\\nodejs\\node_modules',
  'D:\\source codes\\node_modules',
  'D:\\node_modules'
]
*/

const animalsA = require('./animals');
const animalsB = require('./animals');

console.log(animalsA === animalsB);
animalsA[0] = 'Hot dog';
// console.log(animalsB);

const { path, paths } = module;
console.log(path);
// console.log(paths);
