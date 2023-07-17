import { IsBoolean, IsNotEmpty, IsString, IsDateString } from "class-validator";
export class PublicationDTO{
    
        @IsNotEmpty()
        @IsString()
        image:string;
        title:string;
        text:string;
        socialMedia:string;

        @IsNotEmpty()
        @IsDateString()
        dateToPublish:string;
       
}