import { Point, Polygon, Edge, Figure } from "../entities";
export default class Cylinder extends Figure {
    constructor(count = 50, h = 12, a = 6, b = 6, color = '#a491d7ff' ) {
        super();
        const dt = 2 * Math.PI / count;
        for (let i = -h / 2; i < h / 2; i++) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                this.points.push(new Point(
                    a * Math.cos(j),
                    i,
                    b * Math.sin(j),
                ));
            }
        }

        for (let i = 0; i < this.points.length; i++) {
            if (i + 1 < this.points.length && (i + 1) % count !== 0) {
                this.edges.push(new Edge(
                    i,
                    i + 1
                ));
            } else if ((i + 1) % count === 0) {
                this.edges.push(new Edge(
                    i,
                    i + 1 - count
                ));
            }
            if (i < this.points.length - count) {
                this.edges.push(new Edge(
                    i,
                    i + count
                ));
            }
        }

        for (let i = 0; i < h - 1; i++) {
            for (let j = 0; j < count; j++) {
                this.polygons.push(
                    new Polygon([
                        (i + 1) % h * count + (j + 1) % count,
                        (i + 1) % h * count + j % count,
                        i * count + j % count,
                        i * count + (j + 1) % count,
                    ], color)
                );
            }
        }
    }
}