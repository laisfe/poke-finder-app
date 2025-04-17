import { TestBed } from '@angular/core/testing';

import { PokemonStatsModalService } from './pokemon-stats-modal.service';

describe('PokemonStatsModalService', () => {
  let service: PokemonStatsModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonStatsModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
