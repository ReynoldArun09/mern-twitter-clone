import { useQuery } from "@tanstack/react-query";
import { VerifyUserApi } from "../services/auth-api";

export default function useAuth() {
  const { data: isAuth, isLoading } = useQuery({
    queryKey: ["verify-user"],
    queryFn: VerifyUserApi,
  });

  return { isAuth, isLoading };
}
