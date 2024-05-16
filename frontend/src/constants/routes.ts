type Routes = {
  public: readonly string[];
  private: {
    user: readonly string[];
    admin: readonly string[];
  };
};

export const ROUTES: Routes = {
  public: ["/", "/blog", "/courses", "/contact", "/faqs", "/auth"],
  private: {
    user: ["/profile"],
    admin: [],
  },
} as const;
