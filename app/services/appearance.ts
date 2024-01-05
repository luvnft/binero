export enum Appearance {
  Auto = 'auto',
  Dark = 'dark',
  Light = 'light',
}

export const APPEARANCES = [Appearance.Auto, Appearance.Light, Appearance.Dark];

export const DEFAULT_APPEARANCE = Appearance.Auto;

export function isAppearance(value: unknown): value is Appearance {
  return (APPEARANCES as unknown[]).includes(value);
}
