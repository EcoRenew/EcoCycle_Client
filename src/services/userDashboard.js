import api from "./api"; // your axios instance

export const getUserDashboard = async () => {
  const { data } = await api.get("/user/dashboard");
  return data.data; // because backend wraps in { success, data }
};
