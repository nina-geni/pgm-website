import { routes } from '../router';

class Header {
  async render () {
    return `
      <header class="header">
        <div class="container">
          <div class="row nav">
            <h1><a class="nav__logo" href="${routes.HOME}" data-navigo>&#60;/P<span>G</span>M&#62;</a></h1>
            <div>
              <i class="fas fa-bars hamb"></i>
              <div class="nav__list">
                <a class="nav__item" href="${routes.BLOG}" data-navigo>BLOG</a>
                <a class="nav__item" href="${routes.OPLEIDING}" data-navigo>OPLEIDING</a>
                <a class="nav__item" href="${routes.WERKPLEKLEREN}" data-navigo>WERKPLEKLEREN</a>
                <a class="nav__item" href="${routes.CASES}" data-navigo>CASES</a>
                <a class="nav__item" href="${routes.WIEISWIE}" data-navigo>WIE IS WIE</a>
                <a class="nav__item" href="${routes.CONTACT}" data-navigo>CONTACT</a>
              </div>
            </div>
          </div>
        </div>        
      </header>
    `;
  }

  async afterRender () {
    const hamburgerElement = document.querySelector('.hamb');
    const navElement = document.querySelector('.nav__list');
    document.body.style.overflow = 'initial';
    navElement.classList.remove('nav__list--show');
    hamburgerElement.classList.add('fa-bars');
    hamburgerElement.classList.remove('fa-times');

    hamburgerElement.addEventListener('click', (e) => {
      if (navElement.classList.contains('nav__list--show')) {
        navElement.classList.remove('nav__list--show');
        e.target.classList.add('fa-bars');
        e.target.classList.remove('fa-times');
        document.body.style.overflow = 'initial';
      } else {
        navElement.classList.add('nav__list--show');
        e.target.classList.remove('fa-bars');
        e.target.classList.add('fa-times');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  updateActiveLink (route) {
    const prevActiveMenuItemElement = document.querySelector(`.nav__item[class*="active"]`);
    if (prevActiveMenuItemElement) {
      prevActiveMenuItemElement.classList.remove('active');
    }
    const link = route.replace('#!', '');
    const menuItemElement = document.querySelector(`.nav__item[href*="${link}"]`);
    if (menuItemElement) {
      menuItemElement.classList.add('active');
    }    
  }
}

export default Header;
