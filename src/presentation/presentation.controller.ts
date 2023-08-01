import { Controller, Get } from '@nestjs/common';
import { PresentationService } from './presentation.service';

@Controller()
export class PresentationController {
  constructor(private readonly presentationService: PresentationService) {}

  @Get()
  presentationResponse(){
    return this.presentationService.message();
  }
}
