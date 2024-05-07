import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { type User } from "@supabase/supabase-js";
import { create } from "zustand";

type AuthUser = {
  isAuthenticated: true;
  user: User;
};

type AuthGuest = {
  isAuthenticated: false;
  user: null;
};

type AuthState = {
  signOut: () => Promise<void>;
  signIn: (userLogin: User.UserLogin) => Promise<boolean>;
  signUp: (userLogin: User.UserRegister) => Promise<boolean>;
} & (AuthUser | AuthGuest);

const useAuth = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  signOut: async () => {
    const supabase = createClientComponentClient();
    await supabase.auth.signOut();
    set({ user: null });
  },
  signIn: async ({ emailOrUsername, password }) => {
    try {
      const supabase = createClientComponentClient();

      const {
        error,
        data: { user },
      } = await supabase.auth.signInWithPassword({
        email: emailOrUsername,
        password,
      });

      if (!user) return false;

      set({ user: user, isAuthenticated: true });

      return error === null;
    } catch (error) {
      console.error("Error logging in user", error);
      return false;
    }
  },
  signUp: async ({ email, fullName, password, username }) => {
    try {
      const supabase = createClientComponentClient();

      const {
        data: { user },
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            username,
            email,
          },
          emailRedirectTo: `${location.origin}/auth/verify`,
        },
      });

      return user !== null;
    } catch (error) {
      console.error("Error registering user", error);
      return false;
    }
  },
}));

export default useAuth;
