import { Edge, Point, Polygon } from '../entities'
import Figure from './Figure'
class TwoSheetedHyperboloid extends Figure {
    constructor(count = 20, a = 7, b = 6, c = 15) {
        super();
        //точки
        const points = [];
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
                    -a * Math.sinh(i) * Math.cos(j),
                    -c * Math.cosh(i),
                    -b * Math.cosh(i) * Math.sin(j)
                ));
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
            } else if (i + 1 >= count && (i + 1) % count === 0) {
                edges.push(new Edge(
                    i,
                    i + 1 - count
                ));
            }
        }
        
        this.points = points;
        //полигоны
        const polygons = [];


        // const dc = 255 / this.points.length;

        // for (let i = 0; i < this.points.length / 2 - count; i++) {

        //     if (i + 1 + count < this.points.length && (i + 1) % count !== 0) {
        //         this.polygons.push(
        //             new Polygon(
        //                 [i, i + 1, i + 1 + count, i + count],
        //                 Polygon.prototype.rgbToHex(dc * i, 20, 160)
        //             ));
        //     } else if (i + count < this.points.length && (i + 1) % count === 0) {
        //         this.polygons.push(
        //             new Polygon(
        //                 [i, i + 1 - count, i + 1, i + count],
        //                 Polygon.prototype.rgbToHex(dc * i, 20, 160)
        //             ));
        //     }
        // }

        // for (let i = this.points.length / 2; i < this.points.length; i++) {
        //     if (i + 1 + count < this.points.length && (i + 1) % count !== 0) {
        //         this.polygons.push(
        //             new Polygon(
        //                 [i, i + 1, i + 1 + count, i + count],
        //                 Polygon.prototype.rgbToHex(dc * i, 20, 160)
        //             ));
        //     } else if (i + count < this.points.length && (i + 1) % count === 0) {
        //         this.polygons.push(
        //             new Polygon(
        //                 [i, i + 1 - count, i + 1, i + count],
        //                 Polygon.prototype.rgbToHex(dc * i, 20, 160)
        //             ));
        //     }
        // }



        const dc = 255/points.length/1.5;
        for (let i = 0; i < points.length / 2 - count; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], Polygon.prototype.rgbToHex((2*255-i*dc), 60, 120)));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], Polygon.prototype.rgbToHex((2*255-i*dc), 60, 120)))
            }
        }
        for (let i = points.length / 2; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], Polygon.prototype.rgbToHex(255-i*dc, 60, 120)));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], Polygon.prototype.rgbToHex(255-i*dc, 60, 120)))
            }
        }

        this.edges = edges;
        this.polygons = polygons;
    }
}

export default TwoSheetedHyperboloid;