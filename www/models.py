# -*- coding: utf-8 -*-
# @Author: skiming
# @Date:   2017-03-30 05:00:59
# @Last Modified by:   skiming
# @Last Modified time: 2017-03-30 05:48:11
from orm import Model, StringField, IntegerField, BigIntegerField, SmallIntegerField, TinyIntegerField

class User_info(Model):
	__table__ = 'user_info'

	id = IntegerField(primary_key=True)
	mid = IntegerField(primary_key=True)
	name = StringField(ddl='varchar(50)')
	regtime = BigIntegerField()
	sex = StringField(ddl='varchar(50)')
	place = StringField(ddl='varchar(50)')
	level = TinyIntegerField()
	birthday = StringField(ddl='varchar(50)')
	approve = TinyIntegerField()
	attention_num = IntegerField()
	sign = StringField(ddl='varchar(500)')
	description = StringField(ddl='varchar(500)')
	face = StringField(ddl='varchar(500)')
	fans_num = IntegerField()
	play_num = IntegerField()
	rank = SmallIntegerField()

class User_relation(Model):
	__table__ = 'user_relation'

	id = IntegerField(primary_key=True)
	user_id = IntegerField()
	follower_id = IntegerField()
	relation_type = TinyIntegerField()