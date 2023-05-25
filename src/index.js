const template = new Template();

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkit.requestAnimationFrame ||
        window.moz.requestAnimationFrame ||
        window.o.requestAnimationFrame ||
        window.ms.requestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000/60);
        };
    
})

window.onload = () => {
    const app = new App({ id: 'app', template: template.AppTemplate })
    app.componentList.forEach((comp, index) => { if (index !== 0) comp.hide() })
}