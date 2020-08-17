export const getSketches = () => {
  return Promise.resolve([
    { id: 1, name: 'test 1' },
    { id: 2, name: 'test 2' }
  ])

  // return axios('/api/sketches').then(response => {
  //   return response.data;
  // });
}

export const getSketch = sketchId => {
  return Promise.resolve({
    id: 1,
    name: 'test 1',
    nodes: [
      { id: 1, x: 500, y: 500, fixed: true },
      { id: 2, x: 600, y: 600 }
    ],
    constraints: [
      { id: 1, n1: 1, n2: 2 }
    ]
  })

  // return axios(`/api/sketches/${sketchId}`).then(response => {
  //   return response.data;
  // });
}
