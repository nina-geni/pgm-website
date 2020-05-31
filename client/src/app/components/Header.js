import { routes } from '../router';

class Header {
  async render () {
    return `
      <header class="header">
        <div class="container">
          <div class="row nav">
            <h1><a class="nav__logo" href="${routes.HOME}" data-navigo>&#60;/P<span>G</span>M&#62;</a></h1>
            <a class="nav__item" href="${routes.BLOG}" data-navigo>BLOG</a>
            <a class="nav__item" href="${routes.OPLEIDING}" data-navigo>OPLEIDING</a>
            <a class="nav__item" href="${routes.WERKPLEKLEREN}" data-navigo>WERKPLEKLEREN</a>
            <a class="nav__item" href="${routes.CASES}" data-navigo>CASES</a>
            <a class="nav__item" href="${routes.WIEISWIE}" data-navigo>WIE IS WIE</a>
            <a class="nav__item" href="${routes.CONTACT}" data-navigo>CONTACT</a>
          </div>
        </div>        
      </header>
    `;
  }

  async afterRender () {
  }

  updateActiveLink (route) {
    const prevActiveMenuItemElement = document.querySelector(`.nav__item > a[class*="active"]`);
    if (prevActiveMenuItemElement) {
      prevActiveMenuItemElement.classList.remove('active');
    }
    const link = route.replace('#!', '');
    const menuItemElement = document.querySelector(`.nav__item > a[href*="${link}"]`);
    if (menuItemElement) {
      menuItemElement.classList.add('active');
    }    
  }
}

export default Header;
