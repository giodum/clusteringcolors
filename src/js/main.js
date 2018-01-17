var clusterMaker = require('clusters');
var Color = require('color');

$(function() {

  var nItems = 150;
  var nIterations = 150;
  var nClusters = 5;
  var items = [];

  var containerUnclustered = $('.container-unclustered');
  var containerClustered = $('.container-clustered');

  /* generate colored circles */

  console.log("START GENERATING AND RENDERING RANDOM COLORS");

  for(var i = 0; i < nItems; i++) {

    var selector = 'item-' + i;
    var color = randomColor({
       luminosity: 'bright',
       format: 'rgb'
    });

    containerUnclustered.append('<div class="item ' + selector + '"></div>');
    $('.' + selector).css('background-color', color);

    items[i] = Color(color).rgb().array();

    console.log("  ", selector, " - ", items[i]);
  }

  console.log("END GENERATING RANDOM COLORS\n");


  /* initialization of K-means parameter */

  console.log("START INITIALIZING K-MEANS PARAMETERS\n");

  clusterMaker.k(nClusters);
  clusterMaker.iterations(nIterations);

  console.log("  - Number of clusters: ", nClusters);
  console.log("  - Number of iterations: ", nIterations);
  console.log("  - Number of items to be clustered: ", nItems);

  clusterMaker.data(items);


  console.log("START CLUSTERING...")

  var startClustering = new Date().getTime();
  var clusters = clusterMaker.clusters();
  var endClustering = new Date().getTime();

  console.log("...END CLUSTERING - Total duration: ", endClustering - startClustering, "ms");


  console.log("START RENDERING CLUSTERS");

  /* generate clusters containers */
  for(var i = 0; i < nClusters; i++) {

    var clusterCentroid = clusters[i].centroid;

    var selector = 'cluster-' + i;

    containerClustered.append('<div class="cluster ' + selector + '"></div>');
    var clusterDiv = $('.' + selector);

    var clusterHeading = '<div class="cluster-info cluster-info-' + i + '">'
                       +   '<h2>Cluster ' + i + '</h2>'
                       +   '<div class="item cluster-centroid cluster-centroid-' + i + '"></div>'
                       + '</div>';
    clusterDiv.append(clusterHeading);

    var clusterCentroidDiv = $('.cluster-centroid-' + i);
    clusterCentroidDiv.css('background-color', Color.rgb(clusterCentroid).string());

    var clusterItems = clusters[i].points;
    var clusterItemsL = clusters[i].points.length;

    var clusterItemsContainer = '<div class="cluster-items cluster-items-' + i + '"></div>';
    clusterDiv.append(clusterItemsContainer);

    var clusterItemsDiv = $('.cluster-items-' + i);

    for(var j = 0; j < clusterItemsL; j++) {

      var clusterItem = clusterItems[j];

      var item = '<div class="item item-' + i + '-' + j + '"></div>';
      clusterItemsDiv.append(item);

      var item = $('.item-' + i + '-' + j);
      item.css('background-color', Color.rgb(clusterItem).string());

    }
  }

  console.log("END RENDERING CLUSTERS");

});