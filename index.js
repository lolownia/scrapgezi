var cluster = require('cluster'),
    cp = require('child_process'),
    async = require('async');

var tags = [
  '#direngezi',
  '#occupygezi',
  '#bubirsivildirenis',
  '#OyunaGelmeTürkiyem',
  '#sesverturkiye',
  '#Tayipİstifa',
  '#HükümeteNot',
  'Her Yer Taksim Her Yer Direniş',
  '#direngeziparki',
  '#occupygezi'];

for (var i in tags) {
  cp.fork('./scrapper.js', [tags[i]]);
}
