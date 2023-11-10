import { Point, Polygon, Edge, Figure } from "../entities";
export default class ParabolicCylinder extends Figure {
    constructor(count = 5, a = 2, b = 2, color = '#d79196ff') {
        super();

        const points = [];
        const edges = [];
        const polygons = [];

        const dt = 2 * Math.PI / count;
        for (let i = -Math.PI; i <= Math.PI; i += dt) {
            for (let j = -Math.PI; j < Math.PI; j += dt) {
                points.push(new Point(
                    this.center.x + b * Math.sinh(i),
                    this.center.y + a * Math.cosh(i),
                    this.center.z + j * 2 * 4,
                ));
            }
        }

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

        for (let i = 0; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}