
// 文件读取等操作  都是操作的二进制数据  fs filesystem
// fs.readFileSync()  同步性能（缺陷是阻塞主线程）  fs.readFile() （异步的非阻塞）
// fs.writeFileSync()                            fs.writeFile()
// 默我们再做一些前置工作的时候（前置工作采用同步的） 在程序运行的过程中为了防止阻塞主线程（需要采用异步）


const fs = require('fs')
const path = require('path')

// 拷贝一个文件

fs.readFile(path.join(__dirname, 'package.json'), function (err, data) {
  if (err) return err
  fs.writeFile(path.join(__dirname, 'package1.json'), data, function (err, data) {
    console.log(data)
  })
})


