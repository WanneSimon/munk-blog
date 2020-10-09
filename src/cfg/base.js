/** 挂载到vuex的全局变量*/
const base = {
  
  SUCCESS: '00', 
  FAIL: '01',
  
  api_context: '/munkblog/api', //后端基础路径

  comicsWords_add: '/comicWords/add', // 添加语录
  comicsWords_search: '/comicWords/search', // 添加语录
  comicsWords_get: '/comicWords/get', //获取语录
  comicsWords_update: '/comicWords/update', 

  dailyLog_add: '/dailyLog/add', // 添加语录
  dailyLog_search: '/dailyLog/search', // 添加语录
  dailyLog_get: '/dailyLog/get', //获取语录
  dailyLog_update: '/dailyLog/update', 
}

export default base
