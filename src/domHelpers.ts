import { L10nCatalogMap, L10nElementMap, L10nValueMap } from './types';

export function collectL10nElements(root: HTMLElement): L10nElementMap {
  const l10nElementMap: L10nElementMap = new Map<string, HTMLElement>();
  const elementsWithL10nValue: NodeListOf<HTMLElement> = getL10nElements(root);
  elementsWithL10nValue.forEach((element: HTMLElement) => {
    const l10nKey: string | null = getL10nElementKey(element);
    if (l10nKey) {
      l10nElementMap.set(l10nKey, element);
    } else {
      throw new Error('l10n key not defined at data-l10n attribute');
    }
  });
  return l10nElementMap;
}

export function exchangeL10nValues(l10nElements: L10nElementMap, l10nCatalogs: L10nCatalogMap, language: string): boolean {
  if (l10nCatalogs.has(language)) {
    // @ts-ignore
    const l10nCatalog: L10nValueMap = l10nCatalogs.get(language);
    l10nCatalog.forEach((translatedText: string, l10nKey: string) => {
      const element: HTMLElement | undefined = l10nElements.get(l10nKey);
      if (element) {
        element.innerHTML = translatedText;
      }
    });
    return true;
  } else {
    console.warn(`Language ${language} is not available`);
    return false;
  }

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
