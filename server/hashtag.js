// if(Meteor.isServer){
//   Meteor.methods({
//     getTweets: function(hashtag){
//       this.unblock();
//       //note: there was not an initial rfc1738 URL encoding, which twitter recommends
//       var access_string = "50Y0aeMwqg37Aa51k7xWEpCdD" + ":" + "Z1oGlwdOvt0glTO7hW0ojjgG3WIsgUMqK906Hy5LabzfNBgdR0";
//       var access_string = access_string.toString('base64'); //base64 encode
//       return HTTP.call("POST", "https://api.twitter.com/oauth/token HTTP/1.1",
//         {
//           auth: "Basic " + access_string,
//           headers: {'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"},
//           content: "grant_type=client_credentials"
//         });
//     }
//   })
// }

// if(Meteor.isServer){
  // var codebird = Meteor.npmRequire('codebird');
  // var cb = new codebird;
  // cb.setConsumerKey('50Y0aeMwqg37Aa51k7xWEpCdD', 'Z1oGlwdOvt0glTO7hW0ojjgG3WIsgUMqK906Hy5LabzfNBgdR0');
  // cb.__call(
  //   "oauth2_token",
  //   {},
  //   function(reply){
  //     var bearer_token = reply.access_token;
  //   }
  // );
  //
  // cb.__call(
  //   "search_tweets",
  //   "q=Twitter",
  //   function(reply){
  //       console.log(reply);
  //   },
  //   true
  // );
  //only one I could get to work with app only auth
  // var Twitter = Meteor.npmRequire('mtwitter');
  // var twitter = new Twitter({
  //   consumer_key: "50Y0aeMwqg37Aa51k7xWEpCdD",
  //   consumer_secret: "Z1oGlwdOvt0glTO7hW0ojjgG3WIsgUMqK906Hy5LabzfNBgdR0",
  //   access_token_key: "548112388-4EIzVkbr2fUrx1JaF4hkyd6BEnBzRXrzoE8jZdsD",
  //   access_token_secret: "3tUxizRgd5eww7G6ZSBv2nwqgbVsNaSO4x04rdkzXnWnL"
  // });
  // twitter.get(
  //   'statuses/home_timeline',
  //   {screen_name: "ryandentsnyder", filter:"images", include_entities: 'true'},
  //   function(err, item){
  //     console.log(err, item)
  //   }
  // )
//   Meteor.startup(function () {
//     // code to run on server at startup
//
//     var Twit = Meteor.npmRequire('twit');
//
//     var T = new Twit({
//       consumer_key:         '50Y0aeMwqg37Aa51k7xWEpCdD', // API key
//       consumer_secret:      'Z1oGlwdOvt0glTO7hW0ojjgG3WIsgUMqK906Hy5LabzfNBgdR0', // API secret
//       access_token:         '548112388-4EIzVkbr2fUrx1JaF4hkyd6BEnBzRXrzoE8jZdsD',
//       access_token_secret:  '3tUxizRgd5eww7G6ZSBv2nwqgbVsNaSO4x04rdkzXnWnL'
//     });
//
//     //  search twitter for all tweets containing the word 'banana'
//     //  since Nov. 11, 2011
//     T.get('search/tweets',
//     {
//       q: 'banana',
//       count: 100
//     },
//     function(err, data, response) {
//       console.log(data);
//     }
//   );
//
// });
// }
