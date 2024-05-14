namespace Auth {
  type LoginResponse = {
    token: string;
    user: User.Model;
  };
}
