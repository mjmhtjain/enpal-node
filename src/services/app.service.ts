import { Injectable } from '@nestjs/common';
import { CalendarQueryRequestDto } from "../dto/calendarQueryRequest.dto";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHealth() {
    return { status: "healthy" };
  }

  getFreeSlots(body: CalendarQueryRequestDto) {
    return { request: body };
  }
}
