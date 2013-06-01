var cluster = require('cluster'),
    cp = require('child_process'),
    async = require('async');

var tags = [
  '#bubirsivildirenis',
  '#OyunaGelmeTürkiyem',
  '#sesverturkiye',
  '#HükümeteNot',
  'Her Yer Taksim Her Yer Direniş',
  '#direngeziparki',
  '#direnankara',
  'Taksimde TacizVar',
  'Panzerin Vatandaşı Ezme Anı'];

for (var i in tags) {
  cp.fork('./scrapper.js', [tags[i]]);
}
