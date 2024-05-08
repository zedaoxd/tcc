interface JWTPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

interface IRequest {
  user: JWTPayload;
}
