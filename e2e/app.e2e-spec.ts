import { FiitsFrontendPage } from './app.po';

describe('fiits-frontend App', () => {
  let page: FiitsFrontendPage;

  beforeEach(() => {
    page = new FiitsFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
