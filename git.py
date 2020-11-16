'''
import requests
import json
import base64
from github import Github
from github import InputGitTreeElement
url="https://raw.githubusercontent.com/tvliveapp/channels/master/ips.json"
#g = Github("tvliveapp@protonmail.ch", "tvliveapp@protonmail.ch")
g = Github("a59f0df2ff44f069463465a9ff22f50b4751ff3f")

ips=[]
response=requests.get(url)
if response.text.startswith('404'):
	ips=[]
else:
	ips=ips+response.text.split(',')
print(ips)
def updateIps(ip):
	global ips, g
	
	
	repo = g.get_user().get_repo('channels')
	file_list = [
		'ips.json'
		
	]

	file_names = [
		'ips.json'
		
	]
	commit_message = 'python update 2'
	master_ref = repo.get_git_ref('heads/master')
	master_sha = master_ref.object.sha
	base_tree = repo.get_git_tree(master_sha)
	element_list = list()
	ips.append(str(ip))
	print(','.join(ips))
	element = InputGitTreeElement("ips.json", '100644', 'blob',json.dumps( ','.join(ips).replace('\n','')))
	element_list.append(element)
	tree = repo.create_git_tree(element_list, base_tree)
	parent = repo.get_git_commit(master_sha)
	commit = repo.create_git_commit(commit_message, tree, [parent])
	master_ref.edit(commit.sha)
'''
from github import Github
import base64

#g = Github("tvliveapp@protonmail.ch", "tvliveapp@protonmail.ch")
g = Github("efb525a661ebb08b103db025a7b4b0397b4637b0")
repo = g.get_user().get_repo("channels")
contents = repo.get_contents("spZone.json")

def commit(val,f=''):
	
	repo.update_file(contents.path, "lio", val, contents.sha)
def commitContent(val,f=''):
	contents = repo.get_contents(f)
	repo.update_file(contents.path, "lio", val, contents.sha)
def readContent(f=''):
	contents = repo.get_contents(f)
	return base64.b64decode(contents.content).decode("UTF-8")
def updateIps(ip):
	ips=readContent("ips.json")
	print(ips)
	ips=ips+"\n"+ip
	commitContent(ips,'ips.json')
