import requests
import json
import base64
from github import Github
from github import InputGitTreeElement
url="https://raw.githubusercontent.com/tvliveapp/channels/master/ips.json"
g = Github("tvliveapp@protonmail.ch", "tvliveapp@protonmail.ch")

ips=[]
response=requests.get(url)
if response.text.startswith('404'):
	ips=[]
else:
	ips=ips+response.text.replace('\','').replace('n','').split(',')
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
