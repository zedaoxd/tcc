import { Exclude } from "class-transformer";

export class User {
    id: string;
    email: string;

    @Exclude()
    password: string;
    firstName: string;
    lastName?: string;
    role: 'USER' | 'ADMIN';
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    emailVerified?: boolean;
    @Exclude()
    emailToken?: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}