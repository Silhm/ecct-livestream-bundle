import Vue from 'vue';
import LayoutSwitcherCtrl from './layout-switcher-ctrl.vue';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
	render: h => h(LayoutSwitcherCtrl),
}).$mount('#app');
