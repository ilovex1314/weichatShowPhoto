var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var marginLeft = 0, marginTop = 0;

var image = new Image();
var clippingRegion = { x: 200, y: 200, r: 50};
image.src = '2.jpg';
image.onload = function(){
	$('.photoContent').eq(0).css('width', canvasWidth + 'px');
	$('.photoContent').eq(0).css('height', canvasHeight + 'px');

	$('#img').css('width', image.width + 'px');
	$('#img').css('height', image.height + 'px');

	marginLeft = (image.width - canvas.width)/2;
	marginTop = (image.height - canvas.height)/2;
	$('#img').css('left', String(-marginLeft) + 'px');
	$('#img').css('top', String(-marginTop) + 'px');

	initCanvas();
}


function initCanvas(){
	var theLeft = marginLeft < 0? (-marginLeft):0;
	var theTop = marginTop < 0? (-marginTop):0;
	var width = marginLeft > 0? canvas.width : image.width;
	var height = marginTop > 0? canvas.height : image.height;
	clippingRegion.r = 50;
	clippingRegion.x = Math.round(Math.random()*(width - 100)) + 50 + theLeft;
	clippingRegion.y = Math.round(Math.random()*(height - 100)) + 50 + theTop;
	draw( image, clippingRegion );
}

function setClippingRegion( clp ){
 	context.beginPath();
 	context.arc( clp.x, clp.y, clp.r, 0, Math.PI*2, false);
 	context.clip();
}

function draw( image , clp){
	context.clearRect( marginLeft < 0? (-marginLeft):0, marginTop < 0? (-marginTop):0, image.width, image.height);
	context.save();
    setClippingRegion(clp);
	context.drawImage( image,
					   marginLeft, marginTop, canvasWidth, canvasHeight,
					   0, 0, canvasWidth, canvasHeight);
	context.restore();
}

function reset(){
	initCanvas();
}

function show(){
	var t = setInterval(function(){
		clippingRegion.r += 20;
		if(clippingRegion.r > Math.max(image.width, image.height)*2){
			clearInterval(t);
		}
		draw(image, clippingRegion);

	}, 30)
}