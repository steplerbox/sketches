
export class Vector {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  sub = v => {
    if (v.x != null && v.y != null) {
      this.x -= v.x;
      this.y -= v.y;
    } else {
      this.x -= v;
      this.y -= v;
    }

    return this;
  };

  add = v => {
    if (v.x != null && v.y != null) {
      this.x += v.x;
      this.y += v.y;
    } else {
      this.x += v;
      this.y += v;
    }

    return this;
  };

  mul = v => {
    if (v.x != null && v.y != null) {
      this.x *= v.x;
      this.y *= v.y;
    } else {
      this.x *= v;
      this.y *= v;
    }

    return this;
  };

  div = v => {
    if (v.x != null && v.y != null) {
      this.x /= v.x;
      this.y /= v.y;
    } else {
      this.x /= v;
      this.y /= v;
    }

    return this;
  };

  normalize = () => {
    const length = this.length();

    if (length > 0) {
      this.x /= length;
      this.y /= length;
    }

    return this;
  };

  length = () => {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };

  distance = v => {
    const x = this.x - v.x;
    const y = this.y - v.y;

    return Math.sqrt(x * x + y * y);
  };

  reset = () => {
    this.x = 0;
    this.y = 0;

    return this;
  };

  neg = () => {
    this.x *= -1;
    this.y *= -1;

    return this;
  };


  static add = (v1, v2) => {
    if (v2.x != null && v2.y != null) {
      return new Vector(v1.x + v2.x, v1.y + v2.y);
    } else {
      return new Vector(v1.x + v2, v1.y + v2);
    }
  };

  static sub = (v1, v2) => {
    if (v2.x != null && v2.y != null) {
      return new Vector(v1.x - v2.x, v1.y - v2.y);
    } else {
      return new Vector(v1.x - v2, v1.y - v2);
    }
  };

  static mul = (v1, v2) => {
    if (v2.x != null && v2.y != null) {
      return new Vector(v1.x * v2.x, v1.y * v2.y);
    } else {
      return new Vector(v1.x * v2, v1.y * v2);
    }
  };

  static div = (v1, v2) => {
    if (v2.x != null && v2.y != null) {
      return new Vector(v1.x / v2.x, v1.y / v2.y);
    } else {
      return new Vector(v1.x / v2, v1.y / v2);
    }
  };
}