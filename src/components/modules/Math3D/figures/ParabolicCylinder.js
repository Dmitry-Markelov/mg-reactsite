import {Edge,Point,Polygon} from '../entities'
import Figure from './Figure'
class ParabolicCylinder extends Figure {
    constructor(count = 10, a = 5, b = 2) {
        super({});
        const points = [];
        const deltaZ = a / count;
        const deltaT = Math.PI / count;
        
        for (let j = -a; j < a; j += deltaZ) {
            for (let i = 0; i < 2 * Math.PI; i += deltaT) {
                points.push(
                    new Point(
                        Math.sqrt(2 * b * i),
                        j,
                        i
                    )
                );
            }
        }
        for (let j = -a; j < a; j += deltaZ) {
            for (let i = 0; i < 2 * Math.PI; i += deltaT) {
                points.push(
                    new Point(
                        -Math.sqrt(2 * b * i),
                        j,
                        i
                    )
                );
            }
        }
        const edges = [];
        for (let i = 0; i < points.length; i++) {
            if (points[i + 1]) {
                if ((i + 1) % (count * 2) !== 0) {
                    edges.push(new Edge(i, i + 1));
                }
            }
        }
        for (let j = points.length / 2; j < points.length; j++) {
            if (points[j + count * 2]) {
                edges.push(new Edge(j, j + count * 2));
            }
        }
        for (let j = 0; j < points.length / 2 - count * 2; j++) {
            if (points[j + count * 2]) {
                edges.push(new Edge(j, j + count * 2));
            }
        }
        const polygons = [];
        for (let i = 0; i < points.length / 2 - count * 2; i++) {
            if (points[i + count * 2 + 1] && (i + 1) % (count * 2) !== 0) {
                polygons.push(new Polygon([i, i + 1, i + count * 2 + 1, i + count * 2]));
            }
        }
        for (let i = points.length / 2; i < points.length; i++) {
            if (points[i + count * 2 + 1] && (i + 1) % (count * 2) !== 0) {
                polygons.push(new Polygon([i, i + 1, i + count * 2 + 1, i + count * 2]));
            }
        }
        
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        
        this.animations = [
            { method: 'rotateOY', value: -Math.PI / 500, center: new Point() },
            { method: 'rotateOY', value: -Math.PI / 500, center: this.center }
        ];
    }
}

export default ParabolicCylinder;