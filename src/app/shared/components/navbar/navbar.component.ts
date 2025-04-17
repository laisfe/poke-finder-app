import { Component, input, output } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { SelectComponent } from '../select/select.component';
import { Pokemon } from '../../../types/pokemon.types';

@Component({
  selector: 'app-navbar',
  imports: [SearchComponent, SelectComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public searchText = input<string>('', { alias: 'searchText' });
  public isInputFocused = input<boolean>(false, { alias: 'isInputFocused' });
  public recentSearches = input<string[]>([], { alias: 'recentSearches' });
  public types = input<string[]>([], { alias: 'types' });
  public isTypesLoading = input<boolean>(false, { alias: 'isTypesLoading' });
  public pokemons = input<Pokemon[]>([], { alias: 'pokemons' });

  public onSearchChange = output<void>({ alias: 'onSearchChange' });
  public onInputFocus = output<void>({ alias: 'onInputFocus' });
  public onInputBlur = output<void>({ alias: 'onInputBlur' });
  public runSearch = output<string>({ alias: 'runSearch' });
  public clearSearchHistory = output<void>({ alias: 'clearSearchHistory' });
  public searchTextChange = output<string>({ alias: 'searchTextChange' });
  public filteredPokemons = output<Pokemon[]>({
    alias: 'filteredPokemons',
  });
  public isListFiltered = output<boolean>({
    alias: 'isListFiltered',
  });
  public currentPage = output<number>({
    alias: 'currentPage',
  });
  public recentSearchesChange = output<string[]>({ alias: 'recentSearchesChange' });
}
