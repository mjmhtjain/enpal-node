import { ArrayNotEmpty, IsArray, IsEnum, IsIn, IsNotEmpty, IsString, Matches } from 'class-validator';

enum Rating {
  Gold = 'Gold',
  Silver = 'Silver',
  Bronze = 'Bronze'
}

// Define allowed product types
const ALLOWED_PRODUCTS = ["SolarPanels", "Heatpumps"];
const ALLOWED_LANGUAGES = ["German", "English"];
const ALLOWED_RATINGS = ["Gold", "Silver", "Bronze"];

export class CalendarQueryRequestDto {
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Date must be in YYYY-MM-DD format",
  })
  date: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true }) // Ensures all elements in the array are strings
  @IsIn(ALLOWED_PRODUCTS, { each: true }) // Ensures each value is either "SolarPanels" or "Heatpumps"
  products: string[];

  @IsNotEmpty()
  @IsString()
  @IsIn(ALLOWED_LANGUAGES) // Ensures language is either "German" or "English"
  language: string;

  @IsNotEmpty()
  @IsEnum(Rating) // Ensures only "Gold", "Silver", or "Bronze" are allowed
  @IsIn(ALLOWED_RATINGS) // Ensures rating is either "Gold", "Silver", or "Bronze"
  rating: Rating;
}
