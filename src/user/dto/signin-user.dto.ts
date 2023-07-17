import { IsNotEmpty, IsEmail, Length } from "class-validator";
export class signInDto{
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Length(6,20)
    password: string
}