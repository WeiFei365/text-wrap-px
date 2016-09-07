# Text Wrap Pixels(text-wrap-px)

在网页中，一段文本实现自动换行、截断，只需要简单的 CSS 便可实现；但是，如果 CSS “失灵了”，比如：[SVG](https://www.w3.org/TR/SVGTiny12/expanded-toc.html) 中的 [text](https://www.w3.org/TR/SVGTiny12/text.html#TextElement) 标签不会自动换行、使用的第三方库如 [ECharts](http://echarts.baidu.com/) 中对坐标轴的刻度标签手动换行时到底该显示多少个字符？这些情况怎么来处理？

**TextWrapPX** 可以帮助你方便的确定一段文本应有的行数及处理截断等问题；**TextWrapPX** 使用原生的 DOM(span) 标签，支持标准 CSS 样式、className 的配置，实现与网页中完全一样的定义、显示。


* [Demo Page online](http://weifei365.github.io/text-wrap-px/)
* [API Documents(coding...)](https://weifei365.gitbooks.io/text-wrap-px/content/)


## 安装 & 使用

### 一、NPM 安装

```
npm install --save text-wrap-px
```

```javascript
var TextWrapPX = require('text-wrap-px');
// 方式一：一次性
var textArr = TextWrapPX('Hello text-wrap-px!', { maxWidth: 50 });  // 返回一个一维数组，数组中每个元素代表一行
// 方式二：多次/共用
var textWrapper = new TextWrapPX('', { maxWidth: 50 });
var textArr01 = textWrapper.build('Hello text-wrap-px!');   // 返回同上
```

### 二、&lt;script&gt; 标签

...


## API 说明

* **TextWrapPX(text, options)**

即可以作为函数使用，又可以作为类使用；

```javascript
/**
 * 既可以作为方法使用，又可以作为类实例化使用，实例会有更加丰富的 API 工具方法；
 * @param {String} text    需要格式化的文本
 * @param {Object} options 一些个性化的配置项，请参考：https://github.com/WeiFei365/text-wrap-px#options
 */
```

* **.build(text)**

实例方法，格式化文本；text 必须；

* **.destroy()**

实例方法，销毁 TextWrapPX 所生成的 DOM、释放内存占用；

* **.setOptions(options)**

实例方法，更新自定义配置；

```javascript
/**
 * 更新自定义配置；
 * @param {Object} options 一些个性化的配置项，请参考：https://github.com/WeiFei365/text-wrap-px#options
 */
```

* **.$width(text)**

实例方法，获取文本的总宽度；*text* 如果不传入，则使用上次传入的文本，如果传入也不会替换上次存储的文本（如.build(text) 传入的）；

这是一个非常有用的 API 工具，可以帮助你确定是否需要做进一步的文本换行、截断处理；

* **.$height(text)**

实例方法，获取文本的高度；*text* 如果不传入，则使用上次传入的文本，如果传入也不会替换上次存储的文本（如.build(text) 传入的；

获取的是否是单行的高度将取决于你传入的 *options.style* 配置；


## Options 说明

* **options.maxWidth** *Array | Number*

单行的最大像素宽度；
如果是 Number 类型，则每一行都是相等的宽度；
如果是 Array 类型，则每一行均可定义最大宽度，如果数组的长度不匹配计算出来的行数，则会循环使用该数组；

* **options.maxRow** *Number*

需要返回的最多行数，当实际行数大于需要的行数时，会自动舍去其余行，并在其最后一行的文本追加后缀 (options.suffix)；

* **options.splitSymbol** *String*

在入参 *text* 中，区分单个字符或一个单词或每段文本的标志（比如空格字符）；**TextWrapPX** 内部会直接调用：

```javascript
text.split(splitSymbol);
```

从而得到一个数组来使用；

* **options.suffix** *String*

当发生截断（单词截断、行截断等）时，需要追加的后缀；

* **options.class** *String*

需要给 **TextWrapPX** 内部使用的 DOM 添加的 *claaName*，多个 *class* 用空格分隔；

* **options.style** *Object*

需要在 **TextWrapPX** 内部使用的 DOM 上添加的 CSS 样式，支持任意数量的合法的 CSS 样式定义；**TextWrapPX** 内部默认使用的样式：

```javascript
{
    'display': 'inline-block',
    'position': 'absolute',
    'margin-top': '-99999px',
    'white-space': 'nowrap'
}
```

*position*、*margin-top* 用来将 **TextWrapPX** 内部使用的 DOM 移出视野（→。→）；*white-space* 用来固定单行文本不换行；
当然，你也可以传入相同的样式名覆盖默认样式！！！

* **options.parent** *DOM*

要将 **TextWrapPX** 内部使用的 DOM 插入到哪里，默认是插入为 *body* 直系子元素；


## 使用示例

...


## 一些技巧总结

* 不建议覆盖 **TextWrapPX** 的默认样式，尤其是 *display*、*white-space* 这两个样式；

* 参数 *options.parent* 的引入是为了可以直接使 **TextWrapPX** 内部使用的 DOM(span) 继承一些已定义的样式；

* 参数 *options.maxWidth* 支持数组类型，因此可以制作瀑布文本了；并且，当文本倾斜时，每一行的宽度可能是不同的；


## Demo Page

### 一、Github clone

```
git clone https://github.com/WeiFei365/text-wrap-px.git
```

```
cd text-wrap-px
```

```
npm install
```

```
npm start
```

然后，打开浏览器，地址栏输入 [http://localhost:8080/](http://localhost:8080/) 试用、查看；


### 二、点击[访问我的 Github Page 开始在线试用](http://weifei365.github.io/text-wrap-px/)


## 建议 & API 扩展

欢迎你给我一些建议，来帮助改进、完善 **TextWrapPX**；如果，你考虑到有一些 API 需求度非常高，欢迎告诉我，或许被采纳了呢，你不是省很多时间了！

[来一条？](https://github.com/WeiFei365/text-wrap-px/issues/new)
