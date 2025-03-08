import { Expose, instanceToPlain } from "class-transformer";

export class CalendarQueryResponseDTO {
    @Expose({ name: "available_count" })
    availableCount: number;

    @Expose({ name: "start_date" })
    startDate: string;

    /**
     * Transform this class instance to a plain object with snake_case keys
     */
    toJSON() {
        return instanceToPlain(this);
    }
}