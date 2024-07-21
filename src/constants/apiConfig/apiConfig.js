
import axios from 'axios';
import { BASE_URL } from './api.constant';

export const apiConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

const GET = (url, params) => {
  return apiConfig.get(url, { params });
};

const POST = (url, data) => {
  return apiConfig.post(url, data);
};

const PUT = (url, data) => {
  return apiConfig.put(url, data);
};

const DELETE = (url, data) => {
  return apiConfig.delete(url, data);
};
const PATCH = (url, data) => {
  return apiConfig.patch(url, data);
};

export const API = {
  GET,
  POST,
  PUT,
  DELETE,
  PATCH,
};
