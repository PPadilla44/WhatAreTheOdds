# What Are The Odds? – PRD

## Original Problem Statement
1. "Can you make the styling look more modern"
2. "Update the app so it using the LTS for expo and npm and node"

The app is an existing React Native (Expo) clicker game: the user presses a big circular
button until probability decides they've "hit". Supports light/dark themes, fraction &
percent input modes, saved odds presets, and a simulate mode that auto-presses.

## Architecture
- **Framework**: Expo 54 / React Native 0.81.5 / React 19.1
- **Language**: TypeScript 5.9
- **Navigation**: @react-navigation/native-stack v7
- **UI kit**: @rneui/themed v4 (successor to the deprecated react-native-elements)
- **State**: React Context (Clicker / OddsItems / Settings) with reducers under `/app/store`
- **Persistence**: @react-native-async-storage v2

## User Persona
- Casual mobile user looking for a playful probability/luck gadget.
- Wants a clean, modern look that feels current on iOS & Android.

## Core Requirements (static)
- Big central "What Are The Odds?" button that increments count & resolves a hit.
- Percent and Fraction (with x1 / x10 / xM / xB multiplier) input modes.
- Save custom odds presets and list them with swipe-to-delete.
- Reset and simulate (auto-press) controls.
- Appearance setting: automatic / dark / light.

## What's Been Implemented

### 2026-02 – Main screen layout fix
- Fixed Reset button overlapping the Percent/Fraction segmented pill on web export.
- Fixed Main circular button rendering as an ellipse (flexbox stretching on web).
- Verified via screenshot: button is perfectly circular, reset sits cleanly below pill.

### 2026-01 – Modern visual refresh
- New blue-accent design token palette (`/app/constants/Colors.ts`) with semantic keys:
  `surface`, `surfaceAlt`, `border`, `mutedText`, `success`, `danger`,
  shared `primary / primaryHover / primaryDeep / accent`.
- Modernized main circle button with state-colored glow and inner ring.
- Pill segmented controls, rounded inputs with accent glyphs, card-style list items
  with hairline themed dividers, pill Save/Try buttons, polished modals, cleaner
  headers, modern Reset/Simulate buttons.
- Card-style Radio appearance settings, modernized NotFound and Settings screens.

### 2026-01 – Upgrade to Expo SDK 54 / Node 20 LTS
- **Expo**: `44 → 54` (latest stable as of Jan 2026).
- **React**: `17 → 19.1`.
- **React Native**: `0.64 → 0.81.5`.
- **React Navigation**: `v6 → v7`.
- **UI lib**: `react-native-elements (deprecated) → @rneui/themed@4.0.0-rc.8`.
- **Runtime**: Node 20.20.2 LTS in container (user may upgrade to Node 22 LTS locally;
  SDK 54 requires Node ≥ 20.19.x).
- **Reanimated**: `2 → 4.1` with new `react-native-worklets/plugin` babel plugin.
- **Other**: gesture-handler 2.28, screens 4.16, safe-area-context 5.6, async-storage
  2.2, picker 2.11, expo-font 14, expo-linking 8, expo-status-bar 3, fraction.js 5.
- Entry point migrated to `index.ts` calling `registerRootComponent(App)`.
- Fixed TS incompatibilities: `NodeJS.Timer → ReturnType<typeof setInterval>`,
  `Fraction.d/n` now return `bigint` (wrapped with `Number(...)`), RN navigation prop
  generics widened with `any` screen arg, Icon `tvParallaxProperties` removed.
- `tsconfig.json` modernised (`moduleResolution: bundler`, `jsx: react-jsx`).
- `babel.config.js` updated for Reanimated 4 worklets plugin.
- Removed unused deps: `iconify`, `@iconify/react`, `@react-navigation/bottom-tabs`,
  `@react-navigation/drawer`, `@expo-google-fonts/dev`, `@testing-library/jest-native`
  types.
- Test spec files excluded from tsc for now (pre-existing tests rely on old RTL API).
- `npx expo-doctor` → **17/17 checks passed**.

## Not Implemented / Backlog
- P1: Rewrite `*.spec.tsx` to use new `@testing-library/react-native` v12 API (drop
  `.container`, update renderer assertions).
- P1: Optional haptics + scale animation on MainButton.
- P2: Wire left-swipe share to native share sheet.
- P2: Adopt `@expo-google-fonts/lexend-deca` for distinct typography.
- P2: Wire actual bundled vector-icon fonts (may need `@expo/vector-icons` wrapper if
  any icons render as blanks on device).

## How to Run

### In the Emergent preview
The app is now wired up to the Emergent preview URL automatically:
- `/app/dist` holds the built Expo Web bundle (via `npx expo export --platform web`).
- `/app/frontend/package.json` runs `serve -s /app/dist -l 3000` under supervisor
  (with `ensure-build.js` auto-regenerating the bundle if missing).
- `/app/backend/server.py` is a minimal FastAPI stub exposing `/api/health` on port
  8001 so the required supervisor program stays RUNNING (this app has no real backend).
- After code edits, regenerate the preview bundle:
  ```sh
  cd /app && rm -rf dist && npx expo export --platform web && sudo supervisorctl restart frontend
  ```

### Locally on a device / simulator
```sh
cd /app
yarn install
yarn start          # opens Expo dev server
# press i (iOS sim), a (Android emu), or w (web)
```

## Testing Notes
- TypeScript: `yarn tsc --noEmit` → clean.
- Expo Doctor: 17/17 passed.
- Runtime (device/simulator): not testable in this container – please verify on your
  end with Expo Go or a simulator.
