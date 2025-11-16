import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL ?? ""

export const globalInstance = axios.create({
  baseURL: baseUrl,
  timeout:  10000,
});
