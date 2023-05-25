import React from 'react';
import Graph from '../modules/Graph/Graph';
import Math3D, {Point, Light, Cube, Ellipsoid, Sphere, Toroid} from '../modules/Math3D';
import Graph3DUI from './Graph3DUI';
// import './Graph3D.css';

export default class Graph3D extends React.Component {
    constructor(props) {
        super(props);
        this.WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
            FOCUS: new Point(0, 0, 30),
            CAMERA: new Point(0, 0, 50)
        }
        this.LIGHT = new Light(-20, 20, 10, document.getElementById('lightPower').value);

        // this.scene = {
        //     cube: new Cube,
        //     sphere: new Sphere,
        //     ellipsoid: new Ellipsoid,
        //     toroid: new Toroid
        // };
        this.scene = [new Cube()];

        this.show = {
            showPoints: false,
            showEdges: false,
            showPolygons: true,
        }

        this.math3D = new Math3D({ WIN: this.WIN });
        this.canRotate = false;
    }

    componentDidMount() {

        this.graph = new Graph({
            id: 'canvas3D',
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

        //FPS
        let FPS = 0;
        this.FPS = 0;
        let lastTimestamp = Date.now();
        const animLoop = () => {
            FPS++;
            const timestamp = Date.now();
            if (timestamp - lastTimestamp >= 1000) {
                this.FPS = FPS;
                FPS = 0;
                lastTimestamp = timestamp;
            }
            this.printScene(this.selected);
            this.request = window.requestAnimationFrame(animLoop);
        }
        
        animLoop();
    }
    componentWillUnmount() {
        window.cancelAnimationFrame(this.request);
        this.graph = null;
    }

    showHidePoints(value) {
        this.showPoints = value;
    }
    showHideEdges(value) {
        this.showEdges = value;
    }
    showHidePolygons(value) {
        this.showPolygons = value;
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
            // this.printScene(this.selected);
        }
    }
    
    updateScene(newFigure) {
        this.scene = [newFigure];
    }

    clear() {
        this.graph.clear();
    }
    
    printScene(figure) {
        this.clear();
        if (this.show.showPolygons) {
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
        if (this.show.showPoints) {
            this.selected.points.forEach(point => {
                this.graph.point(
                    this.math3D.xs(point),
                    this.math3D.ys(point)
                );
            })
        }
        if (this.show.showEdges) {
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
    render() {
        return(
            <div className='graph3D'>
                <Graph3DUI
                    show={this.show}
                    sshowHidePoints={(value) => this.showHidePoints(value)}
                    showHideEdges={(value) => this.showHideEdges(value)}
                    showHidePolygons={(value) => this.showHidePolygons(value)}
                    updateScene={(newFigure) => this.updateScene(newFigure)}
                    changeColor={(value) => this.changeColor(value)}
                />
                <canvas id='canvas3D'></canvas>
            </div>
        );
    }
}