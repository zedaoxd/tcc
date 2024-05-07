import axios from "axios";

export async function emailInUse(email: string) {
  const response = await axios.get(`/auth/email-in-use/${email}`);
  return response.data.emailInUse;
}

export async function usernameInUse(username: string) {
  const response = await axios.get(`/auth/username-in-use/${username}`);
  return response.data.usernameInUse;
}
