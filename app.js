const Koa = require('koa')
const app = new Koa()
const config = require('./config')
const path = require('path')
const bodyParser = require('koa-bodyparser');

const dotenv = require('dotenv') // 引入配置文件
// const dotenvConfig = dotenv.config()
// console.log('前端的环境变量配置文件：', dotenvConfig)

// 加载全局异常
const errors = require('./utils/http-exception')
global.errs = errors
// console.log('全局异常：',global.errs)

// 全局异常中间件监听、处理，放在所有中间件的最前面
const catchError = require('./middleware/exception')
app.use(catchError)  // 引入的全局配置，这个问题存在？？？？

// 路由中间件
const router = require('./router')

app.use(bodyParser()); // post请求中解析前端参数使用
// 解决跨域问题
// app.use(async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   ctx.set('Access-Control-Allow-Headers', '*');
//   ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//   ctx.set('Cache-Control', 'no-cache');
//   await next();
// })


const koaBody = require('koa-body')({ // // 解析body的中间件
  multipart: true, // 支持文件上传
  encoding:'gzip',
  formLimit: '5mb', // 限制表单请求体的大小
  jsonLimit: '5mb', // JSON 数据体的大小限制
  textLimit: '5mb', // 限制 text body 的大小
  formidable:{
    uploadDir: path.join(__dirname, '/public/upload'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
    onFileBegin: (name, file) => { // 文件上传前的设置
      console.log(`name: ${name}`)
      console.log(file)
    }
  }
})
const static = require('koa-static')

// 解析body的中间件****文件解析使用
// app.use(koaBody)

app.use(static(path.join(__dirname)))
// 开始服务并生成路由
app.use(router.routes()).use(router.allowedMethods()) // 开始服务并生成路由

app.listen(8086, () => {
// app.listen(config.service.port, () => {
  // console.log('端口：',config.service.port)
  // console.log('端口：',dotenvConfig.parsed.SERVE_PORT)
  console.log('server is running http://192.168.1.104:8086/api/' )
})

// 作者：greenycaicai
// 链接：https://juejin.im/post/5e4e55586fb9a07ca90c25ca
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。