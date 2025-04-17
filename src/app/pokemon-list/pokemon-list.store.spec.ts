import { TestBed } from '@angular/core/testing';
import { PokemonListStore } from './pokemon-list.store';
import { PokemonService } from '../services/pokemon.service';
import { of, throwError } from 'rxjs';
import { PokemonResult, PokemonTypeResponse } from '../types/pokemon.types';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { createSpyFromClass, Spy } from 'jest-auto-spies';

describe('PokemonListStore', () => {
  let store: PokemonListStore;
  let mockService: Spy<PokemonService>;

  const mockPokemonResult = [
    {
      id: 1,
      name: 'bulbasaur',
      height: 10,
      weight: 100,
      stats: [
        {
          base_stat: 50,
          effort: 1,
          stat: { name: 'speed', url: '' },
        },
      ],
      types: [
        {
          slot: 1,
          type: { name: 'grass', url: '' },
        },
      ],
      sprites: {
        other: {
          'official-artwork': {
            front_default: 'url-to-bulbasaur',
          },
        },
      },
    },
  ];

  beforeEach(() => {
    mockService = createSpyFromClass(PokemonService, {
      methodsToSpyOn: ['getAllPokemon', 'getTypes'],
    });

    mockService.getAllPokemon.mockReturnValue(
      of(mockPokemonResult as unknown as PokemonResult[])
    );
    mockService.getTypes.mockReturnValue(
      of({
        results: [
          { name: 'fire', url: '' },
          { name: 'grass', url: '' },
        ],
      } as PokemonTypeResponse)
    );

    TestBed.configureTestingModule({
      providers: [
        PokemonListStore,
        { provide: PokemonService, useValue: mockService },
      ],
    });

    store = TestBed.inject(PokemonListStore);
  });

  it('should have initial state', () => {
    const pokemonsResult = subscribeSpyTo(store.pokemons$);

    expect(pokemonsResult.getLastValue()).toEqual([
      {
        id: 1,
        name: 'Bulbasaur', // capitalized
        image: 'url-to-bulbasaur',
        stats: [
          {
            name: 'speed',
            displayName: 'SPD',
            effort: 1,
            baseStat: '050',
          },
        ],
        types: ['Grass'],
        height: 10,
        weight: 100,
      },
    ]);
  });

  it('should load pokemons successfully', () => {
    const mockResults = [mockPokemonResult[0]] as PokemonResult[];
    mockService.getAllPokemon.mockReturnValue(of(mockResults));

    store.loadPokemons();
    const pokemonsResult = subscribeSpyTo(store.pokemons$);

    expect(pokemonsResult.getLastValue()).toEqual([
      {
        id: 1,
        name: 'Bulbasaur', // capitalized
        image: 'url-to-bulbasaur',
        stats: [
          {
            name: 'speed',
            displayName: 'SPD',
            effort: 1,
            baseStat: '050',
          },
        ],
        types: ['Grass'],
        height: 10,
        weight: 100,
      },
    ]);
    expect(pokemonsResult.getValues()).toHaveLength(1);
  });

  it('should handle error when loading pokemons', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    mockService.getAllPokemon.mockReturnValue(
      throwError(() => new Error('fail'))
    );

    store.loadPokemons();
    const errorResult = subscribeSpyTo(store.error$);

    expect(errorResult.getLastValue()).toBe('Failed to load Pokémon.');

    consoleErrorSpy.mockRestore();
  });

  it('should load types successfully', () => {
    const mockTypeResponse = {
      results: [
        { name: 'fire', url: '' },
        { name: 'grass', url: '' },
      ],
    } as PokemonTypeResponse;

    mockService.getTypes.mockReturnValue(of(mockTypeResponse));

    store.loadTypes();
    const typesResult = subscribeSpyTo(store.types$);

    expect(typesResult.getLastValue()).toEqual(['Fire', 'Grass']);
  });

  it('should handle error when loading types', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    mockService.getTypes.mockReturnValue(throwError(() => new Error('fail')));

    store.loadTypes();

    const errorsResult = subscribeSpyTo(store.error$);

    expect(errorsResult.getLastValue()).toEqual(
      'Failed to load Pokémon types.'
    );
    consoleErrorSpy.mockRestore();
  });
});
