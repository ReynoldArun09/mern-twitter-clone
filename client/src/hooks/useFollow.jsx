import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FollowAndUnFollowUsersApi } from "../services/user-api";

export default function useFollow() {
  const queryclient = useQueryClient();

  const { mutate: follow, isPending } = useMutation({
    mutationKey: ["follow-user"],
    mutationFn: (userId) => FollowAndUnFollowUsersApi(userId),
    onSuccess: () => {
      Promise.all([
        queryclient.invalidateQueries({ queryKey: ["verify-user"] }),
        queryclient.invalidateQueries({ queryKey: ["suggested-users"] }),
      ]);
    },
  });

  return { follow, isPending };
}
