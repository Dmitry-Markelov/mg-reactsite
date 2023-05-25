Template.prototype.Сalculator = () =>
    `
    <div class="content" id="calculator-content">
        <div class="calc-content">
            <div class="calc-main-block">
                <div class="calc-input">
                    <textarea id="num1" class="calc-input" placeholder="a"></textarea>
                    <textarea id="num2" class="calc-input" placeholder="b"></textarea>
                </div>
                <div class="calc-ounput"><textarea name="Результат:" id="calc-result" placeholder="result"></textarea></div>
            </div>
            <div class="calc-side-block">
                <div id="calc-btn">
                    <button class="operand" data-operand="add">a+b</button><br>
                    <button class="operand" data-operand="sub">a-b</button><br>
                    <button class="operand" data-operand="mult">a*b</button><br>
                    <button class="operand" data-operand="div">a/b</button><br>
                    <button class="operand" data-operand="prod">a**b</button><br>
                    <button class="operand" data-operand="pow">a^b</button>
                </div>
            </div>
        </div>   
    </div>
    `