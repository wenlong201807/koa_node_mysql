
// 中间件文件

const { HttpException } = require('../utils/http-exception')
const resJson = require('../utils/resJson')  // 修改上文提到的异常处理中间件
// 全局异常监听
const catchError = async(ctx, next) => {
  try {
    await next()
  } catch(error) {
    // 已知异常
    const isHttpException = error instanceof HttpException
    // 开发环境
    // const isDev = global.config.service.enviroment === 'dev' // 没有成功
    const isDev = 'development'
    console.log('****',isDev)
    // 在控制台显示未知异常信息：开发环境下，不是HttpException 抛出异常
    if (isDev && !isHttpException) {
      throw error
    }

    /**
     * 是已知错误，还是未知错误
     * 返回：
     *      msg 错误信息
     *      error_code 错误码
     */
    if (isHttpException) {
      // ctx.body = {
      //   msg: error.msg,
      //   error_code: error.errorCode
      // }
      ctx.body = resJson.fail(error)
      ctx.response.status = error.code
    } else {
      // ctx.body = {
      //   msg: '未知错误',
      //   error_code: 9999
      // }
      // ctx.response.status = 500
      ctx.body = resJson.fail({
        msg: '未知错误',
        error_code: 9999
      })
      ctx.response.status = 500
    }
  }
}

module.exports = catchError

// 作者：greenycaicai
// 链接：https://juejin.im/post/5e4e55586fb9a07ca90c25ca
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。





