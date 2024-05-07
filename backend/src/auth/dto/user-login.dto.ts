import { IsEmail, IsNotEmpty } from "class-validator";

export class UserLoginDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}