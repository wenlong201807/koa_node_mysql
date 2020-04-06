const User = require('../model/user.js')
const resJson = require('../utils/resJson')

module.exports = {
  selectAll: async (ctx, next) => {
    await User.findAll({
      raw: true,
      attributes: { // 不返回password字段
        exclude: ['password'] 
      }
    }).then((res) => {
      console.log('给前端的成功的数据：',res)
    	// 成功返回
      ctx.body = resJson.success({data: res})
    }).catch((err) => {
      console.log('给前端的失败的数据：',err)
    	// 失败，捕获异常并输出
      ctx.body = resJson.fail(err)
    })
  }
}


// 作者：greenycaicai
// 链接：https://juejin.im/post/5e4e55586fb9a07ca90c25ca
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。