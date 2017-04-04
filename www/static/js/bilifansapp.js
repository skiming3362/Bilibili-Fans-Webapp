/*
* @Author: skiming
* @Date:   2017-04-03 13:40:09
* @Last Modified by:   skiming
* @Last Modified time: 2017-04-04 10:14:38
*/

'use strict';

var level = echarts.init(document.getElementById('level'));

var level_option = {
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

level.setOption(level_option);
level.showLoading();
$.get('api/LevelInfo',{mid: '116568'}).done(function(data){
	level.hideLoading();
	level.setOption({
		xAxis: {
			data: data.categories
		},
		series: [{
			name: '人数',
			type: 'bar',
			data: data.data
		}]
	});
})

var sex = echarts.init(document.getElementById('sex'));

var sex_option = {
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
		radius : '55%',
		data: [],
		itemStyle: {
			emphasis: {
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowColor: 'rgba(0,0,0,0.5)'
			}
		}
	}
}

sex.setOption(sex_option);
sex.showLoading();
$.get('api/SexInfo',{mid: '116568'}).done(function(data){
	sex.hideLoading();
	sex.setOption({
		series: [{
			data: [
				{value: data.boy, name:'男'},
				{value: data.girl, name:'女'},
				{value: data.unknown, name:'保密'}
			]
		}]
	});
})

var place = echarts.init(document.getElementById('place'));

var place_option = {
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
		text: ['多','少'],
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

place.setOption(place_option);
place.showLoading();
$.get('/api/PlaceInfo',{mid: '116568'}).done(function(data){
	place.hideLoading();
	place.setOption({
		series: {
			data: [
				{name: '北京',value: data.list[0]},
		        {name: '天津',value: data.list[1]},
		        {name: '上海',value: data.list[2]},
		        {name: '重庆',value: data.list[3]},
		        {name: '河北',value: data.list[4]},
		        {name: '河南',value: data.list[5]},
		        {name: '云南',value: data.list[6]},
		        {name: '辽宁',value: data.list[7]},
		        {name: '黑龙江',value: data.list[8]},
		        {name: '湖南',value: data.list[9]},
		        {name: '安徽',value: data.list[10]},
		        {name: '山东',value: data.list[11]},
		        {name: '新疆',value: data.list[12]},
		        {name: '江苏',value: data.list[13]},
		        {name: '浙江',value: data.list[14]},
		        {name: '江西',value: data.list[15]},
		        {name: '湖北',value: data.list[16]},
		        {name: '广西',value: data.list[17]},
		        {name: '甘肃',value: data.list[18]},
		        {name: '山西',value: data.list[19]},
		        {name: '内蒙古',value: data.list[20]},
		        {name: '陕西',value: data.list[21]},
		        {name: '吉林',value: data.list[22]},
		        {name: '福建',value: data.list[23]},
		        {name: '贵州',value: data.list[24]},
		        {name: '广东',value: data.list[25]},
		        {name: '青海',value: data.list[26]},
		        {name: '西藏',value: data.list[27]},
		        {name: '四川',value: data.list[28]},
		        {name: '宁夏',value: data.list[29]},
		        {name: '海南',value: data.list[30]},
		        {name: '台湾',value: data.list[31]},
		        {name: '香港',value: data.list[32]},
		        {name: '澳门',value: data.list[33]}
			]
		}
	});
});

var regtime = echarts.init(document.getElementById('regtime'));

var regtime_option = {
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
	dataZoom: [
		{
			type: 'slider',
			start: 80,
			end: 90
		},
		{
			type: 'inside',
			start: 80,
			end: 90
		}
	],
	toolbox: {
		feature: {
			dataZoom: {
				yAxisIndex: 'none'
			},
			magicType: {type: ['stack', 'tiled']}
		}
	},
	legend: {
		data: ['注册','关注']
	},
	series: [
		{
			name: '注册',
			type: 'bar',
			data: []
		},
		{
			name: '关注',
			type: 'bar',
			data: []
		}
	]
};

regtime.setOption(regtime_option);
regtime.showLoading();
$.get('/api/RegtimeInfo',{mid: '116568'}).done(function(data){
	regtime.hideLoading();
	regtime.setOption({
		series: [
			{
				data: data.regdata
			},
			{
				data: data.adddata
			}
		]
	});
})

var fans_num = echarts.init(document.getElementById('fans_num'));

var fans_num_option = {
	title: {
		text: '粉丝拥有的最大粉丝数',
	},
	tooltip: {},
	xAxis: {},
	yAxis: {
		data: [116568,123121,345345,456456]
	},
	series: {
		name: '粉丝数',
		type: 'bar',
		data: [3332,1234,456,121]
	}
};

fans_num.setOption(fans_num_option);