
const sketchesData = [
  {
    id: '1',
    name: 'Some sketch',
    data: {
      points: [
        {id: 0, x: 450, y: 150, fixed: true},
        {id: 1, x: 450, y: 250, fixed: true},
        {id: 2, x: 450, y: 350, fixed: false},
        {id: 3, x: 400, y: 400, fixed: false},
        {id: 4, x: 500, y: 400, fixed: false},
        {id: 5, x: 450, y: 450, fixed: false, force: {x: 250, y: 0}}
      ],
      constraints: [
        {p1: 0, p2: 3},
        {p1: 0, p2: 4},
        {p1: 1, p2: 2},
        {p1: 2, p2: 3},
        {p1: 2, p2: 4},
        {p1: 3, p2: 5},
        {p1: 4, p2: 5}
      ]
    }
  },
  {
    id: '2',
    name: 'Empty sketch',
    data: {
      points: [],
      constraints: []
    }
  },
  {
    id: '3',
    name: 'Empty sketch 2',
    data: {
      points: [],
      constraints: []
    }
  }
];

export const getSketches = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(sketchesData), 1000);
  });
};

export const getSketch = sketchId => {
  const sketch = sketchesData.find(sketch => sketch.id === sketchId);

  if (!sketch) {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject('not found'), 1000);
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(sketch), 1000);
  });
};




