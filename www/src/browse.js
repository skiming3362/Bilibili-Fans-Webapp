/*
* @Author: skiming
* @Date:   2017-04-23 22:44:27
* @Last Modified by:   skiming
* @Last Modified time: 2017-05-19 00:10:42
*/

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import DataTables from 'vue-data-tables'

import App from './App.vue'

class PageController {

	constructor() {
	}

	create_vue_instanse() {
		Vue.use(ElementUI)
		Vue.use(DataTables)
		new Vue({
		  el: '#vm',
		  render: h => h(App)
		});
	}

	create_editor() {
		Vue.nextTick(()=>{
			let editor = new wangEditor('rich-editor');
			// upload image config
			editor.config.uploadImgUrl = '/api/upload';
			editor.create();
		});
	}
}
const controller = new PageController();
controller.create_vue_instanse();
controller.create_editor();