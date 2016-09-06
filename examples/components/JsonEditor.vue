<template>
    <div class="json-editor-container"></div>
</template>

<script>

    var _ = require('lodash');
    var JSONEditor = require('jsoneditor');

    export default {
        name: 'JsonEditor',
        props: {
            anything: {
                required: true
            },
            update: {
                type: Function,
                required: true
            }
        },
        ready: function () {
            var self = this;
            var editor;

            var options = {
                mode: 'code',
                modes: ['code','tree'],
                onError: function (err) {
                    alert(err.toString());
                },
                onChange: _.debounce(function () {
                    self.update(editor.get());
                }, 500)
            };

            editor = new JSONEditor(this.$el, options);
            editor.set(this.anything);
        }
    };
</script>

<style src="jsoneditor/dist/jsoneditor.css"></style>

<style>
.json-editor-container,
.ace_editor,
.jsoneditor {
    min-height: 400px;
}
</style>
