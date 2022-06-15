// 第三方模块：别人写好的模块  我们需要手动安装  安装后用法同核心模块
// 引用的时候 不需要加相对路径挥着绝对路径

// npm node package manager 包管理工具 当我们安装node后可以直接使用
// 环境变量npm node 安装到环境变量中的都可以直接使用（只要需要全局使用都需要配置到path中）

// node里边有3个n npm nrm(管理从哪里去下载的) nvm(在window下)切换node版本

// npm install nrm -g (也可以在项目下创建.npmrc的文件单独对某个项目去配置)

// npm install nrm -g 安装一个全局的模块，就是可以在命令中直接使用
// 我们安装的全局包都会被安装到npm的全局目录下，这样都可以直接使用(npm目录被配置到了path下)

// 全局模块  （只能在命令行中用，不能再项目中使用）
console.log(module.paths) // C:\Users\800558\AppData\Roaming\npm
// 常见的功能就是一些编译操作都是全局模块，脚手架  也都是全局的 (vue/cli  create-react-app)

// 只要是一个包必须有一个package.json     npm init -y
