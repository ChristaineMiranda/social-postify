import { IsNotEmpty, IsString, IsDateString, IsOptional, IsBoolean } from "class-validator";
export class PublicationUpdateDTO{
    
        @IsNotEmpty()
        @IsString()
        @IsOptional()
        image:string;
        title:string;
        text:string;
        socialMedia:string;

        @IsNotEmpty()
        @IsBoolean()
        @IsOptional()
        published:boolean;

        @IsNotEmpty()
        @IsDateString()
        @IsOptional()
        dateToPublish:string;
       
}