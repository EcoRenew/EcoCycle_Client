import { useQuery } from "@tanstack/react-query";
import { getUserDashboard } from "../services/userDashboard";

export const useUserDashboard = () => {
  return useQuery({
    queryKey: ["userDashboard"],
    queryFn: getUserDashboard,
    staleTime: 1000 * 60, // 1 min caching
  });
};
