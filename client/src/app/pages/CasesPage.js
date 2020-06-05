import { BAAS } from '../services';
import { routes } from '../router';

class CasesPage {
  constructor () {
    this.cases = {};
  }

  async showCases (page = 1, vak = 'alles') {
    if (vak === 'alles') {
      this.cases = await BAAS.getCases();
    } else {
      this.cases = await BAAS.getCasesOpVak(vak);
    }
    const casesPagina = this.cases.data.slice(page * 4 - 4, page * 4);
    return casesPagina.map(
      project => `
        <a href="#!${routes.CASES_DETAIL.replace(':id', project.id)}" class="main-card" data-navigo>
          <div class="main-card__img">
            <img src="${this.cases.domain}${project.thumbnail}">
          </div>
          <div class="main-card__overlay"></div>
          <div class="main-card__text">
            <p class="main-card__title">${project.title}</p>
            <p class="main-card__link">Lees Meer <i class="fas fa-arrow-right"></i></p>
          </div>
        </a>`
    ).join('');
  }

  makePagination (data) {
    let tempStr = '';
    let page = 1;

    for (let i = 0; i <= data.length; i += 4) {
      tempStr += `<a href="" id="${page}" class="page-number">${page}</a>`;
      page++;
    }

    return tempStr;
  }

  async render () {
    return `
    <div class="head-page">
    <div class="container">
      <div class="row filter-head">
        <h2 class="head-title">Cases</h2>
        <select class="filter">
          <option value="alles">Alles</option>
          <option value="@Work 1">@Work 1</option>
          <option value="UI/UX Prototyping 1">UI/UX Prototyping 1</option>
          <option value="UI/UX prototyping 2">UI/UX prototyping 2</option>
          <option value="Web Design">Web Design</option>
      </select>
      </div>
    </div>
    <div class="head-picture">
      <div class="head-picture__overlay"></div>
      <div class="head-picture__image head-picture__image--cases"></div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-12 main-cards">
        ${await this.showCases()}
      </div>
      <div class="col-md-12 pagination">
        ${this.makePagination(this.cases.data)}
      </div>
    </div>
  </div>
    `;
  }

  makeEvents (container, vak = 'alles') {
    const pages = document.querySelectorAll('.page-number');
    pages[0].classList.add('active-page');

    pages.forEach((page) => {
      page.addEventListener('click', async (e) => {
        e.preventDefault();
        let pageNumber = e.target.id;
        pageNumber = parseInt(pageNumber, 10);

        container.innerHTML = await this.showCases(pageNumber, vak);

        pages.forEach((el) => {
          el.classList.remove('active-page');
        });

        e.target.classList.add('active-page');
      });
    });
  }

  async afterRender () {
    const filter = document.querySelector('.filter');
    const casesContainer = document.querySelector('.main-cards');
    const pagination = document.querySelector('.pagination');

    filter.addEventListener('change', async (e) => {
      console.log(e.target.value);
      casesContainer.innerHTML = await this.showCases(1, e.target.value);
      pagination.innerHTML = this.makePagination(this.cases.data);
      this.makeEvents(casesContainer, e.target.value);
    });

    this.makeEvents(casesContainer);
    // Connect the listeners
    return this;
  }

  async mount () {
    // Before the rendering of the page
    const hamburgerElement = document.querySelector('.hamb');
    const navElement = document.querySelector('.nav__list');
    document.body.style.overflow = 'initial';
    navElement.classList.remove('nav__list--show');
    hamburgerElement.classList.add('fa-bars');
    hamburgerElement.classList.remove('fa-times');
    return this;
  }

  async unmount () {
    // After leaving the page
    return this;
  }
}

export default CasesPage;
