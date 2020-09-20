import React, { Component, createRef } from 'react'

import { Vector } from '../kinematics/Vector'
import { CanvasController } from '../kinematics/CanvasController'

const ToolTypes = {
  addNode: 'addNode',
  removeNode: 'removeNode',
  toggleNodeFix: 'toggleNodeFix',
  addConstraint: 'addConstraint',
  selectNode: 'selectNode'
}

export class Canvas extends Component {
  canvasRef = createRef()
  state = {
    play: false,
    showStress: true,
    nodeSize: 3,
    gravity: new Vector(0, 1),
    tool: ToolTypes.selectNode,
    name: null
  }

  componentDidMount() {
    this.canvasController = new CanvasController({
      canvas: this.canvasRef.current,
      sketch: this.props.sketch,
      play: this.state.play,
      showStress: this.state.showStress,
      nodeSize: this.state.nodeSize,
      gravity: this.state.gravity
    })

    this.setState({ name: this.props.sketch.name })
  }

  componentWillUnmount() {
    if (this.canvasController) {
      this.canvasController.dispose()
    }
  }

  handleTogglePlayback = () => {
    this.canvasController.play = !this.canvasController.play
    this.setState({ play: this.canvasController.play })
  }

  handleGravityChange = axis => e => {
    this.canvasController.gravity[axis] = Number(e.target.value)
    this.setState({ gravity: this.canvasController.gravity })
  }

  handleToolChange = toolType => () => {
    this.setState({ tool: this.state.tool === toolType ? ToolTypes.selectNode : toolType })
  }

  handleMouseClick = e => {
    const rect = this.canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    switch (this.state.tool) {
      case ToolTypes.addNode:
        this.canvasController.addNode(x, y)
        break
      case ToolTypes.removeNode:
        this.canvasController.removeNode(x, y)
        break
      case ToolTypes.toggleNodeFix:
        this.canvasController.toggleNodeFix(x, y)
        break
      case ToolTypes.addConstraint:
        this.canvasController.addConstraint(x, y)
        break
      default:
        this.canvasController.selectNode(x, y)
        break
    }

    this.handleSketchChange()
  }

  handleMouseMove = e => {
    const rect = this.canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (this.canvasController) {
      this.canvasController.updateMousePosition(x, y)
    }
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value })
    this.props.onSketchChange({ ...this.canvasController.sketchData, name: e.target.value, id: this.props.sketch.id })
  }

  handleSketchChange = () => {
    this.props.onSketchChange({ ...this.canvasController.sketchData, name: this.state.name, id: this.props.sketch.id })
  }

  handleContextMenu = e => {
    e.preventDefault()
  }

  render() {
    return (
      <>
        <div>
          <input
            name='name'
            placeholder='name'
            value={this.state.name || ''}
            onChange={this.handleNameChange}
          />
        </div>
        <div>
          <label htmlFor='gX'>Gravity X</label>
          <input
            type='number'
            name='gX'
            value={this.state.gravity.x}
            onChange={this.handleGravityChange('x')}
          />
          <label htmlFor='gY'>Gravity Y</label>
          <input
            type='number'
            name='gY'
            value={this.state.gravity.y}
            onChange={this.handleGravityChange('y')}
          />
        </div>
        <div>
          <button onClick={this.handleTogglePlayback}>{this.state.play ? 'stop' : 'play'}</button>
          <button onClick={this.handleToolChange(ToolTypes.addNode)}>
            {this.state.tool === ToolTypes.addNode ? 'add node: ON' : 'add node: OFF'}
          </button>
          <button onClick={this.handleToolChange(ToolTypes.removeNode)}>
            {this.state.tool === ToolTypes.removeNode ? 'remove node: ON' : 'remove node: OFF'}
          </button>
          <button onClick={this.handleToolChange(ToolTypes.toggleNodeFix)}>
            {this.state.tool === ToolTypes.toggleNodeFix ? 'toggle fix: ON' : 'toggle fix: OFF'}
          </button>
          <button onClick={this.handleToolChange(ToolTypes.addConstraint)}>
            {this.state.tool === ToolTypes.addConstraint ? 'add constraint: ON' : 'add constraint: OFF'}
          </button>
        </div>
        <canvas
          style={{ background: '#7094B8' }}
          ref={this.canvasRef}
          width={1000}
          height={800}
          onMouseMove={this.handleMouseMove}
          onMouseDown={this.handleMouseClick}
          onContextMenu={this.handleContextMenu}
        />
      </>
    )
  }
}
