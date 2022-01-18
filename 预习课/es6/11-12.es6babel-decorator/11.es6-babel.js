// 需要依赖安装babel依赖包来运行

// es7 语法  node并不支持 wbepack + babel
// es7 更高的语法  都转化成es5
class Animal {
  static flag = 3;
  constructor() {
    this.name = 'xxx'
  }
  say() {
    console.log('说话')
  }
}

// babel-cli => @bable/cli 默认包  模块 都不安装到全局上
// 安装本地模块  保证版本一致
// npm init
// npm install @babel/cli
// npm install @babel/cli --dev 只在开发的时候使用
// npx node5.2 版本以上提供的  帮助我们执行.bin目录下的文件

// npm install @babel/core --dev  babel核心包  主要就是转化代码
// babel-preset-es2015 主要转化es6  这个包不需要了
// babel-preset-stage-0 未定案的语法  装饰器  static xxx=1  已经没了

// npm install @babel/preset-env （转化已经定案的标准）
// @babel/plugin-proposal-class-properties
// babel的配置中  一般配两个  配置插件  预设（插件的集合）
