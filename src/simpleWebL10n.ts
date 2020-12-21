import { L10nCatalogMap, L10nCatalogsJson, L10nElementMap, SimpleWebL10nController } from './types';
import { parseCatalogs } from './catalogParser';
import { collectL10nElements, exchangeL10nValues } from './domHelpers';

export function initL10n(catalogs: L10nCatalogsJson, language: string, elementRoot: HTMLElement = document.body): SimpleWebL10nController {
  const catalogsMap: L10nCatalogMap = parseCatalogs(catalogs);
  const l10nElements: L10nElementMap = collectL10nElements(elementRoot);
  const success: boolean = exchangeL10nValues(l10nElements, catalogsMap, language);
  return {
    setLanguage: (newLanguage: string): boolean => {
      return exchangeL10nValues(l10nElements, catalogsMap, newLanguage);
    }
  };
}