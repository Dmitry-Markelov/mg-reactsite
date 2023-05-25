function shotHandler() {
    var x = document.getElementById("x").value - 0;
    var y = document.getElementById("y").value - 0;
    var score = shot(x, y);
    document.getElementById('result-shot').innerHTML = score;
}

function shoterHandler() {
    var count = document.getElementById("count").value - 0;
    var max = document.getElementById("max").value - 0;
    var min = document.getElementById("min").value - 0;
    var score = shoter(count, min, max);
    document.getElementById('result-shoter').innerHTML = score;
}

function shotToCenter(x, y) {
    return (x === 0 && y === 0) ? 10 : 0;
}

function shotToRhombus(x, y) {
    return (Math.abs(x) + Math.abs(y) <= 1) ? 5 : 0;
}

function shotToCircle(x, y) {
    return (x * x + y * y <= 1) ? 2 : 0;
}

function shotToSquare(x, y) {
    return (Math.abs(x) && Math.abs(y) <= 1) ? 1 : 0;
}

function shot(x, y) {
    return shotToCenter(x, y) ||
        shotToRhombus(x, y) || shotToCircle(x, y) || shotToSquare(x, y) || 0;
}

function shoter(count, min, max) {
    var score = 0;
    if (count) {
        for (var i = 0; i < count; i++) {
            var x = Math.random() * (max - min) + min;
            var y = Math.random() * (max - min) + min;
            score += shot(x, y);
        }
    }
    return score;
}