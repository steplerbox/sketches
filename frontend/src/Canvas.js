import React, { Component, createRef } from 'react'

import { CanvasController } from './kinematics/CanvasController'

export class Canvas extends Component {
  canvasRef = createRef()

  componentDidMount() {
    this.canvasController = new CanvasController({
      canvas: this.canvasRef.current,
      ...this.props
    })

    this.canvasRef.current.addEventListener('mousemove', this.canvasController.updateMousePosition)
  }

  componentWillUnmount() {
    this.canvasController.dispose()
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
      />
    )
  }
}
