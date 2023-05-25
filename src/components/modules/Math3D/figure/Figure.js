class Figure {
    constructor(points = [], edges = [], polygons = [], center = new Point) {
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.center = center;
        this.animation = [];
    }
    dropAnimation() {
        this.animation = [] //!
    }
    setAnimation(method, value, center) {
        this.animations.push({
            [method]: value,
            center: center ? center: this.center
        });
    }
    doAnimation(Math3D){
        this.animatios.forEach(anim => {
            const T2 = math3D[anim.method](anim.value);
            const T1 = math3D.move(
                -anim.center.x,
                -anim.center.y,
                -anim.center.z,);
            const T3 = math3D.move(
                anim.center.x,
                anim.center.y,
                anim.center.z,);
            const matrix = math3D.getTransformMatrix(T1, T2, T3);
            this.points.forEach(point => Math3D.transform(matrix, points));
            math3D.transform(mult, this.center)
        });
    }
}