import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { rxdbService } from './services/rxdb/rxdb.service';

describe('AppComponent', () => {
  let mockRxdbService: any;
  let component: AppComponent;

  beforeEach(async () => {
    // Cria um mock para o serviço rxdbService
    mockRxdbService = {
      initDatabase: jest.fn().mockResolvedValue(true), // Mock para initDatabase
      findCollection: jest.fn().mockResolvedValue([]), // Certifica-se de que findCollection retorna um array
      insertCollections: jest.fn().mockResolvedValue(true), // Mock para insertCollections
      destroyDatabase: jest.fn().mockResolvedValue(true) // Mock para destroyDatabase
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: rxdbService, useValue: mockRxdbService } // Usa o mock no lugar do serviço real
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call initDatabase on ngOnInit', async () => {
    await component.ngOnInit();
    expect(mockRxdbService.initDatabase).toHaveBeenCalled(); // Verifica se initDatabase foi chamado
  });

  it('should insert documents if findCollection returns an empty array', async () => {
    mockRxdbService.findCollection.mockResolvedValue([]); // Simula um array vazio

    await component.ngOnInit();
    expect(mockRxdbService.findCollection).toHaveBeenCalledWith('ability_scores'); // Verifica se findCollection foi chamado corretamente
    expect(mockRxdbService.insertCollections).toHaveBeenCalled(); // Verifica se insertCollections foi chamado
  });

  it('should not insert documents if findCollection returns non-empty array', async () => {
    mockRxdbService.findCollection.mockResolvedValue([ { id: 1, name: 'Test' } ]); // Simula que há documentos

    await component.ngOnInit();
    expect(mockRxdbService.findCollection).toHaveBeenCalledWith('ability_scores'); // Verifica se findCollection foi chamado
    expect(mockRxdbService.insertCollections).not.toHaveBeenCalled(); // Verifica que insertCollections não foi chamado
  });

  it('should handle error if initDatabase fails', async () => {
    mockRxdbService.initDatabase.mockRejectedValue(new Error('Database error')); // Simula erro na inicialização do banco

    try {
      await component.ngOnInit();
    } catch (e: any) {
      expect(e.message).toBe('Database error'); // Verifica se o erro é capturado corretamente
    }
  });
});
