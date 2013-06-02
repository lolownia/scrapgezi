var cluster = require('cluster'),
    cp = require('child_process'),
    async = require('async');

var tags = [
  '#bubirsivildirenis',
  '#OyunaGelmeTürkiyem',
  '#sesverturkiye',
  '#HükümeteNot',
  'YeterArtık Hükümetİstifa',
  '#direngeziparki',
  '#direnankara',
  'Panzerin Vatandaşı Ezme Anı',
  '#direnbesiktas',
  '#occupygezi',
  '#ŞiddetiDurdurun',
  '#Tayipİstifa',
  '#DictatorErdogan'
  ];

for (var i in tags) {
  cp.fork('./scrapper.js', [tags[i]]);
}
