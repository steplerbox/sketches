import React, { Component, createRef } from 'react'

import { Kinematics } from './kinematics/Kinematics'
import { Vector } from './kinematics/Vector'
import { Node } from './kinematics/Node'
import { Constraint } from './kinematics/Constraint'

const parseSketch = sketch => {
  const nodes = sketch.nodes.map(nodeData => {
    const node = new Node(nodeData)

    if (nodeData.force) {
      node.addForce(new Vector(nodeData.force.x, nodeData.force.y))
    }

    return node
  })

  return {
    nodes,
    constraints: sketch.constraints.map(constraint => {
      const n1 = nodes.find(node => node.id === constraint.n1)
      const n2 = nodes.find(node => node.id === constraint.n2)

      if (!n1 || !n2) {
        console.error('node not found')
      }

      return new Constraint(n1, n2)
    })
  }
}

export class Canvas extends Component {
  canvasRef = createRef()

  constructor() {
    super()

    this.nodeSize = 3
    this.showStress = true
  }

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current
    this.ctx = this.canvas.getContext('2d')

    this.kinematics = new Kinematics({
      width: this.canvas.width,
      height: this.canvas.height,
      gravity: new Vector(0, 0.98)
    }, parseSketch(this.props.sketch))

    const loop = () => {
      this.kinematics.update(16)
      this.draw()
      window.requestAnimationFrame(loop)
    }

    loop()
  }

  draw = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.drawBackground()
    this.drawObjects()
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

  drawObjects = () => {
    this.kinematics.constraints.forEach(constraint => this.drawConstraint(constraint))
    this.kinematics.nodes.forEach(node => this.drawNode(node))
  }

  drawNode = (node) => {
    if (node.fixed) {
      this.ctx.fillStyle = 'rgba(255,255,255,0.2)'
      this.ctx.beginPath()
      this.ctx.arc(node.pos.x, node.pos.y, this.nodeSize * 3, 0, Math.PI * 2, false)
      this.ctx.fill()
    }

    this.ctx.fillStyle = node.fixed ? '#EDEA26' : '#AAAAAA'
    this.ctx.beginPath()
    this.ctx.arc(node.pos.x, node.pos.y, this.nodeSize, 0, Math.PI * 2, false)
    this.ctx.fill()
  }

  drawConstraint = constraint => {
    if (this.showStress) {
      var diff = constraint.length - constraint.n1.pos.distance(constraint.n2.pos)
      var per = Math.round(Math.min(Math.abs(diff / constraint.stretch), 1) * 255)
      this.ctx.strokeStyle = 'rgba(255, ' + (255 - per) + ', ' + (255 - per) + ', 0.8)'
    } else {
      this.ctx.strokeStyle = 'rgba(255,255,255,0.8)'
    }

    this.ctx.beginPath()
    this.ctx.moveTo(constraint.n1.pos.x, constraint.n1.pos.y)
    this.ctx.lineTo(constraint.n2.pos.x, constraint.n2.pos.y)
    this.ctx.stroke()
  }

  render() {
    return (
      <canvas
        style={{ background: '#7094B8' }}
        ref={this.canvasRef}
        width={1000}
        height={800}
      />
    )
  }
}
