function getRoots(a, b, c, d, e) {
    if (!isNaN(a) && !isNaN(b) && !isNaN(c) && !isNaN(d) && !isNaN(e))
        return 4;
    if (!isNaN(a) && !isNaN(b) && !isNaN(c) && !isNaN(d))
        return 3;
    if (!isNaN(a) && !isNaN(b) && !isNaN(c))
        return 2;
    if (!isNaN(a) && !isNaN(b))
        return 1;
    return null;
}

function getRootsHandler() {
    var a = document.getElementById("a").value;
    var b = document.getElementById("b").value;
    var c = document.getElementById("c").value;
    var d = document.getElementById("d").value;
    var e = document.getElementById("e").value;
    var roots = getRoots(
        a ? a - 0 : NaN,
        b ? b - 0 : NaN,
        c ? c - 0 : NaN,
        d ? d - 0 : NaN,
        e ? e - 0 : NaN
    );

    console.log(roots);
}