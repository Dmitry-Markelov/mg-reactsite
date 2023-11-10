import { Point, Polygon, Edge, Figure } from "../entities";
export default class ParabolicCylinder extends Figure {
    constructor(count = 13, a = 2, b = 2, c = 10, color = '#d79196ff') {
        super();

        const points = [];
        const edges = [];
        const polygons = [];

        const dt = 2 * Math.PI / count;
        for (let i = -Math.PI; i <= Math.PI; i += dt) {
            for (let j = -Math.PI; j <= Math.PI; j += dt) {
                points.push(new Point(
                    b * Math.sinh(i),
                    a * Math.cosh(i),
                    c * j,
                ));
            }
        }

        for (let i = 0; i < points.length - 1; i++) {
            if ((i + 1) % (count + 1)) {
                edges.push(new Edge(i, i + 1));
            }

            if (points[i + 1 + count]) {
                edges.push(new Edge(i, i + (1 + count)));
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (points[i + 1 + count] && (i + 1) % (count + 1)) {
                polygons.push(new Polygon([i, i + 1, i + 1 + (1 + count), i + (1 + count)], color));
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}