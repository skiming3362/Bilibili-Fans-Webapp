# -*- coding: utf-8 -*-
# @Author: skiming
# @Date:   2017-03-30 16:35:20
# @Last Modified by:   skiming
# @Last Modified time: 2017-04-03 20:53:22

import re, time, json, logging, hashlib, base64, asyncio

from aiohttp import web

from coroweb import get, post
from apis import APIError, APIValueError, APIResourceNotFoundError, APIPermissionError, Page

from models import User_info, User_relation
from config import configs

@get('/')
async def index(request):
    return {
        '__template__': 'index.html',
        # 'users': user_info
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
	fans = []
	fan_sum = await User_info.findNumber('count(name)',where='mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	fan_1 = await User_info.findNumber('count(name)',where='level>0 and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	fan_2 = await User_info.findNumber('count(name)',where='level>1 and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	fan_3 = await User_info.findNumber('count(name)',where='level>2 and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	fan_4 = await User_info.findNumber('count(name)',where='level>3 and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	fan_5 = await User_info.findNumber('count(name)',where='level>4 and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	fan_6 = await User_info.findNumber('count(name)',where='level>5 and mid in (select follower_id from User_relation where user_id=%s and relation_type=1)', args=mid)
	data = [fan_sum-fan_1,fan_1-fan_2,fan_2-fan_3,fan_3-fan_4,fan_4-fan_5,fan_5-fan_6,fan_6]
	return dict(categories=['0级','1级','2级','3级','4级','5级','6级'],data=data)