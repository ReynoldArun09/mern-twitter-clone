import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UpdateUserProfileApi } from "../services/user-api"

export default function useUpdateUserProfile() {
  const queryclient = useQueryClient()

  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } = useMutation({
    mutationKey: ['update-profile'],
    mutationFn: UpdateUserProfileApi,
    onSuccess: () => {
      Promise.all([
        queryclient.invalidateQueries({ queryKey: ["verify-user"] }),
        queryclient.invalidateQueries({ queryKey: ["user-profile"] })
      ])
    }
  })

  return { updateProfile, isUpdatingProfile }
}
