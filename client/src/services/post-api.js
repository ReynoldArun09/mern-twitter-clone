import { POST_API_URL } from ".";

export const CreatePostApi = async ({ text, img }) => {
  const response = await fetch(`${POST_API_URL}/create-post`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, img }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
};

export const PostEndPointApi = async (ENDPOINT) => {
  const response = await fetch(`${POST_API_URL}/${ENDPOINT}`, {
    method: "GET",
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

export const DeletePostApi = async (postId) => {
  const response = await fetch(`${POST_API_URL}/delete-post/${postId}`, {
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

export const CommentPostApi = async (postId, text) => {
  const response = await fetch(`${POST_API_URL}/comment-post/${postId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};

export const LikePostApi = async (postId) => {
  const response = await fetch(`${POST_API_URL}/like-post/${postId}`, {
    method: "POST",
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
