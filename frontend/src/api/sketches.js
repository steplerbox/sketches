import axios from 'axios'

export const getSketches = () => {
  return axios('/api/sketches').then(response => {
    return response.data
  })
}

export const getSketch = sketchId => {
  return axios(`/api/sketches/${sketchId}`).then(response => {
    return response.data
  })
}

export const createSketch = sketchData => {
  return axios.post(`/api/sketches`, sketchData).then(response => {
    return response.data
  })
}

export const updateSketch = sketchData => {
  return axios.put(`/api/sketches/${sketchData.id}`, { ...sketchData, id: undefined }).then(response => {
    return response.data
  })
}

export const deleteSketch = sketchId => {
  return axios.delete(`/api/sketches/${sketchId}`).then(response => {
    return response.data
  })
}
