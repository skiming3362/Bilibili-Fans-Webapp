# -*- coding: utf-8 -*-
# @Author: skiming
# @Date:   2017-04-27 22:53:49
# @Last Modified by:   skiming
# @Last Modified time: 2017-04-27 23:40:02
import os, re, logging

def getSpecifiedFilename(filePath, regStr):
    fileList = os.listdir(filePath)
    filterList = []
    for file in fileList:
        if re.match(regStr, file): filterList.append(file)
    return filterList