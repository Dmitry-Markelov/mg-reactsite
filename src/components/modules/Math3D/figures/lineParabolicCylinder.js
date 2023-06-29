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
    let colorIndex = 0;
    let direction = 1;
    for (let i = count*2; i < points.length-count*2; i++) {
      if (i + 1 + count < points.length && (i + 1) % count !== 0) {
        const polygonColor = (colorIndex === 0) ? '#ffff00' : color; // Определение цвета полигона
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], polygonColor));

        colorIndex += direction; // Обновление индекса цвета

        // Изменение направления индекса цвета при достижении границы
        if (colorIndex === count || colorIndex === -1) {
          direction *= -1;
          colorIndex += direction;
        }
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
