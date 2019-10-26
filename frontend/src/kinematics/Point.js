import { Vector } from './Vector';

export class Point {
  constructor({id, x, y, fixed}) {
    this.id = id;
    this.pos = new Vector(x, y);
    this.pre = new Vector(x, y);
    this.acc = new Vector();

    this.fixed = fixed;
  };

  move = v => {
    if (this.fixed) {
      return;
    }

    this.pos.add(v);
  };

  addForce = v => {
    if (this.fixed) {
      return;
    }

    this.acc.add(v);
  };

  update = delta => {
    if (this.fixed) {
      return;
    }

    const x = this.pos.x;
    const y = this.pos.y;

    this.acc.mul(delta * delta);

    this.pos.x += x - this.pre.x + this.acc.x / 2;
    this.pos.y += y - this.pre.y + this.acc.y / 2;

    this.acc.reset();

    this.pre.x = x;
    this.pre.y = y;
  };

  checkWalls = (x, y, w, h) => {
    this.pos.x = Math.max(x + 1, Math.min(w - 1, this.pos.x));
    this.pos.y = Math.max(y + 1, Math.min(h - 1, this.pos.y));

    if (this.pos.y >= h - 1) {
      this.pos.x -= (this.pos.x - this.pre.x + this.acc.x);
    }
  };

  draw = function(ctx, size, color) {
    if(this.fixed) {
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, size * 3, 0, Math.PI * 2, false);
      ctx.fill();
    }

    ctx.fillStyle = color ? color : ((this.fixed) ? '#EDEA26' : '#aaa');
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, size, 0, Math.PI * 2, false);
    ctx.fill();
  };
}
