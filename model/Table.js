const Sequelize = require('sequelize')
const sequelize = require('../db')

const Table = sequelize.define('table', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false, // 设置为false时，会给添加NOT NULL（非空）约束，数据保存时会进行非空验证
    comment: 'ID', // 字段描述（自1.7+后，此描述不再添加到数据库中
    autoIncrement: true, // 是否自增
    primaryKey: true, // 指定是否是主键
    unique: true, // 设置为true时，会为列添加唯一约束
  },
  name: {
    type: Sequelize.STRING(20),
    validate: {
      notEmpty: true
    }, // 模型每次保存时调用的验证对象。可是validator.js中的验证函数(参见 DAOValidator)、或自定义的验证函数
    allowNull: false, // 设置为false时，会给添加NOT NULL（非空）约束，数据保存时会进行非空验证
    comment: '用户名称' // 字段描述（自1.7+后，此描述不再添加到数据库中）
  },
  phone: {
    type: Sequelize.STRING(11),
    allowNull: false, // 设置为false时，会给添加NOT NULL（非空）约束，数据保存时会进行非空验证
    comment: '手机号码' // 字段描述（自1.7+后，此描述不再添加到数据库中）
  },
  sex: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true,
      len: 1
    }, // 模型每次保存时调用的验证对象。可是validator.js中的验证函数(参见 DAOValidator)、或自定义的验证函数
    allowNull: false, // 设置为false时，会给添加NOT NULL（非空）约束，数据保存时会进行非空验证
    defaultValue: 0, // 字面默认值, JavaScript函数, 或一个 SQL 函数
    comment: '性别，0-男 1-女' // 字段描述（自1.7+后，此描述不再添加到数据库中）
  },
  //token
  // token: {
  //   type: Sequelize.UUID
  // },
  // create_time: {
  //   type: Sequelize.DATE,
  //   defaultValue: Sequelize.NOW
  // }
}, {
  freezeTableName: true, // 设置为true时，sequelize不会改变表名，否则可能会按其规则有所调整
  timestamps: true, // 为模型添加 createdAt 和 updatedAt 两个时间戳字段
  indexes:[
    //普通索引,默认BTREE
      {
          unique: true,
          fields: ['id']  // 怎么使用？
      },
   ]
})

//创建表，默认是false，true则是删除原有表，再创建
Table.sync({
  force: false,
})

module.exports = Table

// 作者：greenycaicai
// 链接：https://juejin.im/post/5e4e55586fb9a07ca90c25ca
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。