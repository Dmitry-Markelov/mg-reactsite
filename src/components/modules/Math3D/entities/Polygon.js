import Point from './Point';

export default class Polygon {
    constructor(points = [], color = '#f77f00', alpha = 1) {
        this.points = points;
        this.center = new Point;
        this.distance = 0;
        this.lumen = 1;
        this.color = this.hexToRgb(color);
        this.colorA = color;
        this.alpha = alpha;
    }
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        // console.log(hex)
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        }: {
            r: 0,
            g: 0,
            b: 0
        };
    }
    hexToRgba(hex) {
        console.log(hex);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
            alpha: parseInt(result[4], 16),
        } : {
            r: 1,
            g: 2,
            b: 34,
            alpha: 1
        };
    }
    rgbToHex(r, g, b) {
        return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
    }
    rgbaToHex(r, g, b, a) {
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);
        a = Math.round(a * 255).toString(16);

        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;
        if (a.length == 1)
            a = "0" + a;

        return "#" + r + g + b + a;
    }
    // setColor(color) {
    //     this.hexToRgba(color);
    // }
}