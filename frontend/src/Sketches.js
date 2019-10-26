import React, {Component} from 'react';

import {Switch, Route, Link, withRouter} from 'react-router-dom';

import {SketchRoute} from './Sketch';

import {getSketches} from './api/sketches';

class Sketches extends Component {
  state = {
    isLoading: true,
    sketches: []
  };

  componentDidMount() {
    getSketches().then(sketches => {
      this.setState({
        isLoading: false,
        sketches
      });
    });
  }

  render() {
    const {isLoading, sketches} = this.state;
    const {match} = this.props;

    if (isLoading) {
      return <div>Loading ...</div>;
    }

    return (
      <div>
        <Switch>
          <Route path={`${match.path}/:sketchId`}>
            <SketchRoute />
          </Route>
          <Route path={match.path}>
            <div>Please select a sketch.</div>
            <ul>
              {sketches.map(sketch => (
                <li key={sketch._id}>
                  <Link to={`${match.path}/${sketch._id}`}>{sketch.name}</Link>
                </li>
              ))}
            </ul>
          </Route>
        </Switch>
      </div>
    );
  }
}

export const SketchesRoute = withRouter(Sketches);
