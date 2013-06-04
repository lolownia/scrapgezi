var search = require('./search.js'),
    settings = require('./settings.json'),
    db = require('nano')(settings.dburl),
    tag = process.argv[2];

var fn = function() {
  search.persist(db, tag, function(err, result) {
    setTimeout(fn, 7000);
  });
};

fn();

module.exports = fn;
