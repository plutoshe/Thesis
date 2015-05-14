# coding=utf-8 
import sys
reload(sys)
sys.setdefaultencoding( "utf-8" )
import urllib2
import urllib
import json
i = 1
while i <= 3000 :

	i = i + 1
	print i
	str_i = "%d" %i
	file1 = open("detectface/" + str_i + ".txt","r")
	s = file1.read()
	w = s.split("$$")

	# f = urllib2.urlopen(w[0], timeout=5)
	params = urllib.urlencode({'url' : w[0], 'path' : w[1], 'content' : w[2], 'username' : w[3]})
	# f = urllib.urlopen("http://localhost:3000/detectImg", params)
	f = urllib.urlopen("http://182.92.243.187:3000/detectImg", params)
	# 182.92.243.187
	print f.read()



		