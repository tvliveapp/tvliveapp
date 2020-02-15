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
import geoLocation
#import schedule
import time
import json
import sportzonlineDay
import tv
import spzonL
import spzoneChannels
import italytv247
#import italy247Channels
import nowlive
#import ecuatvhd
#import cablehd
import staticChannels
import iptv
from colombiaTv  import ColombiaTVCore
#eventos=sportzonlineDay.getrEvents()
 

clTv=ColombiaTVCore()

def update():
    print("I'm working...")


#schedule.every().hour.do(update) 
'''
while True:
    schedule.run_pending()
    time.sleep(4)
    print('not working')
	
''' 
ipList=[]
eventos={'xiptv':{'iconRef':'','msg':{'channels':[],}},'ecuatvhd':{'iconRef':'','msg':{'channels':[],}},'nowlive':{'iconRef':'/','msg':{'channels':[],}},'staticChannels':{'iconRef':'','msg':{'channels':[],}},'cablehd':{'msg':{'channels':[],}},'sportzonline':{'msg':{'channels':[],}},'italytv247':{'iconRef':'http://taptube.net/tvtap1/','succes':1,'msg':{'channels':[]}}}

def updateChannels():
	global eventos
	eventos['nowlive']['msg']['channels']=nowlive.getChannels()
	#eventos['ecuatvhd']['msg']['channels']=ecuatvhd.getChannels() 
	eventos['staticChannels']['msg']['channels']=staticChannels.getChannels()
	eventos['sportzonline']['msg']['channels']=spzonL.getChannels()
	#eventos['sportzonline']['msg']['channels']=spzoneChannels.getChannels()
	#eventos['xiptv']['msg']['channels']=iptv.getChannels()
	eventos['italytv247']=italytv247.getChannels()
	#eventos['italytv247']=italy247Channels.getChannels()
	eventos['italytv247']['iconRef']='http://taptube.net/tvtap1/'
	eventos['sportzonline']['iconRef']='/'
	eventos['staticChannels']['iconRef']=''
	
port = int(os.environ.get("PORT", 80))	 
'''
def getUrl(path):
	data=path.split('|')
	url=data[1]
	src=data[0][2:]
	data=''
	if src=='player':
		pass
	if src=='sportzonline':
		data= spzonL.getSreamLink(url)
	if src=='italytv247':
		
		data= italytv247.getSreamLink(int(url))[0]
	if src=='staticChannels':
		data= staticChannels.getSreamLink(url)
	if src=='staticChannels':
		data= staticChannels.getSreamLink(url)
	if src=='colombiaTv':
		data= clTv.getSreamLink(url)
	if src=='nowlive':
		print('source',src)
		print('url',url)
		data= nowlive.getStreamLink(url)
	fo=open('html/player.html')
		#print fo.read()
	return (fo.read().replace('newSource',data))
'''
def getUrl(path):
	data=path.split('|')
	url=data[1]
	src=data[0][2:]
	if src=='ipList':
		return str(ipList)
	if src=='player':
		fo=open('html/player.html')
		#print fo.read()
		return (fo.read())
	if src=='sportzonline':
		return '/?player|'+spzonL.getSreamLink(url)
		#return '/?player|'+spzoneChannels.getSreamLink(url)
	if src=='italytv247':
		#return '/?player|'+italy247Channels.getSreamLink(int(url))[0]
		return '/?player|'+italytv247.getSreamLink(int(url))[0]
	
	if src=='staticChannels':
		return '/?player|'+staticChannels.getSreamLink(url)
	if src=='colombiaTv':
		return '/?player|'+clTv.getSreamLink(url)
	if src=='nowlive':
		print('source',src)
		print('url',url)
		return '/?player|'+nowlive.getStreamLink(url)
	if src=='ecuatvhd':
		return ecuatvhd.getStreamLink(url)
	if src=='xiptv':
		return '/?player|'+iptv.getSreamLink(url)
	if src=='staticChannels':
		return '/?player|'+staticChannels.getSreamLink(url)
PORT_NUMBER = port

updateChannels()
#This class will handles any incoming request from
#the browser 

		
		
class myHandler(BaseHTTPRequestHandler):
	
	#Handler for the GET requests
	def log_message(self, format, *args):
		return
	def do_GET(self):
		
		sendReply = False
	
		if 1:#try:
		
			if self.path=="/":  #127.0.0.1:5000/
				self.path="html/mediaplayer.html" #127.0.0.1:5000/index.html
				
			
			if self.path.find('?')>=0:
				#imsi = query_components["imsi"] 
				#data=action(self.path.split('?'))
				data=''
				print (self.path)
				data=getUrl(self.path)
				#print data
				sendReply = True
				mimetype='text/html'
				#self.path="/index.html"
				#print query_components
				#Check the file extension required and
				#set the right mime type
				
				
				#print(self.path)
				
			elif self.path.endswith(".html"):
				mimetype='text/html'
				#Open the static file requested and send it
				clienIp=self.client_address[0]
				print('new client: '+clienIp)
				if clienIp not in ipList:
					ipList.append(clienIp)
				try:
					
					print(geoLocation.getLocation(clienIp))
				except:
					print('no location')
					pass
				f = open(curdir + sep + self.path)
				data=f.read()
				f.close()
				
				sendReply = True
			if self.path.endswith(".json"):
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
			
			if self.path.endswith(".apk"):
				mimetype='text/html'
				sendReply = True
				f = open('media' + self.path,'rb')
				data=f.read()
				
				#print(data) 
				f.close()
			if self.path.endswith(".jpg"):
				mimetype='image/jpg'
				sendReply = True
			if self.path.endswith(".png")or self.path.endswith(".ico") or self.path.endswith(".jpg"):
				f = open('media' + self.path,'rb')
				data=f.read()
				
				#print(data) 
				f.close()
				mimetype='image/jpg'
				sendReply = True
			if self.path.endswith(".gif"):
				mimetype='image/gif'
				sendReply = True
			if self.path.endswith(".js"):
				f = open(curdir + sep + self.path)
				data=f.read()
				#print(data)
				f.close()
				mimetype='application/javascript'
				sendReply = True
			if self.path.endswith(".css"):
				mimetype='text/css'
				sendReply = True
				f = open(curdir + sep + self.path)
				data=f.read()
				#print(data)
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

		
		else:#except IOError:
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
	
