const router = require('koa-router')({
  prefix: '/api'
})

// User控制器
const User = require('../controller/user')

// 获取全部用户
router.get('/user/list', User.selectAll)

// Table控制器
const Table = require('../controller/table')


router.get('/table/list', Table.selectAll)  // 获取全部表格信息
router.get('/table/one', Table.selectOne)  // 获取全部表格信息
router.post('/table/add', Table.addOne)  // 获取全部表格信息
router.put('/table/update', Table.updateOne)  // 获取全部表格信息
router.delete('/table/delete', Table.deleteOne)  // 获取全部表格信息

// 测试接口是否正常
router.get('/', async(ctx, next) => {
  ctx.body = 'Hello World~朱文龙'
})

module.exports = router

