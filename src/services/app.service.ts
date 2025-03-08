import { Injectable } from '@nestjs/common';
import { CalendarQueryRequestDto } from "../dto/calendarQueryRequest.dto";
import { CalendarQueryResponseDTO } from "../dto/calendarQueryResponse.dto";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHealth() {
    return { status: "healthy" };
  }

  getFreeSlots(body: CalendarQueryRequestDto) {
    let as = new CalendarQueryResponseDTO()
    as.availableCount = 1
    as.startDate = new Date().toISOString()

    return as;
  }
}
