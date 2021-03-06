var serverPrefix = "http://182.92.243.187:3000"

angular.module('starter.services', [])
.factory('Chats', function($http, $q) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // var chats = [{
  //   id: 0,
  //   name: 'Ben Sparrow',
  //   lastText: 'You on your way?',
  //   face: 'http://127.0.0.1:3000/img/LDH.jpg'
  // }, {
  //   id: 1,
  //   name: 'Max Lynx',
  //   lastText: 'Hey, it\'s me',
  //   face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  // }, {
  //   id: 2,
  //   name: 'Andrew Jostlin',
  //   lastText: 'Did you get the ice cream?',
  //   face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  // }, {
  //   id: 3,
  //   name: 'Adam Bradleyson',
  //   lastText: 'I should buy a boat',
  //   face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  // }, {
  //   id: 4,
  //   name: 'Perry Governor',
  //   lastText: 'Look at my mukluks!',
  //   face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  // }];
  
  

  return {
    all: function() {
      var chats = $q.defer();
      $http({
        method: 'POST',
        url: serverPrefix + '/getRecentFace',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        data: {username: "1"}
      })


      // $http.post(, {face : "1"}).
      .success(function(data, status, headers, config) {
        chats.resolve(data["data"])
        console.table(chats)
        console.log("success!!!")
        
      }).
      error(function(data, status, headers, config) {
        console.log("Error status : " + status);
        
      });


      return chats.promise;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {

      // if (chatId < chats.size())
      // return chats[chatId];
    // else return null;
    }
  };
})
.factory('chatDetailService', function($http, $q) {
  var jish
  var set = function(newObj) {
    console.log("!!!!!!!!")
    console.log(newObj)
    jish  = newObj
    
    
  }
    var chatDetail = function() {
    var chatDetaila = $q.defer();
    
    $http({method: 'POST',
      url: serverPrefix + '/createPerson',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: function(obj) {
        console.table(obj)
          var str = [];
          for(var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
        console.log(str)
          return str.join("&");
      },
      data: {face: jish}
    }).success(function(data, status, headers, config) {
      // chats.resolve(data["data"])
      // console.table(data)
      console.log(data)
      console.table(data)
      var tt = serverPrefix + "/Face/" + data[0]["gender"] + "/" + data[0]["face"] + ".jpg"
      chatDetaila.resolve(
        {
          data : data[0], 
          src : tt
        }
      )
      // src.resolve()
      console.log("success!!!")
      
    }).
    error(function(data, status, headers, config) {
      console.log("Error status : " + status);
      
    });
    return chatDetaila.promise 
  }


  return {
    set : set,
    chatDetail : chatDetail,
    
  };
})
.factory('displayInput', function($http, $q) {

  var newObj
  var set = function(oo) {
     newObj = oo
    
  };

  var all = function(){
    var collection = $q.defer();
    collection.resolve(newObj);
    return collection.promise;
      // if (collection != undefined && id < collection.length)
        
      // else 
      //   return null
  };
  var first = function() {
    var firstone = $q.defer()
     firstone.resolve(newObj[0]["first_id"])
    return firstone.promise;
  }

  return {
    first : first,
    set : set,
    all : all
  };
})
// .factory("$cipherFactory", function() {

//     return {

//         encrypt: function(message, password) {
//             var salt = forge.random.getBytesSync(128);
//             var key = forge.pkcs5.pbkdf2(password, salt, 4, 16);
//             var iv = forge.random.getBytesSync(16);
//             var cipher = forge.cipher.createCipher('AES-CBC', key);
//             cipher.start({iv: iv});
//             cipher.update(forge.util.createBuffer(message));
//             cipher.finish();
//             var cipherText = forge.util.encode64(cipher.output.getBytes());
//             return {cipher_text: cipherText, salt: forge.util.encode64(salt), iv: forge.util.encode64(iv)};
//         },

//         decrypt: function(cipherText, password, salt, iv, options) {
//             var key = forge.pkcs5.pbkdf2(password, forge.util.decode64(salt), 4, 16);
//             var decipher = forge.cipher.createDecipher('AES-CBC', key);
//             decipher.start({iv: forge.util.decode64(iv)});
//             decipher.update(forge.util.createBuffer(forge.util.decode64(cipherText)));
//             decipher.finish();
//             if(options !== undefined && options.hasOwnProperty("output") && options.output === "hex") {
//                 return decipher.output.toHex();
//             } else {
//                 return decipher.output.toString();
//             }
//         }

//     };

// })
// .factory('Camera', ['$q', function($q) {

//   return {
//     getPicture: function(options) {
//       var q = $q.defer();

//       navigator.camera.getPicture(function(result) {
//         // Do any magic you need
//         q.resolve(result);
//       }, function(err) {
//         q.reject(err);
//       }, options);

//       return q.promise;
//     }
//   }
// }]);

.factory('Camera', ['$q', function($q) {
 
  return {
    getPicture: function(options) {
      var q = $q.defer();
      
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      
      return q.promise;
    }
  }
}]);

// String.prototype.toHex = function() {
//     var buffer = forge.util.createBuffer(this.toString());
//     return buffer.toHex();
// }

// String.prototype.toSHA1 = function() {
//     var md = forge.md.sha1.create();
//     md.update(this);
//     return md.digest().toHex();
// }


