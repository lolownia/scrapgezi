var cluster = require('cluster'),
    cp = require('child_process'),
    async = require('async');

var tags = [
  '#direngezi',
  '#SesVerTürkiyeBuÜlkeSahipsizDeğil',
  '#bubirsivildirenis',
  '#OyunaGelmeTürkiyem',
  '#sesverturkiye',
  '#Tayipİstifa',
  '#HükümeteNot',
  'Her Yer Taksim Her Yer Direniş',
  '#direngeziparki',
  '#direnankara',
  '#occupygezi'];

for (var i in tags) {
  cp.fork('./scrapper.js', [tags[i]]);
}
