import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import { Home } from './routes/Home'
import { SketchesRoute } from './routes/Sketches'
import { SketchRoute } from './routes/Sketch'

export class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/sketches'>Sketches</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route exact path='/sketches'>
              <SketchesRoute/>
            </Route>
            <Route path='/sketches/:sketchId'>
              <SketchRoute/>
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}
