import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { ComponentRef } from '@angular/core';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let componentRef: ComponentRef<SearchComponent>;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSearchChange', () => {
    beforeEach(() => {
      componentRef.setInput('pokemons', [
        { name: 'Bulbasaur', types: ['grass', 'poison'] },
        { name: 'Charmander', types: ['fire'] },
        { name: 'Squirtle', types: ['water'] },
      ]);
    });

    it('should reset list if searchText is empty', () => {
      const emitSpy = jest.spyOn(component.filteredPokemons, 'emit');
      componentRef.setInput('searchText', '');

      component.onSearchChange();

      expect(emitSpy).toHaveBeenCalledWith([
        { name: 'Bulbasaur', types: ['grass', 'poison'] },
        { name: 'Charmander', types: ['fire'] },
        { name: 'Squirtle', types: ['water'] },
      ]);
    });

    it('should filter by name', () => {
      const emitSpy = jest.spyOn(component.filteredPokemons, 'emit');
      componentRef.setInput('searchText', 'char');

      component.onSearchChange();

      expect(emitSpy).toHaveBeenCalledWith([
        { name: 'Charmander', types: ['fire'] },
      ]);
    });

    it('should filter by type', () => {
      const emitSpy = jest.spyOn(component.filteredPokemons, 'emit');
      componentRef.setInput('searchText', 'water');

      component.onSearchChange();

      expect(emitSpy).toHaveBeenCalledWith([
        { name: 'Squirtle', types: ['water'] },
      ]);
    });
  });

  describe('addToRecent', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'localStorage', {
        value: {
          setItem: jest.fn(),
          getItem: jest.fn(),
          removeItem: jest.fn(),
          clear: jest.fn(),
        },
        writable: true,
      });
    });

    it('should add to recentSearches and emit', () => {
      const search = 'pikachu';
      const localStorageSpy = jest.spyOn(localStorage, 'setItem');
      const spy = jest.spyOn(component.recentSearchesChange, 'emit');

      component.addToRecent(search);

      expect(spy).toHaveBeenCalledWith([search]);
      expect(localStorageSpy).toHaveBeenCalledWith(
        'recentSearches',
        JSON.stringify([search])
      );
    });

    it('should keep most recent 5 items only', () => {
      const initial = ['a', 'b', 'c', 'd', 'e'];
      componentRef.setInput('recentSearches', initial);

      const spy = jest.spyOn(component.recentSearchesChange, 'emit');

      component.addToRecent('f');
      expect(spy).toHaveBeenCalledWith(['f', 'a', 'b', 'c', 'd']);
    });
  });

  describe('runSearch', () => {
    it('should emit searchTextChange and call onSearchChange', () => {
      const spy = jest.spyOn(component.searchTextChange, 'emit');
      const searchSpy = jest.spyOn(component, 'onSearchChange');

      component.runSearch('test');

      expect(spy).toHaveBeenCalledWith('test');
      expect(searchSpy).toHaveBeenCalled();
    });
  });

  describe('clearSearchHistory', () => {
    it('should clear recentSearches and remove localStorage', () => {
      const spy = jest.spyOn(component.recentSearchesChange, 'emit');
      jest.spyOn(localStorage, 'removeItem');

      component.clearSearchHistory();

      expect(spy).toHaveBeenCalledWith([]);
      expect(localStorage.removeItem).toHaveBeenCalledWith('recentSearches');
    });
  });

  describe('onInputFocus / Blur', () => {
    it('should set isInputFocused to true on focus', () => {
      component.onInputFocus();
      expect(component.isInputFocused()).toBe(true);
    });

    it('should set isInputFocused to false on blur after delay', fakeAsync(() => {
      component.onInputBlur();
      tick(200);
      expect(component.isInputFocused()).toBe(false);
    }));
  });
});
