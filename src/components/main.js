window.onload = function () {
    if (document.getElementById("shot")){
    var shotButton = document.getElementById("shot");
    shotButton.addEventListener('click', shotHandler);
    } else if (document.getElementById("shoter")){
    var shoterButton = document.getElementById("shoter");
    shoterButton.addEventListener('click', shoterHandler);
    } else if (document.getElementById("gerRoots")){
    var getRootsButton = document.getElementById('getRoots');
    getRootsButton.addEventListener('click', getRootsHandler);
    } else if (document.querySelectorAll(".gerInfo")){
    var menuButtons = document.querySelectorAll('.getInfo');
    for (var i = 0; i < menuButtons.length; i++) {
        menuButtons[i].addEventListener('click', menuHandler);
    }
    }
    setQuest();
}

