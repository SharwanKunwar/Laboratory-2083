import axios from "axios";

const API_URL = "http://localhost:8080/api/cars";

export const getAllCars = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

export const getCarById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};