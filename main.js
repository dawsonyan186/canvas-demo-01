var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
setAutoCanvasSize(canvas);
listenToMouse(canvas);

var using = false;
var lastPoint = { x: undefined, y: undefined };


function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineWidth = 5;
    ctx.lineTo(x2, y2);
    //ctx.strokeStyle='blue';
    ctx.stroke();
    ctx.closePath();
}

var enableEraser = false;
eraser.onclick = function() {
    enableEraser = true;
    actions.className = 'actions x';
};
brush.onclick = function() {
    enableEraser = false;
    actions.className = 'actions';
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

function listenToMouse(canvas) {
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
            ctx.clearRect(x, y , 10, 10);
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