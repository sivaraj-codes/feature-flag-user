import { api } from "../lib/axiosInstance.js";
import axios from "axios";

export const getOrgFlags = async () => {
  const { data } = await api.get("/flags");
  return data.data;
};

export const checkOrgFlag = async (key) => {
  const { data } = await api.get("/flags/check", { params: { key } });
  return data.data;
};

export const createOrgFlag = async (payload) => {
  const { data } = await api.post("/flags", payload);
  return data.data;
};

export const updateOrgFlag = async ({ id, payload }) => {
  const { data } = await api.patch(`/flags/${id}`, payload);
  return data.data;
};

export const deleteOrgFlag = async (id) => {
  const { data } = await api.delete(`/flags/${id}`);
  return data.data;
};
