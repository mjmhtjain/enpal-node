import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
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
  @HttpCode(HttpStatus.OK)
  async getFreeSlots(@Body() body: CalendarQueryRequestDto) {
    try {
      const data = await this.appService.getFreeSlots(body);
      return data;
    } catch (error) {
      throw new HttpException(
        {
          message: 'An error occurred while fetching slots',
          error: error.message
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
