import UrlParser from '../routes/url-parser';
import { authedRoutes, unAuthedRoutes } from '../routes/routes';

class App {
  constructor({ content, header }) {
    this._content = content;
    this._header = header;
  }

  async renderPage() {
    const authedUser = localStorage.getItem('auth') || null;
    const url = UrlParser.parseActiveUrlWithCombiner();
    let page = {};
    if (authedUser) {
      page = authedRoutes[url];
    } else {
      page = unAuthedRoutes[url];
    }
    this._header.innerHTML = await page.renderHeader();
    this._content.innerHTML = await page.renderMain();
    await page.afterRender();
  }
}

export default App;
