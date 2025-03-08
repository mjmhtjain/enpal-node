import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CalendarQueryRequestDto } from '../dto/calendarQueryRequest.dto';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Get("/health")
  getHealth() {
    return this.appService.getHealth();
  }

  @Post("/calendar/query")
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  getFreeSlots(@Body() body: CalendarQueryRequestDto) {
    return this.appService.getFreeSlots(body);
  }
}
