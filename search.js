var r = require('request'),
    qs = require('querystring'),
    async = require('async'),
    sinceId = 0;

var ara = {};

ara.search = function(q, max, callback) {
  var uri = 'http://search.twitter.com/search.json?';
  // todo: since id
  uri += qs.stringify({
    q: q,
    rpp: max
  });
  r({
    uri: uri, json: true
  }, callback);
};

ara.persist = function(db, q, callback) {
  ara.search(q, 100, function(err, res, body) {
    if (err || !body) {
      console.log('error', err);
      callback(err, false);
      return;
    }
    since_id = body.max_id;
    var results = body.results || [];
    var tweets = db.use('direngezi');
    var docs = [];
    for (var i in results) {
      var item = results[i];
      docs.push({
        "_id": item.id_str,
        "doc": item
      });
    }
    tweets.bulk(docs,callback);
    console.log('inserting for ', q, docs.length);
  });
}

module.exports = ara;
