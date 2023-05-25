function Human(name, money) {
    this.name = document.getElementById("name").value;
    this.money = money || 0;
    this.age = document.getElementById("age").value || 0;
    this.stamina = 100;
    this.status = 'alive';
    this.work = function(time){
        this.moneyt = time * 10;
        this.stamina = time * 2;
        this.checkDeath = function(){
            if(this.stamina <= 0){
                this.status = 'dead';
            }   
        }
    }
    var indicators = [this.status, this.money, this.stamina];
    document.getElementById('player-name').innerHTML = this.name + ' ' + this.age + ' лет ' + this.status;
    document.getElementById('indicators').innerHTML = indicators ;
}

function menuHandler(event) {
    var contents = document.querySelectorAll('.content-item');
    for (var i = 0; i < contents.length; i++) {
        contents[i].classList.add('hide');
    }
    
    var id = event.target.dataset.content;
    document.getElementById(id).classList.remove('hide');
    Human()
}
