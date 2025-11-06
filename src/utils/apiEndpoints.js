export const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUNDINARY_CLOUD_NAME;

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/login`,
  REGISTER: `${BASE_URL}/register`,
  status: `${BASE_URL}/status`,
  activate: `${BASE_URL}/activate`,
  health: `${BASE_URL}/health`,
  UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};
