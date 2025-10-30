import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "https://smartlostandfound-backend.onrender.com"

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
})

export const multipartClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: false,
})
