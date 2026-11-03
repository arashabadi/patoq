#!/usr/bin/env python3
"""Incremental local-only Telegram URL queue; never publishes messages or claims."""
import argparse,hashlib,json,re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit,urlunsplit
class Export(HTMLParser):
 def __init__(self):super().__init__();self.message=None;self.items=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='div' and 'message' in a.get('class','').split() and a.get('id','').startswith('message'):
   self.message=a['id']
  if tag=='a' and self.message and a.get('href','').startswith(('https://','http://')):
   self.items.append((self.message,a['href']))
def run():
 parser=argparse.ArgumentParser();parser.add_argument('export',type=Path);parser.add_argument('--queue',type=Path,default=Path('.patoq/intake/queue.json'));a=parser.parse_args()
 p=Export();raw=a.export.read_bytes();p.feed(raw.decode('utf-8'))
 queue=json.loads(a.queue.read_text()) if a.queue.exists() else {'schema':1,'candidates':[],'imports':[]}
 known={x['key']:x for x in queue['candidates']};added=0
 for message,url in p.items:
  u=urlsplit(url)
  if u.hostname in {'t.me','telegram.me'}:continue
  canonical=urlunsplit((u.scheme.lower(),u.netloc.lower(),u.path,u.query,''))
  key=hashlib.sha256(canonical.encode()).hexdigest()[:20]
  if key in known:
   refs=known[key]['source_messages']
   if message not in refs:refs.append(message)
   continue
  item={'key':key,'url':url,'source_messages':[message],'status':'queued','coverage':'not_verified','chapter':None,'editorial_note':None}
  queue['candidates'].append(item);known[key]=item;added+=1
 digest=hashlib.sha256(raw).hexdigest()
 if not any(x['sha256']==digest for x in queue['imports']):queue['imports'].append({'sha256':digest,'filename':a.export.name,'links_observed':len(p.items)})
 a.queue.parent.mkdir(parents=True,exist_ok=True);a.queue.write_text(json.dumps(queue,ensure_ascii=False,indent=2)+'\n');a.queue.chmod(0o600)
 print(json.dumps({'new_candidates':added,'total_candidates':len(known),'publication':'none','queue':str(a.queue)}))
if __name__=='__main__':run()
