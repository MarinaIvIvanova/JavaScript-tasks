var matrix = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 1, 1, 0, 1, 1, 0, 1, 1, 0 ], [ 0, 1, 1, 0, 1, 1, 0, 1, 1, 0 ],
		[ 0, 1, 1, 0, 1, 1, 0, 1, 1, 0 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], ]

var x = 45;
var y = 45;
var radius = 25;
var startAngle1 = 0.25 * Math.PI;
var endAngle1 = 1.25 * Math.PI;
var startAngle2 = 0.75 * Math.PI;
var endAngle2 = 1.75 * Math.PI;

function drawGrid() {
	var mHeight = matrix.length;
	var mWidth = matrixWidth();
	var cellHeight = canvas.height / mHeight;
	var cellWidth = canvas.width / mWidth;

	for (var i = 0; i < matrix.length; i++) {

		for (var j = 0; j < matrix[i].length; j++) {

			ctx.fillStyle = matrix[i][j];

			if (matrix[i][j] == 0) {
				ctx.strokeRect(j * cellWidth, i * cellHeight, cellWidth,
						cellHeight);
			} else {
				ctx.fillStyle = 'red';
				ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth,
						cellHeight);

			}
		}
	}

}

function matrixWidth() {
	var w = 0;
	for (var i = 0; i < matrix.length; i++) {
		if (w < matrix[i].length) {
			w = matrix[i].length;
		}
	}
	return w;
}

function drawPackman() {
	ctx.beginPath();
	ctx.arc(x, y, radius, startAngle1, endAngle1, false);
	ctx.fillStyle = "rgb(255, 255, 0)";
	ctx.fill();
	ctx.beginPath();
	ctx.arc(x, y, radius, startAngle2, endAngle2, false);
	ctx.fill();
	ctx.beginPath();
	ctx.arc(x, y - 13, 3, 0, 2 * Math.PI, false);
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fill();
}

function clear() {
	ctx.clearRect(0, 0, cellWidth, cellHeight);
}

function movePackman(event) {
	var image = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var pix = image.data;
	var pressKey = false;
	switch (event.keyCode) {
	case 39:
		pressKey = true;
		if (x < canvas.width - 50) {
			var image = ctx.getImageData(x + (2 * 45), y, 20, 20);
			var pix = image.data;
			for (var i = 0; i < pix.length; i += 4) {
				var red = pix[i];
				var green = pix[i + 1];
				var blue = pix[i + 2];
				var alpha = pix[i + 3];
			}

			if (red != 255) {
				ctx.clearRect(x - 25, y - 25, 60, 60);
				x = x + (2 * 45);
				drawPackman();
			}

		}
		break;
	case 37:
		pressKey = true;
		if (x > 100 && ctx.fillStyle) {
			var image = ctx.getImageData(x - (2 * 45), y, 20, 20);
			var pix = image.data;
			for (var i = 0; i < pix.length; i += 4) {
				var red = pix[i];
				var green = pix[i + 1];
				var blue = pix[i + 2];
				var alpha = pix[i + 3];
			}
			if (red != 255) {
				ctx.clearRect(x - 25, y - 25, 60, 60);
				x = x - 2 * 45;
				drawPackman();
			}
		}
		break;
	case 40:
		pressKey = true;
		if (y < canvas.height - 50) {
			var image = ctx.getImageData(x, y + 2 * 45, 20, 20);
			var pix = image.data;
			for (var i = 0; i < pix.length; i += 4) {
				var red = pix[i];
				var green = pix[i + 1];
				var blue = pix[i + 2];
				var alpha = pix[i + 3];
			}
			if (red != 255) {
				ctx.clearRect(x - 25, y - 25, 60, 60);
				y = y + 2 * 45;
				drawPackman();
			}

		}
		break;
	case 38:
		pressKey = true;
		if (y > 100 && ctx.fillStyle) {
			var image = ctx.getImageData(x, y - 2 * 45, 20, 20);
			var pix = image.data;
			for (var i = 0; i < pix.length; i += 4) {
				var red = pix[i];
				var green = pix[i + 1];
				var blue = pix[i + 2];
				var alpha = pix[i + 3];
			}
			if (red != 255) {
				ctx.clearRect(x - 25, y - 25, 60, 60);
				y = y - 2 * 45;
				drawPackman();
			}

		}
		break;
	}
	pressKey = false;
	setTimeout(function() {
		if (pressKey == false) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			document.body.innerHTML = 'GAME OVER';
			document.body.style.color = 'blue';
			document.body.style.fontSize = '300%';
			document.body.style.textAlign = 'center';
		}
	}, 10000);

}

function drawPoint() {
	var j;

	var i = Math.floor(Math.random() * 10);
	j = Math.floor(Math.random() * 5);
	if (i > 0 && i < 5) {
		do {
			j = Math.floor(Math.random() * 5);
		} while (j % 3 == 0);

	}
	if (matrix[j][i] != 1) {
		ctx.beginPath();
		ctx.fillStyle = 'black';
		ctx.arc(i * 90.2 + 45, j * 90 + 45, 10, 0, 360);
		ctx.fill();
		setTimeout(function() {
			ctx.beginPath();
			ctx.fillStyle = 'white';
			ctx.arc(i * 90.2 + 45, j * 90 + 45, 20, 0, 360);

			ctx.fill();
		}, 4000);
	}

}

function init() {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	drawGrid();
	window.onkeydown = movePackman;
	return setInterval(drawPackman, 10);

}
init();
window.addEventListener('keypress', movePackman, true);
drawPoint();
setInterval(function() {
	drawPoint()
}, 1000);