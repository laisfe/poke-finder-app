import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
  {
    path: 'pokemons',
    loadChildren: async () =>
      (await import('./pokemon-list/pokemon-list.module')).PokemonListModule,
  },
];
