# coding=utf-8 
import urllib
import json

# params = urllib.urlencode({'url' : "/img/LDH.jpg", "name" : "DehuaLiuTest4"})
# f = urllib.urlopen("http://localhost:3000/addFaceToPersonbypostandurl", params)
# print f.read()



# params = urllib.urlencode({'url' : "/img/LJ.jpg", "name" : "JianLiTest4"})
# f = urllib.urlopen("http://localhost:3000/addFaceToPersonbypostandurl", params)
# print f.read()

params = urllib.urlencode({'face' : "80aa8ee12aba66736bb6b249c4cefde1", "name" : "YixunChenTest4"})
f = urllib.urlopen("http://182.92.243.187:3000/createPerson", params)
print f.read()

# params = urllib.urlencode({"person_id" : "0c7c4e431aded93b1f2eb2dd015dd0be"})
# f = urllib.urlopen("http://localhost:3000/getPersonInfo", params)
# print f.read()

# params = urllib.urlencode({"person_id" : "b0a51bd0ca3f4e766566e94b86dca83e"})
# f = urllib.urlopen("http://localhost:3000/getPersonInfo", params)
# print f.read()

# params = urllib.urlencode({"person_id" : "b6c3d26a5be4dbb5ce8f52dfd5bdab4d"})
# f = urllib.urlopen("http://localhost:3000/getPersonInfo", params)
# print f.read()



# params = urllib.urlencode({'version' : 1.15, "update_content" : "无"})
# f = urllib.urlopen("http://localhost:1234/versionUpdate", params)
# print f.read()
