import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
export class createUserDTO{
    @IsNotEmpty()
    @IsString()
    name: string;
    avatar: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(6,20)
    password:string;
}