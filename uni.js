var request = require("request");
var cheerio = require("cheerio");
 
request({
  uri: "http://www.sitepoint.com",
}, function(error, response, body) {
  var $ = cheerio.load(body);
 
  $(".entry-title > a").each(function() {
    var link = $(this);
    var text = link.text();
    var href = link.attr("href");
 
    console.log(text + " -> " + href);
  });
});