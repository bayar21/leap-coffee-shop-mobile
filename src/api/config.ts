import axios from 'axios';
import {getConfigUrl} from './urls';

export const getConfig = (name: string) => {
  const url = getConfigUrl();
  return axios.get(url + name);
};
