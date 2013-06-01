var search = require('./search.js'),
    settings = require('./settings.json'),
    db = require('nano')(settings.db),
    tag = process.argv[2];

var fn = function() {
  search.persist(db, tag, function(err, result) {
    setTimeout(fn, 1000);
  });
};

fn();

module.exports = fn;
