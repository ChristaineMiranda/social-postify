import { IsNumber, IsString } from "class-validator";
import { PublicationDTO } from "./publication.dto";

export class PublicationDB extends PublicationDTO{
    @IsNumber()
    userId:number;    
}