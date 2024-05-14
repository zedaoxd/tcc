import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const { email, password } = credentials;

        const body = JSON.stringify({ email, password });
        const backendContainer = process.env.BACKEND_CONTAINER;
        const backendPort = process.env.BACKEND_PORT;
        const route = `http://${backendContainer}:${backendPort}/auth/login`;

        const response = await fetch(route, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        });

        const data = await response.json();

        if (response.ok && body && response.status === 201) return data;

        alert(data.message.message);
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.token = token.token;

      return session;
    },
  },
  pages: {
    signIn: "/auth",
    signOut: "/auth",
  },
};
