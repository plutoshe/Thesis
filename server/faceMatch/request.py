# coding=utf-8 

import urllib
import json
#!/usr/bin/python
# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup


# params = urllib.urlencode({'gender' : 1, 'location' : "Beijing", "content" : "", "face" : "1.jpg"})
# f = urllib.urlopen("http://localhost:3000/newface", params)
# print f.read()

# params = urllib.urlencode({'name' : 'Female'})
# f = urllib.urlopen("http://localhost:3000/createFaceset", params)
# print f.read()

# params = urllib.urlencode({'path' : "/Users/plutoshe/Desktop/Work/Thesis/server/faceMatch/public/images/LDH copy 7.jpg"})

f = urllib.urlopen("http://www.jiayuan.com/19388198")
# print f.read()

soup = BeautifulSoup(f)
pic = soup.find_all("td", align = "center")

# for i in pic : 
# 	if i.a.img["_src"] != "http://images1.jyimg.com/w4/profile/i/photo_invite_f_bp.jpg" : 
# 		print i.a.img["_src"]

intro2 = soup.find_all("h4")
intro = soup.find_all("div", attrs={"class":"fl f_gray_999"})
j = 0
content = soup.find_all("div", attrs={"class" : "fl pr"})
ans0 = ""
if pic[]
ans1 = ""
ans2 = ""
if ans0 != "" :
	for i in intro :
		
		# print i.get_text()
		ans1 = ans1 + i.get_text() + " "
		if content[j].em : 
			# print content[j].em.get_text()
			ans1 = ans1 + content[j].em.get_text() + "\n"
		j=j+1
	# print s
	ans2 = intro2[0].get_text()
	t = intro2[0].span.get_text()
	ans2 = ans2[0:len(ans2) - len(t)]
	print ans2
			# break
# params = urllib.urlencode({})
# f = urllib.urlopen("http://localhost:3000/getRecentFace", params)
# print f.read()
