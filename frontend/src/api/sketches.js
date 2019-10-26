import axios from 'axios';

export const getSketches = () => {
  return axios('/api/sketches').then(response => {
    return response.data;
  });
};

export const getSketch = sketchId => {
  return axios(`/api/sketches/${sketchId}`).then(response => {
    return response.data;
  });
};




