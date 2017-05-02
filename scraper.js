var request = require('request');
var cheerio = require('cheerio');

var url = "https://www.bundestag.de/ajax/filterlist/de/abgeordnete18/-/440460/h_e3c112579919ef960d06dbb9d0d44b67?limit=9999&view=BTBiographyList";

request(url, function (error, response, body) {
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML
  
  var $ = cheerio.load(body);
  
  var people = {};
  
  $('li').each(function(i, elem) {
      
    var name = $(this).find('h3').text().trim();  
    var link = $(this).find('a').attr('href');
    var party = $(this).find('.bt-person-fraktion').text().trim();
    
    people[name] = {
        "link": link,
        "party": party,
        "district": ""
    };

     
  });
  

  
  // for (var key in people) {
  //     
  //     var bio_page = "https://www.bundestag.de/" + key.link;
  //     
  //     request(bio_page, function(err, resp, bd){
  //         
  //         var data = cheerio.load(bd);
  //         
  //         var constituency = data().find('.bt-wk-map');
  //         
  //         console.log(constituency);
  //         
  //         people[key].district = constituency;
  //        
  //         
  //     });
  //     
  //    
  // }
  
       console.log(people); 
  
  
});



