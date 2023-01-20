import { LanguageSelectorService } from './language-selector.service';

describe('LanguageSelectorService', () => {
  let languageSelector: LanguageSelectorService;

  beforeEach(() => {
    languageSelector = new LanguageSelectorService();
  });

  it('should have created an instance of the LanguageSelectorService', () => {
    languageSelector.setLanguage('en');

    expect(languageSelector).toBeTruthy();
  });

  it('Should change the value of language$ to the given value when we call the method setLanguage', () => {
    languageSelector.setLanguage('en');

    expect(languageSelector.language$.value).toBe('en');
  });
});
