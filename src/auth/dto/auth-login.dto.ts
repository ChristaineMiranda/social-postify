import { IsNotEmpty, IsEmail, Length } from "class-validator";
export class AuthLoginDTO{
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Length(6,20)
    password: string
}