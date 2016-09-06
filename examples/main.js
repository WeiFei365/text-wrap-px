'use strict'

import Vue from 'vue';
import App from './App.vue';

Vue.config.debug = true;

new Vue({
    el: 'body',
    components: {
        App
    }
});
