# Text Wrap Pixels(text-wrap-px)

简单来讲，**TextWrapPX** 是一个基于 JavaScript 来精确处理文本断行、截断的小工具；使用场景类似无法直接通过 CSS Style 来控制断行、截断，如：SVG 中的 text 标签，canvas 中的文本换行等等；


* [用法](https://weifei365.gitbooks.io/text-wrap-px/content/usages.html)
* [在线测试](http://weifei365.github.io/text-wrap-px/)
* [Options 配置项](https://weifei365.gitbooks.io/text-wrap-px/content/options.html)
* [API 接口定义](https://weifei365.gitbooks.io/text-wrap-px/content/api_documents.html)
* [其他说明](https://weifei365.gitbooks.io/text-wrap-px/content/tips.html)
* [开发者](https://weifei365.gitbooks.io/text-wrap-px/content/developer.html)


## 一、NPM 安装使用

进入到你的项目根目录，输入以下命令将 **TextWrapPX** 安装到你的项目中：

```bash
npm install --save text-wrap-px
```

【实例方式】安装成功后，在你需要使用的地方这样：

```js
var TextWrapPX = require('text-wrap-px');
var textWrapPXOpts = { maxWidth: [400] };
var textWrapper = new TextWrapPX('', textWrapPXOpts);

// result 是一个数组，result.length 表示文本的行数，result[i] 表示第 i 行的文本
var result = textWrapper.build('Hello text-wrap-px');

// 使用完了以后别忘记销毁
textWrapper.destroy();
```

【方法方式】上面那种是实例的使用方式，如果只是想简单的一次性使用，也可以这样：

```js
var TextWrapPX = require('text-wrap-px');

var result = TextWrapPX('Hello text-wrap-px', { maxWidth: [400] });
```

## License

**text-wrap-px** dependent on some open source licensed projects as well. Please checkout their homepage for more details:

+ [jquery](https://jquery.com/) - jQuery Foundation
+ [lodash](https://lodash.com/) - Dojo Foundation
