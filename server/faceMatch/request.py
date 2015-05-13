# coding=utf-8 
import sys
reload(sys)
sys.setdefaultencoding( "utf-8" )
import urllib2
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
tt = 15000014
wd = 0
while tt < 15020000 : 
	tem = "%d" %tt
	tt=tt+1
	print tem
	# t
	try:
		f = urllib2.urlopen("http://www.jiayuan.com/" + tem, timeout=5)
	except IOError:
		tt=tt-1
		continue

	# f = urllib2.urlopen("http://www.jiayuan.com/24398315", timeout=5)

	# f = http://www.jiayuan.com/24498319
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
	# print pic
	if len(pic) > 1: 
		ans0 = pic[1].a.img["_src"]
	elif (len(pic) > 0) and (pic[0].a.img["_src"] != "http://images1.jyimg.com/w4/profile/i/photo_invite_f_bp.jpg") and (pic[0].a.img["_src"] != "http://images1.jyimg.com/w4/profile/i/photo_invite_m_bp.jpg"):
		ans0 = pic[0].a.img["_src"]
	if (ans0 == "http://images1.jyimg.com/w4/global/i/yzphykj_m_bp.jpg") or (ans0 == "http://images1.jyimg.com/w4/global/i/yzphykj_f_bp.jpg"):
		ans0 = ""
	if (ans0 == "http://images1.jyimg.com/w4/global/i/zchykj_f_bp.jpg") or (ans0 == "http://images1.jyimg.com/w4/global/i/zchykj_m_bp.jpg")	:
		ans0 = ""
		
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
		wd = wd + 1
		ss = "%d" %wd
		print "!" + ss
		file = open("detectface/"+ss+".txt", "wb")
		# print ans0
		# print ans1
		# print ans2
		file.write("http://www.jiayuan.com/" + tem + "$$" + ans0 + "$$" + ans1 + "$$" + ans2)
			# break
# params = urllib.urlencode({})
# f = urllib.urlopen("http://localhost:3000/getRecentFace", params)
# print f.read()
