import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import axios from 'axios';
import { of } from 'rxjs';

// Mocks do axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFeature', () => {
    it('should return data when the API call is successful', async () => {
      const mockData = { results: ['feature1', 'feature2'] };
      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await service.getFeature('spells');
      
      expect(mockedAxios.get).toHaveBeenCalledWith('https://www.dnd5eapi.co/api/spells');
      expect(result).toEqual(mockData.results);
    });

    it('should handle errors when the API call fails', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      try {
        await service.getFeature('spells');
      } catch (error: any) {
        expect(error.message).toEqual(errorMessage);
      }

      expect(mockedAxios.get).toHaveBeenCalledWith('https://www.dnd5eapi.co/api/spells');
    });
  });

  describe('getFeatureByIndex', () => {
    it('should return data when the API call is successful', async () => {
      const mockData = { index: 'spell1' };
      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await service.getFeatureByIndex('/api/spells/spell1');
      
      expect(mockedAxios.get).toHaveBeenCalledWith('https://www.dnd5eapi.co/api/spells/spell1');
      expect(result).toEqual(mockData);
    });

    it('should handle errors when the API call fails', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      try {
        await service.getFeatureByIndex('/api/spells/spell1');
      } catch (error: any) {
        expect(error.message).toEqual(errorMessage);
      }

      expect(mockedAxios.get).toHaveBeenCalledWith('https://www.dnd5eapi.co/api/spells/spell1');
    });
  });
});
