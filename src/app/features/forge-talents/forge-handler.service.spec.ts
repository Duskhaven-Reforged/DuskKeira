import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ForgeHandlerService } from './forge-handler.service';

describe('SpellHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [ForgeHandlerService],
    });
  });

  it('should have the unsaved status getters', () => {
    const service = TestBed.inject(ForgeHandlerService);
    expect(service.isForgeUnsaved).toBeDefined();
  });
});
