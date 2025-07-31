export interface MesThemes {
  id: number | null;
  theme: string;
}

export type ThemeContexteType = {
  themes: MesThemes[];
  setThemes: string;
  modifierTheme: (id: number | null, theme: string) => void;
  newTheme: string;
  setNewTheme: (newTheme: string) => void;
  loadDataCallback(): void;
  loadTheme(): void;
}