import {getAllStoresUrl} from './urls';
import axios from 'axios';

interface Location {
  lat: number;
  long: number;
}

export const getAllStores = (data?: Location) => {
  let url = getAllStoresUrl();
  if (data) {
    const {lat, long} = data;
    url += `?lat=${lat}&long=${long}`;
  }

  return axios.get(url);
};
