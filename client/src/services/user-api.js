import { USER_API_URL } from ".";

export const GetSuggestedUsersApi = async () => {
  const response = await fetch(`${USER_API_URL}/suggested`, {
    credentials: "include",
    headers: { 'Content-Type': 'application/json' }
  })

  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message)
  }

  return result
}


export const FollowAndUnFollowUsersApi = async (userId) => {
  const response = await fetch(`${USER_API_URL}/follow/${userId}`, {
    method: "POST",
    credentials: "include",
    headers: { 'Content-Type': 'application/json' }
  })

  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message)
  }

  return result
}


export const GetUserProfileApi = async (username) => {
  const response = await fetch(`${USER_API_URL}/profile/${username}`, {
    credentials: "include",
    headers: { 'Content-Type': 'application/json' }
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message)
  }

  return result
}

export const UpdateUserProfileApi = async (formData) => {
  const response = await fetch(`${USER_API_URL}/update-profile`, {
    method: 'POST',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message)
  }

  return result
}
