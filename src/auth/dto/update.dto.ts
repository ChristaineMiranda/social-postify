import { IsNotEmpty, IsOptional, Length, ValidateIf } from "class-validator";

export class UpdateUserDTO {
    @IsNotEmpty()
    @IsOptional()
    image?: string;
    email?: string;
    avatar?: string;

    @IsNotEmpty()
    @IsOptional()
    @Length(6, 20)
    password?: string;

}