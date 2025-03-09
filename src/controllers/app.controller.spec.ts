import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CalendarQueryRequestDto } from '../dto/calendarQueryRequest.dto';
import { AppService } from '../services/app.service';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHealth: jest.fn(),
            getFreeSlots: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('getHealth', () => {
    it('should return the status from appService', () => {
      const healthResult = { status: 'healthy' };
      jest.spyOn(appService, 'getHealth').mockReturnValue(healthResult);

      expect(appController.getHealth()).toBe(healthResult);
      expect(appService.getHealth).toHaveBeenCalled();
    });
  });

  describe('getFreeSlots', () => {
    it('should pass the body to appService and return the result', async () => {
      const requestDto: CalendarQueryRequestDto = {
        date: '2023-10-15',
        products: ['SolarPanels'],
        language: 'English',
        rating: 'Gold' as any,
      };

      const expectedResult = [];
      jest.spyOn(appService, 'getFreeSlots').mockResolvedValue(expectedResult);

      const result = await appController.getFreeSlots(requestDto);

      expect(result).toBe(expectedResult);
      expect(appService.getFreeSlots).toHaveBeenCalledWith(requestDto);
    });

    it('should handle multiple products in the request', async () => {
      const requestDto: CalendarQueryRequestDto = {
        date: '2023-10-15',
        products: ['SolarPanels', 'Heatpumps'],
        language: 'German',
        rating: 'Silver' as any,
      };

      const expectedResult = [];
      jest.spyOn(appService, 'getFreeSlots').mockResolvedValue(expectedResult);

      const result = await appController.getFreeSlots(requestDto);

      expect(result).toBe(expectedResult);
      expect(appService.getFreeSlots).toHaveBeenCalledWith(requestDto);
    });

    it('should handle all rating types correctly', async () => {
      // Test with Bronze rating
      const bronzeRequestDto: CalendarQueryRequestDto = {
        date: '2023-10-15',
        products: ['SolarPanels'],
        language: 'English',
        rating: 'Bronze' as any,
      };

      const bronzeResult = [];
      jest.spyOn(appService, 'getFreeSlots').mockResolvedValue(bronzeResult);

      const result = await appController.getFreeSlots(bronzeRequestDto);
      expect(result).toBe(bronzeResult);
      expect(appService.getFreeSlots).toHaveBeenCalledWith(bronzeRequestDto);
    });

    it('should throw HttpException when service throws an error', async () => {
      const requestDto: CalendarQueryRequestDto = {
        date: '2023-10-15',
        products: ['SolarPanels'],
        language: 'English',
        rating: 'Gold' as any,
      };

      const mockError = new Error('Service error');
      jest.spyOn(appService, 'getFreeSlots').mockRejectedValue(mockError);

      await expect(appController.getFreeSlots(requestDto)).rejects.toThrow(HttpException);
      expect(appService.getFreeSlots).toHaveBeenCalledWith(requestDto);
    });

    it('should handle duplicate products in the request', async () => {
      const requestWithDuplicates: CalendarQueryRequestDto = {
        date: '2023-10-15',
        products: ['SolarPanels', 'SolarPanels', 'Heatpumps', 'Heatpumps'],
        language: 'English',
        rating: 'Gold' as any,
      };

      const serviceResponse = [];
      jest.spyOn(appService, 'getFreeSlots').mockResolvedValue(serviceResponse);

      const result = await appController.getFreeSlots(requestWithDuplicates);

      expect(result).toBe(serviceResponse);
      expect(appService.getFreeSlots).toHaveBeenCalledWith(requestWithDuplicates);
    });
  });
});
