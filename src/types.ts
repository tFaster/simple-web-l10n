export interface L10nCatalogsJson {
  [language: string]: L10nDictionary
}

export interface L10nDictionary {
  [key: string]: string
}

export type L10nElementMap = Map<string, HTMLElement>;
export type L10nValueMap = Map<string, string>;
export type L10nCatalogMap = Map<string, L10nValueMap>;

export interface SimpleWebL10nController {
  setLanguage(language: string): boolean;
}
