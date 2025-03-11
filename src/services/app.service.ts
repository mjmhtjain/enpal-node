import { Injectable } from '@nestjs/common';
import { CalendarQueryRequestDto } from "../dto/calendarQueryRequest.dto";
import { CalendarQueryResponseDTO } from "../dto/calendarQueryResponse.dto";
import { Slots } from '../entities/slots.entity';
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
    // Get available slots from the database
    const availableSlots = await this.databaseService.findSlotsByDate(body.date);

    // Group available slots by sales manager ID
    const groupedSlots: Record<string, Slots[]> = availableSlots.reduce((acc: Record<string, Slots[]>, slot: Slots) => {
      const salesManagerId = slot.sales_manager_id.toString();
      if (!acc[salesManagerId]) {
        acc[salesManagerId] = [];
      }
      acc[salesManagerId].push(slot);
      return acc;
    }, {});

    // Create response array
    const response: CalendarQueryResponseDTO[] = [];

    // Process each sales manager group
    for (const [salesManagerId, slots] of Object.entries(groupedSlots)) {
      const responseObj = new CalendarQueryResponseDTO();
      responseObj.availableCount = slots.length;
      responseObj.startDate = body.date;

      response.push(responseObj);
    }

    return response;
  }
}
