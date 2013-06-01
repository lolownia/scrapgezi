var ara = require('./search.js');
var db = require('nano')('https://burcu:@burcu.cloudant.com');
var tag = process.argv[2];

var fn = function() {
  ara.persist(db, tag, function(err, result) {
    setTimeout(fn, 1000);
  });
};

fn();

module.exports = fn;
