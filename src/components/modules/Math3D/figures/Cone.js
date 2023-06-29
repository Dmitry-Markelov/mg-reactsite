import { Point, Polygon, Edge, Figure } from "../entities";
class Cone extends Figure {
    constructor(a = 4, b = 4, c = 4, count = 10){
        super({});
 
        const points = [];
        const T = 2 * Math.PI / count;
        for (let i = -Math.PI; i <= Math.PI; i += T) {
            for (let j = 0; j < 2 * Math.PI; j += T) {
                points.push(new Point(
                    a * i * Math.cos(j),
                    c * i,
                    Math.sin(j) * b * i
                ));
            }
        }

        for (let i = -Math.PI; i <= Math.PI; i += T) {
            for (let j = 0; j < 2 * Math.PI; j += T) {
                points.push(new Point(
                    a * i * Math.cos(j),
                    c * Math.PI,
                    Math.sin(j) * b * i
                ));
            }
        }
        for (let i = -Math.PI; i <= Math.PI; i += T) {
            for (let j = 0; j < 2 * Math.PI; j += T) {
                points.push(new Point(
                    a * i * Math.cos(j), -c * Math.PI,
                    Math.sin(j) * b * i
                ));
            }
        }

        const edges = [];
        for (let i = 0; i < points.length; i++) {
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(
                    i,
                    i + 1
                ));
            } else if ((i + 1) % count === 0) {
                edges.push(new Edge(
                    i,
                    i + 1 - count
                ));
            }
            if (i < points.length - count) {
                edges.push(new Edge(
                    i,
                    i + count
                ));
            }
        }

        const polygons = []
        const dc = 255 / a;

        for (let i = 0; i < a; i++) {
            const currentColor = Polygon.prototype.rgbToHex(dc*i, 60, 80);
            for (let j = 0; j < count; j++) {
                this.polygons.push(
                    new Polygon([
                        (i + 1) % a * count + (j + 1) % count,
                        (i + 1) % a * count + j % count,
                        i * count + j % count,
                        i * count + (j + 1) % count,
                    ], currentColor)
                );
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default Cone;