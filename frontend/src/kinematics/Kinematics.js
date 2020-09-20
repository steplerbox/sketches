import { Node } from './Node'
import { uuid } from '../utils'
import { Constraint } from './Constraint'
import { Vector } from './Vector'

export const parseSketchData = sketch => {
  const nodes = sketch.nodes?.map(nodeData => {
    const node = new Node(nodeData)

    if (nodeData.force) {
      node.addForce(new Vector(nodeData.force.x, nodeData.force.y))
    }

    return node
  })

  const constraints = sketch.constraints?.reduce((constraints, constraintData) => {
    const n1 = nodes.find(node => node.id === constraintData.n1)
    const n2 = nodes.find(node => node.id === constraintData.n2)

    if (!n1 || !n2) {
      console.error('Node not found, Constraint will not be created')
      return constraints
    }

    constraints.push(new Constraint(n1, n2))
    return constraints
  }, [])

  return {
    nodes: nodes || [],
    constraints: constraints || []
  }
}

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

  addNode = ({ x, y, fixed }) => {
    const node = new Node({ id: uuid(), x, y, fixed })
    this.nodes.push(node)
    return node
  }

  removeNode = node => {
    this.constraints = this.constraints.filter(c => (c.n1.id !== node.id && c.n2.id !== node.id))
    this.nodes = this.nodes.filter(n => n.id !== node.id)
  }

  toggleNodeFix = node => {
    this.nodes.find(n => n.id === node.id)?.toggleFix()
  }

  addConstraint = (n1, n2) => {
    const constraint = new Constraint(n1, n2)
    this.constraints.push(constraint)
    return constraint
  }
}
