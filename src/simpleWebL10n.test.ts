import { L10nCatalogsJson, SimpleWebL10nController } from './types';
import { initL10n } from './simpleWebL10n';

describe('simpleWebL10n', () => {

  describe('initL10n', () => {

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

    it('should set text in elements', () => {
      document.body.innerHTML = `<div><span data-l10n="hello">X</span><span data-l10n="world">Y</span></div>`;
      const spanElements: HTMLCollectionOf<Element> = document.body.getElementsByTagName('SPAN');

      expect(spanElements.item(0)?.innerHTML).toBe('X');
      expect(spanElements.item(1)?.innerHTML).toBe('Y');

      const l10nCtrl: SimpleWebL10nController = initL10n(l10nData, 'en');
      expect(spanElements.item(0)?.innerHTML).toBe('Hello');
      expect(spanElements.item(1)?.innerHTML).toBe('World');

      l10nCtrl.setLanguage('de');
      expect(spanElements.item(0)?.innerHTML).toBe('Hallo');
      expect(spanElements.item(1)?.innerHTML).toBe('Welt');
    });

  });

});
