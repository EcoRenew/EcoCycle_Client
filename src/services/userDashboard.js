import api from "./api";

export const getUserDashboard = async () => {
  const { data } = await api.get("/user/dashboard");
  return data.data;
};
