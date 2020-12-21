import { collectL10nElements, exchangeL10nValues, getL10nElements, setElementText } from './domHelpers';
import { L10nCatalogMap, L10nValueMap } from './types';


describe('domHelpers', () => {

  describe('getL10nElements', () => {

    it('should find one element', () => {
      document.body.innerHTML = `<div><span data-l10n>Hello</span></div>`;
      expect(getL10nElements(document.body).length).toBe(1);
    });

    it('should find 2 elements', () => {
      document.body.innerHTML = `<div><span data-l10n>Hello</span><span data-l10n>World</span></div>`;
      expect(getL10nElements(document.body).length).toBe(2);
    });

    it('should not find elements', () => {
      document.body.innerHTML = `<div><span>Hello</span><span>World</span></div>`;
      expect(getL10nElements(document.body).length).toBe(0);
    });

  });

  describe('setElementText', () => {

    it('should set text on element', () => {
      document.body.innerHTML = `<div><span data-l10n>Hello</span></div>`;
      const elem = document.body.getElementsByTagName('SPAN').item(0) as HTMLElement;
      setElementText(elem, 'World');
      expect(elem.innerText).toBe('World');
    });

  });

  describe('collectL10nElements', () => {

    it('should collect one element', () => {
      document.body.innerHTML = `<div><span data-l10n="hello"></span></div>`;
      const l10nElementMap = collectL10nElements(document.body);
      expect(l10nElementMap.size).toBe(1);
    });

    it('should collect one element, even if key is used twice', () => {
      document.body.innerHTML = `<div><span data-l10n="hello"></span><span data-l10n="hello"></span></div>`;
      const l10nElementMap = collectL10nElements(document.body);
      expect(l10nElementMap.size).toBe(1);
    });

    it('should collect two elements', () => {
      document.body.innerHTML = `<div><span data-l10n="hello"></span><span data-l10n="world"></span></div>`;
      const l10nElementMap = collectL10nElements(document.body);
      expect(l10nElementMap.size).toBe(2);
    });

  });

  describe('exchangeL10nValues', () => {
    const l10nCatalogs: L10nCatalogMap = new Map<string, L10nValueMap>();
    const enCatalog: L10nValueMap = new Map<string, string>();
    const deCatalog: L10nValueMap = new Map<string, string>();
    l10nCatalogs.set('en', enCatalog);
    l10nCatalogs.set('de', deCatalog);
    enCatalog.set('hello', 'Hello');
    enCatalog.set('world', 'World');
    deCatalog.set('hello', 'Hallo');
    deCatalog.set('world', 'Welt');

    it('should set text in elements', () => {
      document.body.innerHTML = `<div><span data-l10n="hello"></span><span data-l10n="world"></span><span data-l10n="world"></span></div>`;
      const spanElements: HTMLCollectionOf<Element> = document.body.getElementsByTagName('SPAN');
      const l10nElementMap = collectL10nElements(document.body);
      expect(l10nElementMap.size).toBe(2);
      expect(spanElements.item(0)?.innerHTML).toBe('');
      expect(spanElements.item(1)?.innerHTML).toBe('');

      const resultEn: boolean = exchangeL10nValues(l10nElementMap, l10nCatalogs, 'en');
      expect(resultEn).toBeTruthy();
      expect(spanElements.item(0)?.innerHTML).toBe('Hello');
      expect(spanElements.item(1)?.innerHTML).toBe('World');

      const resultDe: boolean = exchangeL10nValues(l10nElementMap, l10nCatalogs, 'de');
      expect(resultDe).toBeTruthy();
      expect(spanElements.item(0)?.innerHTML).toBe('Hallo');
      expect(spanElements.item(1)?.innerHTML).toBe('Welt');

      const resultNotAvailable: boolean = exchangeL10nValues(l10nElementMap, l10nCatalogs, 'NotAvailable');
      expect(resultNotAvailable).toBeFalsy();
      expect(spanElements.item(0)?.innerHTML).toBe('Hallo');
      expect(spanElements.item(1)?.innerHTML).toBe('Welt');
    });

    it('should throw error when attribute value not defined', () => {
      document.body.innerHTML = `<div><span data-l10n></span></div>`;
      expect(() => {
        collectL10nElements(document.body);
      }).toThrowError();
    });

  });

});
