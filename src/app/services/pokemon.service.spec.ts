import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { createSpyFromClass, Spy } from 'jest-auto-spies';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: Spy<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService],
    });

    httpMock = createSpyFromClass(HttpClient);
    service = new PokemonService(httpMock);
  });

  it('get all pokemons', () => {
    const mockResults = [
      { name: 'bulbasaur', url: 'url-to-bulbasaur' },
      { name: 'ivysaur', url: 'url-to-ivysaur' },
    ];

    httpMock.get.mockReturnValueOnce(of({ results: mockResults }));

    service.getAllPokemon();

    expect(httpMock.get).toHaveBeenCalledWith(
      `${service.baseUrl}/pokemon?limit=10000&offset=0`
    );
  });

  it('get all types', () => {
    service.getTypes();

    expect(httpMock.get).toHaveBeenCalledWith(
      `${service.baseUrl}/type?limit=100&offset=0`
    );
  });
});
