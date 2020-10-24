#!/usr/bin/python

try: 
	from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
except:
	from http.server import BaseHTTPRequestHandler,HTTPServer
from os import curdir, sep
try:
	from urlparse import urlparse
	from urlparse import urlparse, parse_qs
except:
	from urllib.parse import urlparse, parse_qs

import os

#import schedule
import time
import json

#git
import git
import wiz1Epg
import dailysportEpg

port = int(os.environ.get("PORT", 80))	 

PORT_NUMBER = port
mimetype=''
#This class will handles any incoming request from
#the browser 
channelList=[]
def getStream(id):
	if id.find("dailysport")>=0:
		return dailysportEpg.getStreamLink(id.replace("dailysport",""))
def getUrl(url):
	#return proxi.get(url)
	pass
def action(var, val):
	global mimetype
	if var=='channelList':
		return  channelList
	if var=='updatechannelList':
		channelList=val
		print(channelList)
		return 'ok'
	if var=='player':
		f=open('html/player.html')
		d=f.read()
		f.close()
		return d
	if var=='myIP':
		git.updateIps(val)
		return val
	if var=='getStream':
		return getStream(val)
	if var=='proxi':
		return getUrl(val)
	else:
		return "ok"
class myHandler(BaseHTTPRequestHandler):
	
	#Handler for the GET requests
	def log_message(self, format, *args):
		return
	def do_GET(self):
		
		
		sendReply = False
		data='ercccror'
		
		try:
		
			if self.path=="/":  #127.0.0.1:5000/
				wiz1Epg.updateWizEpg()
				dailysportEpg.updateDailysportEpg()
				name="html/mediaplayer.html" #127.0.0.1:5000/index.html
			else:
				name=self.path.replace("/",'',1)
			
			if self.path.find('?')>=0:
				var,val=self.path.split('?')[-1].split('=')
				print(var,val)
				mimetype='text/html'
				#print data
				data=action(var,val)
				sendReply = True
				
				
				#self.path="/index.html"
				#print query_components
				#Check the file extension required and
				#set the right mime type
				
				
				#print(self.path)
				
			elif name.endswith(".html"):
				mimetype='text/html'
				#Open the static file requested and send it
				
				print(name)
				f = open(name)
				data=f.read()
				f.close()
				
				sendReply = True
			if name.endswith(".json"):
				sendReply = True
				#f = open(curdir + sep + self.path)
				#data=f.read()
				
				#print(data) 
				#f.close()
				if self.path=='/urls.json':
					data=json.dumps(eventos, ensure_ascii=True)
				else:
					data=json.dumps(eventos[self.path.split('.')[0][1:]], ensure_ascii=False)
				#print (data)
				mimetype='text/html'
			
			if name.endswith(".apk"):
				mimetype='text/html'
				sendReply = True
				f = open(name,'rb')
				data=f.read()
				
				#print(data) 
				f.close()
			if name.endswith(".jpg"):
				mimetype='image/jpg'
				sendReply = True
			if name.endswith(".png")or self.path.endswith(".ico") or self.path.endswith(".jpg"):
				f = open(name,'rb')
				data=f.read()
				
				#print(data) 
				f.close()
				mimetype='image/jpg'
				sendReply = True
			if name.endswith(".gif"):
				mimetype='image/gif'
				sendReply = True
			if name.endswith(".js"):
				
				print(name)
				f = open(name)
				data=f.read()
				f.close()
				mimetype='application/javascript'
				sendReply = True
			if name.endswith(".css"):
				mimetype='text/css'
				sendReply = True
				
				print(name)
				f = open(name)
				data=f.read()
				f.close()
			if sendReply == True:
				 
				self.send_response(200)
				self.send_header('Content-type',mimetype)
				self.end_headers()
				
				#print (data)
				try:
					self.wfile.write(data)
				except:
					self.wfile.write(bytes(data, 'UTF-8'))
				
			return

		
		except IOError:
			self.send_error(404,'File Not Found: %s' % self.path)

try:
	#Create a web server and define the handler to manage the
	#incoming request
	server = HTTPServer(('0.0.0.0', PORT_NUMBER), myHandler)
	print ('Started httpserver on port ' , PORT_NUMBER)
	
	#Wait forever for incoming htto requests
	server.serve_forever()

except KeyboardInterrupt:
	print ('^C received, shutting down the web server')
	server.socket.close()
	
