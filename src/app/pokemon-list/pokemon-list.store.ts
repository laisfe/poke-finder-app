import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap, catchError, map, finalize } from 'rxjs/operators';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable, of } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';
import { getStatDisplayName } from '../shared/utilities/pokemon.util';
import { Pokemon } from '../types/pokemon.types';
import { capitalizeFirstLetter } from '../shared/utilities/string.util';

// export interface Pokemon {
//   name: string;
//   url: string;
// }

export interface PokemonListState {
  pokemons: Pokemon[];
  types: string[];
  pokemonsLoading: boolean;
  typesLoading: boolean;
  error: string | null;
}

@Injectable()
export class PokemonListStore extends ComponentStore<PokemonListState> {
  // SELECTORS
  readonly pokemons$ = this.select((state) => state.pokemons);
  readonly types$ = this.select((state) => state.types);
  readonly isPokemonsLoading$ = this.select((state) => state.pokemonsLoading);
  readonly isTypesLoading$ = this.select((state) => state.typesLoading);
  readonly error$ = this.select((state) => state.error);

  // UPDATERS
  public readonly setPokemonsLoading = this.updater(
    (state, pokemonsLoading: boolean) => ({
      ...state,
      pokemonsLoading,
    })
  );

  public readonly setTypesLoading = this.updater(
    (state, typesLoading: boolean) => ({
      ...state,
      typesLoading,
    })
  );

  public readonly setPokemons = this.updater((state, pokemons: Pokemon[]) => ({
    ...state,
    pokemons,
    error: null,
  }));

  public readonly setTypes = this.updater((state, types: string[]) => ({
    ...state,
    types,
    error: null,
  }));

  public readonly setError = this.updater((state, error: string) => ({
    ...state,
    error,
    loading: false,
  }));

  // EFFECT: Load Pokémon list
  public readonly loadPokemons = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      tap(() => this.setPokemonsLoading(true)),
      switchMap(() =>
        this.pokemonService.getAllPokemon().pipe(
          map((pokemonList) => {
            const pokemonslist = pokemonList.map((pokemon: any) => ({
              id: pokemon.id,
              name: capitalizeFirstLetter(pokemon.name),
              image: pokemon.sprites.other['official-artwork'].front_default,
              stats: pokemon.stats.map((stat: any) => ({
                name: stat.stat.name,
                displayName: getStatDisplayName(stat.stat.name),
                effort: stat.effort,
                baseStat: stat.base_stat.toString().padStart(3, '0'),
              })),
              types: pokemon.types.map((type: any) =>
                capitalizeFirstLetter(type.type.name)
              ),
              height: pokemon.height,
              weight: pokemon.weight,
            })) as any;
            console.log('Pokémon list:', pokemonslist);
            this.setPokemons(pokemonslist);
            return EMPTY;
          }),
          catchError((error) => {
            this.setError('Failed to load Pokémon.');
            console.error('Error loading Pokémon:', error);
            return EMPTY;
          }),
          finalize(() => this.setPokemonsLoading(false))
        )
      )
    )
  );

  public readonly loadTypes = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      tap(() => this.setTypesLoading(true)),
      switchMap(() =>
        this.pokemonService.getTypes().pipe(
          map(({ results }) => {
            const typesList = results.map((type: any) =>
              capitalizeFirstLetter(type.name)
            ) as any;
            this.setTypes(typesList);
            return EMPTY;
          }),
          catchError((error) => {
            this.setError('Failed to load Pokémon types.');
            console.error('Error loading Pokémon types:', error);
            return EMPTY;
          }),
          finalize(() => this.setTypesLoading(false))
        )
      )
    )
  );

  constructor(private pokemonService: PokemonService) {
    super({
      pokemons: [],
      types: [],
      pokemonsLoading: false,
      typesLoading: false,
      error: null,
    });

    this.loadPokemons();
    this.loadTypes();
  }
}
