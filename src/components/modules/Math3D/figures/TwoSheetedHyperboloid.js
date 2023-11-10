import { Point, Polygon, Edge, Figure } from "../entities";
export default class TwoSheetedHyperboloid extends Figure {
    constructor(count = 20, a = 2, b = 2, c = 4, color = '#91d794ff') {
        super();


        const points = [];
        const edges = [];
        const polygons = [];

        const dt = Math.PI * 2 / count;
        for (let i = 0; i <= Math.PI; i += dt) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                points.push(new Point(
                    a * Math.sinh(i) * Math.cos(j),
                    c * Math.cosh(i),
                    b * Math.cosh(i) * Math.sin(j)
                ));
            }
        }

        for (let i = 0; i <= Math.PI; i += dt) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                points.push(new Point(
                    - a * Math.sinh(i) * Math.cos(j),
                    - c * Math.cosh(i),
                    - b * Math.cosh(i) * Math.sin(j)
                ));
            }
        }

        for (let i = 0; i < 1 + count / 2; i++) {
            for (let j = 0; j < count; j++) {
                edges.push(
                    new Edge(
                        i * count + j % count,
                        i * count + (j + 1) % count,
                    ));

                if (i < count / 2 && ((i + 1) * count + j % count + 1) < points.length / 2) {
                    edges.push(
                        new Edge(
                            i * count + j % count + 1,
                            (i + 1) * count + j % count + 1,
                        ));
                }
            }
        }

        for (let i = 1 + count / 2; i < 2 + count; i++) {
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

        for (let i = 0; i < points.length / 2 - count; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(
                    new Polygon(
                        [i, i + 1, i + 1 + count, i + count],
                        color
                    ));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(
                    new Polygon(
                        [i, i + 1 - count, i + 1, i + count],
                        color
                    ));
            }
        }
        for (let i = points.length / 2; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(
                    new Polygon(
                        [i, i + 1, i + 1 + count, i + count],
                        color
                    ));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(
                    new Polygon(
                        [i, i + 1 - count, i + 1, i + count],
                        color
                    ));
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}