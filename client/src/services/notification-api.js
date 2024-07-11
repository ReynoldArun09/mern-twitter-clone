import { NOTIFICATION_API_URL } from ".";

export const GetAllNotificationsApi = async () => {
  const response = await fetch(`${NOTIFICATION_API_URL}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};

export const DeleteAllNotificationsApi = async () => {
  const response = await fetch(`${NOTIFICATION_API_URL}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};
