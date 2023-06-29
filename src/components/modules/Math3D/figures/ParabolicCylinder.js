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
<<<<<<< Updated upstream
=======

    // Ребра
    const edges = [];
    for (let i = 0; i < points.length-count; i++) {
      // Вдоль
      if (i + 1 < points.length && (i + 1) % count !== 0) {
        edges.push(new Edge(i, i + 1));
      } else if ((i + 1) % count === 0) {
        edges.push(new Edge(i, i + 1 - count));
      }
      // Поперек
      if (i < points.length - count) {
        edges.push(new Edge(i, i + count));
      }
    }
    
    const polygons = [];
    for (let i = 0; i < points.length; i++) {
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
        }
    }



    // let s = 0;
    // let k = 0;
    // for (let i = 0; i < points.length; i++) {
    //       if ((i % count) == 0) {
    //           k++;
    // }
    //       if (((i + k * 2 + 1) % 2) <= 0) {
    //           if (i + 1 + count < points.length && (i + 1) % count !== 0) {
    //             if ((s % 2 == 0) && (i < count)) {
    //               polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], "#008000ff"));
    //             } else if ((s % 2 == 0) && (i > points.length-count*2)) {
    //               polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], "#008000ff"));
    //             } else {
    //               polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], "#ffffffff"));
    //               }
    //               s++;
    //           }
    //       } else {
    //           if (i + 1 + count < points.length && (i + 1) % count !== 0) {
    //               polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], "#008000ff"));
    //           }
    //       }
    // }

    this.points = points;
    this.edges = edges;
    this.polygons = polygons;

  }
>>>>>>> Stashed changes
}

export default ParabolicCylinder;