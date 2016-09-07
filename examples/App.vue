<template>
    <div id="app" class="container">
        <div class="page-header">
            <nav class="navbar navbar-default" role="navigation">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">Text Wrap Pixels</a>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="https://weifei365.gitbooks.io/text-wrap-px/content/">Documents</a></li>
                        <li><a href="https://github.com/WeiFei365/text-wrap-px">Github</a></li>
                        <li><a href="https://www.npmjs.com/package/text-wrap-px">NPM</a></li>
                    </ul>
                </div>
            </nav>
        </div>
        <div class="row">
            <div class="text-wrap-px-options col-md-5">
                <div class="panel panel-default">
                    <div class="panel-heading">Options:</div>
                    <json-editor :anything="options" :update="updateOptions" class="panel-body"></json-editor>
                </div>
            </div>
            <div class="col-md-7">
                <div class="row">
                    <text-input :update="updateText" class="col-md-12"></text-input>
                </div>
                <div class="row">
                    <text-show :text="text" :options="options" class="col-md-12"></text-show>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import JsonEditor from './components/JsonEditor.vue';
import TextInput from './components/TextInput.vue';
import TextShow from './components/TextShow.vue';

export default {
    data() {
        return {
            options: {
                maxWidth: [200, 300, 400, 500],
                maxRow: 9,
                splitSymbol: ' ',
                suffix: '...',
                class: 'test1 test2',
                style: {
                    'fontSize': '20px',
                    'white-space': 'nowrap'
                },
                parent: null
            },
            text: ''
        };
    },
    methods: {
        updateOptions(options) {
            this.options = options;
        },
        updateText(text) {
            this.text = text;
        }
    },
    components: {
        JsonEditor,
        TextInput,
        TextShow
    }
}

</script>

<style src="./style/bootstrap.min.css"></style>
<style media="screen">
    .navbar {
        background-color: white;
        border-width: 0;
    }
    .navbar-brand {
        font-size: 30px;
        font-weight: 400;
    }
    .navbar-nav {
        font-size: 18px;
    }
</style>
