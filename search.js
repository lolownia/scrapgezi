var r = require('request'),
    qs = require('querystring'),
    async = require('async'),
    settings = require('./settings.json')
    since_id = 0;

var ara = {};

ara.search = function(q, max, callback) {
  var uri = 'http://search.twitter.com/search.json?';
  // todo: since id
  uri += qs.stringify({
    q: q,
    rpp: max,
    include_entities: true
  });
  r({
    uri: uri, json: true
  }, callback);
};

ara.insert = function(db, tweet, callback) {
  db.insert(tweet, tweet.id_str, callback);
}

ara.persist = function(db, q, callback) {
  ara.search(q, 100, function(err, res, body) {
    if (err || !body) {
      console.log('error', err);
      callback(err, false);
      return;
    }
    since_id = body.max_id || 0;
    var results = body.results || [];
    var tweets = db.use(settings.dbname);
    var inserts = [];
    for (var i in results) {
      var item = results[i];
      item._id = item.id_str;
      item.tag = q;
      item.createdAt = new Date();
      inserts.push(item);
    }
    console.log('inserting for ', q, inserts.length);
    if (inserts.length > 0 ) {
      tweets.bulk({ docs: inserts }, callback);
    } else {
      callback && callback();
    }
    
  });
}

module.exports = ara;
