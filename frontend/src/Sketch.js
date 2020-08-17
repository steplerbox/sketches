import React, {Component} from 'react';

import {withRouter} from 'react-router-dom';

import {Canvas} from './Canvas';
import {getSketch} from './api/sketches';

export class Sketch extends Component {
  state = {
    isLoading: true,
    sketch: undefined
  };

  componentDidMount() {
    const {match: {params: {sketchId}}} = this.props;

    getSketch(sketchId).then(sketch => {
      this.setState({
        isLoading: false,
        sketch
      })
    });
  }

  render() {
    const {isLoading, sketch} = this.state;

    if (isLoading) {
      return <div>Loading ...</div>;
    }

    return (
      <Canvas sketch={sketch}/>
    );
  }
}

export const SketchRoute = withRouter(Sketch);
