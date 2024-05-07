namespace User {
  type UserLogin = {
    emailOrUsername: string;
    password: string;
  };

  type UserRegister = {
    fullName: string;
    email: string;
    username: string;
    password: string;
  };
}
