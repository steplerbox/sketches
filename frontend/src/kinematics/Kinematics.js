export class Kinematics {
  constructor(params, initialData) {
    this.constraints = initialData.constraints || []
    this.nodes = initialData.nodes || []

    this.width = params.width
    this.height = params.height
    this.gravity = params.gravity
  }

  update = (iterations = 6) => {
    const delta = 1 / iterations

    let n = iterations
    while (n--) {
      this.nodes.forEach(node => {
        node.addForce(this.gravity)
        node.update(delta)
        node.checkWalls(0, 0, this.width, this.height)
      })

      this.constraints.forEach(constraint => constraint.resolve())
    }
  }
}
