/** 挂载到vuex的全局变量*/
const base = {

  SUCCESS: '00',
  FAIL: '01',

  api_context: '/munkblog/api', //后端基础路径

  comicsWords_add: '/comicWords/add', // 添加语录
  comicsWords_search: '/comicWords/search', // 添加语录
  comicsWords_get: '/comicWords/get', //获取语录
  comicsWords_update: '/comicWords/update',

  dailyLog_add: '/dailyLog/add', // 添加动态
  dailyLog_search: '/dailyLog/search', // 搜索动态
  dailyLog_get: '/dailyLog/get', //获取动态
  dailyLog_update: '/dailyLog/update',

  book_add: '/book/add', // 添加书
  book_search: '/book/search', // 搜索书
  book_get: '/book/get', //获取书
  book_update: '/book/update',

  game_add: '/game/add', // 添加游戏
  game_search: '/game/search', // 搜索游戏
  game_get: '/game/get', //获取游戏
  game_update: '/game/update',

  blog_add: '/blog/add', // 添加博文
  blog_search: '/blog/search', // 搜索博文
  blog_get: '/blog/get', //获取博文
  blog_update: '/blog/update',
}

export default base
