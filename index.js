var cluster = require('cluster'),
    cp = require('child_process'),
    async = require('async');

var tags = [
  '#sesverturkiye',
  '#direngeziparki',
  '#direnankara',
  '#direnbesiktas',
  '#direnizmir',
  '#occupygezi',
  '#ŞiddetiDurdurun',
  '#Tayipİstifa',
  '#DictatorErdogan',
  '#opTurkey',
  '#EylemVakti'
  ];

for (var i in tags) {
  cp.fork('./scrapper.js', [tags[i]]);
}
