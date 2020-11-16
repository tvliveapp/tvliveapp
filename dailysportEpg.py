try:
	from urllib2 import Request, urlopen
	from StringIO import StringIO
	from urllib import unquote
	import urllib2
	
except:
	from urllib.request import  Request, urlopen
	from io import StringIO
	from urllib.parse import unquote
	
import requests
from requests.structures import CaseInsensitiveDict

from bs4 import BeautifulSoup
import base64


baseUrl = "https://dailysport.pw/"
chnUrl="https://dailysport.pw/c"
headers = CaseInsensitiveDict()
headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36"
headers["Upgrade-Insecure-Requests"] = "1"

js='''
<script>
function myFnc(item){
	console.log(item.id);
	window.parent.ifrFcn(item.id); 
}


function myMove(){
	console.log("moving");
	if ( window.location !== window.parent.location ) {	window.parent.ifMove();  	} else {	  // The page is not in an iframe	
	}
	 
}
function getUrl(sturl){
fetch("?getStream="+sturl.id)
  .then(function(response) {
    response.text().then(function(text) {
      streamLink = text;
      window.parent.ifrFcn1(streamLink); 
    });
  });
}
</script>
'''

def decodeBase64(msg):
	base64_message = msg
	base64_bytes = base64_message.encode('ascii')
	message_bytes = base64.b64decode(base64_bytes)
	message = message_bytes.decode('ascii')
	
	return message

def subString(ini,fin,string):
		result1 = string.find(ini)
		if result1<0:
			return None
		result2 = string.find(fin,result1)
		
		return string[result1+len(ini):result2]
def subStringL(ini,fin,string):
		result1 = string.rfind(ini)
		if result1<0:
			return None
		result2 = string.find(fin,result1)
		
		return string[result1+len(ini):result2]
	
def updateDailysportEpg():
	resp = requests.get(baseUrl, headers=headers)
	soup = BeautifulSoup(resp.text, 'html.parser')
	div = soup.findAll( "script")
	for scp in soup.findAll( "script"):
		scp["src"]=""
		scp.contents=""
		print(scp)
	soup.findAll( "div")[0]["id"]=""
	
	table = soup.find( "table", {"class":"table table-striped"} )
	
	chn=[]
	for row in table.findAll("tr")[1:]:
		ev=""
		for td in row.findAll("td"):
			'''
			if td.findAll("a"):
				print(td.findAll("a")[-1].get('href'),td.findAll("a")[-1].contents)
			elif len(td.contents):
				ev=ev+" "+td.contents[-1]
				print(ev)
			'''
			for a in td.findAll("a"):
				
				a['id'] = "dailysport"+a.get('href').replace("c","").replace(".php","")
				a['href'] = "#"
				a['onclick'] ="getUrl(this);return false;"
				
				
	#print(soup)
	f=open("eventsd.html",'w')
	f.write("<!DOCTYPE html>\n<html>\n<head>\n<title>Page Title</title>"+str(soup)+js+"</body>\n</html>")
	f.close()
	
def getStreamLink(chn):		
	sp1=""
	#print(channelEpg)
	try:
		if 1:
			url='https://dailysport.pw/c'+str(chn)+'.php'
			response = requests.get(url)
			b64=1


			if response.status_code==200:


				ini='window.atob("'
				fin='")'

				sp1=subString(ini,fin,response.text)
				if sp1==None:
					ini='source:'
					fin="',"
					sp1=subStringL(ini,fin,response.text).replace("'",'').replace(' ','')
					b64=0

				if b64==1:
						sp1=decodeBase64(sp1)
				print(sp1)

	except:
		pass
	return sp1
updateDailysportEpg()	
getStreamLink(1)
