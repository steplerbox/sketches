import { Vector } from './Vector'

export class Node {
  constructor({ id, x, y, fixed }) {
    this.id = id
    this.pos = new Vector(x, y)
    this.pre = new Vector(x, y)
    this.acc = new Vector()

    this.fixed = fixed
  }

  toggleFix = () => {
    this.fixed = !this.fixed
  }

  move = v => {
    if (this.fixed) {
      return
    }

    this.pos.add(v)
  }

  addForce = v => {
    if (this.fixed) {
      return
    }

    this.acc.add(v)
  }

  update = delta => {
    if (this.fixed) {
      return
    }

    const x = this.pos.x
    const y = this.pos.y

    this.acc.mul(delta * delta)

    this.pos.x += x - this.pre.x + this.acc.x / 2
    this.pos.y += y - this.pre.y + this.acc.y / 2

    this.acc.reset()

    this.pre.x = x
    this.pre.y = y
  }

  checkWalls = (x, y, w, h) => {
    this.pos.x = Math.max(x + 1, Math.min(w - 1, this.pos.x))
    this.pos.y = Math.max(y + 1, Math.min(h - 1, this.pos.y))

    if (this.pos.y >= h - 1) {
      this.pos.x -= (this.pos.x - this.pre.x + this.acc.x)
    }
  }
}
