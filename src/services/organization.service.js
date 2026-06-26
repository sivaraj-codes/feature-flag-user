import { api } from "../lib/axiosInstance.js";
import axios from "axios";

export const getOrganizations = async () => {
  const { data } = await api.get("/organizations");
  return data.data;
};

export const getPublicOrganizations = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/organizations/public`,
  );
  return data.data;
};

export const createOrganization = async (payload) => {
  const { data } = await api.post("/organizations", payload);
  return data.data;
};

export const updateOrganization = async ({ id, payload }) => {
  const { data } = await api.put(`/organizations/${id}`, payload);
  return data.data;
};
