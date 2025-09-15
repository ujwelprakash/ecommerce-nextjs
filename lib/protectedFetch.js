import api from "./api";

// GET with token
export const protectedGet = async (url, token) => {
  return api.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// POST with token
export const protectedPost = async (url, data, token) => {
  return api.post(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
