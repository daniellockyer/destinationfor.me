var request = require("request");
var cheerio = require("cheerio");
 
request({ uri: "http://www.4icu.org/gb/uk-universities.htm" }, function(error, response, body) {
  var $ = cheerio.load(body, { normalizeWhitespace: true });
 
  $("table tr td").each(function() {
    var link = $(this);
    var text = link.text();
 
    console.log(text.trim());
    console.log("-");
  });
});