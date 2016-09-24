$(function() {

  var canvas = document.getElementById('mycanvas');
  if(!canvas || !canvas.getContext) return false;
  var ctx = canvas.getContext('2d');
  ctx.lineCap = "round";

  var startX,
      startY,
      x,
      y,
      borderWidth = 10,
      isDrawing = false,
      step = -1; //redo undo用
      thse = 0; //サムネイル用

  var car = new Array();
  var thcar = new Array();

  $('#mycanvas').mousedown(function(e) {
    isDrawing = true;
    startX = e.pageX - $(this).offset().left - borderWidth;
    startY = e.pageY - $(this).offset().top - borderWidth;
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
    cPush();
  })
  .mouseleave(function() {
    isDrawing = false;
    cPush();
  });

//ペンの色
  $('li').click(function() {
    ctx.strokeStyle = $(this).css('background-color');
  });

//ペンの太さ
  $('#penWidth').change(function() {
    ctx.lineWidth = $(this).val();
  });

//透明度
  $('#pentoumei').change(function() {
    ctx.globalAlpha = $(this).val();
  });

//画面消去　起動中
  $('#erase').click(function() {
    ctx.clearRect( 0, 0,canvas.width, canvas.height);
  });

//画面消去　停止中
  $('#clear').click(function(e) {
    if(!confirm('本当に消去しますか？')) return;
      e.preventDefault();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

//redo undo
  function cPush() {
      step++;
      if (step < car.length) { car.length = step; }
      car.push(document.getElementById('mycanvas').toDataURL());
  }

//やり直し
  $('#undo').click(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (step > 0) {
        step--;
        console.log(step);
        var canvasPic = new Image();
        canvasPic.src = car[step];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
    }
  });

//元に戻す
  $('#redo').click(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (step < car.length-1) {
        step++;
        console.log(step);
        var canvasPic = new Image();
        canvasPic.src = car[step];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
    }
  });

//画面保存
  $('#save').click(function() {
    thse++;
    var img = $('<img>').attr({
      width: 250,
      height: 150,
      src: canvas.toDataURL()
    });
    var link = $('<a>').attr({
      href: canvas.toDataURL().replace('image/png', 'application/octet-stream'),
      download: new Date().getTime() + '.png'
    });
    $('#gallery').append(link.append(img.addClass('thumbnail')));
    ctx.clearRect( 0, 0,canvas.width, canvas.height);
  });

//サムネイルからcanvasへ
  $('.thumbnail').dblclick(function() {
    var thumcan = new Image();
    canvasPic.src = car[step];
    thumcan.onload = function () { ctx.drawImage(thumcan, 0, 0); }
  });

//未実装　画面サイズの変更
  $('#size').change(function() {
    ctx.width = '100px';
  });

//ペンの形
  $('#linekata').change(function() {
    ctx.lineCap = $(this).val();
  });

//ペンの角の形
  $('#lineori').change(function() {
    ctx.lineJoin = $(this).val();
  });
});
