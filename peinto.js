$(function() {

  var canvas = document.getElementById('mycanvas');
  if(!canvas || !canvas.getContext) return false;
  var ctx = canvas.getContext('2d');

  var startX,
      startY,
      x,
      y,
      borderWidth = 10,
      isDrawing = false,
      cStep = -1;

  var cPushArray = new Array();

  $('#mycanvas').mousedown(function(e) {
    isDrawing = true;
    startX = e.pageX - $(this).offset().left - borderWidth;
    startY = e.pageY - $(this).offset().top - borderWidth;
    undoImage = ctx.getImageData(0, 0,canvas.width,canvas.height);
  })
  .mousemove(function(e) {
    if(!isDrawing) return;
    x = e.pageX - $(this).offset().left - borderWidth;
    y = e.pageY - $(this).offset().top - borderWidth;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(x, y);
    ctx.stroke();
    startX = x;
    startY = y;
  })
  .mouseup(function() {
    isDrawing = false;
  })
  .mouseleave(function() {
    isDrawing = false;
  });

  $('li').click(function() {
    ctx.strokeStyle = $(this).css('background-color');
  });

  $('#penWidth').change(function() {
    ctx.lineWidth = $(this).val();
  });

  $('#pentoumei').change(function() {
    ctx.globalAlpha = $(this).val();
  });

  $('#erase').click(function() {
    ctx.clearRect( 0, 0,canvas.width, canvas.height);
  });

  $('#clear').click(function(e) {
    if(!confirm('本当に消去しますか？')) return;
      e.preventDefault();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  $('#undo').click(function(e) {
    ctx.putImageData(undoImage,0,0);
  });


  $('#save').click(function() {
    var img = $('<img>').attr({
      width: 250,
      height: 150,
      src: canvas.toDataURL()
    });
    var link = $('<a>').attr({
      href: canvas.toDataURL().replace('image/jpg', 'application/octet-stream'),
      download: new Date().getTime() + '.jpg'
    });
    $('#gallery').append(link.append(img.addClass('thumbnail')));
    ctx.clearRect( 0, 0,canvas.width, canvas.height);

  });

  $('#size').change(function() {
    ctx.width = '100px';
  });

  $('#linekata').change(function() {
    ctx.lineCap = $(this).val();
  });

  $('#lineori').change(function() {
    ctx.lineJoin = $(this).val();
  });
});
