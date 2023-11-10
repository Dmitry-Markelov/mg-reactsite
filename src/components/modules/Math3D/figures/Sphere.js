import { Point, Polygon, Edge, Figure } from "../entities";
class Sphere extends Figure {
    constructor(r = 10, count = 20) {
        super();
        //points
        const points = [];
        for(let i = 0; i <= count; i++) { //кольца
            const T = Math.PI / count * i;
            for(let j = 0; j < count; j++) {
                const p = 2 * Math.PI / count * j;
                points.push(new Point(
                    r * Math.sin(T) * Math.cos(p),
                    r * Math.cos(T),
                    r * Math.sin(T) * Math.sin(p),
                ))
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
        for (let i = 0; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
            } else if ((i + count) < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count]))
            } else {
                if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                    polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
                } else if ((i + count) < points.length && (i + 1) % count === 0) {
                    polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count]))
                }
            }
        }
        

        
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default Sphere;

// x = r * sin(T) * cos(p)
// y = r * sin(T) * sin(p)
// z = r * cos(p)
// T = [0 .. PI]
// p = [0 .. 2*PI]