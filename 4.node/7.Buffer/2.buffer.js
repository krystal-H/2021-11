// 1)node中的模块实现原理 commonjs
// 2)核心模块的用法  npm第三方模块用法
// 3)global属性  process node EventLoop


// 我们在node中要操作文件（文件读写  内存  二进制） 描述内存的buffer  默认都是二进制数据

// 转化规则 一个字节由8个bit位组成（0/1） 二进制逢二进一   十进制逢10进一  16进制逢10进一

// 11111111 -> 255  （一个字节最大是255）
// 255 -> 8进制 => (255对8取余7 7 3) 即377
// 255 -> 16进制  => (255对16取余15 15) 即FF
// FF -> 255  => 15*16^1 + 15*16^0 = 240+15

// 二进制转换成10进制  可以采用当前位的值 * 进制^(所在位 -1) 累加

// node中buffer是以16进制来处理的 （只是因为16进制比较短） 进制只是表现，一个数可以表现成不同的进制

// 0b 开头的是2进制
// 0o 开头的是8进制
// 0x 开头的是16进制

console.log(100..toString(2)) // 100转换成2进制显示
console.log(parseInt('1100100', 2)) // 可以将任何的进制转化成10进制
console.log(parseInt('ff', 16)) // 将进制转化成10进制

// 小数怎么转化成2进制   0.1 +0.2为什么不等于0.3
// 小数的转化规则  乘2取整法

// 0.1 -> 0.2 -> 0
// 0.2 -> 0.4 -> 0
// 0.4 -> 0.8 -> 0
// 0.8 -> 1.6 -> 1
// 0.6 -> 1.2 -> 1
// 0.2 ->...

console.log(0.1.toString(2)) // 不能用有限的空间来描述无限的值 （精确  比以前的值大）
console.log(0.2.toString(2)) // 得到的肯定是一个近似值 -》得出了一个偏大的值
// 0.2 + 0.2近似值

// 那如何解决这个问题呢？



let sum = 0
for (let i = 0; i < 8; i++) {
  sum += 1 * 2 ** i
}
console.log(sum)
console.log(2 ** 8 - 1)


// base64转化  编码任何东西  基于二进制（方便传输） 好处是base64可以替换任何的url地址（减少请求）
// 编码：不叫加密（编码可以反编码，加密需要有对应的密钥解密，编码是一套开发的方案）

// 汉字  node中统一默认只支持utf8格式 一个汉字由3个字节组成，3*8=24位   (ps：GBK编码,一个汉字占两个字节)


console.log(Buffer.from('珠')) // e7 8f a0
console.log((0xe7).toString(2))
console.log((0x8f).toString(2))
console.log((0xa0).toString(2))


// 将汉字转化成base64格式  特点就是每一个字节不得超过64(由64个字符组成)
// 00111111   2**6 -1 = 63

// 11100111 10001111 10100000 -> 24位  3*8 -> 4*6
// 111001 111000 111110 100000
console.log(parseInt('111001', '2'))
console.log(parseInt('111000', '2'))
console.log(parseInt('111110', '2'))
console.log(parseInt('100000', '2'))

// 57 56 62 32

let code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
code += code.toLowerCase()
code += '0123456789'
code += '+/'
console.log(code[57] + code[56] + code[62] + code[32]) // 54+g   4个字节  比以前大了1/3

// base64编译出来的结果会比以前大 （不是所有的东西都要转化成base64）



// base32怎么实现的？  00011111