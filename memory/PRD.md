# What Are The Odds? – PRD

## Original Problem Statement
"Can you make the styling look more modern"

The app is an existing React Native (Expo) clicker game: the user presses a big circular
button until probability decides they've "hit". Supports light/dark themes, fraction &
percent input modes, saved odds presets, and a simulate mode that auto-presses.

## Architecture
- **Framework**: Expo 44 / React Native 0.64
- **Language**: TypeScript
- **Navigation**: @react-navigation/native-stack (Root, Settings, Modal, NotFound)
- **State**: React Context (ClickerProvider, OddsItemsProvider, SettingsProvider) with
  reducers under `/app/store`
- **Persistence**: @react-native-async-storage
- **UI kit**: react-native-elements + custom themed wrappers (`/app/components/Themed.tsx`)

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
### 2026-01 – Modern visual refresh
- New blue-accent design token palette (`/app/constants/Colors.ts`) with semantic keys:
  `surface`, `surfaceAlt`, `border`, `mutedText`, `success`, `danger`,
  shared `primary / primaryHover / primaryDeep / accent`.
- Modernized main circle button: larger size, richer shadow glow tinted with state
  color, inner hairline ring for depth, refined typography.
- New BtnColorObj palette (lucky/unlucky/normal/default) using modern emerald / rose /
  blue shades instead of muddy darks.
- SubContainer: compact uppercase label in accent + large bold value – hierarchy pop.
- Main screen: generous spacing, refined segmented Percent/Fraction control (pill look,
  transparent background, blue accent on selection).
- ModalForm inputs: taller inputs, rounded 16 radius, accent `%` and `/` glyphs,
  pill-shaped primary-colored multiplier chip with its own shadow.
- OddsList: themed hairline dividers (no more hardcoded black bar), centered
  ActivityIndicator in accent blue.
- OddsItem: left-aligned title / right-aligned accent-colored odds, proper surface
  colors per theme.
- Swipe actions: consistent uppercase pill-style actions, modern rose red and blue.
- SaveTryButtons: pill buttons with gap, glowing primary shadow on Try.
- Radio appearance toggle: card surface with soft shadow, larger rows, checked-state
  color matches accent.
- Modal header: shows "New Odds" title, Cancel in accent blue.
- Multiplier modal: frosted-ish overlay, rounded 24 card, primary-color Confirm.
- Reset/Simulate header buttons: uppercase mini-caps with accent/danger semantics.
- NotFoundScreen & Settings: modernized with accent section labels and pill CTA.

## Not Implemented / Backlog
- P1: Optional gradient fill or animated pulse on the main button press.
- P1: Haptic feedback on press/hit (expo-haptics).
- P2: Share action wired to native share sheet (left-swipe was disabled).
- P2: Animated number transitions on click count.
- P2: Google fonts (Lexend / Inter) wiring – dependency exists but not loaded.

## Next Tasks
1. User review of the new styling in the Expo runtime.
2. Add haptics + subtle scale animation on MainButton press.
3. Wire up Share swipe and native share intent.

## Testing Notes
No automated testing run (Expo mobile app – no web preview available in this
environment). All changes are purely stylistic and preserve the existing component
APIs, state shape, and behavior. Component test IDs remain unchanged.
