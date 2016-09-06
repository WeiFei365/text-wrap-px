<template>
    <div class="">
        <div class="btn-group btn-group-justified">
            <div class="btn-group">
                <button v-on:click="defaultText('en')" type="button" class="btn btn-default">EN</button>
            </div>
            <div class="btn-group">
                <button v-on:click="defaultText('cn')" type="button" class="btn btn-default">中文</button>
            </div>
            <div class="btn-group">
                <button v-on:click="defaultText('en_cn')" type="button" class="btn btn-default">中英文（常用）</button>
            </div>
            <div class="btn-group">
                <button v-on:click="defaultText('en_cn_stand')" type="button" class="btn btn-default">中英文（标准）</button>
            </div>
        </div>
        <textarea v-model="text" v-on:keyup="updateText" class="text-wrap-px-input form-control" rows="5" placeholder="点击上面按钮或输入一段文本"></textarea>
    </div>
</template>

<script>

    const DEFAULT_TEXT = {
        en: 'Array elements may be elided at the beginning, middle or end of the element list. Whenever a comma in the element list is not preceded by an AssignmentExpression (i.e., a comma at the beginning or after another comma), the missing array element contributes to the length of the Array and increases the index of subsequent elements. Elided array elements are not defined. If an element is elided at the end of an array, that element does not contribute to the length of the Array.',
        cn: '一般来说，没有必要阅读规格，除非你要写编译器。因为规格写得非常抽象和精炼，又缺乏实例，不容易理解，而且对于解决实际的应用问题，帮助不大。但是，如果你遇到疑难的语法问题，实在找不到答案，这时可以去查看规格文件，了解语言标准是怎么说的。规格是解决问题的“最后一招”。',
        en_cn: 'ECMAScript 6是JavaScript语言的下一代标准，已经在2015年6月正式发布了。它的目标，是使得JavaScript语言可以用来编写复杂的大型应用程序，成为企业级开发语言。',
        en_cn_stand: 'ECMAScript 6 是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。'
    };

    export default {
        name: 'TextInput',
        props: {
            update: {
                type: Function,
                required: true
            }
        },
        data() {
            return {
                text: ''
            };
        },
        methods: {
            updateText() {
                this.update(this.text);
            },
            defaultText(lang) {
                this.text = DEFAULT_TEXT[lang];
                this.updateText();
            }
        }
    };
</script>
