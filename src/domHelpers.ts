import { L10nCatalogMap, L10nElementMap, L10nValueMap } from './types';

export function collectL10nElements(root: HTMLElement): L10nElementMap {
  const l10nElementMap: L10nElementMap = new Map<string, HTMLElement[]>();
  const elementsWithL10nValue: NodeListOf<HTMLElement> = getL10nElements(root);
  elementsWithL10nValue.forEach((element: HTMLElement) => {
    const l10nKey: string | null = getL10nElementKey(element);
    if (l10nKey) {
      let elementsList: HTMLElement[];
      const alreadyFoundElements: HTMLElement[] | undefined = l10nElementMap.get(l10nKey);
      if (alreadyFoundElements) {
        elementsList = [...alreadyFoundElements, element]
      } else {
        elementsList = [element];
      }
      l10nElementMap.set(l10nKey, elementsList);
    } else {
      throw new Error('l10n key not defined at data-l10n attribute');
    }
  });
  return l10nElementMap;
}

export function exchangeL10nValues(l10nElements: L10nElementMap, l10nCatalogs: L10nCatalogMap, language: string, fallbackLanguage?: string): boolean {
  const l10nCatalog: L10nValueMap | undefined = l10nCatalogs.get(language)
  if (l10nCatalog) {
    l10nElements.forEach((elements: HTMLElement[], l10nKey) => {
      elements.forEach((element: HTMLElement) => {
        const l10nValue:string | undefined = l10nCatalog.get(l10nKey);
        if (typeof l10nValue !== 'undefined') {
          element.innerHTML = l10nValue
        } else if (fallbackLanguage) {
          element.innerHTML = getL10nValue(l10nCatalogs, l10nKey, fallbackLanguage);
        }
      });
    })
    return true;
  } else {
    console.warn(`Language ${language} is not available`);
    if (fallbackLanguage) {
      return exchangeL10nValues(l10nElements, l10nCatalogs, fallbackLanguage);
    }
    return false;
  }
}

export function getL10nValue(l10nCatalogs: L10nCatalogMap, l10nKey: string, language: string): string {
  const l10nCatalog: L10nValueMap | undefined = l10nCatalogs.get(language);
  return l10nCatalog?.get(l10nKey) || '';
}

export function getL10nElements(root: HTMLElement): NodeListOf<HTMLElement> {
  return root.querySelectorAll('[data-l10n]');
}

export function getL10nElementKey(element: HTMLElement): string | null {
  return element.getAttribute('data-l10n');
}

export function setElementText(element: HTMLElement, text: string): void {
  element.innerText = text;
}
