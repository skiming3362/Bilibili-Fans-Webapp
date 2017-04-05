'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* @Author: skiming
* @Date:   2017-04-03 13:40:09
* @Last Modified by:   skiming
* @Last Modified time: 2017-04-05 06:41:48
*/

var Up = function () {
	function Up(mid) {
		_classCallCheck(this, Up);

		this.mid = mid;
	}

	_createClass(Up, [{
		key: 'initLevel',
		value: function initLevel() {
			this.level = echarts.init(document.getElementById('level'));
			this.level_option = {
				title: {
					text: '等级分布'
				},
				tooltip: {},
				legend: {
					data: ['人数']
				},
				xAxis: {
					data: []
				},
				yAxis: {},
				series: [{
					name: '人数',
					type: 'bar',
					data: []
				}]
			};
			this.level.setOption(this.level_option);
			this.level.showLoading();
		}
	}, {
		key: 'setLevel',
		value: function setLevel() {
			var _this = this;

			$.get('api/LevelInfo', { mid: '116568' }).done(function (data) {
				_this.level.hideLoading();
				_this.level.setOption({
					xAxis: {
						data: data.categories
					},
					series: [{
						name: '人数',
						type: 'bar',
						data: data.data
					}]
				});
			});
		}
	}, {
		key: 'initSex',
		value: function initSex() {
			this.sex = echarts.init(document.getElementById('sex'));
			this.sex_option = {
				title: {
					text: '性别比例'
				},
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%))"
				},
				legend: {},
				series: {
					name: '比例',
					type: 'pie',
					radius: ['25%', '65%'],
					roseType: 'angle',
					data: [],
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0,0,0,0.5)'
						}
					}
				}
			};
			this.sex.setOption(this.sex_option);
			this.sex.showLoading();
		}
	}, {
		key: 'setSex',
		value: function setSex() {
			var _this2 = this;

			$.get('api/SexInfo', { mid: '116568' }).done(function (data) {
				_this2.sex.hideLoading();
				_this2.sex.setOption({
					series: [{
						data: [{ value: data.boy, name: '男' }, { value: data.girl, name: '女' }, { value: data.unknown, name: '保密' }]
					}]
				});
			});
		}
	}, {
		key: 'initPlace',
		value: function initPlace() {
			this.place = echarts.init(document.getElementById('place'));
			this.place_option = {
				title: {
					text: '粉丝分布',
					subtext: '仅限公开数据'
				},
				tooltip: {
					trigger: 'item'
				},
				visualMap: {
					min: 0,
					max: 50,
					left: 'left',
					top: '50%',
					text: ['多', '少'],
					calculable: true
				},
				toolbox: {},
				series: {
					name: '人数',
					type: 'map',
					map: 'china',
					roam: 'scale',
					label: {
						normal: {
							show: false
						},
						emphasis: {
							show: true
						}
					},
					data: []
				}
			};
			this.place.setOption(this.place_option);
			this.place.showLoading();
		}
	}, {
		key: 'setPlace',
		value: function setPlace() {
			var _this3 = this;

			$.get('/api/PlaceInfo', { mid: '116568' }).done(function (data) {
				_this3.place.hideLoading();
				_this3.place.setOption({
					series: {
						data: [{ name: '北京', value: data.list[0] }, { name: '天津', value: data.list[1] }, { name: '上海', value: data.list[2] }, { name: '重庆', value: data.list[3] }, { name: '河北', value: data.list[4] }, { name: '河南', value: data.list[5] }, { name: '云南', value: data.list[6] }, { name: '辽宁', value: data.list[7] }, { name: '黑龙江', value: data.list[8] }, { name: '湖南', value: data.list[9] }, { name: '安徽', value: data.list[10] }, { name: '山东', value: data.list[11] }, { name: '新疆', value: data.list[12] }, { name: '江苏', value: data.list[13] }, { name: '浙江', value: data.list[14] }, { name: '江西', value: data.list[15] }, { name: '湖北', value: data.list[16] }, { name: '广西', value: data.list[17] }, { name: '甘肃', value: data.list[18] }, { name: '山西', value: data.list[19] }, { name: '内蒙古', value: data.list[20] }, { name: '陕西', value: data.list[21] }, { name: '吉林', value: data.list[22] }, { name: '福建', value: data.list[23] }, { name: '贵州', value: data.list[24] }, { name: '广东', value: data.list[25] }, { name: '青海', value: data.list[26] }, { name: '西藏', value: data.list[27] }, { name: '四川', value: data.list[28] }, { name: '宁夏', value: data.list[29] }, { name: '海南', value: data.list[30] }, { name: '台湾', value: data.list[31] }, { name: '香港', value: data.list[32] }, { name: '澳门', value: data.list[33] }]
					}
				});
			});
		}
	}, {
		key: 'initRegtime',
		value: function initRegtime() {
			this.regtime = echarts.init(document.getElementById('regtime'));
			this.regtime_option = {
				title: {
					text: '注册及关注时间'
				},
				tooltip: {
					trigger: 'axis'
				},
				xAxis: {
					type: 'time'
				},
				yAxis: {
					name: '人数',
					splitLine: {
						show: false
					}
				},
				dataZoom: [{
					type: 'slider',
					start: 77,
					end: 87
				}, {
					type: 'inside',
					start: 77,
					end: 87
				}],
				toolbox: {
					feature: {
						dataZoom: {
							yAxisIndex: 'none'
						},
						magicType: { type: ['stack', 'tiled'] }
					}
				},
				legend: {
					data: ['注册', '关注']
				},
				series: [{
					name: '注册',
					type: 'bar',
					data: []
				}, {
					name: '关注',
					type: 'bar',
					data: []
				}]
			};
			this.regtime.setOption(this.regtime_option);
			this.regtime.showLoading();
		}
	}, {
		key: 'setRegtime',
		value: function setRegtime() {
			var _this4 = this;

			$.get('/api/RegtimeInfo', { mid: '116568' }).done(function (data) {
				_this4.regtime.hideLoading();
				_this4.regtime.setOption({
					series: [{
						data: data.regdata
					}, {
						data: data.adddata
					}]
				});
			});
		}
	}, {
		key: 'initFansNum',
		value: function initFansNum() {
			this.fans_num = echarts.init(document.getElementById('fans_num'));
			this.fans_num_option = {
				title: {
					text: '粉丝拥有的最大粉丝数'
				},
				tooltip: {},
				xAxis: {},
				yAxis: {
					data: []
				},
				series: {
					name: '粉丝数',
					type: 'bar',
					data: []
				}
			};
			this.fans_num.setOption(this.fans_num_option);
			this.fans_num.showLoading();
		}
	}, {
		key: 'setFansNum',
		value: function setFansNum() {
			var _this5 = this;

			$.get('/api/FansNumInfo', { mid: '116568', limit: 10 }).done(function (data) {
				_this5.fans_num.hideLoading();
				_this5.fans_num.setOption({
					yAxis: {
						data: data.namelist
					},
					series: [{
						data: data.fansnumlist
					}]
				});
			});
		}
	}, {
		key: 'setTitle',
		value: function setTitle() {
			$('.mid').text('数据来自 MID ' + this.mid).prop('href', 'http://space.bilibili.com/' + this.mid);
		}
	}, {
		key: 'setMidLink',
		value: function setMidLink() {
			var li = '<li class=""><a href="#" class="browse" style="color:#2593f5">[browse]</a></li>';
			$('.mid').parent().after(li);
			$('.browse').prop('href', '/browse/' + this.mid);
		}
	}, {
		key: 'start',
		value: function start() {

			this.setTitle();
			this.setMidLink();

			this.initLevel();
			this.initSex();
			this.initPlace();
			this.initRegtime();
			this.initFansNum();

			this.setLevel();
			this.setSex();
			this.setPlace();
			this.setRegtime();
			this.setFansNum();
		}
	}]);

	return Up;
}();

new Up(116568).start();
