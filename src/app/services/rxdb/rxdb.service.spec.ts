import { TestBed } from '@angular/core/testing';
import { rxdbService } from './rxdb.service'; // Ajuste o caminho conforme necessário
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { createRxDatabase } from 'rxdb';

import { abilityScores } from '../../db/en/ability-scores/ability-scores';
import { alignments } from '../../db/en/alignments/alignments';

// Mocks
jest.mock('rxdb/plugins/storage-dexie');
jest.mock('rxdb', () => ({
  createRxDatabase: jest.fn(),
}));

describe('rxdbService', () => {
  let service: rxdbService;
  let mockDb: any;
  let mockDocument: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(rxdbService);

    // Mockando os documentos
    mockDocument = {
      remove: jest.fn().mockResolvedValue(true), // Simula a remoção dos documentos
    };

    // Configurando um banco de dados simulado
    mockDb = {
      addCollections: jest.fn(),
      destroy: jest.fn(),
      ability_scores: {
        find: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue([mockDocument]), // Simula que documentos são encontrados
        }),
        insert: jest.fn(),
        findOne: jest.fn(), // Adicionado para o findIndex
      },
      alignments: {
        find: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue([mockDocument]), // Simula que documentos são encontrados
        }),
        insert: jest.fn(),
      },
    };

    // Simulando a criação do banco de dados
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

  it('should destroy the database and remove documents', async () => {
    service.myDatabase = mockDb;
    await service.destroyDatabase();

    // Verifica se os documentos foram removidos das coleções
    expect(mockDb.ability_scores.find).toHaveBeenCalled();
    expect(mockDb.alignments.find).toHaveBeenCalled();
    expect(mockDocument.remove).toHaveBeenCalledTimes(2); // 2 coleções, 1 documento cada

    // Verifica se o banco foi destruído no final
    expect(mockDb.destroy).toHaveBeenCalled();
  });

  it('should do nothing if myDatabase is not set', async () => {
    service.myDatabase = null; // Garante que o banco de dados não está setado
    await service.destroyDatabase();

    // Verifica que nenhum método foi chamado já que o banco não existe
    expect(mockDb.ability_scores.find).not.toHaveBeenCalled();
    expect(mockDb.alignments.find).not.toHaveBeenCalled();
    expect(mockDb.destroy).not.toHaveBeenCalled();
  });

  it('should find a collection', async () => {
    service.myDatabase = mockDb;
    const result = await service.findCollection('ability_scores');
    expect(result).toEqual([mockDocument._data]);
    expect(mockDb.ability_scores.find).toHaveBeenCalled();
  });

  it('should find an index in a collection', async () => {
    const mockResult = { _data: { index: 'test' } };

    // Ajustando o mock para a coleção e o método findOne
    mockDb.ability_scores.findOne.mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockResult),
    });

    // Certifique-se de que myDatabase é definido antes de chamar findIndex
    service.myDatabase = mockDb;

    const result = await service.findIndex('test', 'ability_scores');
    expect(result).toEqual(mockResult._data);
    expect(mockDb.ability_scores.findOne).toHaveBeenCalledWith({
      selector: {
        index: 'test',
      },
    });
  });

  it('should return null when no document is found in findIndex', async () => {
    // Configura o mock para retornar null (nenhum documento encontrado)
    mockDb.ability_scores.findOne.mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    });

    // Certifique-se de que myDatabase é definido antes de chamar findIndex
    service.myDatabase = mockDb;

    // Chama a função findIndex
    const result = await service.findIndex('test', 'ability_scores');

    // Verifica se o resultado foi null
    expect(result).toBeNull();
    expect(mockDb.ability_scores.findOne).toHaveBeenCalledWith({
      selector: {
        index: 'test',
      },
    });
  });

  it('should insert collections', async () => {
    service.myDatabase = mockDb;
    await service.insertCollections();

    expect(mockDb.ability_scores.insert).toHaveBeenCalledTimes(abilityScores.length);
    expect(mockDb.alignments.insert).toHaveBeenCalledTimes(alignments.length);
  });

  describe('setDatabase', () => {
    it('should set the myDatabase property to the provided db value', () => {
      const mockDb = { name: 'mockedDatabase' }; // Valor de teste
      service.setDatabase(mockDb); // Chama a função passando o valor de mockDb

      // Verifica se myDatabase foi setado corretamente
      expect(service.myDatabase).toBe(mockDb);
    });
  });
});
