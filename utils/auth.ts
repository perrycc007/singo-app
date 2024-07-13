import api from "../services/api";
export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", response.data.token);
};

export const register = async (email: string, password: string) => {
  const response = await api.post("/auth/register", { email, password });
  localStorage.setItem("token", response.data.token);
};

export const getToken = () => localStorage.getItem("token");
