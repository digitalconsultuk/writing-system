/**
 * Single source of truth for the app palette.
 *
 * NativeWind classes (`bg-ink`, `text-gold`) come from tailwind.config.js;
 * these constants are the same values for the places that only accept a
 * style object or a raw color — navigator options, icons, placeholders.
 * Keep the two in sync.
 */
export const colors = {
  gold: '#C9A227',
  goldLight: '#E3C45A',
  goldDim: '#8C6F1B',
  goldDark: '#4A3A0E',
  goldTint: '#FBF4DC',

  ink: '#0B0B0D',
  inkElevated: '#121216',
  inkSurface: '#1B1B21',
  inkBorder: '#26262E',
} as const;