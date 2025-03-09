import { Injectable } from '@nestjs/common';
import { CalendarQueryRequestDto } from "../dto/calendarQueryRequest.dto";
import { CalendarQueryResponseDTO } from "../dto/calendarQueryResponse.dto";
import { DatabaseService } from './database.service';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) { }

  getHello(): string {
    return 'Hello World!';
  }

  getHealth() {
    return { status: "healthy" };
  }

  async getFreeSlots(body: CalendarQueryRequestDto) {
    const response: CalendarQueryResponseDTO[] = [];
    // Get available slots from the database
    const availableSlots = await this.databaseService.findSlotsByDate(body.date);

    // group available slots by sales manager
    const groupedSlots = availableSlots.reduce((acc, slot) => {
      const salesManagerId = slot.sales_manager_id;
      if (!acc[salesManagerId]) {
        acc[salesManagerId] = [];
      }
      acc[salesManagerId].push(slot);
      return acc;
    }, {});


    // Create response
    for (const slot of availableSlots) {
      const object = new CalendarQueryResponseDTO();
      object.availableCount = availableSlots.length;
      object.startDate = body.date;

      response.push(object);
    }

    return response;
  }
}
