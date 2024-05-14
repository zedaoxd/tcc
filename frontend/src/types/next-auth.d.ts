import nextAuth from "next-auth";

declare module "next-auth" {
  type User = User.Model;

  interface Session {
    user: User;
    token: string;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  export interface JWT {
    user: User.Model;
    token: string;
  }
}
