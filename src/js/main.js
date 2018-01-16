$(function() {

  console.log("Start main js");

  var nItems = 150;
  var items = [];

  var container = $('.container');

  /* generate colored circles */
  for(var i = 0; i < nItems; i++) {

    var selector = 'item-' + i;
    var color = randomColor();

    container.append('<div class="item ' + selector + '"></div>');
    $('.' + selector).css('background-color', color);

    items[i] = color;
  }

  for(var i = 0; i < nItems; i++) {
    console.log(i, items[i]);
  }

  console.log("End main js");

});