#!/usr/bin/python
# vim: ts=2 sw=2 expandtab

# author: Penn Su
import dateutil.parser

from gevent import monkey; monkey.patch_all()
import gevent
import serial
import platform
import os, sys, zipfile, re, time
import tornado.ioloop, tornado.web
import tornado.template as template
import simplejson as json
from jinja2 import Template
import logging
import hashlib
from threading import Thread
import traceback
import StringIO
import shutil, errno
import datetime
from datetime import date, timedelta
import glob
import copy
import fcntl, termios, struct
from types import *

import tornado.options
tornado.options.define("appdir", type=str, help="Directory that contains the applications")
tornado.options.parse_command_line()
from configuration_db import *

import pymongo


import tornado.options

if(MONITORING == 'true'):
    try:
      from pymongo import MongoClient
    except:
      print "Please install python mongoDB driver pymongo by using"
      print "easy_install pymongo"
      sys.exit(-1)

    try:
        mongoDBClient = MongoClient(MONGODB_URL)

    except:
      print "MongoDB instance " + MONGODB_URL + " can't be connected."
      print "Please install the mongDB, pymongo module."
      sys.exit(-1)

tornado.options.parse_command_line()
#tornado.options.enable_pretty_logging()

IP = sys.argv[1] if len(sys.argv) >= 2 else '127.0.0.1'

landId = 100
node_infos = []



class idemain(tornado.web.RequestHandler):
  def get(self):
    self.content_type='text/html'
    self.render('templates/ide.html')
# List all uploaded applications
class main(tornado.web.RequestHandler):
  def get(self):
    print "[WEB PORT]= %d" %(MONITORING_BUFSIZE)
    getComm()
    self.render('templates/application.html', connected=wkpf.globals.connected)

settings = dict(
  static_path=os.path.join(os.path.dirname(__file__), "static"),
  debug=True
)

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

ioloop = tornado.ioloop.IOLoop.instance()
wukong = tornado.web.Application([
  (r"/", MainHandler),
  (r"/ide", idemain),
  (r"/main", main),

], IP, **settings)

logging.info("Starting up...")



if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
