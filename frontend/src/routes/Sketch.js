import React, { Component } from 'react'
import { withRouter, generatePath } from 'react-router-dom'

import { createSketch, getSketch, updateSketch } from '../api/sketches'
import { Canvas } from '../components/Canvas'

export class Sketch extends Component {
  state = {
    isLoading: true,
    sketch: null
  }

  componentDidMount() {
    const { match: { params: { sketchId } } } = this.props

    if (sketchId === 'new') {
      this.setState({ isLoading: false, sketch: {} })
    } else {
      getSketch(sketchId).then(sketch => {
        this.setState({ isLoading: false, sketch })
      })
    }
  }

  handleSaveSketch = () => {
    const { match: { params: { sketchId } } } = this.props

    if (sketchId === 'new') {
      createSketch(this.state.sketch).then(data => {
        const path = generatePath(this.props.match.path, { sketchId: data.id })
        this.props.history.replace(path)
        this.setState({ sketch: data })
      })
    } else {
      updateSketch(this.state.sketch)
    }
  }

  handleSketchChange = sketch => {
    this.setState({ sketch })
  }

  render() {
    const { isLoading, sketch } = this.state

    if (isLoading) {
      return <div>Loading ...</div>
    }

    return (
      <div>
        <button onClick={this.handleSaveSketch}>SAVE</button>
        <Canvas sketch={sketch} onSketchChange={this.handleSketchChange}/>
      </div>
    )
  }
}

export const SketchRoute = withRouter(Sketch)
