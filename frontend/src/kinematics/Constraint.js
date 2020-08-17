import { Vector } from './Vector'

export class Constraint {
  constructor(n1, n2) {
    this.n1 = n1
    this.n2 = n2
    this.length = n1.pos.distance(n2.pos)
    this.stretch = this.length * 0.15
  }

  resolve = () => {
    const dists = Vector.sub(this.n2.pos, this.n1.pos)
    const length = dists.length()
    const diff = length - this.length

    dists.normalize()

    const f = dists.mul(diff * 0.5)

    this.n1.move(f)
    this.n2.move(f.neg())
  }
}
