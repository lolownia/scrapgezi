var search = require('./search.js'),
    settings = require('./settings.json'),
    db = require('nano')(settings.db),
    tag = process.argv[2];

var fn = function() {
  search.persist(db, tag, function() {
    setTimeout(fn, 5000);
  });
};

fn();

module.exports = fn;
