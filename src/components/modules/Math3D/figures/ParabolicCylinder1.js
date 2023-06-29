import { Edge, Point, Polygon } from '../entities';
import Figure from './Figure';

class ParabolicCylinder extends Figure {
  constructor(count = 50, a = 5, b = 3, color = '#ffffff') {
    super();

    // Точки
    const points = [];
    const dt = 2 * Math.PI / count;
    for (let i = -Math.PI; i < Math.PI; i += dt) {
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
    for (let i = count*2; i < points.length-count; i++) {
        // Вдоль
        if (i + 1 < points.length && (i + 1) % count !== 0) {
        edges.push(new Edge(i, i + 1));
        } else if ((i + 1) % count === 0) {
        edges.push(new Edge(i, i + 1 - count));
        }

        // Поперек
        if (i < points.length-count*2) {
            if (i < points.length - count) {
                edges.push(new Edge(i, i + count));
            }
        }
    }

    // Полигоны
    const polygons = [];
    for (let i = count*2; i < points.length+count; i++) {
      if (i + 3 + (2 * count) < points.length && (i + 1) % count !== 0) {
        // Раскраска в шахматном порядке
        const row = Math.floor(i / count);
        const column = i % count;
        const isCenter = row % 3 === 1 && column % 3 === 1;
        const color1 = '#ffff00';

        if (!isCenter) {
          const isEvenRow = Math.floor(row / 3) % 2 === 0;
          const isEvenColumn = Math.floor(column / 3) % 2 === 0;
          const isWhite = (isEvenRow && isEvenColumn) || (!isEvenRow && !isEvenColumn);
          const polygonColor = isWhite ? color1 : color;


          polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], polygonColor));
        }
        polygons.push(new Polygon([count*count-count-1, ((count-1)*count)-count-1, ((count-1)*count)-count-2, count*count-count-2], color));
        polygons.push(new Polygon([count*count-count-2, ((count-1)*count)-count-2, ((count-1)*count)-count-3, count*count-count-3], color1));
      }
    }

    // const polygons = [];
    // for (let i = count*2; i < points.length-count*2; i++) {
    //     if (i + 1 + count < points.length && (i + 1) % count !== 0) {
    //         polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
    //     }
    // }
    
    this.points = points;
    this.edges = edges;
    this.polygons = polygons;
  }
}

export default ParabolicCylinder;
