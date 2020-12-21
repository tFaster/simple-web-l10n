import { L10nCatalogMap, L10nCatalogsJson, L10nValueMap } from './types';


export function parseCatalogs(l10nCatalogs: L10nCatalogsJson): L10nCatalogMap {
  if (!l10nCatalogs || Object.keys(l10nCatalogs).length === 0) {
    throw new Error('Empty catalog provided');
  }
  const catalogMap: L10nCatalogMap = new Map<string, L10nValueMap>();
  for (let language in l10nCatalogs) {
    const dictionary = l10nCatalogs[language];
    const l10nValueMap: L10nValueMap = new Map<string, string>();
    for (let l10nKey in dictionary) {
      const l10nText: string = dictionary[l10nKey];
      l10nValueMap.set(l10nKey, l10nText);
    }
    catalogMap.set(language, l10nValueMap);
  }
  return catalogMap;
}

