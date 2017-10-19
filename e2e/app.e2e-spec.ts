import { BitacoraPage } from './app.po';

describe('bitacora App', () => {
  let page: BitacoraPage;

  beforeEach(() => {
    page = new BitacoraPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
