<template>
    <div class="text-wrap-px-show">
        <br />
        <div class="panel panel-default">
            <div class="panel-body">
                <span v-for="row in textRows" v-bind:class="options.class" v-bind:style="options.style" class="text-row">{{row}}<br/></span>
            </div>
        </div>

        <span class="text-one-row" v-bind:class="options.class" v-bind:style="options.style">{{text}}</span>
    </div>
</template>

<script>
    // var TextWrapPX = require('../../build/text-wrap-px.js');
    var TextWrapPX = require('../../scripts/index.js');
    var _ = require('lodash');

    export default {
        name: 'TextShow',
        props: {
            text: {
                type: String,
                required: true
            },
            options: {
                type: Object
            }
        },
        data() {
            return {
                textRows: []
            };
        },
        watch: {
            text(val, oldVal) {
                this.toRows();
            },
            options(val, oldVal) {
                this.toRows();
            }
        },
        ready() {
            const self = this;

            self.instance = new TextWrapPX(self.text, self.options);

            self.toRows();
        },
        computed: {
        },
        methods: {
            toRows() {
                const self = this;
                const { text, options, instance } = self;

                instance.setOptions(options);

                self.textRows = instance.build(text);

                console.log(self.textRows, text, instance.getoptions(), instance);
            }
        }
    };
</script>

<style>
.text-row,
.text-one-row {
    background-color: #f2f2f2;
}

.text-one-row {
    white-space: nowrap;
    margin-right: 50px;
}

.text-wrap-px-show {
    margin-bottom: 50px;
}
</style>
