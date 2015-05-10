# coding=utf-8 

import urllib
import json

# params = urllib.urlencode({'gender' : 1, 'location' : "Beijing", "content" : "", "face" : "1.jpg"})
# f = urllib.urlopen("http://localhost:3000/newface", params)
# print f.read()

# params = urllib.urlencode({'name' : 'Female'})
# f = urllib.urlopen("http://localhost:3000/createFaceset", params)
# print f.read()

params = urllib.urlencode({'path' : "/Users/plutoshe/Desktop/Work/Thesis/server/faceMatch/public/images/LDH copy 7.jpg"})
f = urllib.urlopen("http://localhost:3000/detectImg", params)
print f.read()


# params = urllib.urlencode({})
# f = urllib.urlopen("http://localhost:3000/getRecentFace", params)
# print f.read()
