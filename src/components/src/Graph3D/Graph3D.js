import React from 'react';
import Graph from '../../modules/Graph/Graph';
import Math3D, {Point, Light, Cube} from '../../modules/Math3D';
// import './Graph3D.css';
export default class Graph3D extends React.Component {
    constructor(params) {
        super(params);
        this.WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
            FOCUS: new Point(0, 0, 30),
            CAMERA: new Point(0, 0, 50)
        }
        this.LIGHT = new Light(-20, 20, 10, document.getElementById('lightPower').value);
        this.graph = new Graph({
            id: 'canvas3d',
            WIN: this.WIN,
            width: 700,
            height: 700,
            callbacks: {
                wheel: (event) => this.wheel(event),
                mouseup: () => this.mouseup(),
                mousedown: () => this.mousedown(),
                mousemove: (event) => this.mousemove(event),
                mouseleave: () => this.mouseleave()
            }
        });

        this.pointSelected = false;
        this.edgeSelected = false;
        this.polygonSelected = true;

        this.scene = {
            cube: new Cube,
            sphere: new Sphere,
            ellipsoid: new Ellipsoid,
            toroid: new Toroid
        };

        this.math3D = new Math3D({ WIN: this.WIN });
        this.selected = this.scene[document.getElementById('selectFigure').value];
        this.canRotate = false;
        this.printScene(this.selected);
    }

    wheel(event) {
        const delta = 1 + event.wheelDelta / 1200;
        this.selected.points.forEach(point => {
            this.math3D.zoom(delta, point);
        });
        this.printScene(this.selected);
    }
    
    mouseup() {
        this.canRotate = false;
    }
    
    mousedown() {
        this.canRotate = true;
    }
    
    mouseleave() {
        this.canRotate = false;
    }
    
    mousemove(event) {
        if (this.canRotate) {
            const { movementX, movementY } = event;
            this.selected.points.forEach(point => {
                this.math3D.rotateOY(movementX / 180, point);
                this.math3D.rotateOX(movementY / 180, point);
            });
            this.printScene(this.selected);
        }
    }
    clear() {
        this.graph.clear();
    }
    
    addEventListener() {
        document.getElementById('pointsCheck').addEventListener('click', () => this.check('pointSelected'));
        document.getElementById('edgesCheck').addEventListener('click', () => this.check('edgeSelected'));
        document.getElementById('polygonsCheck').addEventListener('click', () => this.check('polygonSelected'));
        document.getElementById('colorSelector').addEventListener('input', () => this.selectColor(this.selected));
        document.getElementById('lightPower').addEventListener('input', () => this.lightPower());
        const s = document.getElementById('selectFigure');
        s.addEventListener('change', () => 
          {
              this.selected = this.scene[s.value];
              this.printScene(this.selected);
          }
        );
    }
    check(name) {
        this[name] = !this[name];
        this.printScene(this.selected);
    }
    lightPower(){
        this.LIGHT.lumen = document.getElementById('lightPower').value;
        this.printScene(this.selected);
    }
    selectColor(figure) {
        figure.polygons.forEach(polygon => {
            polygon.color = polygon.hexToRgb(document.getElementById('colorSelector').value);
        })
        this.printScene(this.selected);
    }
    printScene(figure) {
        this.clear();
        if (this.polygonSelected) {
            this.math3D.calcCenters(figure);
            this.math3D.calcDistance(figure, this.WIN.CAMERA, 'distance');
            this.math3D.calcDistance(figure, this.LIGHT, 'lumen')
            this.math3D.sortByArtistAlgoritm(figure.polygons);
            figure.polygons.forEach(polygon => {
                const points = [
                    figure.points[polygon.points[0]],
                    figure.points[polygon.points[1]],
                    figure.points[polygon.points[2]],
                    figure.points[polygon.points[3]]
                ];
                let { r, g, b } = polygon.color;
                const lumen = this.math3D.calcIllumination(polygon.lumen, this.LIGHT.lumen);
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);

                const color = polygon.rgbToHex(r, g, b);

                this.graph.polygon(
                    points.map(point => {
                        return {
                            x: this.math3D.xs(point),
                            y: this.math3D.ys(point)
                        }
                    }), color);
            });
        }
        if (this.pointSelected) {
            this.selected.points.forEach(point => {
                this.graph.point(
                    this.math3D.xs(point),
                    this.math3D.ys(point)
                );
            })
        }
        if (this.edgeSelected) {
            this.selected.edges.forEach(({ p1, p2 }) => {
                const point1 = this.selected.points[p1];
                const point2 = this.selected.points[p2];
                this.graph.line(
                    this.math3D.xs(point1),
                    this.math3D.ys(point1),
                    this.math3D.xs(point2),
                    this.math3D.ys(point2)
                );
            });
        }
    }
}