import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pokemon } from '../../../types/pokemon.types';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  public searchText = input<string>('', {
    alias: 'searchText',
  });
  public recentSearches = input<string[]>([], {
    alias: 'recentSearches',
  });
  public pokemons = input<Pokemon[]>([], {
    alias: 'pokemons',
  });

  public filteredPokemons = output<Pokemon[]>({ alias: 'filteredPokemons' });
  public isListFiltered = output<boolean>({ alias: 'isListFiltered' });
  public currentPage = output<number>({ alias: 'currentPage' });
  public recentSearchesChange = output<string[]>({
    alias: 'recentSearchesChange',
  });
  public searchTextChange = output<string>({
    alias: 'searchTextChange',
  });

  public isInputFocused = signal<boolean>(false);

  public onSearchChange(): void {
    if (this.searchText().trim() === '') {
      // Reset to the full list if the search term is empty
      this.isListFiltered.emit(false);
      this.currentPage.emit(1);
      this.filteredPokemons.emit(this.pokemons());
    } else {
      // Filter the Pokémon list based on the search term
      this.isListFiltered.emit(true);
      this.addToRecent(this.searchText());
      const filteredPokemons = this.pokemons().filter(
        (pokemon) =>
          pokemon.name
            .toLowerCase()
            .includes(this.searchText().toLowerCase()) ||
          pokemon.types.some((type: string) =>
            type.toLowerCase().includes(this.searchText().toLowerCase())
          )
      );

      this.filteredPokemons.emit(filteredPokemons);
      this.currentPage.emit(1);
    }
  }

  public addToRecent(query: string): void {
    // Avoid duplicates and limit to 5
    const updatedRecentSearches = [
      query,
      ...this.recentSearches().filter((q) => q !== query),
    ].slice(0, 5);

    localStorage.setItem(
      'recentSearches',
      JSON.stringify(updatedRecentSearches)
    );

    this.recentSearchesChange.emit(updatedRecentSearches);
  }

  public runSearch(query: string): void {
    this.searchTextChange.emit(query);
    this.onSearchChange();
  }

  public clearSearchHistory(): void {
    this.recentSearchesChange.emit([]);
    localStorage.removeItem('recentSearches');
  }

  public onInputBlur() {
    // Delay hiding the dropdown to allow click events on dropdown items
    setTimeout(() => {
      this.isInputFocused.set(false);
    }, 200);
  }

  public onInputFocus() {
    this.isInputFocused.set(true);
  }
}
