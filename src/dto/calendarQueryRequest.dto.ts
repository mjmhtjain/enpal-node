import { ArrayNotEmpty, ArrayUnique, IsArray, IsEnum, IsIn, IsNotEmpty, IsString, Matches } from 'class-validator';

export enum Rating {
  Gold = 'Gold',
  Silver = 'Silver',
  Bronze = 'Bronze'
}

export enum Language {
  German = 'German',
  English = 'English'
}

// Define allowed product types
const ALLOWED_PRODUCTS = ["SolarPanels", "Heatpumps"];
// const ALLOWED_LANGUAGES = ["German", "English"];
// const ALLOWED_RATINGS = ["Gold", "Silver", "Bronze"];

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
  @ArrayUnique() // Add this to remove duplicates
  products: string[];

  @IsNotEmpty()
  @IsEnum(Language)
  language: string;

  @IsNotEmpty()
  @IsEnum(Rating) // Ensures only "Gold", "Silver", or "Bronze" are allowed
  rating: Rating;
}
