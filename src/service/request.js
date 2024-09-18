import axios from "axios";
const baseURL = '/api';
const timeout = 5000;
export const instance = axios.create({baseURL,timeout});