import {Edge,Point,Polygon} from '../entities'
import Figure from './Figure'
class EllipticalCylinder extends Figure {
    constructor(count = 20, h = 15, a = 6, b = 10) {
        super();
        //точки
        const points = [];
        const dt = 2 * Math.PI / count;
        for (let p = 0; p < h; p = p + 2) {
            for (let i = 0; i <= Math.PI; i += 2 * dt + count) {
                for (let j = 0; j < 2 * Math.PI; j += dt) {
                    points.push(new Point(
                        b * Math.sin(j),
                        p,
                        a * Math.cos(i) * Math.cos(j),
                    ));
                }
            }
        }

        //ребра
        const edges = [];
        for (let i = 0; i < points.length; i++) {
            //вдоль
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
            //поперек
            if (i < points.length - count) {
                edges.push(new Edge(
                    i,
                    i + count
                ));
            }
        }

        //полигоны
        const polygons = [];
        for (let i = 0; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count]))
            }
        }
<<<<<<< Updated upstream
        const upperBasePolygons = [];
        const lowerBasePolygons = [];
        polygons.push(new Polygon([points.length - 1, points.length - count - 1, points.length - 2 * count, points.length - count]));
        for (let i = 0; i < count; i++) { lowerBasePolygons.push(i) }
        for (let i = points.length - 1; i >= points.length - count; i--) { upperBasePolygons.push(i) }
        polygons.push(new Polygon(lowerBasePolygons));
        polygons.push(new Polygon(upperBasePolygons));

=======
        
        // for(let i = 0; i < polygons.length * 0.2; i++) {
        //     polygons[i].isLit = true;
        //     if (i % 2) {
        //         polygons[i].color = Polygon.prototype.hexToRgba('#ffffffff')
        //     }
        // }
        
>>>>>>> Stashed changes
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}
export default EllipticalCylinder;
