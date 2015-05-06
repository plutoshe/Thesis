angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];



  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
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
