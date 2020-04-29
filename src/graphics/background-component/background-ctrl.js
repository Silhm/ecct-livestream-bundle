import Vue from 'vue';
import BackgroundCtrl from './background-ctrl.vue';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import moment from 'moment'
import VueMoment from 'vue-moment';

Vue.prototype.moment = moment


import './assets/animations.scss';

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueMoment)

new Vue({
	render: h => h(BackgroundCtrl),
}).$mount('#app');
