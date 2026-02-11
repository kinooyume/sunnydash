# SunnyDash

Weather dashboard built with `SvelteKit` and `Svelte 5`, as an example of `Hexagonal Architecture` in a frontend project.
Weather APIs are swappable via ports and adapters (OpenMeteo and mock for now). Includes unit and E2E tests.

## Quick Start

```bash
bun install
bun run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `bun run dev`       | Start dev server                     |
| `bun run dev:mock`  | Dev with mock API (no network calls) |
| `bun run build`     | Production build                     |
| `bun run test`      | Run all tests                        |
| `bun run test:unit` | Unit tests (Vitest)                  |
| `bun run test:e2e`  | E2E tests (Playwright)               |
| `bun run storybook` | Component playground                 |
| `bun run lint`      | Lint + format check                  |

## Architecture

Hexagonal architecture with ports & adapters:

```
src/
├── domain/          # Core types, weather mappings
├── adapters/        # API implementations (OpenMeteo, Nominatim, Mock...)
├── services/        # Application services
├── stores/          # Svelte state management
├── components/
│   ├── ui/          # Design system (GlassCard, Text, Badge...)
│   ├── features/    # Feature components (CitySearch, Forecast...)
│   └── shared/      # Shared components (SearchCombobox...)
└── app/             # Page layouts
```

### Ports

The domain layer defines interfaces (ports) that abstract external dependencies. Business logic never touches infrastructure directly.

| Port | What it abstracts | Adapter(s) |
| --- | --- | --- |
| `WeatherServicePort` | Weather forecast API | OpenMeteo, Mock |
| `GeocodingPort` | City search (forward) | OpenMeteo, Mock |
| `ReverseGeocodingPort` | Coords to city name | Nominatim (OpenStreetMap), Mock |
| `StoragePort` | Key-value persistence | localStorage |
| `GeolocationPort` | Device location | Browser Geolocation API |
| `NotificationPort` | User-facing messages | Store-backed toasts |

Weather, geocoding, and reverse geocoding adapters can each be switched independently from the UI. The other three are standalone infrastructure ports backed by browser APIs.

All ports are provided to components through Svelte's context API, so nothing imports an adapter directly.

### Adding a new weather API

1. Create adapter in `src/adapters/yourapi/`
2. Implement `WeatherServicePort` and `GeocodingPort`
3. Register in `src/stores/weatherDomainsState.svelte`

## Testing

E2E tests run against mock adapters by default for speed and reliability.

```bash
# Run with UI
bun run test:e2e --ui

# Debug mode
bun run test:e2e --debug
```

On Linux, tests use system Chromium. Install via your package manager if needed.

## Stack

- [Svelte 5](https://svelte.dev) with runes
- [SvelteKit 2](https://kit.svelte.dev)
- [Vite](https://vitejs.dev)
- [Playwright](https://playwright.dev) for E2E
- [Vitest](https://vitest.dev) for unit tests
- [Storybook](https://storybook.js.org) for components

## Credits

Weather icons by [Icons8](https://icons8.com/icons/set/weather--style-dusk)
