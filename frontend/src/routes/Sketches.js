import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { deleteSketch, getSketches } from '../api/sketches'

class Sketches extends Component {
  state = {
    isLoading: true,
    sketches: []
  }

  componentDidMount() {
    getSketches().then(sketches => {
      this.setState({
        isLoading: false,
        sketches
      })
    })
  }

  handleDeleteSketch = sketch => () => {
    if (window.confirm(`Do you want to delete ${sketch.name}`)) {
      deleteSketch(sketch.id).then(() => {
        this.setState({
          sketches: this.state.sketches.filter(s => s.id !== sketch.id)
        })
      })
    }
  }

  render() {
    const { isLoading, sketches } = this.state
    const { match } = this.props

    if (isLoading) {
      return <div>Loading ...</div>
    }

    return (
      <div>
        <div>Please select a sketch or <Link to={`${match.path}/new`}>create a new one.</Link></div>
        <ul>
          {sketches.map(sketch => (
            <li key={sketch.id}>
              <Link to={`${match.path}/${sketch.id}`}>{sketch.name}</Link>
              <button onClick={this.handleDeleteSketch(sketch)}>delete</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export const SketchesRoute = withRouter(Sketches)
