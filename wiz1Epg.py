try:
	from urllib2 import Request, urlopen
	from StringIO import StringIO
	from urllib import unquote
	import urllib2
	
except:
	from urllib.request import  Request, urlopen
	from io import StringIO
	from urllib.parse import unquote

from bs4 import BeautifulSoup
'''
epg={}
url="http://www.wiz1.net/schedule"
def getEpg():
	#try:
		req = Request(url)
		response = urlopen(req).read()
		n=0
		print(response)
		for line in (str(response).split(epgDel)[1:-1]):
			n=n+1
			epg['Channel '+str(n)]=[]
			evs=(re.findall('"gold">(.*?)</p>',line))
			for ev in evs:
				ev=ev.split('-')
				
				if len(ev)>1:
					#print(ev)
					epg['Channel '+str(n)].append('-'.join(ev[:-1])+'|'+ev[-1]+'|'+str(+1))
			#print(line[line.find(epgIni):line.find(epgEnd)])
	#except:
	#	pass
	#return(epg)
	
print(getEpg())
'''
import requests
from requests.structures import CaseInsensitiveDict

url = "http://www.wiz1.net/lag10_home.php"

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
</script>
'''
def updateWizEpg():
	resp = requests.get(url, headers=headers)

#print(resp.text)
	soup = BeautifulSoup(resp.text, 'html.parser')
#print(soup.prettify())
    

	'''
	for a in soup.find_all('a'):

	
		print(a.contents[-1]+":"+a.find_previous_sibling('font').text+":" +a.previousSibling)
		print(a.find_previous_sibling('font').previousSibling)
	
	'''
	
	mydivs = soup.findAll("div", {"class": "events"})
	mydivs[-1]["onmouseover"]="myMove()"
	mydivs[-1]["onmousemove"]="myMove()"
	mydivs[-1]["onscroll"]="myMove()"
	mydivs[-1]["onclick"]="myMove()"
	for a in soup.findAll('a'):
		#print(a.contents[-1].split()[1])
		a['href'] = "#"
		a['id'] = "wiziwig"+a.contents[-1].split()[-1]
		a.contents[-1].replaceWith(a['id'])
		a['onclick'] ="myFnc(this);return false;"

	f=open("events.html",'w')
	f.write("<!DOCTYPE html>\n<html>\n<head>\n<title>Page Title</title>"+str(soup)+js+"</body>\n</html>")
	f.close()
#print(soup.prettify())
	
	
updateWizEpg();
