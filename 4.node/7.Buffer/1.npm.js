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


// 1)我们需要创建可执行文件  添加执行环境  #! /user/bin/env node
// 2)配置package.json中的bin参数
// 3)npm link 创建软连接到全局  （为了测试）或者直接发布  通过npm install -g来进行安装

// 作用域（@xxx/morth @qqq/morth）、全局的（会重名）@babel/core @babel/cli  @bebel/runtime-core

// C:\Users\800558\AppData\Roaming\npm\my-npm-package -> C:\Users\800558\AppData\Roaming\npm\node_modules\my-npm-package\bin\www
// C:\Users\800558\AppData\Roaming\npm\node_modules\my-npm-package -> E:\3.202111\4.node\7.Buffer

// 4)发布的时候  每次版本都需要更新   semver规范 major.minor.patch
// 5) 发布包  npm publish (如果是向npm官方发布  需要切换到npm源上  登陆账号)

// 升级版本——npm version 版本号（major | minor | patch）

// 第三方模块
// 在项目中安装模块（这个项目需要用的模块）
// 项目依赖  开发/生产都需要的包 --save新版本默认不要增加了  vue
// 开发依赖  webpack/rollup...--save-dev开发的时候需要 上线的时候不需要
// 同等依赖  我安装一个包  需要告诉你用其他一个包  bootstrap,jquery
// 可选依赖  你安装不安转
// 捆绑依赖  当使用npm pack的时候  会将模块对应的压缩进去



// 只要是一个包必须有一个package.json     npm init -y

// main字段是给require用的
// moudle 字段是给import用的
// bin 给执行脚本的时候用的



// 幽灵依赖：我的项目中用了a包 -》b包   b包也会被安装到node_modules下
// 有一天a删掉了，b就没有了，项目中b就出问题了


// 执行脚本
// mime 就是给一个文件名就可以来看下这个文件类型（例如webpack 我们希望把它安装到全局下吗？ no）
// 最终将webpack安装到项目下，使用项目中webpack来打包

// 默认通过npm run xxx 的时候会将当前项目下node_modules/.bin这个目录放到全局path,执行完了就删除了

// npx也可以执行.bin目录下的文件  （核心也是将当前的node_modules/.bin）放到环境中，如果没有这个模块会下载
// 下载完成后  命令执行结束了会被删掉  初始化项目配置文件可能用到npx
