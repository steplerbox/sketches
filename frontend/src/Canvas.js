import React, { Component, createRef } from 'react'

import { CanvasController } from './kinematics/CanvasController'

export class Canvas extends Component {
  canvasRef = createRef()

  componentDidMount() {
    this.canvasController = new CanvasController({
      canvas: this.canvasRef.current,
      ...this.props
    })
  }

  componentWillUnmount() {
    this.canvasController.dispose()
  }

  handleMouseClick = e => {
    const rect = this.canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (!this.props.play) {
      this.canvasController.select(x, y)
    }
  }

  handleMouseMove = e => {
    const rect = this.canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    this.canvasController.updateMousePosition(x, y)
  }

  handleContextMenu = e => {
    e.preventDefault()
  }

  render() {
    if (this.canvasController) {
      this.canvasController.updateProps(this.props)
    }

    return (
      <canvas
        style={{ background: '#7094B8' }}
        ref={this.canvasRef}
        width={1000}
        height={800}
        onMouseMove={this.handleMouseMove}
        onMouseDown={this.handleMouseClick}
        onContextMenu={this.handleContextMenu}
      />
    )
  }
}
