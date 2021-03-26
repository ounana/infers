"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPNet = void 0;
const matrix_1 = require("./matrix");
class BPNet {
    constructor(shape, af) {
        this.shape = shape;
        this.af = af;
        this.rate = 0.001;
        if (shape.length < 3) {
            throw new Error('BP网络至少有三层结构');
        }
        this.nlayer = shape.length;
        const [w, b] = this.initwb();
        this.w = w;
        this.b = b;
    }
    initwb(v) {
        let w = [];
        let b = [];
        for (let l = 1; l < this.shape.length; l++) {
            w[l] = matrix_1.Matrix.generate(this.shape[l], this.shape[l - 1], v);
            b[l] = matrix_1.Matrix.generate(1, this.shape[l], v);
        }
        return [w, b];
    }
    setRate(rate) {
        this.rate = rate;
    }
    afn(x) {
        switch (this.af) {
            case 'Sigmoid':
                return 1 / (1 + Math.exp(-x));
            case 'Relu':
                return x >= 0 ? x : 0;
            case 'Tanh':
                return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
            default:
                return x;
        }
    }
    afd(x) {
        switch (this.af) {
            case 'Sigmoid':
                return x * (1 - x);
            case 'Relu':
                return x >= 0 ? 1 : 0;
            case 'Tanh':
                return 1 - ((Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x))) ** 2;
            default:
                return 1;
        }
    }
    calcnet(xs) {
        let hy = [];
        for (let l = 0; l < this.nlayer; l++) {
            if (l === 0) {
                hy[l] = xs;
                continue;
            }
            let w = this.w[l].T;
            let b = this.b[l];
            hy[l] = hy[l - 1].multiply(w).atomicOperation((item, _, j) => this.afn(item + b.get(0, j)));
        }
        return hy;
    }
    zoomScalem(xs) {
        return xs.atomicOperation((item, _, j) => {
            if (!this.scalem)
                return item;
            return this.scalem.get(1, j) === 0 ? 0 : (item - this.scalem.get(0, j)) / this.scalem.get(1, j);
        });
    }
    predict(xs) {
        if (xs.shape[1] !== this.shape[0]) {
            throw new Error(`特征与网络输入不符合，input num -> ${this.shape[0]}`);
        }
        return this.calcnet(this.zoomScalem(xs));
    }
    calcDerivative(ys, hy) {
        const [dw, dy] = this.initwb(0);
        for (let l = this.nlayer - 1; l > 0; l--) {
            if (l === this.nlayer - 1) {
                for (let j = 0; j < this.shape[l]; j++) {
                    let n = (hy[l].get(0, j) - ys[j]) * this.afd(hy[l].get(0, j));
                    dy[l].update(0, j, n);
                    for (let k = 0; k < this.shape[l - 1]; k++) {
                        dw[l].update(j, k, hy[l - 1].get(0, k) * n);
                    }
                }
                continue;
            }
            for (let j = 0; j < this.shape[l]; j++) {
                for (let i = 0; i < this.shape[l + 1]; i++) {
                    dy[l].update(0, j, dy[l + 1].get(0, i) * this.w[l + 1].get(i, j), '+=');
                }
                dy[l].update(0, j, this.afd(hy[l].get(0, j)), '*=');
                for (let k = 0; k < this.shape[l - 1]; k++) {
                    dw[l].update(j, k, hy[l - 1].get(0, k) * dy[l].get(0, j));
                }
            }
        }
        return { dy, dw };
    }
    update(dy, dw) {
        for (let l = 1; l < this.nlayer; l++) {
            this.w[l] = this.w[l].atomicOperation((w, i, j) => w - this.rate * dw[l].get(i, j));
            this.b[l] = this.b[l].atomicOperation((b, i, j) => b - this.rate * dy[l].get(i, j));
        }
    }
    fit(xs, ys, batch, callback) {
        if (xs.shape[0] !== ys.shape[0]) {
            throw new Error('输入输出矩阵行数不统一');
        }
        if (xs.shape[1] !== this.shape[0]) {
            throw new Error(`特征与网络输入不符合，input num -> ${this.shape[0]}`);
        }
        if (ys.shape[1] !== this.shape[this.nlayer - 1]) {
            throw new Error(`标签与网络输出不符合，output num -> ${this.shape[this.nlayer - 1]}`);
        }
        let [inputs, scalem] = xs.normalization();
        this.scalem = scalem;
        xs = inputs;
        for (let p = 0; p < batch; p++) {
            let loss = 0;
            for (let n = 0; n < xs.shape[0]; n++) {
                let xss = new matrix_1.Matrix([xs.getRow(n)]);
                let hy = this.calcnet(xss);
                const { dy, dw } = this.calcDerivative(ys.getRow(n), hy);
                this.update(dy, dw);
                let e = 0;
                let l = this.nlayer - 1;
                for (let j = 0; j < this.shape[l]; j++) {
                    e += ((ys.get(n, j) - hy[l].get(0, j)) ** 2) / 2;
                }
                loss += e / this.shape[l];
            }
            loss = loss / xs.shape[0];
            if (callback)
                callback(p, loss);
        }
    }
}
exports.BPNet = BPNet;
//# sourceMappingURL=BPNet.js.map