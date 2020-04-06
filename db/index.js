const Sequelize = require('sequelize')
const dotenv = require('dotenv') // 引入配置文件
const dotenvConfig = dotenv.config()
// console.log('数据库的环境变量配置文件：', dotenvConfig)

// console.log('数据库名字',dotenvConfig.parsed.DB_DATABASE)
// console.log('数据库用户名',dotenvConfig.parsed.DB_USER)
// console.log('数据库密码',dotenvConfig.parsed.DB_PSW)
// console.log('数据库端口',dotenvConfig.parsed.DB_HOST)



const sequelize = new Sequelize(
  // process.env['DB_DATABASE'],
  // process.env['DB_USER'],
  // process.env['DB_PSW'], 
  'koa_mysql_node','root','admin',
  {
    host: 'localhost', // 数据库地址
    // host: process.env['DB_HOST'], // 数据库地址
    dialect: 'mysql', // 数据库类型
    dialectOptions: { // 字符集
      charset:'utf8mb4',
      collate:'utf8mb4_unicode_ci',
      supportBigNumbers: true,
      bigNumberStrings: true
    },
    pool: {
      max: 5, // 连接池最大链接数量
      min: 0, // 最小连接数量
      idle: 10000 // 如果一个线程10秒内没有被使用的花，就释放连接池
    },
    timezone: '+08:00', // 东八时区
    logging: (log) => {
      console.log('dbLog: ', log)
      return true
    } // 执行过程会打印一些sql的log，设为false就不会显示
  }
)

module.exports = sequelize

// 作者：greenycaicai
// 链接：https://juejin.im/post/5e4e55586fb9a07ca90c25ca
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。