(function() {
  var color = $(".selected").css("background-color");
  var $canvas = $("canvas");
  var context = $canvas[0].getContext("2d");
  var lastEvent;
  var mouseDown = false;
  var contextLineWidth = 5;

  //When clicking on control items
  $(".controls").on("click", "li", function() {
     //deselect siblings elemts
     $(this).siblings().removeClass("selected");
    //select clicked element
    $(this).addClass("selected");
    //cache current color
    color = $(this).css("background-color");
    console.log(color);
  });
  //When "Drawer clicked"
  $("#drawer").on("click", function(){
      $canvas.css("cursor", 'url(' + $(this).attr('src') + ')' + ', crosshair');
  });
  //When "Eraser clicked"
  $("#eraser").on("click", function(){
      color = '#FFF';
      $canvas.css("cursor", 'url(' + $(this).attr('src') + ')' + ', move');
  });

  //When "Canvas Line width" change
  $("#lineWidth").on("click", function() {
      //update current canvas width
      contextLineWidth = $(this).val();
  });
//When add color is clicked
  $("#revealColorSelect").click(function() {
     changeColor();
    //show or hide color select
    $("#colorSelect").toggle()
  });

  //update the new color span
  var changeColor = function() {
    var r = $("#red").val();
    var g = $("#green").val();
    var b = $("#blue").val();

    $("#newColor").css("background-color", "rgb(" + r + ", " + g + ", " + b + ")");
  }

  //When color sliders change
  $("input[type=range]").change(changeColor)
//When add color is pressed
  $("#addNewColor").click(function() {
    var $newColor = $("<li></li>");
    $newColor.css("background-color", $("#newColor").css("background-color"));
    //Append color to the controls ul
    $(".controls ul").append($newColor);
    $newColor.click();
  });

//On mouse move event
  $canvas.mousedown(function(e) {
    lastEvent = e;
    mouseDown = true;
  }).mousemove(function(e) {
    //Draw to lines on canvas
    if(mouseDown) {
      context.beginPath();
      context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
      context.lineTo(e.offsetX, e.offsetY);
      context.strokeStyle = color;
      context.lineWidth = contextLineWidth;
      context.stroke();
      lastEvent = e;
    }
  }).mouseup(function() {
    mouseDown = false;
  }).mouseleave(function() {
    $canvas.mouseup();
  });

})();
