
export class KinematicsEngine {
  constructor(params, initialData) {
    this.constraints = initialData.constraints || [];
    this.points = initialData.points || [];

    this.width = params.width;
    this.height = params.height;
    this.gravity = params.gravity;
  }

  update = (iterations = 6) => {
    const delta = 1 / iterations;

    let n = iterations;
    while(n--) {
      this.points.forEach(point => {
        point.addForce(this.gravity);
        point.update(delta);
        point.checkWalls(0, 0, this.width, this.height);
      });

      this.constraints.forEach(constraint => constraint.resolve());
    }
  };
}
