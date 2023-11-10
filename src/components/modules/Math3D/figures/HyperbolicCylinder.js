import { Point, Polygon, Edge, Figure } from "../entities";
export default class HyperbolicCylinder extends Figure {
    constructor(count = 5, a = 1, b = 1, color = '#7ab1dfff') {
        super();
        const points = [];
        const edges = [];
        const polygons = [];

        const dt = 2 * Math.PI / count;
        for (let i = -Math.PI; i <= Math.PI; i += dt) {
            for (let j = -Math.PI; j < Math.PI; j += dt) {
                points.push(new Point(
                    a * Math.sinh(i),
                    b * Math.cosh(i),
                    j * 2,
                ));
            }
        }

        for (let i = -Math.PI; i <= Math.PI; i += dt) {
            for (let j = -Math.PI; j < Math.PI; j += dt) {
                points.push(new Point(
                    - a * Math.sinh(i),
                    - b * Math.cosh(i),
                    j * 2));
            }
        }

        for (let i = 0; i < points.length / 2; i++) {
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(
                    i,
                    i + 1
                ));
            }
            else if ((i + 1) % count === 0) {
                edges.push(new Edge(
                    i,
                    i + 1 - count
                ));
            }
            if (i < points.length / 2 - count) {
                edges.push(new Edge(
                    i,
                    i + count
                ));
            }
        }
        for (let i = points.length / 2; i < points.length; i++) {
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
        
        for (let i = 0; i < points.length / 2 - count; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
            }
        }
        for (let i = points.length / 2; i < points.length; i++) {
            if (i + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}