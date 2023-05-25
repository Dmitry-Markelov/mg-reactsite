Template.prototype.Graph3D = () =>
    `
    <div class = "c3d">
        <div>
            <div class = "colorSelector">
                <input type="color" id = "colorSelector" value = '#ff7766'>
            </div>
            <div class = "lightPower">
                <input type="range" id = "lightPower" min = "5000" max = "45000", step = "1000" value = '15000'>
            </div>
            <div id = "input-list">
            <input type="checkbox" class = "list3D" id="pointsCheck" >Точки
            <input type="checkbox" class = "list3D" id="edgesCheck" >Грани
            <input type="checkbox" class = "list3D" id="polygonsCheck" checked>Полигоны
            </div>
            <select id = "selectFigure">
            <option class = "option" value = "cube" >Кубик</option>
            <option class = "option" value = "sphere">Шарик</option>
            <option class = "option" value = "ellipsoid">Эллипсоид</option>
            <option class = "option" value = "toroid" selected>Тор</option>
            </select>
        </div>
        <canvas id="canvas3d"></canvas>
    </div>
    `