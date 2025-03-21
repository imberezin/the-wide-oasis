import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log("Login user data = ", user);
      queryClient.setQueryData(["user", user]);
      toast.success("Login successful");
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("Login err", err);
      toast.error("Provided email or password are incorrect");
    },
  });
  return { login, isLoading };
}
