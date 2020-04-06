const Table = require('../model/table.js')
const resJson = require('../utils/resJson')

const Sequelize = require('sequelize');
const Op = Sequelize.Op; // 模糊查询使用

module.exports = {
  selectAll: async (ctx, next) => {
    await Table.findAll({
      raw: true,
      attributes: { // 不返回password字段
        // exclude: ['password'] 
      }
    }).then((res) => {
      // console.log('给前端的成功的数据：',res)
    	// 成功返回
      ctx.body = resJson.success({data: res})
    }).catch((err) => {
      console.log('给前端的失败的数据：',err)
    	// 失败，捕获异常并输出
      ctx.body = resJson.fail(err)
    })
  },
  selectOne: async (ctx, next) => {
    // console.log('查询一条时的参数：', ctx)
     // 从ctx的request中拿到我们想要的数据
    let data = ctx.request.query
    let dataQueryString = ctx.request.querystring
    console.log('-----data:',data)
    console.log('-----dataQueryString-:', dataQueryString)
    let [key] = Object.entries(data)
    console.log('对象结构：',key)
    // let id = data.id
    await Table.findAll({// 只查询一条，为对象类型
    // await Table.findOne({// 只查询一条，为对象类型
      // where:data
      // where:{id:1}
      where: {
      //   // name: 'cheny', // 精确查询
        [key[0]]: {
          // 模糊查询
          [Op.like]:'%' +[key[1]] + '%'
        }
      },
      //select a,b,c from model where id=1;
    }).then((res) => {
      // console.log('给前端的成功的数据：',res)
    	// 成功返回
      ctx.body = resJson.success({data: res})
    }).catch((err) => {
      console.log('给前端的失败的数据：',err)
    	// 失败，捕获异常并输出
      ctx.body = resJson.fail(err)
    })
  },
  addOne: async (ctx, next) => {
    // console.log('获取前端的参数数据：', ctx.request) // 头部信息都可以获取   // 前提是前端设置了请求头
    let data = ctx.request.query
    console.log('给前端的成功的数据：',data)
     // 我们可以从ctx的request.body拿到提交上来的数据
    let {name, phone,sex} = ctx.request.body
    console.log('添加时的参数：', name,phone,sex)
    let addData= {
      name:name,
      phone:phone,
      sex:sex
      // name:'name',
      // phone:'phone',
      // sex:1
      // u:"adwadfv2324"
    }
    await Table.create(addData).then((res) => {
      // console.log('给前端的成功的数据：',res)
    	// 成功返回
      ctx.body = resJson.success({msg:'添加成功'})
    }).catch((err) => {
      console.log('给前端的失败的数据：',err)
    	// 失败，捕获异常并输出
      ctx.body = resJson.fail(err)
    })
  },
  updateOne: async (ctx, next) => {
    let id = ctx.request.query.id
    let {name, phone,sex} = ctx.request.body
    console.log('修改时的参数：', name,phone,sex,id)
    let updateData= {
      name:name,
      phone:phone,
      sex:sex
      // name:'name',
      // phone:'phone',
      // sex:1
      // u:"adwadfv2324"
    }

    await Table.update(updateData, {
      where: {
        id: id
      }
    }).then(() => {
      ctx.body = resJson.success({msg:'修改成功'})
    }).catch((err) => {
      console.log('给前端的失败的数据：',err)
    	// 失败，捕获异常并输出
      ctx.body = resJson.fail(err)
    })
  },
  deleteOne: async (ctx, next) => {
    let id = ctx.request.query.id
    console.log('删除时的id：',id)
    await Table.destroy( {
      where: {
        id: id
      }
    }).then(() => {
      ctx.body = resJson.success({msg:'删除成功'})
    }).catch((err) => {
      console.log('给前端的失败的数据：',err)
    	// 失败，捕获异常并输出
      ctx.body = resJson.fail(err)
    })
  },
}