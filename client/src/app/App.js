import { Router, routes } from './router';
import {
  HomePage, BlogPage, NotFoundPage, PostDetailPage, OpleidingPage, WerkpleklerenPage, CasesPage,
  WieiswiePage, ContactPage,
} from './pages';
import { Header, Footer } from './components';

class App {
  constructor (container) {
    // Root container
    this.container = container;

    // Pages
    this.pageHome = new HomePage();
    this.pageBlog = new BlogPage();
    this.pageNotFound = new NotFoundPage();
    this.pagePostDetail = new PostDetailPage();
    this.pageOpleiding = new OpleidingPage();
    this.pageWerkplekleren = new WerkpleklerenPage();
    this.pageCases = new CasesPage();
    this.pageWieiswie = new WieiswiePage();
    this.pageContact = new ContactPage();

    // Components
    this.compHeader = new Header();
    this.compFooter = new Footer();
  }

  async render () {
    return `
    ${await this.compHeader.render()}
    <main class="main">
      <div id="children"></div>
    </main>  
    ${await this.compFooter.render()}  
    `;
  }

  async afterRender () {
    await this.compHeader.afterRender();

    this.childrenContainer = document.getElementById('children');
    // Router
    this.router = new Router(this.childrenContainer);
    this.router.addRoute(routes.LANDING, this.pageHome);
    this.router.addRoute(routes.HOME, this.pageHome);
    this.router.addRoute(routes.BLOG, this.pageBlog);
    this.router.addRoute(routes.POST_DETAIL, this.pagePostDetail);
    this.router.addRoute(routes.OPLEIDING, this.pageOpleiding);
    this.router.addRoute(routes.WERKPLEKLEREN, this.pageWerkplekleren);
    this.router.addRoute(routes.CASES, this.pageCases);
    this.router.addRoute(routes.WIEISWIE, this.pageWieiswie);
    this.router.addRoute(routes.CONTACT, this.pageContact);
    this.router.setNotFoundPage(this.pageNotFound);
    this.router.resolve();

    // Listen to changes in history
    window.onpopstate = (event) => {
      this.setActiveLink();
    };
    // Set active link
    this.setActiveLink();
  }

  setActiveLink () {
    this.compHeader.updateActiveLink(document.location.hash);
  }
}

export default App;
