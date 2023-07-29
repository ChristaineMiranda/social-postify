import { IsNotEmpty, IsString, IsDateString, IsOptional } from "class-validator";
export class PublicationUpdateDTO{
    
        @IsNotEmpty()
        @IsString()
        @IsOptional()
        image:string;
        title:string;
        text:string;
        socialMedia:string;

        @IsNotEmpty()
        @IsDateString()
        @IsOptional()
        dateToPublish:string;
       
}