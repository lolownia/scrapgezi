var cluster = require('cluster'),
    cp = require('child_process'),
    async = require('async');

var tags = [
  '#bubirsivildirenis',
  '#sesverturkiye',
  '#direngeziparki',
  '#direnankara',
  '#direnbesiktas',
  '#direnizmir',
  '#occupygezi',
  '#ŞiddetiDurdurun',
  '#Tayipİstifa',
  '#DictatorErdogan',
  '#opTurkey'
  ];

for (var i in tags) {
  cp.fork('./scrapper.js', [tags[i]]);
}
