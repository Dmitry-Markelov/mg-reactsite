Template.prototype.Polynomial = () =>
    `
    <div class="content" id="polynomial">
        <div class="calc-content">
            <div class="calc-main-block">
                <div class="calc-input" id="poly-wrapper">
                    <textarea id="poly-num1" class="calc-input" placeholder="a"></textarea>
                    <textarea id="poly-num2" class="calc-input" placeholder="b"></textarea>
                </div>
                <div class="calc-ounput"><textarea name="Результат:" id="poly-result" placeholder="result"></textarea></div>
            </div>
            <div class="calc-side-block">
                <div id="poly-op-wrapper">
                    <button class="btn-stl poly-op text" data-operand="add">P+Q</button><br>
                    <button class="btn-stl poly-op text" data-operand="sub">P-Q</button><br>
                    <button class="btn-stl poly-op text" data-operand="mult">P·Q</button><br>
                    <button class="btn-stl poly-x text">P(Q)</button><br>
                </div>
            </div>
        </div>   
    </div>
    `