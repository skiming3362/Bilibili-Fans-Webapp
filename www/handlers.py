# -*- coding: utf-8 -*-
# @Author: skiming
# @Date:   2017-03-30 16:35:20
# @Last Modified by:   skiming
# @Last Modified time: 2017-04-27 23:39:34

import re, time, json, logging, hashlib, base64, asyncio, os

from aiohttp import web

from coroweb import get, post
from apis import APIError, APIValueError, APIResourceNotFoundError, APIPermissionError, Page

from models import User_info, User_relation
from config import configs

from myModule import getSpecifiedFilename

def get_page_index(page_str):
    p = 1
    try:
        p = int(page_str)
    except ValueError as e:
        pass
    if p < 1:
        p = 1
    return p

@get('/')
def index(*, mid=None, request):
    return {
        '__template__': 'index.html',
        'mid': mid
    }

@post('/api/UserInfo')
async def api_create_userinfo(*, mid, name, regtime, sex, place, level, approve, attention_num, sign, description, face, fans_num, play_num, rank):
	user_info = User_info(mid=mid,name=name.strip(),regtime=regtime,sex=sex.strip(),place=place.strip(),level=level,approve=approve,attention_num=attention_num,sign=sign.strip(),description=description.strip(),face=face.strip(),fans_num=fans_num,play_num=play_num,rank=rank)
	await user_info.save()
	return user_info

@post('/api/UserRelation')
async def api_create_userrelation(*, user_id, follower_id, addtime, charge, attentioned):
	user_relation_1 = User_relation(user_id=user_id,follower_id=follower_id,relation_type=1,addtime=addtime,charge=charge,attentioned=attentioned)
	user_relation_2 = User_relation(user_id=follower_id,follower_id=user_id,relation_type=2,addtime=addtime,charge=charge,attentioned=attentioned)
	await user_relation_1.save()
	await user_relation_2.save()
	return user_relation_1

@get('/api/LevelInfo')
async def api_get_levelinfo(*, mid):
	fan_sum = await User_info.findNumber('count(name)',where='mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	fan_1 = await User_info.findNumber('count(name)',where='level>0 and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	fan_2 = await User_info.findNumber('count(name)',where='level>1 and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	fan_3 = await User_info.findNumber('count(name)',where='level>2 and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	fan_4 = await User_info.findNumber('count(name)',where='level>3 and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	fan_5 = await User_info.findNumber('count(name)',where='level>4 and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	fan_6 = await User_info.findNumber('count(name)',where='level>5 and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	data = [fan_sum-fan_1,fan_1-fan_2,fan_2-fan_3,fan_3-fan_4,fan_4-fan_5,fan_5-fan_6,fan_6]
	return dict(categories=['0级','1级','2级','3级','4级','5级','6级'],data=data)

@get('/api/SexInfo')
async def api_get_sexinfo(*, mid):
	fan_sum = await User_info.findNumber('count(name)',where='mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	girl = await User_info.findNumber('count(name)',where='sex="女" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	boy = await User_info.findNumber('count(name)',where='sex="男" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	return dict(boy=boy,girl=girl,unknown=fan_sum-boy-girl)

@get('/api/PlaceInfo')
async def api_get_placeinfo(*, mid):
	bj = await User_info.findNumber('count(name)',where='place like "%%北京%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	tj = await User_info.findNumber('count(name)',where='place like "%%天津%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	sh = await User_info.findNumber('count(name)',where='place like "%%上海%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	cq = await User_info.findNumber('count(name)',where='place like "%%重庆%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	hb = await User_info.findNumber('count(name)',where='place like "%%河北%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	hen = await User_info.findNumber('count(name)',where='place like "%%河南%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	yn = await User_info.findNumber('count(name)',where='place like "%%云南%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	ln = await User_info.findNumber('count(name)',where='place like "%%辽宁%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	hlj = await User_info.findNumber('count(name)',where='place like "%%黑龙江%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	hn = await User_info.findNumber('count(name)',where='place like "%%湖南%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	ah = await User_info.findNumber('count(name)',where='place like "%%安徽%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	sd = await User_info.findNumber('count(name)',where='place like "%%山东%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	xj = await User_info.findNumber('count(name)',where='place like "%%新疆%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	js = await User_info.findNumber('count(name)',where='place like "%%江苏%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	zj = await User_info.findNumber('count(name)',where='place like "%%浙江%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	jx = await User_info.findNumber('count(name)',where='place like "%%江西%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	hub = await User_info.findNumber('count(name)',where='place like "%%湖北%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	gx = await User_info.findNumber('count(name)',where='place like "%%广西%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	gs = await User_info.findNumber('count(name)',where='place like "%%甘肃%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	sx = await User_info.findNumber('count(name)',where='place like "%%山西%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	nmg = await User_info.findNumber('count(name)',where='place like "%%内蒙古%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	shx = await User_info.findNumber('count(name)',where='place like "%%陕西%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	jl = await User_info.findNumber('count(name)',where='place like "%%吉林%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	fj = await User_info.findNumber('count(name)',where='place like "%%福建%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	gz = await User_info.findNumber('count(name)',where='place like "%%贵州%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	gd = await User_info.findNumber('count(name)',where='place like "%%广东%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	qh = await User_info.findNumber('count(name)',where='place like "%%青海%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	xz = await User_info.findNumber('count(name)',where='place like "%%西藏%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	sc = await User_info.findNumber('count(name)',where='place like "%%四川%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	nx = await User_info.findNumber('count(name)',where='place like "%%宁夏%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	hain = await User_info.findNumber('count(name)',where='place like "%%海南%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	tw = await User_info.findNumber('count(name)',where='place like "%%台湾%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	xg = await User_info.findNumber('count(name)',where='place like "%%香港%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	am = await User_info.findNumber('count(name)',where='place like "%%澳门%%" and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	return dict(list=[bj,tj,sh,cq,hb,hen,yn,ln,hlj,hn,ah,sd,xj,js,zj,jx,hub,gx,gs,sx,nmg,shx,jl,fj,gz,gd,qh,xz,sc,nx,hain,tw,xg,am])

@get('/api/RegtimeInfo')
async def api_get_regtimeinfo(*, mid):
	regtime = await User_info.findNumber('from_unixtime(regtime,"%%Y-%%m-%%d")',where='regtime!=0 and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)',args=mid)
	addtime = await User_relation.findNumber('from_unixtime(addtime,"%%Y-%%m-%%d")',where='user_id=%s and relation_type=1',args=mid)
	regdata = {0:0}
	adddata = {0:0}
	l = []

	def f(d):
		for k,v in d.items():
			l.append([k,v])
		return l

	for x in regtime:
		for k in regdata:
			if k!=x["_num_"]:
				flag = True
			else:
				flag = False
				break
		if flag==True:
			regdata[x["_num_"]] = 1
		else:
			regdata[x["_num_"]] += 1
	del regdata[0]
	reglist = f(regdata)

	l = []
	for x in addtime:
		for k in adddata:
			if k!=x["_num_"]:
				flag = True
			else:
				flag = False
				break
		if flag==True:
			adddata[x["_num_"]] = 1
		else:
			adddata[x["_num_"]] += 1
	del adddata[0]
	addlist = f(adddata)

	return dict(regdata=reglist,adddata=addlist)

@get('/api/FansNumInfo')
async def api_get_fansnuminfo(*, mid, limit):
	rs = await User_info.findAll(where='mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=[mid], orderBy='fans_num DESC', limit=int(limit))
	namelist = []
	fansnumlist = []
	for x in rs:
		namelist.append(x.name)
		fansnumlist.append(x.fans_num)
	return dict(namelist=namelist,fansnumlist=fansnumlist)

@get('/browse/{mid}')
def browse_mid(*,mid,page='1'):
	path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'assets')
	jsName = getSpecifiedFilename(path, r'browse-bundle')[0]
	return {
        '__template__': 'browse.html',
        'mid': mid,
        'page_index': get_page_index(page),
        'jsName': jsName
    }

@get('/api/browse/{mid}')
async def api_get_midinfo(*, mid, page='1'):
	page_index = get_page_index(page)
	num = await User_info.findNumber('count(mid)',where='mid in (select follower_id from User_relation where user_id=%s and relation_type=1)',args=[mid])
	p = Page(num, page_index)
	if num == 0:
		return dict(page=p,infos=())
	infos = await User_info.findAll(where='mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=[mid], orderBy='fans_num DESC', limit=(p.offset, p.limit))
	return dict(page=p, infos=infos)