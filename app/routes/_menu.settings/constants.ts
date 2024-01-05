import { Appearance } from '~/services/appearance';
import { Locale, type Messages } from '~/services/intl';

export const MESSAGE_RAW_BY_LOCALE: Readonly<Record<Locale, string>> = {
  [Locale.En]: 'English',
  [Locale.Ru]: 'Русский',
};

export const MESSAGE_ID_BY_APPEARANCE: Readonly<Record<Appearance, keyof Messages>> = {
  [Appearance.Auto]: 'menuSettingsAppearanceAutoLabel',
  [Appearance.Dark]: 'menuSettingsAppearanceDarkLabel',
  [Appearance.Light]: 'menuSettingsAppearanceLightLabel',
};
