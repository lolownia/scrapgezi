var request = require('request'), 
  settings = require('./settings.json'),
  _ = require('underscore'),
  logger = require('logger');
var log = logger.createLogger();

function OpenCalais()
{
  this.enrich = function enrich(doc, callback)
  {
    request({
      uri: settings.opencalaisurl,
      method: "POST",
      headers: {
        "x-calais-licenseID": settings.opencalaiskey,
        "content-type": "text/raw",
        "accept": "application/json",
      },
      body: doc,
    }, function (err, resp, data) {
      if (data.indexOf("Calais continues to expand its") >= 0)
        return callback(null);
      callback(JSON.parse(data));
    });
  };
};


function Translate()
{
  //https://translate.yandex.net/api/v1.5/tr.json/translate?key=APIkey&lang=en-ru&text=To+be,+or+not+to+be%3F&text=That+is+the+question.
  this.translate = function translate(text, callback)
  {
    var uri = "https://translate.yandex.net/api/v1.5/tr.json/translate";
    request({
      "uri": uri,
      "method": "GET",
      "qs": {
        "key": settings.yandexkey,
        "lang": "tr-en",
        "text": text
      }
    }, function(err, resp, data) {
      data = JSON.parse(data);
      if (data.code == 200) {
        callback(data.text[0]);
      } else {
        callback(null);
      }
    });

  };
};

function Analyze(db)
{
  var opencalais = new OpenCalais();
  var translate = new Translate();

  this.updateDoc = function updateDoc(docname, doc, callback) {
    log.log("up:",docname);
    db.get(docname, function(err, old) {
      log.log("retrieving",docname);
      var params = {"doc_name": docname};
      if (!err) {
        doc._rev = old._rev;
      }
      log.log("update with"+(!err?"":"out")+" rev");
      db.insert(doc, params, function(err, body) {
	log.log("updated? err=", err, body);
        callback && callback(body);
      });

    });
  };

  this.annotate = function annotate(tweet, callback) {
    var self = this;
    return opencalais.enrich(tweet.text, function(data) {
      if (data) {
        return save_to_db(extract(data));
      } else translate_and_enrich(data);
      
    });

    function translate_and_enrich(data) {
      translate.translate(tweet.text, function(translated) {
        return opencalais.enrich(translated, function(data) {
          return save_to_db(extract(data));
        });
      });
    };

    function extract(meta) {
      var vs = [];
      for (k in meta) {
        if (k === "doc") continue;
	if (meta[k]._typeGroup] == 'lanbguage') continue;
        vs.push(meta[k]);
      }
      return {meta: vs};
    };
    
    function save_to_db(data) {
      self.updateDoc(tweet._id + "_opencalais", data, 
		     function() { callback(data); }
		    ); 
    };


  };


}

module.exports = {
  "OpenCalais": OpenCalais,
  "Translate": Translate,
  "Analyze": Analyze
}
