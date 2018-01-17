var clusterMaker = require('clusters');

$(function() {

  console.log("Start main js");

  var nItems = 150;
  var nClusters = 5;
  var items = [];

  var container = $('.container');

  /* generate colored circles */
  for(var i = 0; i < nItems; i++) {

    var selector = 'item-' + i;
    var color = randomColor({
       luminosity: 'bright',
       format: 'rgb'
    });

    container.append('<div class="item ' + selector + '"></div>');
    $('.' + selector).css('background-color', color);

    items[i] = color;
  }

  /* initialization of K-means parameter */
  clusterMaker.k(nClusters);
  clusterMaker.iterations(nItems);



  console.log("End main js");

});