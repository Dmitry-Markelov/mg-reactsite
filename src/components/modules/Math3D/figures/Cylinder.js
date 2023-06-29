import { Point, Polygon, Edge, Figure } from "../entities";
class Cylinder extends Figure {
    constructor(a = 15, b = 10, c = 10, count = 70, color = '#ffffff') {
        super({});

        const points = [];
        const dt = 2 * Math.PI / count;
        for (let p = -a; p < a; p = p + 2) {
            for (let i = 0; i <= Math.PI; i += 2 * dt + count) {
                for (let j = 0; j < 2 * Math.PI; j += dt) {
                    points.push(new Point(
                        c * Math.sin(j),
                        p,
                        b * Math.cos(i) * Math.cos(j),
                    ));
                }
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
        
        const polygons = [];
        
        const dc = 255/points.length;
        for (let i = 0; i < points.length; i++) {
            const color1 = Polygon.prototype.rgbaToHex(i*dc, 60, 80, 0.5);
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color1))
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default Cylinder;