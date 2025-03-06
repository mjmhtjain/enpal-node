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
    it('should pass the body to appService and return the result', () => {
      const requestDto: CalendarQueryRequestDto = {
        date: '2023-10-15',
        products: ['SolarPanels'],
        language: 'English',
        rating: 'Gold' as any,
      };

      const expectedResult = { request: requestDto };

      jest.spyOn(appService, 'getFreeSlots').mockReturnValue(expectedResult);

      const result = appController.getFreeSlots(requestDto);

      expect(result).toBe(expectedResult);
      expect(appService.getFreeSlots).toHaveBeenCalledWith(requestDto);
    });

    it('should handle multiple products in the request', () => {
      const requestDto: CalendarQueryRequestDto = {
        date: '2023-10-15',
        products: ['SolarPanels', 'Heatpumps'],
        language: 'German',
        rating: 'Silver' as any,
      };

      const expectedResult = { request: requestDto };

      jest.spyOn(appService, 'getFreeSlots').mockReturnValue(expectedResult);

      const result = appController.getFreeSlots(requestDto);

      expect(result).toBe(expectedResult);
      expect(appService.getFreeSlots).toHaveBeenCalledWith(requestDto);
    });

    it('should handle all rating types correctly', () => {
      // Test with Bronze rating
      const bronzeRequestDto: CalendarQueryRequestDto = {
        date: '2023-10-15',
        products: ['SolarPanels'],
        language: 'English',
        rating: 'Bronze' as any,
      };

      const bronzeResult = { request: bronzeRequestDto };
      jest.spyOn(appService, 'getFreeSlots').mockReturnValue(bronzeResult);

      expect(appController.getFreeSlots(bronzeRequestDto)).toBe(bronzeResult);
      expect(appService.getFreeSlots).toHaveBeenCalledWith(bronzeRequestDto);
    });

    it('should propagate errors from the service', () => {
      const requestDto: CalendarQueryRequestDto = {
        date: '2023-10-15',
        products: ['SolarPanels'],
        language: 'English',
        rating: 'Gold' as any,
      };

      const mockError = new Error('Service error');
      jest.spyOn(appService, 'getFreeSlots').mockImplementation(() => {
        throw mockError;
      });

      expect(() => {
        appController.getFreeSlots(requestDto);
      }).toThrow(mockError);

      expect(appService.getFreeSlots).toHaveBeenCalledWith(requestDto);
    });
  });
});
