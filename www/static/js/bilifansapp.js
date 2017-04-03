/*
* @Author: skiming
* @Date:   2017-04-03 13:40:09
* @Last Modified by:   skiming
* @Last Modified time: 2017-04-03 20:58:43
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
		data: [
			{value:790, name:'男'},
			{value:195, name:'女'},
			{value:1300, name:'保密'}
		],
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
		max: 100,
		left: 'left',
		top: 'bottom',
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
		data: [
			{name: '北京',value: Math.round(Math.random()*100)},
	        {name: '天津',value: Math.round(Math.random()*100)},
	        {name: '上海',value: Math.round(Math.random()*100)},
	        {name: '重庆',value: Math.round(Math.random()*100)},
	        {name: '河北',value: Math.round(Math.random()*100)},
	        {name: '河南',value: Math.round(Math.random()*100)},
	        {name: '云南',value: Math.round(Math.random()*100)},
	        {name: '辽宁',value: Math.round(Math.random()*100)},
	        {name: '黑龙江',value: Math.round(Math.random()*100)},
	        {name: '湖南',value: Math.round(Math.random()*100)},
	        {name: '安徽',value: Math.round(Math.random()*100)},
	        {name: '山东',value: Math.round(Math.random()*100)},
	        {name: '新疆',value: Math.round(Math.random()*100)},
	        {name: '江苏',value: Math.round(Math.random()*100)},
	        {name: '浙江',value: Math.round(Math.random()*100)},
	        {name: '江西',value: Math.round(Math.random()*100)},
	        {name: '湖北',value: Math.round(Math.random()*100)},
	        {name: '广西',value: Math.round(Math.random()*100)},
	        {name: '甘肃',value: Math.round(Math.random()*100)},
	        {name: '山西',value: Math.round(Math.random()*100)},
	        {name: '内蒙古',value: Math.round(Math.random()*100)},
	        {name: '陕西',value: Math.round(Math.random()*100)},
	        {name: '吉林',value: Math.round(Math.random()*100)},
	        {name: '福建',value: Math.round(Math.random()*100)},
	        {name: '贵州',value: Math.round(Math.random()*100)},
	        {name: '广东',value: Math.round(Math.random()*100)},
	        {name: '青海',value: Math.round(Math.random()*100)},
	        {name: '西藏',value: Math.round(Math.random()*100)},
	        {name: '四川',value: Math.round(Math.random()*100)},
	        {name: '宁夏',value: Math.round(Math.random()*100)},
	        {name: '海南',value: Math.round(Math.random()*100)},
	        {name: '台湾',value: Math.round(Math.random()*100)},
	        {name: '香港',value: Math.round(Math.random()*100)},
	        {name: '澳门',value: Math.round(Math.random()*100)}
		]
	}
};

place.setOption(place_option);

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
	toolbox: {},
	legend: {
		data: ['注册时间','关注时间']
	},
	series: [
		{
			name: '注册时间',
			type: 'line',
			data: [
				[1389503456123, 20],
				[1399485631234, 13],
				[1420394756321, 40],
				[1434785766234,125]
			]
		},
		{
			name: '关注时间',
			type: 'line',
			data: [
				[1399503456123, 10],
				[1419485631234, 43],
				[1432394756321, 50],
				[1444785766234,125]
			]
		}
	]
};

regtime.setOption(regtime_option);

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