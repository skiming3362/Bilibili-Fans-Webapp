# -*- coding: utf-8 -*-
# @Author: skiming
# @Date:   2017-03-30 16:35:20
# @Last Modified by:   skiming
# @Last Modified time: 2017-04-01 06:22:34

import re, time, json, logging, hashlib, base64, asyncio

from aiohttp import web

from coroweb import get, post
from apis import APIError, APIValueError, APIResourceNotFoundError, APIPermissionError, Page

from models import User_info, User_relation
from config import configs

@get('/')
async def index(request):
    user_info = await User_info.findAll()
    return {
        '__template__': 'test.html',
        'users': user_info
    }

@post('/api/UserInfo')
async def api_create_userinfo(*, mid, name, regtime, sex, place, level, approve, attention_num, sign, description, face, fans_num, play_num, rank):
	user_info = User_info(mid=mid,name=name,regtime=regtime,sex=sex,place=place,level=level,birthday=birthday,approve=approve,attention_num=attention_num,sign=sign,description=description,face=face,fans_num=fans_num,play_num=play_num,rank=rank)
	await user_info.save()

@post('/api/UserRelation')
async def api_create_userrelation(*, user_id, follower_id):
	user_relation_1 = User_relation(user_id=user_id,follower_id=follower_id,relation_type=1)
	user_relation_2 = User_relation(user_id=follower_id,follower_id=user_id,relation_type=2)
	await user_relation_1.save()
	await user_relation_2.save()