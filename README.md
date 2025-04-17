# PokeFinderApp

PokeFinderApp is a Pokémon search and management application built with Angular. It allows users to search for Pokémon, view their stats, and filter them by type. The app is designed to be fast, responsive, and user-friendly.

---

## Features

- **Search Pokémon**: Search for Pokémon by name or type.
- **Pagination**: Navigate through large lists of Pokémon with ease.
- **Recent Searches**: View and manage your recent search history.
- **Pokémon Details**: View detailed stats, types, height, and weight for each Pokémon.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Error Handling**: Displays user-friendly error messages when data fails to load.

---

## Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

---

## Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

---

## Building the Project

To build the project, run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

---

## Running Unit Tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

Unit tests are included for key components and services, such as:

- **SearchComponent**: Tests for filtering Pokémon and managing recent searches.
- **PokemonListStore**: Tests for loading Pokémon and handling errors.

---

## Running End-to-End Tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs, such as [Cypress](https://www.cypress.io/) or [Protractor](https://www.protractortest.org/).

---

## Project Structure

Here’s an overview of the key directories and files in the project:

```
src/
├── app/
│   ├── pokemon-list/          # Pokémon list components and store
│   ├── shared/                # Shared components, utilities, and services
│   │   ├── components/        # Reusable components (e.g., Search, Pagination)
│   │   ├── utilities/         # Utility functions (e.g., string manipulation)
│   │   ├── services/          # Services for API calls (e.g., PokemonService)
│   └── types/                 # Type definitions for Pokémon data
├── assets/                    # Static assets (e.g., images, styles)
├── environments/              # Environment-specific configurations
```

---

## API Integration

The app integrates with the [PokéAPI](https://pokeapi.co/) to fetch Pokémon data. Key API endpoints used:

- **Get All Pokémon**: `https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`
- **Get Pokémon Details**: Individual Pokémon details are fetched dynamically.
- **Get Pokémon Types**: `https://pokeapi.co/api/v2/type`

---

## Key Components

### 1. **SearchComponent**

- Allows users to search for Pokémon by name or type.
- Manages recent searches and saves them to `localStorage`.

### 2. **PokemonListComponent**

- Displays a paginated list of Pokémon.
- Handles filtering and loading states.

### 3. **PaginationComponent**

- Provides navigation for paginated Pokémon lists.

### 4. **PokemonListStore**

- Manages the state of Pokémon data using `@ngrx/component-store`.
- Handles API calls and error management.

---

## Error Handling

The app includes robust error handling to ensure a smooth user experience:

- Displays user-friendly error messages when Pokémon or types fail to load.
- Logs errors to the console for debugging during development.

---

## Additional Resources

For more information on using Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

For more details on the PokéAPI, visit the [PokéAPI Documentation](https://pokeapi.co/docs/v2).

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
