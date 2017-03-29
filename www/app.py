# -*- coding: utf-8 -*-
# @Author: skiming
# @Date:   2017-03-28 23:12:04
# @Last Modified by:   skiming
# @Last Modified time: 2017-03-30 01:07:28
#           webapp 骨架
import logging; logging.basicConfig(level=logging.INFO)

import asyncio, os, json, time
from datetime import datetime

from aiohttp import web

def index(request):
	return web.Response(body=b'<h1>BilibiliFansWebapp</h1>', content_type='text/html')

async def init(loop):
	app = web.Application(loop=loop)
	app.router.add_route('GET','/', index)
	srv = await loop.create_server(app.make_handler(), '127.0.0.1', 9000)
	logging.info('server started at http://127.0.0.1:9000...')
	return srv

loop = asyncio.get_event_loop()
loop.run_until_complete(init(loop))
loop.run_forever()
