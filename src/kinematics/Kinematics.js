import React, {createRef, Component} from 'react';

import {KinematicsEngine} from './KinematicsEngine';
import {Vector} from './Vector';
import {Point} from "./Point";
import {Constraint} from "./Constraint";

const parseSketch = ({data}) => {
  const points = data.points.map(pointData => {
    const point = new Point(pointData);

    if (pointData.force) {
      point.addForce(new Vector(pointData.force.x, pointData.force.y));
    }

    return point;
  });

  return {
    points,
    constraints: data.constraints.map(constraint => {
      const p1 = points.find(point => point.id === constraint.p1);
      const p2 = points.find(point => point.id === constraint.p2);

      if (!p1 || !p2) {
        console.error('point not found');
      }

      return new Constraint(p1, p2);
    })
  }
};

export class Kinematics extends Component {
  canvasRef = createRef();

  constructor() {
    super();

    this.pointSize = 3;
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext('2d');

    this.kinematics = new KinematicsEngine( {
      width: this.canvas.width,
      height: this.canvas.height,
      gravity: new Vector(0, 0.98)
    }, parseSketch(this.props.sketch));

    const loop = () => {
      this.kinematics.update(16);
      this.draw();
      window.requestAnimationFrame(loop);
    };

    loop();
  }

  draw = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawBackground();
    this.drawObjects();
  };

  drawBackground = () => {
    this.ctx.save();

    this.ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    this.ctx.lineWidth = 0.5;

    for (let i = 1; i < this.canvas.height/50; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, 50*i + 0.5);
      this.ctx.lineTo(this.canvas.width, 50*i + 0.5);
      this.ctx.stroke();
    }

    for (let i = 1; i < this.canvas.width/50; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(50*i + 0.5, 0);
      this.ctx.lineTo(50*i + 0.5, this.canvas.height);
      this.ctx.stroke();
    }

    this.ctx.restore();
  };

  drawObjects = () => {
    this.kinematics.constraints.forEach(constraint => constraint.draw(this.ctx, this.pointSize));
    this.kinematics.points.forEach(point => point.draw(this.ctx, this.pointSize));
  };

  render() {
    return (
      <canvas
        style={{ background: '#7094B8' }}
        ref={this.canvasRef}
        width={1000}
        height={800}
      />
    );
  }
}