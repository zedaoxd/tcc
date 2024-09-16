import { api } from "@/components/shared/api";

export async function emailInUse(email: string) {
  const response = await api.get(`/auth/email-in-use/${email}`);

  return !response.data.emailInUse;
}

type RegisterData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export async function register(data: RegisterData) {
  return await api.post("/auth/register", data);
}

export async function verifyEmail(token: string): Promise<void> {
  return await api.post("/auth/verify-email", { token });
}
