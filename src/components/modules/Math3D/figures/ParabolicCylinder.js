import { Edge, Point, Polygon } from '../entities';
import Figure from './Figure';

class ParabolicCylinder extends Figure {
  constructor(count = 20, a = 5, b = 3, color = '#ffffff') {
    super();

    // Точки
    const points = [];
    const dt = 2 * Math.PI / count;
    for (let i = -Math.PI; i <= Math.PI; i += dt) {
      for (let j = -Math.PI; j < Math.PI; j += dt) {
        points.push(new Point(
          b * Math.sinh(i),
          j * 10,
          a * Math.cosh(i),
          ));
      }
    }

    // Ребра
    const edges = [];
    for (let i = 0; i < points.length; i++) {
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
    let s = 0;
    let k = 0;
    for (let i = 0; i < points.length; i++) {
          if ((i % count) == 0) {
              k++;
    }
          if (((i + k * 2 + 1) % 2) <= 0) {
              if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                if ((s % 2 == 0) && (i < count)) {
                  polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], "#008000"));
                } else if ((s % 2 == 0) && (i > points.length-count*2)) {
                  polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], "#008000"));
                } else {
                  polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], "#ffffff"));
                  }
                  s++;
              }
          } else {
              if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                  polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], "#008000"));
              }
          }
    }


      



    // Полигоны
    // let s = count;
    // let g = 0;
    // const polygons = [];
    // for (let i = 1; i < points.length; i++) {
    //   if (i + 1 + count < points.length && (i + 1) % count !== 0) {
    //     if(s % count == 0) {
    //         if(s < count*count-i) {
    //             polygons.push(new Polygon([(i+count)+count+g, (i+count*2)+count+g, (i+count*2+1)+count+g, (i+count+1)+count+g], '#f77f00'));
    //             polygons.push(new Polygon([(i+count+1)+count+g, (i+count*2+1)+count+g, (i+count*2+2)+count+g, (i+count+2)+count+g], '#f77f00'));
    //             // polygons.push(new Polygon([(i+count+1)+count+g+1, (i+count*2+1)+count+g+1, (i+count*2+3)+count+g+1, (i+count+3)+count+g+1], color));
    //             g++;
    //         }
    //         // } else {
    //         //     polygons.push(new Polygon([(i+count)+count-g, (i+count*2)+count-g, (i+count*2+1)+count-g, (i+count+1)+count-g], '#f77f00'));
    //         //     polygons.push(new Polygon([(i+count+1)+count-g, (i+count*2+1)+count-g, (i+count*2+2)+count-g, (i+count+2)+count-g], '#f77f00'));
    //         // }
    //     } else {
    //         // polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
    //     }
    //     // polygons.push(new Polygon([ count,                       count*2,                           count*2+1,                           count+1], color));
    //     // polygons.push(new Polygon([(count)+count+1,             (count+count)+count+1,             (count+count+1)+count+1,             (count+1)+count+1], color));
    //     // polygons.push(new Polygon([(count+count)+count+2,       (count+count+count)+count+2,       (count+count+count+1)+count+2,       (count+count+1)+count+2], color));
    //     // polygons.push(new Polygon([(count+count+count)+count+3, (count+count+count+count)+count+3, (count+count+count+count+1)+count+3, (count+count+count+1)+count+3], color));

    //         // polygons.push(new Polygon([count*count-count-2, ((count-1)*count)-count-2, ((count-1)*count)-count-3, count*count-count-3], '#ff0000'));



    //     polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
    //     s++;  
    //     }
    // }

    this.points = points;
    this.edges = edges;
    this.polygons = polygons;

  }
}

export default ParabolicCylinder;