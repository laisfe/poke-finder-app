import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchHistoryService {
  private readonly storageKey = 'searchHistory';

  constructor() {}

  // Get search history from Local Storage
  getSearchHistory(): string[] {
    const history = localStorage.getItem(this.storageKey);
    return history ? JSON.parse(history) : [];
  }

  // Add a search term to the history
  addSearchTerm(term: string): void {
    const history = this.getSearchHistory();
    if (!history.includes(term)) {
      history.unshift(term); // Add to the beginning of the list
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(history.slice(0, 10))
      ); // Limit to 10 items
    }
  }

  // Clear the search history
  clearSearchHistory(): void {
    localStorage.removeItem(this.storageKey);
  }
}
