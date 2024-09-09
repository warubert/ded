import { TestBed } from '@angular/core/testing';
import { rxdbService } from './rxdb.service';
import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

// Mock das dependências
jest.mock('rxdb', () => ({
  createRxDatabase: jest.fn(),
}));

jest.mock('rxdb/plugins/storage-dexie', () => ({
  getRxStorageDexie: jest.fn(),
}));

import { abilityScoresSchema } from '../../db/ability-scores/ability-scores.schema';
import { abilityScores } from '../../db/ability-scores/ability-scores';

describe('rxdbService', () => {
  let service: rxdbService;
  let mockDatabase: any;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [rxdbService],
    });

    service = TestBed.inject(rxdbService);

    // Cria uma instância mock do banco de dados
    mockDatabase = {
      ability_scores: {
        find: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue([]),
        }),
        findOne: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue({
            _data: { index: 'str' },
          }),
        }),
        insert: jest.fn().mockResolvedValue({}),
      },
      addCollections: jest.fn().mockResolvedValue({}),
      destroy: jest.fn().mockResolvedValue({}),
    };

    // Simula a configuração do banco de dados
    (createRxDatabase as jest.Mock).mockResolvedValue(mockDatabase);
    (getRxStorageDexie as jest.Mock).mockReturnValue({});

    await service.initDatabase(); // Inicializa o banco de dados no serviço
    service.myDatabase = mockDatabase; // Define o banco de dados mockado no serviço
  });

  it('should destroy the database and remove documents', async () => {
    // Configura o mock para retornar documentos
    mockDatabase.ability_scores.find.mockReturnValue({
      exec: jest.fn().mockResolvedValue([{ remove: jest.fn() }]),
    });

    await service.destroyDatabase();

    expect(mockDatabase.ability_scores.find).toHaveBeenCalled();
    expect(mockDatabase.ability_scores.find().exec).toHaveBeenCalled();
    expect(mockDatabase.ability_scores.find().exec().then((docs: any) => docs.forEach((doc: any) => expect(doc.remove).toHaveBeenCalled())));
    expect(mockDatabase.destroy).toHaveBeenCalled();
  });

  it('should find all ability scores', async () => {
    const mockDocs = [{ _data: { index: 'str' } }];
    mockDatabase.ability_scores.find.mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockDocs),
    });

    const result = await service.findAS();

    expect(result).toEqual(mockDocs.map(doc => doc._data));
  });

  it('should find ability score by index', async () => {
    const mockDoc = { _data: { index: 'str' } };
    mockDatabase.ability_scores.findOne.mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockDoc),
    });

    const result = await service.findASbyIndex('str');

    expect(result).toEqual(mockDoc._data);
  });

  it('should insert ability scores', async () => {
    await service.insertAS();

    abilityScores.forEach(item => {
      expect(mockDatabase.ability_scores.insert).toHaveBeenCalledWith(item);
    });
  });
});
