import { Point, Polygon, Edge, Figure } from "../entities";
class Toroid extends Figure {
    constructor(R = 12, r = 7, count = 25, color = '#aaaaaaff') {
        super();
        //points
        const points = [];
        for(let i = 0; i <= count + 1; i++) { //кольца
            const T = 2 * Math.PI * i / count;
            for(let j = 0; j < count; j++) {
                const p = 2 * Math.PI * j / count;
                points.push(new Point(
                    (R + r * Math.cos(T)) * Math.cos(p),
                    (R + r * Math.cos(T)) * Math.sin(p),
                    r * Math.sin(T)
                ));
            }
        }
        //edges
        const edges = [];
        for(let i = 0; i < points.length; i++) {
            if (points[i + 1]) {
                if ((i + 1) % count === 0) {
                    edges.push(new Edge(i, i + 1 - count));
                } else {
                    edges.push(new Edge(i, i + 1));
                }
            }
            if (points[i + count]) {
                edges.push(new Edge(i, i + count));
            }
        }
        //polygons
        const polygons = [];
        for(let i = 0; i < points.length-count*2; i++) {
            if (points[i + 1 + count]) {
                if ((i + 1) % count === 0) {
                    polygons.push(new Polygon([
                        i,
                        i + 1 - count,
                        i + 1,
                        i + count], color));
                } else {
                    polygons.push(new Polygon([
                        i,
                        i + 1,
                        i + 1 + count,
                        i + count], color));
                }
            }
        }

        // for(let i = 0; i < polygons.length * 0.2; i++) {
        //     polygons[i].isLit = true;
        //     if (i % 2) {
        //         polygons[i].color = Polygon.prototype.hexToRgba('#ffffffff')
        //     }
        // }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default Toroid;

// x = r * sin(T) * cos(p)
// y = r * sin(T) * sin(p)
// z = r * cos(p)
// T = [0 .. PI]
// p = [0 .. 2*PI]