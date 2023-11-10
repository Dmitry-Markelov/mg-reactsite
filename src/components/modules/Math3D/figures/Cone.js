import { Point, Polygon, Edge, Figure } from "../entities";
export default class Cone extends Figure {
    constructor(a = 4, b = 4, c = 4, count = 15, color = '#499e4cff') {
        super();

        const points = [];
        const edges = [];
        const polygons = [];

        const dt = Math.PI / count;
        for (let i = -count; i <= count; i++) {
            for (let j = 0; j < count; j++) {
                points.push(new Point(
                    a * i * dt * Math.cos(j * 2 * dt),
                    c * i * dt,
                    b * i * dt * Math.sin(j * 2 * dt)
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

        for (let i = 0; i < 2 * count; i++) {
            for (let j = 0; j < count; j++) {
                polygons.push(
                    new Polygon([
                        i * count + j % count,
                        i * count + (j + 1) % count,
                        (i + 1) * count + (j + 1) % count,
                        (i + 1) * count + j % count],
                        color)
                );
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}