import { Component, input, output } from '@angular/core';
import { Pokemon } from '../../../types/pokemon.types';

@Component({
  selector: 'app-select',
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  public types = input<string[]>([], {
    alias: 'types',
  });
  public pokemons = input<Pokemon[]>([], {
    alias: 'pokemons',
  });
  public isTypesLoading = input<boolean>(false, {
    alias: 'isTypesLoading',
  });

  public filteredPokemons = output<Pokemon[]>({ alias: 'filteredPokemons' });
  public isListFiltered = output<boolean>({ alias: 'isListFiltered' });
  public currentPage = output<number>({ alias: 'currentPage' });

  public onTypeFilterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    if (selectedValue === 'all') {
      this.isListFiltered.emit(false);
      this.currentPage.emit(1);
      this.filteredPokemons.emit(this.pokemons());
    } else {
      this.isListFiltered.emit(true);
      const filteredPokemons = this.pokemons().filter((pokemon) =>
        pokemon.types.some((type) =>
          type.toLowerCase().includes(selectedValue.toLowerCase())
        )
      );
      this.filteredPokemons.emit(filteredPokemons);
      this.currentPage.emit(1);
    }
  }
}
