import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'

import { Vector } from './kinematics/Vector'
import { Canvas } from './Canvas'
import { getSketch } from './api/sketches'

export class Sketch extends Component {
  state = {
    isLoading: true,
    sketch: undefined,
    play: false,
    showStress: true,
    nodeSize: 3,
    gravity: new Vector(0, 0.98),
    tool: 'add'
  }
  const

  componentDidMount() {
    const { match: { params: { sketchId } } } = this.props

    getSketch(sketchId).then(sketch => {
      this.setState({
        isLoading: false,
        sketch
      })
    })
  }

  handleTogglePlayback = () => {
    this.setState({ play: !this.state.play })
  }

  handleGravityXChange = e => {
    this.setState({ gravity: new Vector(Number(e.target.value), this.state.gravity.y) })
  }

  handleGravityYChange = e => {
    this.setState({ gravity: new Vector(this.state.gravity.x, Number(e.target.value)) })
  }

  handleAddNode = () => {
    this.setState({ tool: 'add' })
  }

  handleRemoveNode = () => {
    this.setState({ tool: 'remove' })
  }

  render() {
    const { isLoading, sketch } = this.state

    if (isLoading) {
      return <div>Loading ...</div>
    }

    return (
      <>
        <div>
          <label htmlFor='gX'>Gravity X</label>
          <input type='number' name='gX' value={this.state.gravity.x} onChange={this.handleGravityXChange}/>
          <label htmlFor='gY'>Gravity Y</label>
          <input type='number' name='gY' value={this.state.gravity.y} onChange={this.handleGravityYChange}/>
        </div>
        <div>
          <button onClick={this.handleTogglePlayback}>{this.state.play ? 'stop' : 'play'}</button>
          <button onClick={this.handleAddNode}>add node</button>
          <button onClick={this.handleRemoveNode}>remove node</button>
        </div>
        <Canvas
          sketch={sketch}
          play={this.state.play}
          nodeSize={this.state.nodeSize}
          showStress={this.state.showStress}
          gravity={this.state.gravity}
        />
      </>
    )
  }
}

export const SketchRoute = withRouter(Sketch)
