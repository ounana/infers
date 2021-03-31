"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Optimize = void 0;
class Optimize {
    cost(hy, ys) {
        let m = ys.shape[0];
        let sub = hy[hy.length - 1].subtraction(ys).atomicOperation(item => item ** 2).columnSum();
        let tmp = sub.getRow(0).map(v => (1 / (2 * m)) * v);
        return tmp.reduce((p, c) => p + c) / tmp.length;
    }
    crossCost(hy, ys) {
        let m = ys.shape[0];
        let t = hy[hy.length - 1].atomicOperation((h, i, j) => {
            let y = ys.get(i, j);
            return y === 1 ? -Math.log(h) : -Math.log(1 - h);
        }).columnSum();
        let tmp = t.getRow(0).map(v => (1 / m) * v);
        return tmp.reduce((p, c) => p + c) / tmp.length;
    }
    momentum(xs, ys) { }
    adaGrad(xs, ys) { }
    adaDelta(xs, ys) { }
}
exports.Optimize = Optimize;
//# sourceMappingURL=Optimize.js.map