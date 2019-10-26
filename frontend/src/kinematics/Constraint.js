import {Vector} from './Vector';

export class Constraint {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.length = p1.pos.distance(p2.pos);
    this.stretch = this.length * 0.15;
  }

  resolve = () => {
    const dists  = Vector.sub(this.p2.pos, this.p1.pos);
    const length = dists.length();
    const diff = length - this.length;

    dists.normalize();

    const f = dists.mul(diff * 0.5);

    this.p1.move(f);
    this.p2.move(f.neg());
  };

  draw = (ctx, stress) => {
    if(stress) {
      var diff = this.length - this.p1.pos.distance(this.p2.pos);
      var per = Math.round(Math.min(Math.abs(diff / this.stretch), 1) * 255);
      ctx.strokeStyle = 'rgba(255, '+(255 - per)+', '+(255 - per)+', 0.8)';
    } else {
      ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    }

    ctx.beginPath();
    ctx.moveTo(this.p1.pos.x, this.p1.pos.y);
    ctx.lineTo(this.p2.pos.x, this.p2.pos.y);
    ctx.stroke();
  }
}
