import {sum} from './simple-web-l10n';

describe('simple-web-l10n', () => {

  describe('sum', () => {
    it('should sum up', () => {
      expect(sum(1, 1)).toEqual(2);
    });
  });
});
