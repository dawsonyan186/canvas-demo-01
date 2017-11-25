var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var using = false;
var lastPoint = { x: undefined, y: undefined };
var lineWidth = 5;
var fillColor = 'red';
var strokeColor = 'red';
var enableEraser = false;

setAutoCanvasSize(canvas);
listenToUser(canvas);

function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.moveTo(x1, y1);
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

eraser.onclick = function() {
    enableEraser = true;
    eraser.classList.add('active');
    brush.classList.remove('active');
};
brush.onclick = function() {
    enableEraser = false;
    brush.classList.add('active');
    eraser.classList.remove('active');

};

function setAutoCanvasSize(canvas) {
    window.onresize = function() {
        setCanvasSize(canvas);
    };
    setCanvasSize();

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}

function listenToUser(canvas) {
    if (document.body.ontouchstart !== undefined) {
        canvas.ontouchstart = function(event) {
            var x = event.touches[0].clientX;
            var y = event.touches[0].clientY;
            using = true;
            if (enableEraser) {
                ctx.clearRect(x - 5, y - 5, 10, 10);
            } else {
                lastPoint = { x: x, y: y };
                drawCircle(x, y, 1);
            }

        };
        canvas.ontouchmove = function(event) {
            if (!using) return;
            var x = event.touches[0].clientX;
            var y = event.touches[0].clientY;
            if (enableEraser) {
                ctx.clearRect(x - 5, y - 5, 10, 10);
            } else {
                drawCircle(x, y, 1);
                var newPoint = { x: x, y: y };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        };
        canvas.ontouchend = function(event) {
            using = false;
        };
    } else {
        canvas.onmousedown = function(event) {
            var x = event.clientX;
            var y = event.clientY;
            using = true;
            if (enableEraser) {
                ctx.clearRect(x, y, 10, 10);
            } else {
                lastPoint = { x: x, y: y };
                drawCircle(x, y, 1);
            }

        };
        canvas.onmousemove = function(event) {
            if (!using) return;
            var x = event.clientX;
            var y = event.clientY;
            if (enableEraser) {
                ctx.clearRect(x, y, 10, 10);
            } else {
                drawCircle(x, y, 1);
                var newPoint = { x: x, y: y };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        };
        canvas.onmouseup = function(event) {
            using = false;
        };
    }


}

red.onclick = function() {
    fillColor = 'red';
    strokeColor = 'red';
    red.classList.add('active');
    green.classList.remove('active');
    blue.classList.remove('active');

};
green.onclick = function() {
    fillColor = 'green';
    strokeColor = 'green';
    green.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');

}
blue.onclick = function() {
    fillColor = 'blue';
    strokeColor = 'blue';
    blue.classList.add('active');
    red.classList.remove('active');
    green.classList.remove('active');
}

thin.onclick = function() {
    lineWidth = 5;
}
thick.onclick = function() {
    lineWidth = 10;
}
clear.onclick = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

save.onclick = function() {
    var url = canvas.toDataURL('image/png');
    console.log(url)
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'canvas.png';
    a.click();
}