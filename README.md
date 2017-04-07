# Bilibili-Fans-Webapp  
展示UP主粉丝数据   

前端：MVVM Vue  工具库 jQuery 图表库 Echarts 样式库 Bootstrap  模板引擎 jinja2   
服务器： 语言：Python      Web框架基于 aiohttp        orm框架基于 asyncio aiomysql   
数据库：MySQL   
## 主页   
暂时只展示MID 116568 也就是我的数据    
### 图表API   
<pre>
	1. 等级分布
url:  /api/LevelInfo
	type: GET
	data: mid

	
	2. 性别	
url: /api/SexInfo
	type: GET
	data: mid

	3. 地址	
url: /api/PlaceInfo
	type: GET
	data: mid

	4. 注册时间分布
	url: /api/RegtimeInfo
	type: GET
	data: mid

	5. 粉丝数	
url: /api/FansNumInfo
	type: GET
	data: mid
</pre>
## 浏览页    
### 获取页面数据   
<pre>
url: /api/browse/116568
type: GET
data: page
</pre>
