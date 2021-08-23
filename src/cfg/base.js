/** 挂载到vuex的全局变量*/
const base = {

  SUCCESS: '00',
  FAIL: '01',

  // 定义文本编辑器类型
  editorType: {
    DEFAULT: '', //默认编辑器类型
    QUILL3_Plus: 'quill3+', // quill3+编辑器
    SHOW_DOWN: 'ShowDown', // showDown markdown解释器
  },

  favoritesType: {
      COLLECTION: { name: 'collects', link: "/coco/static/collections/collects.json" }, // 收藏
      TOOLS: { name: 'tools', link: "/coco/static/collections/tools.json" }, // 工具
  },

  login: {
    isLogined: false, // 是否已登录， 默认false
    view: 'login', //展示登录视图的哪一个， login-登录，repwd-重置密码
    show: true, // 展示登录框
    //登录信息
    data: {
        info: {}, // 登录成功信息
        auth: [], // 认证信息
    },
  },

  api_context: '/munkblog/api', //后端基础路径

  i_login: '/i/login', // 登录
  i_logout: '/i/logout', //退出
  i_auth: '/i/auth', // 获取认证信息

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
  blog_tags: '/blog/tags', // 博文有关标签

  file_upload: '/file/upload', // 文件上传
  file_update: '/file/update', // 文件更新
  file_get: '/file/get/{id}', // 文件


  bookmark_add: '/bookmark/add', // 添加书签
  bookmark_search: '/bookmark/search', // 批量查询标签（查询某个文件下的书签）
  bookmark_update: '/bookmark/update', // 更新书签
  bookmark_get: '/bookmark/get', // 获取书签详细信息
  bookmark_folders: '/bookmark/folders', // 书签的文件夹
  bookmark_updateFolder: '/bookmark/updateFolder', // 更新书签文件夹名 或者 删除文件夹

  visited: '/sum/visit', // 
}

export default base
