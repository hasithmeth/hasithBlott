import { API_KEY } from '@env';
import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://finnhub.io/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    ' X-Finnhub-Token': API_KEY,
  },
});

export default { instance };
