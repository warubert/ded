import { TestBed } from '@angular/core/testing';
import { rxdbService } from './rxdb.service'; // Ajuste o caminho conforme necessário
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { createRxDatabase } from 'rxdb';

import { abilityScores }  from '../../db/en/ability-scores/ability-scores';
import { alignments } from '../../db/en/alignments/alignments';

// Mocks
jest.mock('rxdb/plugins/storage-dexie');
jest.mock('rxdb', () => ({
  createRxDatabase: jest.fn(),
}));

describe('rxdbService', () => {
  let service: rxdbService;
  let mockDb: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(rxdbService);

    // Configurando um banco de dados simulado
    mockDb = {
      addCollections: jest.fn(),
      destroy: jest.fn(),
      ability_scores: {
        find: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue([]),
        }),
        insert: jest.fn(),
      },
      alignments: {
        find: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue([]),
        }),
        insert: jest.fn(),
      },
    };

    (createRxDatabase as jest.Mock).mockResolvedValue(mockDb);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize the database', async () => {
    await service.initDatabase();
    expect(createRxDatabase).toHaveBeenCalledWith({
      name: service.dbName,
      storage: getRxStorageDexie(),
    });
    expect(mockDb.addCollections).toHaveBeenCalledTimes(service.collections.length);
  });

  it('should destroy the database', async () => {
    service.myDatabase = mockDb;
    await service.destroyDatabase();
    expect(mockDb.destroy).toHaveBeenCalled();
  });

  it('should find a collection', async () => {
    service.myDatabase = mockDb;
    const result = await service.findCollection('ability_scores');
    expect(result).toEqual([]);
    expect(mockDb.ability_scores.find).toHaveBeenCalled();
  });

  it('should find an index in a collection', async () => {
    const mockResult = { _data: { index: 'test' } };
    
    // Ajustando o mock para a coleção e o método findOne
    mockDb.ability_scores.findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockResult),
    });
  
    // Certifique-se de que myDatabase é definido antes de chamar findIndex
    service.myDatabase = mockDb;
  
    const result = await service.findIndex('test', 'ability_scores');
    expect(result).toEqual(mockResult._data);
  });

  it('should insert collections', async () => {
    service.myDatabase = mockDb;
    await service.insertCollections();
    
    expect(mockDb.ability_scores.insert).toHaveBeenCalledTimes(abilityScores.length);
    expect(mockDb.alignments.insert).toHaveBeenCalledTimes(alignments.length);
  });
});
