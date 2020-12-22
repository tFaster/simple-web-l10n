import { L10nCatalogMap, L10nCatalogsJson, L10nValueMap } from './types';
import { parseCatalogs } from './catalogParser';

describe('catalogParser', () => {

  describe('parseCatalogs', () => {

    it('should throw error when catalogs are not defined or null', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      let l10nData: L10nCatalogsJson = undefined;
      expect(() => {
        parseCatalogs(l10nData);
      }).toThrowError();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      l10nData = null;
      expect(() => {
        parseCatalogs(l10nData);
      }).toThrowError();
    });

    it('should parse empty JSON and throw error', () => {
      const l10nData: L10nCatalogsJson = {};
      expect(() => {
        parseCatalogs(l10nData);
      }).toThrowError();
    });

    it('should parse JSON and return catalog map', () => {
      const l10nData: L10nCatalogsJson = {
        'en': {
          'hello': 'Hello',
          'world': 'World'
        },
        'de': {
          'hello': 'Hallo',
          'world': 'Welt'
        }
      };
      const catalogMap: L10nCatalogMap = parseCatalogs(l10nData);
      expect(catalogMap.size).toBe(2);
      expect(catalogMap.has('en')).toBeTruthy();
      expect(catalogMap.has('de')).toBeTruthy();

      const enCatalog: L10nValueMap | undefined = catalogMap.get('en');
      expect(enCatalog?.size).toBe(2);
      expect(enCatalog?.has('hello')).toBeTruthy();
      expect(enCatalog?.get('hello')).toBe('Hello');
      expect(enCatalog?.has('world')).toBeTruthy();
      expect(enCatalog?.get('world')).toBe('World');

      const deCatalog: L10nValueMap | undefined = catalogMap.get('de');
      expect(deCatalog?.size).toBe(2);
      expect(deCatalog?.has('hello')).toBeTruthy();
      expect(deCatalog?.get('hello')).toBe('Hallo');
      expect(deCatalog?.has('world')).toBeTruthy();
      expect(deCatalog?.get('world')).toBe('Welt');
    });

  });

});
