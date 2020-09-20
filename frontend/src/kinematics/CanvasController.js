import { Kinematics, parseSketchData } from './Kinematics'
import { Vector } from './Vector'
import { Constraint } from './Constraint'
import { Node } from './Node'

export class CanvasController {
  constructor({ sketch, canvas, nodeSize, showStress, gravity }) {
    this.canvas = canvas
    this.ctx = canvas ? canvas.getContext('2d') : undefined
    this.nodeSize = nodeSize || 3
    this.showStress = showStress || false
    this.play = false
    this.mouse = new Vector()
    this.selectedNode = null
    this.isCreatingConstraint = false

    this.kinematics = new Kinematics({
      width: canvas ? canvas.width : 0,
      height: canvas ? canvas.height : 0,
      gravity: gravity
    }, parseSketchData(sketch))

    this.draw()
    this.loop()
  }

  get gravity() {
    return this.kinematics.gravity
  }

  set gravity(gravity) {
    this.kinematics.gravity = gravity
  }

  get sketchData() {
    const nodes = this.kinematics.nodes.map(n => ({
      id: n.id,
      x: n.pos.x,
      y: n.pos.y,
      fixed: n.fixed,
      force: { x: n.acc.x, y: n.acc.y }
    }))

    const constraints = this.kinematics.constraints.map(c => ({
      n1: c.n1.id,
      n2: c.n2.id,
      id: c.id
    }))

    return { nodes, constraints }
  }

  loop = () => {
    if (this.play) {
      this.kinematics.update(16)
    }
    this.draw()
    this.requestId = window.requestAnimationFrame(this.loop)
  }

  dispose = () => {
    window.cancelAnimationFrame(this.requestId)
  }

  addNode = (x, y) => {
    this.kinematics.addNode({ x, y })
  }

  removeNode = (x, y) => {
    const node = this.getClosestNode(x, y)
    if (node) {
      this.kinematics.removeNode(node)
    }
  }

  toggleNodeFix = (x, y) => {
    const node = this.getClosestNode(x, y)
    if (node) {
      this.kinematics.toggleNodeFix(node)
    }
  }

  selectNode = (x, y) => {
    this.selectedNode = this.getClosestNode(x, y)
  }

  dragNode = (x, y) => {

  }

  addConstraint = (x, y) => {
    if (!this.isCreatingConstraint) {
      this.isCreatingConstraint = true
      this.selectedNode = this.getClosestNode(x, y) || this.kinematics.addNode({ x, y })
    } else {
      const endNode = this.getClosestNode(x, y) || this.kinematics.addNode({ x, y })
      this.kinematics.addConstraint(this.selectedNode, endNode)
      this.selectedNode = null
      this.isCreatingConstraint = false
    }
  }

  updateMousePosition = (x, y) => {
    this.mouse.x = x
    this.mouse.y = y
  }

  getClosestNode = () => {
    return this.kinematics.nodes.find(node => node.pos.distance(this.mouse) < 10)
  }

  draw = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.drawBackground()

    this.kinematics.constraints.forEach(constraint => this.drawConstraint(constraint))
    this.kinematics.nodes.forEach(node => this.drawNode(node))

    if (this.isCreatingConstraint) {
      this.drawConstraint(new Constraint(this.selectedNode, new Node(this.mouse)))
    }
  }

  drawBackground = () => {
    this.ctx.save()

    this.ctx.strokeStyle = 'rgba(255,255,255,0.2)'
    this.ctx.lineWidth = 0.5

    for (let i = 1; i < this.canvas.height / 50; i++) {
      this.ctx.beginPath()
      this.ctx.moveTo(0, 50 * i + 0.5)
      this.ctx.lineTo(this.canvas.width, 50 * i + 0.5)
      this.ctx.stroke()
    }

    for (let i = 1; i < this.canvas.width / 50; i++) {
      this.ctx.beginPath()
      this.ctx.moveTo(50 * i + 0.5, 0)
      this.ctx.lineTo(50 * i + 0.5, this.canvas.height)
      this.ctx.stroke()
    }

    this.ctx.restore()
  }

  drawNode = (node) => {
    if (node.fixed) {
      this.ctx.fillStyle = 'rgba(255,255,255,0.2)'
      this.ctx.beginPath()
      this.ctx.arc(node.pos.x, node.pos.y, this.nodeSize * 3, 0, Math.PI * 2, false)
      this.ctx.fill()
    }

    if (node.id === this.selectedNode?.id) {
      this.ctx.strokeStyle = 'rgba(255,0,0,0.5)'
      this.ctx.beginPath()
      this.ctx.arc(node.pos.x, node.pos.y, this.nodeSize * 3, 0, Math.PI * 2, false)
      this.ctx.stroke()
    }

    this.ctx.fillStyle = node.fixed ? '#EDEA26' : '#AAAAAA'
    this.ctx.beginPath()
    this.ctx.arc(node.pos.x, node.pos.y, this.nodeSize, 0, Math.PI * 2, false)
    this.ctx.fill()
  }

  drawConstraint = constraint => {
    if (this.showStress) {
      const diff = constraint.length - constraint.n1.pos.distance(constraint.n2.pos)
      const per = Math.round(Math.min(Math.abs(diff / constraint.stretch), 1) * 255)
      this.ctx.strokeStyle = 'rgba(255, ' + (255 - per) + ', ' + (255 - per) + ', 0.8)'
    } else {
      this.ctx.strokeStyle = 'rgba(255,255,255,0.8)'
    }

    this.ctx.beginPath()
    this.ctx.moveTo(constraint.n1.pos.x, constraint.n1.pos.y)
    this.ctx.lineTo(constraint.n2.pos.x, constraint.n2.pos.y)
    this.ctx.stroke()
  }
}
