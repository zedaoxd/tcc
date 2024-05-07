import { Exclude } from "class-transformer";
import { User } from "../entities/user.entity";

export class AuthResponseDTO {
    user: User;
    token: string;

    constructor({ token, user }: AuthResponseDTO) {
        this.token = token;
        this.user = new User({ ...user });
    }
}