import { BAAS } from '../services';
import { routes } from '../router';

class CasesPage {
  async showCases () {
    const cases = await BAAS.getCases();
    return cases.data.map(
      project => `
        <a href="#!${routes.CASES_DETAIL.replace(':id', project.id)}" class="main-card" data-navigo>
          <div class="main-card__img">
            <img src="${cases.domain}${project.thumbnail}">
          </div>
          <div class="main-card__overlay"></div>
          <div class="main-card__text">
            <p class="main-card__title">${project.title}</p>
            <p class="main-card__link">Lees Meer <i class="fas fa-arrow-right"></i></p>
          </div>
        </a>`
    ).join('');
  }

  async render () {
    return `
    <div class="head-page">
    <div class="container">
      <div class="row filter-head">
        <h2 class="head-title">Cases</h2>
        <select class="filter">
          <option>@Work 1</option>
          <option>@Work 2</option>
          <option>UI/UX Prototyping 1</option>
          <option>UI/UX prototyping 2</option>
          <option>Web Design</option>
          <option>Web Programming 1</option>
          <option>Web Programming 2</option>
          <option>Web Programming 3</option>
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
    </div>
  </div>
    `;
  }

  async afterRender () {
    // Connect the listeners
    return this;
  }

  async mount () {
    // Before the rendering of the page
    return this;
  }

  async unmount () {
    // After leaving the page
    return this;
  }
}

export default CasesPage;
