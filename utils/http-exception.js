

// 定义已知的异常类

/**
 * 默认的异常
 */
class HttpException extends Error {
  constructor(msg = '错误请求', errorCode = 10000, code = 400) {
    super()
    this.errorCode = errorCode
    this.code = code
    this.msg = msg
  }
}

class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 400
    this.msg = msg || '参数错误'
    this.errorCode = errorCode || 10000
  }
}

class AuthFailed extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 401
    this.mag = msg || '授权失败'
    this.errorCode = errorCode || 10004
  }
}

class NotFound extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 404
    this.msg = msg || '未找到该资源'
    this.errorCode = errorCode || 10005
  }
}

class Forbidden extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 403
    this.msg = msg || '禁止访问'
    this.errorCode = errorCode || 10006
  }
}

class Oversize extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 413
    this.msg = msg || '上传文件过大'
    this.errorCode = errorCode || 10007
  }
}

class InternalServerError extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 500
    this.msg = msg || '服务器出错'
    this.errorCode = errorCode || 10008
  }
}

module.exports = {
  HttpException,
  ParameterException,
  AuthFailed,
  NotFound,
  Forbidden,
  Oversize,
  InternalServerError
}

// 作者：greenycaicai
// 链接：https://juejin.im/post/5e4e55586fb9a07ca90c25ca
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。




