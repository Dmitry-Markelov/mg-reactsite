import { Point, Polygon, Edge, Figure } from "../entities";
export default class OneSheetedHyperboloid extends Figure {
    constructor(count = 20, a = 2, b = 2, c = 2, color = '#91d794ff') {
        super();
        const points = [];
        const edges = [];
        const polygons = [];
        
        const dt = Math.PI * 2 / count;
        for (let i = -Math.PI; i <= Math.PI; i += dt) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                points.push(new Point(
                    a * Math.cosh(i) * Math.cos(j),
                    c * Math.sinh(i),
                    b * Math.cosh(i) * Math.sin(j)
                ));
            }
        }

        for (let i = 0; i < count + 1; i++) {
            for (let j = 0; j < count; j++) {
                edges.push(
                    new Edge(
                        i * count + j % count,
                        i * count + (j + 1) % count,
                    ));
                if (points[(i + 1) * count + j % count + 1]) {
                    edges.push(
                        new Edge(
                            i * count + j % count + 1,
                            (i + 1) * count + j % count + 1,
                        ));
                }
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color));
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}